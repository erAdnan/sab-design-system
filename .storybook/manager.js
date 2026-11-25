import { addons } from "storybook/manager-api";

const { createSabTheme } = require("./createSabTheme");
const { version, versionLabel, brandTitle } = require("./version");

/**
 * Interactive component stories hidden from the sidebar (code + story files kept).
 * Matches leaf names under Components (any section/group nesting).
 * Docs under the same name stay visible when present.
 */
const HIDDEN_SIDEBAR_COMPONENTS = new Set([
  "BlockBill",
  "BlockInformation",
  "BlockBanner",
  "CardsAccountsCarousel",
  "CardsPreviewModule", // Preview module
  "BlockButton",
  "ChipsInfo",
  "Cards Carousel",
  "CardsPortfolioCarousel",
  "Carousel Banner",
  "ChangeActionButton",
  "FloatingButton",
  "FilterTag",
  "Icon Components",
  "Tooltip",
  "ErrorStateIndicator",
  "BlockGeneric",
  "SkeletonBox",
]);

/** Top-level Components sections from the design-system IA. */
const COMPONENT_SECTIONS = new Set([
  "Layout",
  "Navigation",
  "Data Entry",
  "Data Display",
]);

/**
 * Nested groups under a section (e.g. Components/Data Display/Banners/…).
 * Leaf hide matching uses the name after the group.
 */
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
  "Notifications",
  "Range",
  "Text",
  "Widgets",
]);

/**
 * Leaf name for hide matching under:
 * - Components/<Section>/<name>
 * - Components/<Section>/<Group>/<name>
 */
const sidebarComponentLeaf = (parts) => {
  if (parts[0] !== "Components") return null;

  let idx = 1;
  if (COMPONENT_SECTIONS.has(parts[1])) {
    idx = 2;
  }

  const groupOrLeaf = parts[idx];
  if (!groupOrLeaf || groupOrLeaf === "Docs") return null;

  if (
    SIDEBAR_COMPONENT_GROUPS.has(groupOrLeaf) &&
    parts[idx + 1] &&
    parts[idx + 1] !== "Docs"
  ) {
    return parts[idx + 1];
  }

  return groupOrLeaf;
};

/** @returns {boolean} `true` = keep in sidebar */
const showSidebarItem = (item) => {
  const title = String(item?.title ?? "");
  const parts = title.split("/");
  const leaf = sidebarComponentLeaf(parts);
  if (!leaf || !HIDDEN_SIDEBAR_COMPONENTS.has(leaf)) {
    return true;
  }
  // Keep Figma docs pages (e.g. Components/…/Docs/…)
  return parts.includes("Docs");
};

/** Display labels for sidebar roots (internal story titles stay unchanged). */
const SIDEBAR_ROOT_LABELS = {
  "Pulse Design System": "━━━  🫀 Pulse Design System 🫀 ━━━━",
  Foundations: "━━━ 🛠️ Foundations 🛠️ ━━━",
  Components: "━━━ 🧩 All Components List  🧩 ━━━",
};

/** Group/item labels where CSF title uses a non-ASCII slash to avoid nesting. */
const SIDEBAR_ITEM_LABELS = {
  "Governance ／ Operating Model": "Governance / Operating Model",
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
    renderLabel: (item) => {
      if (item?.type === "root" && SIDEBAR_ROOT_LABELS[item.name]) {
        return SIDEBAR_ROOT_LABELS[item.name];
      }
      if (item?.name && SIDEBAR_ITEM_LABELS[item.name]) {
        return SIDEBAR_ITEM_LABELS[item.name];
      }
      return item?.name;
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
