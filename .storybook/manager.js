import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";
import pkg from "../package.json";

/**
 * Web Storybook manager chrome only.
 * On-device Storybook (`.rnstorybook`) has its own UI and does not load this file.
 *
 * Theme + language live in the preview toolbar via `globalTypes` in preview.jsx.
 * Version is shown in the sidebar brand title and as a toolbar badge (globalTypes).
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
