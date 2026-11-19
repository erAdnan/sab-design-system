import { addons } from "storybook/manager-api";

const { createSabTheme } = require("./createSabTheme");
const { version, versionLabel, brandTitle } = require("./version");

/**
 * Interactive component stories hidden from the sidebar (code + story files kept).
 * Matches `Components/<name>` or nested under a group (e.g. `Components/Banners/<name>`).
 * Docs under the same name stay visible when present.
 */
const HIDDEN_SIDEBAR_COMPONENTS = new Set([
  "BlockBill",
  "BlockInformation",
  "BlockBanner",
  "CardsAccountsCarousel",
  "CardsPreviewModule", // Preview module
  "BlockButton",
  "Dropdown",
  "ChipsInfo",
  "Cards Carousel",
  "CardsPortfolioCarousel",
  "Carousel Banner",
  "ChangeActionButton",
  "FloatingButton",
  "Tooltip",
  "ErrorStateIndicator",
  "BlockGeneric",
  "Widget",
]);

/** Leaf name for hide matching: Components/<name> or Components/<Group>/<name> */
const SIDEBAR_COMPONENT_GROUPS = new Set([
  "Banners",
  "Blocks",
  "Buttons",
  "Cards & Accounts & Finance",
  "Chips",
  "Dropdown",
  "Graphs",
  "Input Field",
  "List",
]);

const sidebarComponentLeaf = (parts) => {
  if (parts[0] !== "Components") return null;
  if (
    SIDEBAR_COMPONENT_GROUPS.has(parts[1]) &&
    parts[2] &&
    parts[2] !== "Docs"
  ) {
    return parts[2];
  }
  return parts[1] || null;
};

/** @returns {boolean} `true` = keep in sidebar */
const showSidebarItem = (item) => {
  const title = String(item?.title ?? "");
  const parts = title.split("/");
  const leaf = sidebarComponentLeaf(parts);
  if (!leaf || !HIDDEN_SIDEBAR_COMPONENTS.has(leaf)) {
    return true;
  }
  // Keep Figma docs pages (e.g. Components/Dropdown/Docs/… or Components/Banners/Docs/…)
  return parts.includes("Docs");
};

/**
 * Web Storybook manager chrome only.
 * On-device Storybook (`.rnstorybook`) has its own UI and does not load this file.
 *
 * Theme + language live in the preview toolbar via `globalTypes` in preview.jsx.
 * Sidebar brand: Pulse logo (Figma) + dynamic package version (matches Figma "v.2" slot).
 */
addons.setConfig({
  theme: createSabTheme(brandTitle),
  sidebar: {
    showRoots: true,
    collapsedRoots: [],
    filters: {
      hideListedComponents: showSidebarItem,
    },
  },
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
});

if (typeof document !== "undefined") {
  document.title = brandTitle;

  // Figma places version beside "DESIGN" in sab red. brandImage can't be dynamic, so
  // inject the live package version next to the Pulse lockup.
  const style = document.createElement("style");
  style.setAttribute("data-pulse-brand-version", versionLabel);
  style.textContent = `
    .sidebar-header a,
    [class*="sidebar-header"] a {
      display: inline-flex !important;
      align-items: flex-end !important;
      gap: 6px !important;
      text-decoration: none !important;
    }
    .sidebar-header a::after,
    [class*="sidebar-header"] a::after {
      content: "${versionLabel}";
      color: #db0011;
      font-family: "Helvetica Neue", Helvetica, Arial, "Segoe UI", system-ui, sans-serif;
      font-size: 11px;
      font-weight: 700;
      line-height: 1;
      letter-spacing: 0.01em;
      padding-bottom: 1px;
      white-space: nowrap;
    }
  `;
  document.head.appendChild(style);
}

console.info(`[Pulse Design System] Storybook ${versionLabel} (${version})`);
