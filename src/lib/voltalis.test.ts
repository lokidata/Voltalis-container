import { AxiosError } from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => {
  const makeInstance = () => ({
    post: vi.fn(),
    get: vi.fn(),
    interceptors: { request: { use: vi.fn() } },
  });
  return { api: makeInstance(), obs: makeInstance() };
});

vi.mock("axios", async (orig) => {
  const actual = await orig<{ default: object }>();
  return { ...actual, default: { ...actual.default, create: () => mocks.api } };
});
vi.mock("axios-observable", () => ({ Axios: { create: () => mocks.obs } }));

import { Voltalis } from "./voltalis";

const user = { defaultSite: { id: "site1", address: "somewhere" } };

describe("Voltalis", () => {
  beforeEach(() => vi.clearAllMocks());

  it("login stores the token and loads the current user", async () => {
    mocks.api.post.mockResolvedValue({ data: { token: "t" } });
    mocks.api.get.mockResolvedValue({ data: user });
    const v = new Voltalis("u", "p");
    await v.login();
    expect(mocks.api.post).toHaveBeenCalledWith("/auth/login", { login: "u", password: "p" });
    expect(v.isLoggedIn()).toBe(true);
  });

  it("maps a 401 to 'Bad Credentials' without logging the response body", async () => {
    const err = new AxiosError("x", "401", undefined, undefined, {
      status: 401,
    } as never);
    mocks.api.post.mockRejectedValue(err);
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    await expect(new Voltalis("u", "p").login()).rejects.toThrow("Bad Credentials");
    expect(spy).not.toHaveBeenCalled();
  });

  it("only logs the status on other login failures", async () => {
    const err = new AxiosError("x", "500", undefined, undefined, {
      status: 500,
      data: { secret: "leak" },
    } as never);
    mocks.api.post.mockRejectedValue(err);
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    await expect(new Voltalis("u", "p").login()).rejects.toThrow("Unable to login");
    expect(JSON.stringify(spy.mock.calls)).not.toContain("leak");
  });

  it("refuses data calls before login", () => {
    expect(() => new Voltalis("u", "p").getAppliances()).toThrow("Use .login() first");
  });

  it("queries the default site once logged in", async () => {
    mocks.api.post.mockResolvedValue({ data: { token: "t" } });
    mocks.api.get.mockResolvedValue({ data: user });
    const v = new Voltalis("u", "p");
    await v.login();
    v.getAppliances();
    expect(mocks.obs.get).toHaveBeenCalledWith("/api/site/site1/managed-appliance");
  });
});
