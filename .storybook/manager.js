import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming";
import pkg from "../package.json";

/**
 * Sidebar brand shows the package version this Storybook build was made from.
 * Matches package.json (Release bumps it before Hosting deploy, then tags vX.Y.Z).
 */
const fromEnv = (typeof process !== "undefined" && process.env.STORYBOOK_VERSION) || "";
const version = (fromEnv || pkg.version || "0.0.0").toString().replace(/^v/i, "");
const versionLabel = `v${version}`;
const brandTitle = `SAB Design System ${versionLabel}`;

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle,
    brandUrl: "./",
    brandTarget: "_self",
  }),
  sidebar: {
    showRoots: true,
  },
});

if (typeof document !== "undefined") {
  document.title = brandTitle;
}

console.info(`[SAB Design System] Storybook ${versionLabel}`);
