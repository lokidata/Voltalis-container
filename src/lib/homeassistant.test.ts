import axios from "axios";
import { afterEach, describe, expect, it, vi } from "vitest";
import { HomeAssistant } from "./homeassistant";

vi.mock("../config", () => ({ isProd: false, isDev: true }));

describe("HomeAssistant", () => {
  afterEach(() => vi.restoreAllMocks());

  it.each([
    ["http://ha:8123", "http://ha:8123/api"],
    ["http://ha:8123/", "http://ha:8123/api"],
    ["http://ha:8123///", "http://ha:8123/api"],
    ["http://ha:8123/api", "http://ha:8123/api"],
  ])("normalises %s to %s", (input, expected) => {
    const create = vi.spyOn(axios, "create");
    new HomeAssistant(input, "tok");
    expect(create.mock.calls[0]![0]).toMatchObject({
      baseURL: expected,
      headers: { Authorization: "Bearer tok" },
    });
  });

  it("registers sensors by name", () => {
    const ha = new HomeAssistant("http://ha", "tok");
    const s = ha.registerSensor("voltalis_x", { icon: "mdi:x" });
    expect(ha.sensors.voltalis_x).toBe(s);
  });
});
