import debug from "debug";
const log = debug("voltalis-bridge:config");


if (
  process.env.VOLTALIS_USERNAME === undefined ||
  process.env.VOLTALIS_PASSWORD === undefined ||
  process.env.HA_URL === undefined ||
  process.env.HA_TOKEN === undefined
) {
  console.log("Vous devez définir VOLTALIS_USERNAME, VOLTALIS_PASSWORD, HA_URL et HA_TOKEN dans les variables d'environnement.");
  process.exit(22);
}

export const CONFIG = {
  username: process.env.VOLTALIS_USERNAME,
  password: process.env.VOLTALIS_PASSWORD,
  haUrl: process.env.HA_URL,
  haToken: process.env.HA_TOKEN,
};

export const isProd = process.env.NODE_ENV === "production";
export const isDev = !isProd;

log(isProd ? "Running in production mode" : "Running in development mode");
