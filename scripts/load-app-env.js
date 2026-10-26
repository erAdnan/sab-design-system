/**
 * Load the active app env file into process.env.
 *
 * Resolution order:
 *   1. ENVFILE (Fastlane / CI, e.g. .env.demo)
 *   2. .env (local Metro / debug)
 */
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

const ROOT = path.resolve(__dirname, "..");

function resolveEnvPath() {
  const fromEnv = process.env.ENVFILE;
  if (fromEnv) {
    const absolute = path.isAbsolute(fromEnv)
      ? fromEnv
      : path.resolve(ROOT, fromEnv);
    if (fs.existsSync(absolute)) {
      return absolute;
    }
  }

  const local = path.resolve(ROOT, ".env");
  return fs.existsSync(local) ? local : null;
}

const envPath = resolveEnvPath();
if (envPath) {
  dotenv.config({ path: envPath });
}

module.exports = { envPath, ROOT };
