import fc from "fast-check";
import { describe, it } from "vitest";
import { isConsumptionAppliance } from "./appliances";

describe("isConsumptionAppliance (property-based)", () => {
  it("accepts only HEATER and WATER_HEATER and never throws", () => {
    fc.assert(
      fc.property(fc.string(), (type) => {
        const expected = type === "HEATER" || type === "WATER_HEATER";
        return isConsumptionAppliance(type) === expected;
      }),
    );
  });
});
