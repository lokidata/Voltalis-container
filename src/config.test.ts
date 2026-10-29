import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const VARS = ["VOLTALIS_USERNAME", "VOLTALIS_PASSWORD", "HA_URL", "HA_TOKEN"] as const;

describe("config", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv("VOLTALIS_USERNAME", "user");
    vi.stubEnv("VOLTALIS_PASSWORD", "pass");
    vi.stubEnv("HA_URL", "http://ha:8123");
    vi.stubEnv("HA_TOKEN", "tok");
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("reads the four variables", async () => {
    const { CONFIG } = await import("./config");
    expect(CONFIG).toEqual({
      username: "user",
      password: "pass",
      haUrl: "http://ha:8123",
      haToken: "tok",
    });
  });

  it.each(VARS)("exits with code 22 when %s is missing", async (name) => {
    vi.stubEnv(name, undefined as unknown as string);
    delete process.env[name];
    const exit = vi.spyOn(process, "exit").mockImplementation((() => {
      throw new Error("exit");
    }) as never);
    vi.spyOn(console, "log").mockImplementation(() => {});
    await expect(import("./config")).rejects.toThrow("exit");
    expect(exit).toHaveBeenCalledWith(22);
  });

  it("never prints secret values when exiting", async () => {
    delete process.env.HA_TOKEN;
    vi.spyOn(process, "exit").mockImplementation((() => {
      throw new Error("exit");
    }) as never);
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    await import("./config").catch(() => {});
    expect(JSON.stringify(log.mock.calls)).not.toContain("pass");
  });

  it("isProd follows NODE_ENV", async () => {
    vi.stubEnv("NODE_ENV", "production");
    expect((await import("./config")).isProd).toBe(true);
  });
});
