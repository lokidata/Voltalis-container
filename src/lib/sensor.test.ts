import type { AxiosInstance } from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";

const cfg = vi.hoisted(() => ({ isProd: false }));
vi.mock("../config", () => ({
  get isProd() {
    return cfg.isProd;
  },
}));

import { Sensor } from "./sensor";

const makeApi = () => ({ get: vi.fn(), post: vi.fn() });
const asAxios = (a: ReturnType<typeof makeApi>) => a as unknown as AxiosInstance;

describe("Sensor", () => {
  beforeEach(() => {
    cfg.isProd = false;
  });

  it("dev mode keeps state in memory and never calls Home Assistant", () => {
    const api = makeApi();
    const s = new Sensor("voltalis_a", { icon: "i" }, asAxios(api));
    s.update({ state: 5 });
    expect(s.getState()).toMatchObject({ state: 5 });
    expect(api.post).not.toHaveBeenCalled();
    expect(api.get).not.toHaveBeenCalled();
  });

  it("merges attributes with unique_id, payload attributes win", () => {
    const s = new Sensor("voltalis_a", { icon: "i", a: 1 }, asAxios(makeApi()));
    s.update({ state: 1, attributes: { a: 2 } });
    expect(s.state).toMatchObject({
      attributes: { unique_id: "voltalis_a", icon: "i", a: 2 },
    });
  });

  it("prod mode POSTs to states/sensor.<name>", async () => {
    cfg.isProd = true;
    const api = makeApi();
    api.post.mockResolvedValue({ data: { ok: true } });
    const s = new Sensor("voltalis_a", {}, asAxios(api));
    await s.update({ state: 7 });
    expect(api.post).toHaveBeenCalledWith(
      "states/sensor.voltalis_a",
      expect.objectContaining({ state: 7 }),
    );
    expect(s.state).toEqual({ ok: true });
  });

  it("prod mode swallows HA errors instead of crashing the poller", async () => {
    cfg.isProd = true;
    const api = makeApi();
    api.post.mockRejectedValue(new Error("boom"));
    const s = new Sensor("voltalis_a", {}, asAxios(api));
    await expect(s.update({ state: 1 })).resolves.toBeInstanceOf(Error);
  });
});
