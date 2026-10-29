const CONSUMPTION_APPLIANCE_TYPES = ["HEATER", "WATER_HEATER"];

export const isConsumptionAppliance = (applianceType: string) =>
  CONSUMPTION_APPLIANCE_TYPES.includes(applianceType);
