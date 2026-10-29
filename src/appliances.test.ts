import { describe, expect, it } from "vitest";
import { isConsumptionAppliance } from "./appliances";

describe("isConsumptionAppliance", () => {
  it.each(["HEATER", "WATER_HEATER"])("accepts %s", (type) => {
    expect(isConsumptionAppliance(type)).toBe(true);
  });

  it.each(["", "heater", "OTHER", "UNKNOWN"])("rejects %j", (type) => {
    expect(isConsumptionAppliance(type)).toBe(false);
  });
});
