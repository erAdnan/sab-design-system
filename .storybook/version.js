/**
 * Storybook version label for web (and shared preview).
 *
 * Source of truth: package.json "version" (Release pipeline bumps this before
 * the web Hosting job runs, then tags vX.Y.Z to match).
 *
 * Optional overrides (CI / local):
 *   STORYBOOK_VERSION=0.0.2
 *   STORYBOOK_GIT_TAG=v0.0.2
 */
const pkg = require("../package.json");

function resolveVersion() {
  const fromEnv = (process.env.STORYBOOK_VERSION || "").trim();
  if (fromEnv) return fromEnv.replace(/^v/i, "");

  const tag = (process.env.STORYBOOK_GIT_TAG || "").trim();
  if (tag) return tag.replace(/^v/i, "");

  return String(pkg.version || "0.0.0");
}

const version = resolveVersion();
const versionLabel = `v${version}`;
const brandTitle = `SAB Design System ${versionLabel}`;

module.exports = {
  name: pkg.name,
  version,
  versionLabel,
  brandTitle,
};
