import "react-native-gesture-handler";
import "react-native-reanimated";

import { useEffect } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { I18nextProvider } from "react-i18next";
import { ThemeProvider, useTheme } from "../src/context/theme/themeContext.tsx";
import { StoryBookWrapper } from "../src/components/local/StoryBookWrapper.tsx";
import i18n from "../src/localization/i18n";
import { deepTranslateArgs } from "../src/localization/tx";
import { versionLabel } from "./version";
import { createSabTheme } from "./createSabTheme";
import { withStorySourcePanel } from "./storySourceDecorator";
import { FoundationsDocsContainer } from "./FoundationsDocsContainer";

/**
 * Web Storybook only (.storybook). On-device Storybook uses `.rnstorybook`
 * and does not load this preview / manager toolbar.
 */
/**
 * Docs (autodocs, CSF …/Docs/… pages, story id ending in --docs) always stay
 * light — Dark Mode is for component canvases only.
 */
function isDocsContext(context) {
  const title = String(context?.title ?? context?.kind ?? "");
  const name = String(context?.name ?? "");
  const id = String(context?.id ?? "").toLowerCase();
  const viewMode = String(context?.viewMode ?? "");
  if (viewMode === "docs") return true;
  if (title.includes("/Docs/") || /\/Docs$/i.test(title)) return true;
  if (/^docs$/i.test(name)) return true;
  if (id.endsWith("--docs") || id.includes("-docs--")) return true;
  if (typeof window !== "undefined") {
    const href = String(window.location?.href ?? "");
    if (/[?&]viewMode=docs(?:&|$)/.test(href)) return true;
    if (/\/docs\//.test(href) || /path=\/docs\//.test(href)) return true;
  }
  return false;
}

function ThemeFromGlobals({ themeKey, children }) {
  const { setAppTheme, isDarkTheme } = useTheme();

  useEffect(() => {
    const next = themeKey === "dark" ? "dark" : "light";
    if ((next === "dark") !== isDarkTheme) {
      setAppTheme(next);
    }
    // Only react to toolbar theme changes; isDarkTheme is read for the guard.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeKey, setAppTheme]);

  // Keep the iframe page chrome in sync with Dark Mode (preview-head defaults
  // to white). Without this, gaps around the RN tree stay white while
  // components use light-on-dark colors. Docs pages never get the dark chrome.
  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    const dark = themeKey === "dark";
    const bg = dark ? "#000000" : "";
    const fg = dark ? "#FFFFFF" : "";
    const prevBody = document.body.style.backgroundColor;
    const prevHtml = document.documentElement.style.backgroundColor;
    const prevColor = document.body.style.color;
    document.body.style.backgroundColor = bg;
    document.documentElement.style.backgroundColor = bg;
    if (dark) document.body.style.color = fg;
    else document.body.style.color = prevColor;
    return () => {
      document.body.style.backgroundColor = prevBody;
      document.documentElement.style.backgroundColor = prevHtml;
      document.body.style.color = prevColor;
    };
  }, [themeKey]);

  return children;
}

/** @type{import("@storybook/react-webpack5").Preview} */
const preview = {
  // Auto-generate a Docs page for every component (CSF `autodocs`).
  tags: ["autodocs"],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    // Auto-wire Actions panel for callback props (on*, handle*). Prefer explicit
    // `fn()` from storybook/test in stories so play() can assert on the same spies.
    actions: {
      argTypesRegex: "^(on|handle)[A-Z].*",
    },
    deepControls: { enabled: true },
    options: {
      // Must stay inline and self-contained (Storybook statically analyses it; no outer references).
      // Sidebar order: Pulse Design System, Components (incl. Mobile Native), Foundations.
      // Inside each component the "All variants" story comes first, so opening a component lands on it
      // (Storybook selects the first story of a component). Remaining stories stay alphabetical.
      storySort: (a, b) => {
        if (a.id === b.id) return 0;
        const top = [
          "Pulse Design System",
          "Components",
          "Foundations",
        ];
        const pulsePages = [
          "Pulse Design Ecosystem",
          "Rules & Patterns",
          "Guidelines",
          "Journey",
          "Governance ／ Operating Model",
        ];
        const rulesPages = [
          "Documentation",
          "Levels of Navigation",
          "Stories",
          "Transmission Rules",
          "Marketing & Engagement",
          "Rating & Feedback",
          "Rating & Feedback Variants",
          "Card Related Alerts & Actions",
          "Government Service Promotion",
          "Bottom sheet",
          "Bottom sheet - Button group Rules",
        ];
        const patternPages = [
          "Prelogin screens",
          "Postlogin screens",
          "Login screens",
          "Sub Hubs",
          "Authentication",
          "Status Screen - End of process",
          "Virtual Card",
          "Product info",
          "Product page",
        ];
        const guidelinesPages = [
          "Terminology",
          "Spacing",
          "Colours",
          "Font Size",
          "Spacing — English & Arabic",
          "Padding",
          "Border Radius",
          "Icon Sizes",
          "Layout",
          "Basic Screen Construction",
        ];
        const governancePages = [
          "Operating Model",
          "Governance Model - DS Communication channel",
          "Changelog",
        ];
        // Components/Text/Docs — Figma Text canvas 8:3574 left → right
        const textDocsPages = [
          "Title Actions",
          "Text Headline",
          "Body Text",
        ];
        // Components/Buttons/Docs — Figma Buttons canvas 7:189 left → right
        const buttonDocsPages = [
          "Standalone Button",
          "Link Button",
          "Link Icons",
          "Button Group",
          "Button Group Review",
          "Bottom sheet - Button group Rules",
          "Button List Item",
          "Quick Action",
          "New Hubs Button List Item",
          "Segmented Button",
        ];
        // Components/Header/Docs — Figma Header canvas 8:2922 left → right
        const headerDocsPages = [
          "Header",
          "Supporting Actions",
          "Level 1 Add-on",
          "Pre-login Add-on",
          "Segment Add-on",
          "Global Search",
          "Levels of Navigation",
        ];
        // Components/List/Docs — Figma List canvas 257:2186 left → right
        const listDocsPages = [
          "List",
          "List — Usage guide",
          "List — Combinations",
          "List — Option catalogue",
          "List New — Usage guide",
        ];
        // Components/Stepper/Docs — Figma Stepper canvas 13:3737 left → right
        const stepperDocsPages = ["Stepper"];
        // Components/NavigationDots/Docs — Figma Navigation Dots canvas 7279:49903
        const navigationDotsDocsPages = ["Navigation Dots"];
        // Components/Bottom Navigation/Docs — Figma Bottom Navigation canvas 7:237
        const bottomNavigationDocsPages = [
          "Bottom Navigation",
          "Bottom navigation / 03 · iOS guidelines",
          "Bottom navigation / 04 · Android guidelines",
        ];
        // Components/Input Field/Docs — Figma Input Field canvas 8:2669 left → right
        const inputFieldDocsPages = [
          "Input Field",
          "Text Field Documentation",
          "Dropdown Documentation",
          "Date Documentation",
          "Password Documentation",
          "Amount Documentation",
          "Account Documentation",
          "Text Area Documentation",
          "Phone Number Documentation",
          "Search Documentation",
          "Pin Input Documentation",
          "Message Input Documentation",
          "amount.entryText Documentation",
        ];
        // Components/Checkbox/Docs — Figma Check Box canvas 8:3476
        const checkboxDocsPages = ["Check Box"];
        // Components/Radio Button/Docs — Figma Radio Button canvas 8:3487
        const radioButtonDocsPages = ["Radio Button"];
        // Components/Toggle/Docs — Figma Toggle canvas 8:3497
        const toggleDocsPages = ["Toggle"];
        // Components/Accordion/Docs — Figma Accordion canvas 103:637
        const accordionDocsPages = ["Accordion"];
        // Components/Dropdown/Docs — Figma Dropdown canvas 2096:12300
        const dropdownDocsPages = ["Dropdown- Home Page"];
        // Components/Avatar/Docs — Figma Avatar canvas 87:532 left → right
        const avatarDocsPages = [
          "Avatar — Documentation",
          "User profile — Documentation",
        ];
        // Components/Badge/Docs — Figma Badge canvas 215:1827
        const badgeDocsPages = ["Badge"];
        // Components/Chips/Docs — Figma Chips canvas 146:2195 left → right
        const chipsDocsPages = [
          "Chips->Filter — Documentation",
          "Chips → Info — Documentation",
          "Chips → New — Documentation",
          "Tags/Chips",
          "Chips Select",
        ];
        // Components/ProgressIndicator/Docs — Figma Progress Indicator canvas 82:1799 left → right
        const progressIndicatorDocsPages = [
          "Progress Indicator_Linear - Documentation",
          "Progress Indicator_Circular  - Documentation",
          "Exchange rate indicator  - Documentation",
        ];
        // Components/Tracker/Docs — Figma Tracker canvas 4391:37792
        const trackerDocsPages = ["Tracker"];
        // Components/Graphs/Docs — Figma Graphs canvas 11572:15448 left → right
        const graphDocsPages = [
          "Line Graph",
          "Circle Graph",
          "Bar Graph",
          "Semi-circle Graph",
        ];
        // Components/PasswordStrength/Docs — Figma Password Strength canvas 8:3445 left → right
        const passwordStrengthDocsPages = ["Password Strength", "PIN"];
        // Components/Notifications/Docs — Figma Notifications canvas 11:3655 left → right
        const notificationsDocsPages = [
          "Snackbar",
          "Clipboard Toast",
          "Disclaimer",
          "Notification",
        ];
        // Components/EmptyState/Docs — Figma Empty State Note canvas 36:576
        const emptyStateDocsPages = ["Empty State"];
        // Components/Story/Docs — Figma Story canvas 2253:2450
        const storyDocsPages = ["Story"];
        // Components/ProductsCards/Docs — Figma Products card canvas 2379:30802 left → right
        const productsCardsDocsPages = [
          "Image Thumbnail",
          "Product Card",
          "Category Card",
          "Product Card/Summary",
          "Selection Card",
          "Voucher Card",
          "Voucher Receipt",
          "Learning Product Cards",
        ];
        // Components/Widgets/Docs — Figma Pulse Design System Widgets canvas 2148:2 left → right
        const widgetsDocsPages = ["Widget", "Tile List Widget"];
        // Components/PersonalFinanceWidgets/Docs — Figma Personal Finance Widgets canvas 2702:8148 left → right
        const personalFinanceWidgetsDocsPages = [
          "Tag Widget",
          "Category List Widget",
          "Budget Card Widget",
          "Content Cards Widget",
        ];
        // Components/Calendar/Docs — Figma Calendar canvas 14209:10136
        const calendarDocsPages = ["Calendar"];
        // Components/ThemeSelector/Docs — Figma Theme selector canvas 15234:56750
        const themeSelectorDocsPages = ["Theme selector"];
        // Components/Bottomsheet/Docs — Figma Bottomsheet canvas 17468:13574 left → right
        const bottomsheetDocsPages = [
          "Bottomsheet - drawer",
          "Bottom sheet - Button group Rules",
          "Bottom sheet Basic Rules",
        ];
        // Components/Mobile Native Components/Docs — Figma canvas 755:4645
        const mobileNativeComponentsDocsPages = ["Native Components"];
        // Components/Range/Docs — Figma Range canvas 2379:34719
        const rangeDocsPages = ["Range"];
        // Components/Upload/Docs — Figma Upload canvas 4120:21000
        const uploaderDocsPages = ["Upload"];
        // Components/Cards & Accounts & Finance/Docs — Figma canvas 227:2376
        const creditAccountFinanceDocsPages = [
          "Credit Card",
          "Debit Card",
          "Card.view.all",
          "Balance Module",
          "Finance",
          "Accounts",
          "accounts.view",
        ];
        // Components/Tabs/Docs — Figma Tabs canvas 8:3521
        const tabsDocsPages = ["Tabs"];
        // Components/Banners/Docs — Figma Banners canvas 1314:9025 left → right
        const bannersDocsPages = [
          "Marketing Banner",
          "Promotional Banner — Documentation",
          "Entry Banner — Documentation",
        ];
        // Components/Blocks/Docs — Figma Blocks canvas 2243:10445 left → right
        const blocksDocsPages = [
          "new_block.generic Documentation",
          "New_block.product-complex Documentation",
          "block.features Documentation",
          "Block.Article Documentation",
          "block.product-selection Documentation",
          "block.accounts Documentation",
          "block.button Documentation",
          "Block.Entry Documentation",
          "block.offers Documentation",
          "block.apply Documentation",
          "block.beneficiary Documentation",
        ];
        const rank = (title) => {
          const i = top.indexOf(String(title).split("/")[0]);
          return i === -1 ? top.length : i;
        };
        const rankDiff = rank(a.title) - rank(b.title);
        if (rankDiff !== 0) return rankDiff;
        if (a.title !== b.title) {
          const aRoot = String(a.title).split("/")[0];
          if (aRoot === "Pulse Design System") {
            const parts = (title) => String(title).split("/");
            const pageRank = (title) => {
              const page = parts(title)[1] || "";
              const i = pulsePages.indexOf(page);
              return i === -1 ? pulsePages.length : i;
            };
            const pageDiff = pageRank(a.title) - pageRank(b.title);
            if (pageDiff !== 0) return pageDiff;
            // Rules before Patterns under Rules & Patterns
            if (parts(a.title)[1] === "Rules & Patterns") {
              const folderOrder = ["Rules", "Patterns"];
              const folderRank = (title) => {
                const folder = parts(title)[2] || "";
                const i = folderOrder.indexOf(folder);
                return i === -1 ? folderOrder.length : i;
              };
              const folderDiff = folderRank(a.title) - folderRank(b.title);
              if (folderDiff !== 0) return folderDiff;
              const leafOrder =
                parts(a.title)[2] === "Patterns" ? patternPages : rulesPages;
              const leafRank = (title) => {
                const leaf = parts(title)[3] || "";
                const i = leafOrder.indexOf(leaf);
                return i === -1 ? leafOrder.length : i;
              };
              const leafDiff = leafRank(a.title) - leafRank(b.title);
              if (leafDiff !== 0) return leafDiff;
            }
            // Guidelines topic order (Figma left → right)
            if (parts(a.title)[1] === "Guidelines") {
              const leafRank = (title) => {
                const leaf = parts(title)[2] || "";
                const i = guidelinesPages.indexOf(leaf);
                return i === -1 ? guidelinesPages.length : i;
              };
              const leafDiff = leafRank(a.title) - leafRank(b.title);
              if (leafDiff !== 0) return leafDiff;
            }
            // Governance／Operating Model topic order
            if (parts(a.title)[1] === "Governance ／ Operating Model") {
              const leafRank = (title) => {
                const leaf = parts(title)[2] || "";
                const i = governancePages.indexOf(leaf);
                return i === -1 ? governancePages.length : i;
              };
              const leafDiff = leafRank(a.title) - leafRank(b.title);
              if (leafDiff !== 0) return leafDiff;
            }
          }

          // Components section order (Layout → Navigation → Data Entry → Data Display)
          const componentSections = [
            "Layout",
            "Navigation",
            "Data Entry",
            "Data Display",
          ];
          const componentSectionsSet = new Set(componentSections);
          /** Strip Layout/Navigation/Data Entry/Data Display for legacy docs sort paths. */
          const componentsParts = (title) => {
            const p = String(title).split("/");
            if (p[0] === "Components" && componentSectionsSet.has(p[1])) {
              return ["Components", ...p.slice(2)];
            }
            return p;
          };
          if (aRoot === "Components") {
            const layoutChildren = ["Text", "Divider"];
            const navigationChildren = [
              "Buttons",
              "Header",
              "List",
              "Stepper",
              "NavigationDots",
              "Bottom Navigation",
            ];
            const dataEntryChildren = [
              "Input Field",
              "Checkbox",
              "Radio Button",
              "Toggle",
              "Range",
              "Upload",
            ];
            const sectionRank = (title) => {
              const s = String(title).split("/")[1] || "";
              const i = componentSections.indexOf(s);
              return i === -1 ? componentSections.length : i;
            };
            const sectionDiff = sectionRank(a.title) - sectionRank(b.title);
            if (sectionDiff !== 0) return sectionDiff;
            const section = String(a.title).split("/")[1];
            const childOrder =
              section === "Layout"
                ? layoutChildren
                : section === "Navigation"
                  ? navigationChildren
                  : section === "Data Entry"
                    ? dataEntryChildren
                    : null;
            if (childOrder) {
              const childRank = (title) => {
                const c = String(title).split("/")[2] || "";
                const i = childOrder.indexOf(c);
                return i === -1 ? childOrder.length : i;
              };
              const childDiff = childRank(a.title) - childRank(b.title);
              if (childDiff !== 0) return childDiff;
            }
          }

          // Components/Text/Docs topic order (Figma left → right)
          {
            const parts = componentsParts;
            if (
              parts(a.title)[0] === "Components" &&
              parts(a.title)[1] === "Text" &&
              parts(a.title)[2] === "Docs" &&
              parts(b.title)[0] === "Components" &&
              parts(b.title)[1] === "Text" &&
              parts(b.title)[2] === "Docs"
            ) {
              const leafRank = (title) => {
                const leaf = parts(title)[3] || "";
                const i = textDocsPages.indexOf(leaf);
                return i === -1 ? textDocsPages.length : i;
              };
              const leafDiff = leafRank(a.title) - leafRank(b.title);
              if (leafDiff !== 0) return leafDiff;
            }
          }
          // Components/Buttons/Docs topic order (Figma left → right)
          {
            const parts = componentsParts;
            if (
              parts(a.title)[0] === "Components" &&
              parts(a.title)[1] === "Buttons" &&
              parts(a.title)[2] === "Docs" &&
              parts(b.title)[0] === "Components" &&
              parts(b.title)[1] === "Buttons" &&
              parts(b.title)[2] === "Docs"
            ) {
              const leafRank = (title) => {
                const leaf = parts(title)[3] || "";
                const i = buttonDocsPages.indexOf(leaf);
                return i === -1 ? buttonDocsPages.length : i;
              };
              const leafDiff = leafRank(a.title) - leafRank(b.title);
              if (leafDiff !== 0) return leafDiff;
            }
          }
          // Components/Header/Docs topic order (Figma left → right)
          {
            const parts = componentsParts;
            if (
              parts(a.title)[0] === "Components" &&
              parts(a.title)[1] === "Header" &&
              parts(a.title)[2] === "Docs" &&
              parts(b.title)[0] === "Components" &&
              parts(b.title)[1] === "Header" &&
              parts(b.title)[2] === "Docs"
            ) {
              const leafRank = (title) => {
                const leaf = parts(title)[3] || "";
                const i = headerDocsPages.indexOf(leaf);
                return i === -1 ? headerDocsPages.length : i;
              };
              const leafDiff = leafRank(a.title) - leafRank(b.title);
              if (leafDiff !== 0) return leafDiff;
            }
          }
          // Components/List/Docs topic order (Figma left → right)
          {
            const parts = componentsParts;
            if (
              parts(a.title)[0] === "Components" &&
              parts(a.title)[1] === "List" &&
              parts(a.title)[2] === "Docs" &&
              parts(b.title)[0] === "Components" &&
              parts(b.title)[1] === "List" &&
              parts(b.title)[2] === "Docs"
            ) {
              const leafRank = (title) => {
                const leaf = parts(title)[3] || "";
                const i = listDocsPages.indexOf(leaf);
                return i === -1 ? listDocsPages.length : i;
              };
              const leafDiff = leafRank(a.title) - leafRank(b.title);
              if (leafDiff !== 0) return leafDiff;
            }
          }
          // Components/Stepper/Docs topic order (Figma left → right)
          {
            const parts = componentsParts;
            if (
              parts(a.title)[0] === "Components" &&
              parts(a.title)[1] === "Stepper" &&
              parts(a.title)[2] === "Docs" &&
              parts(b.title)[0] === "Components" &&
              parts(b.title)[1] === "Stepper" &&
              parts(b.title)[2] === "Docs"
            ) {
              const leafRank = (title) => {
                const leaf = parts(title)[3] || "";
                const i = stepperDocsPages.indexOf(leaf);
                return i === -1 ? stepperDocsPages.length : i;
              };
              const leafDiff = leafRank(a.title) - leafRank(b.title);
              if (leafDiff !== 0) return leafDiff;
            }
          }
          // Components/NavigationDots/Docs topic order (Figma left → right)
          {
            const parts = componentsParts;
            if (
              parts(a.title)[0] === "Components" &&
              parts(a.title)[1] === "NavigationDots" &&
              parts(a.title)[2] === "Docs" &&
              parts(b.title)[0] === "Components" &&
              parts(b.title)[1] === "NavigationDots" &&
              parts(b.title)[2] === "Docs"
            ) {
              const leafRank = (title) => {
                const leaf = parts(title)[3] || "";
                const i = navigationDotsDocsPages.indexOf(leaf);
                return i === -1 ? navigationDotsDocsPages.length : i;
              };
              const leafDiff = leafRank(a.title) - leafRank(b.title);
              if (leafDiff !== 0) return leafDiff;
            }
          }
          // Components/Bottom Navigation/Docs topic order (Figma left → right)
          // Titles may contain "/" (e.g. iOS guidelines); match by prefix, rank by full leaf after Docs/
          {
            const aTitle = String(a.title);
            const bTitle = String(b.title);
            const bnPrefix = "Components/Bottom Navigation/Docs/";
            if (aTitle.startsWith(bnPrefix) && bTitle.startsWith(bnPrefix)) {
              const leafRank = (title) => {
                const leaf = title.slice(bnPrefix.length);
                const i = bottomNavigationDocsPages.indexOf(leaf);
                return i === -1 ? bottomNavigationDocsPages.length : i;
              };
              const leafDiff = leafRank(aTitle) - leafRank(bTitle);
              if (leafDiff !== 0) return leafDiff;
            }
          }
          // Components/Input Field/Docs topic order (Figma left → right)
          {
            const parts = componentsParts;
            if (
              parts(a.title)[0] === "Components" &&
              parts(a.title)[1] === "Input Field" &&
              parts(a.title)[2] === "Docs" &&
              parts(b.title)[0] === "Components" &&
              parts(b.title)[1] === "Input Field" &&
              parts(b.title)[2] === "Docs"
            ) {
              const leafRank = (title) => {
                const leaf = parts(title)[3] || "";
                const i = inputFieldDocsPages.indexOf(leaf);
                return i === -1 ? inputFieldDocsPages.length : i;
              };
              const leafDiff = leafRank(a.title) - leafRank(b.title);
              if (leafDiff !== 0) return leafDiff;
            }
          }
          // Components/Checkbox/Docs topic order (Figma left → right)
          {
            const parts = componentsParts;
            if (
              parts(a.title)[0] === "Components" &&
              parts(a.title)[1] === "Checkbox" &&
              parts(a.title)[2] === "Docs" &&
              parts(b.title)[0] === "Components" &&
              parts(b.title)[1] === "Checkbox" &&
              parts(b.title)[2] === "Docs"
            ) {
              const leafRank = (title) => {
                const leaf = parts(title)[3] || "";
                const i = checkboxDocsPages.indexOf(leaf);
                return i === -1 ? checkboxDocsPages.length : i;
              };
              const leafDiff = leafRank(a.title) - leafRank(b.title);
              if (leafDiff !== 0) return leafDiff;
            }
          }
          // Components/Radio Button/Docs topic order (Figma left → right)
          {
            const aTitle = String(a.title);
            const bTitle = String(b.title);
            const rbPrefix = "Components/Data Entry/Radio Button/Docs/";
            if (aTitle.startsWith(rbPrefix) && bTitle.startsWith(rbPrefix)) {
              const leafRank = (title) => {
                const leaf = title.slice(rbPrefix.length);
                const i = radioButtonDocsPages.indexOf(leaf);
                return i === -1 ? radioButtonDocsPages.length : i;
              };
              const leafDiff = leafRank(aTitle) - leafRank(bTitle);
              if (leafDiff !== 0) return leafDiff;
            }
          }
          // Components/Toggle/Docs topic order (Figma left → right)
          {
            const parts = componentsParts;
            if (
              parts(a.title)[0] === "Components" &&
              parts(a.title)[1] === "Toggle" &&
              parts(a.title)[2] === "Docs" &&
              parts(b.title)[0] === "Components" &&
              parts(b.title)[1] === "Toggle" &&
              parts(b.title)[2] === "Docs"
            ) {
              const leafRank = (title) => {
                const leaf = parts(title)[3] || "";
                const i = toggleDocsPages.indexOf(leaf);
                return i === -1 ? toggleDocsPages.length : i;
              };
              const leafDiff = leafRank(a.title) - leafRank(b.title);
              if (leafDiff !== 0) return leafDiff;
            }
          }
          // Components/Accordion/Docs topic order (Figma left → right)
          {
            const parts = componentsParts;
            if (
              parts(a.title)[0] === "Components" &&
              parts(a.title)[1] === "Accordion" &&
              parts(a.title)[2] === "Docs" &&
              parts(b.title)[0] === "Components" &&
              parts(b.title)[1] === "Accordion" &&
              parts(b.title)[2] === "Docs"
            ) {
              const leafRank = (title) => {
                const leaf = parts(title)[3] || "";
                const i = accordionDocsPages.indexOf(leaf);
                return i === -1 ? accordionDocsPages.length : i;
              };
              const leafDiff = leafRank(a.title) - leafRank(b.title);
              if (leafDiff !== 0) return leafDiff;
            }
          }
          // Components/Dropdown/Docs topic order (Figma left → right)
          {
            const parts = componentsParts;
            if (
              parts(a.title)[0] === "Components" &&
              parts(a.title)[1] === "Dropdown" &&
              parts(a.title)[2] === "Docs" &&
              parts(b.title)[0] === "Components" &&
              parts(b.title)[1] === "Dropdown" &&
              parts(b.title)[2] === "Docs"
            ) {
              const leafRank = (title) => {
                const leaf = parts(title)[3] || "";
                const i = dropdownDocsPages.indexOf(leaf);
                return i === -1 ? dropdownDocsPages.length : i;
              };
              const leafDiff = leafRank(a.title) - leafRank(b.title);
              if (leafDiff !== 0) return leafDiff;
            }
          }
          // Components/Avatar/Docs topic order (Figma left → right)
          {
            const parts = componentsParts;
            if (
              parts(a.title)[0] === "Components" &&
              parts(a.title)[1] === "Avatar" &&
              parts(a.title)[2] === "Docs" &&
              parts(b.title)[0] === "Components" &&
              parts(b.title)[1] === "Avatar" &&
              parts(b.title)[2] === "Docs"
            ) {
              const leafRank = (title) => {
                const leaf = parts(title)[3] || "";
                const i = avatarDocsPages.indexOf(leaf);
                return i === -1 ? avatarDocsPages.length : i;
              };
              const leafDiff = leafRank(a.title) - leafRank(b.title);
              if (leafDiff !== 0) return leafDiff;
            }
          }
          // Components/Badge/Docs topic order (Figma left → right)
          {
            const parts = componentsParts;
            if (
              parts(a.title)[0] === "Components" &&
              parts(a.title)[1] === "Badge" &&
              parts(a.title)[2] === "Docs" &&
              parts(b.title)[0] === "Components" &&
              parts(b.title)[1] === "Badge" &&
              parts(b.title)[2] === "Docs"
            ) {
              const leafRank = (title) => {
                const leaf = parts(title)[3] || "";
                const i = badgeDocsPages.indexOf(leaf);
                return i === -1 ? badgeDocsPages.length : i;
              };
              const leafDiff = leafRank(a.title) - leafRank(b.title);
              if (leafDiff !== 0) return leafDiff;
            }
          }
          // Components/Chips/Docs topic order (Figma left → right)
          {
            const parts = componentsParts;
            if (
              parts(a.title)[0] === "Components" &&
              parts(a.title)[1] === "Chips" &&
              parts(a.title)[2] === "Docs" &&
              parts(b.title)[0] === "Components" &&
              parts(b.title)[1] === "Chips" &&
              parts(b.title)[2] === "Docs"
            ) {
              const leafRank = (title) => {
                const leaf = parts(title).slice(3).join("/") || "";
                const i = chipsDocsPages.indexOf(leaf);
                return i === -1 ? chipsDocsPages.length : i;
              };
              const leafDiff = leafRank(a.title) - leafRank(b.title);
              if (leafDiff !== 0) return leafDiff;
            }
          }
          // Components/ProgressIndicator/Docs topic order (Figma left → right)
          {
            const parts = componentsParts;
            if (
              parts(a.title)[0] === "Components" &&
              parts(a.title)[1] === "ProgressIndicator" &&
              parts(a.title)[2] === "Docs" &&
              parts(b.title)[0] === "Components" &&
              parts(b.title)[1] === "ProgressIndicator" &&
              parts(b.title)[2] === "Docs"
            ) {
              const leafRank = (title) => {
                const leaf = parts(title)[3] || "";
                const i = progressIndicatorDocsPages.indexOf(leaf);
                return i === -1 ? progressIndicatorDocsPages.length : i;
              };
              const leafDiff = leafRank(a.title) - leafRank(b.title);
              if (leafDiff !== 0) return leafDiff;
            }
          }
          // Components/Tracker/Docs topic order (Figma left → right)
          {
            const parts = componentsParts;
            if (
              parts(a.title)[0] === "Components" &&
              parts(a.title)[1] === "Tracker" &&
              parts(a.title)[2] === "Docs" &&
              parts(b.title)[0] === "Components" &&
              parts(b.title)[1] === "Tracker" &&
              parts(b.title)[2] === "Docs"
            ) {
              const leafRank = (title) => {
                const leaf = parts(title)[3] || "";
                const i = trackerDocsPages.indexOf(leaf);
                return i === -1 ? trackerDocsPages.length : i;
              };
              const leafDiff = leafRank(a.title) - leafRank(b.title);
              if (leafDiff !== 0) return leafDiff;
            }
          }
          // Components/Graphs/Docs topic order (Figma left → right)
          {
            const parts = componentsParts;
            if (
              parts(a.title)[0] === "Components" &&
              parts(a.title)[1] === "Graphs" &&
              parts(a.title)[2] === "Docs" &&
              parts(b.title)[0] === "Components" &&
              parts(b.title)[1] === "Graphs" &&
              parts(b.title)[2] === "Docs"
            ) {
              const leafRank = (title) => {
                const leaf = parts(title)[3] || "";
                const i = graphDocsPages.indexOf(leaf);
                return i === -1 ? graphDocsPages.length : i;
              };
              const leafDiff = leafRank(a.title) - leafRank(b.title);
              if (leafDiff !== 0) return leafDiff;
            }
          }
          // Components/PasswordStrength/Docs topic order (Figma left → right)
          {
            const parts = componentsParts;
            if (
              parts(a.title)[0] === "Components" &&
              parts(a.title)[1] === "PasswordStrength" &&
              parts(a.title)[2] === "Docs" &&
              parts(b.title)[0] === "Components" &&
              parts(b.title)[1] === "PasswordStrength" &&
              parts(b.title)[2] === "Docs"
            ) {
              const leafRank = (title) => {
                const leaf = parts(title)[3] || "";
                const i = passwordStrengthDocsPages.indexOf(leaf);
                return i === -1 ? passwordStrengthDocsPages.length : i;
              };
              const leafDiff = leafRank(a.title) - leafRank(b.title);
              if (leafDiff !== 0) return leafDiff;
            }
          }
          // Components/Notifications/Docs topic order (Figma left → right)
          {
            const parts = componentsParts;
            if (
              parts(a.title)[0] === "Components" &&
              parts(a.title)[1] === "Notifications" &&
              parts(a.title)[2] === "Docs" &&
              parts(b.title)[0] === "Components" &&
              parts(b.title)[1] === "Notifications" &&
              parts(b.title)[2] === "Docs"
            ) {
              const leafRank = (title) => {
                const leaf = parts(title)[3] || "";
                const i = notificationsDocsPages.indexOf(leaf);
                return i === -1 ? notificationsDocsPages.length : i;
              };
              const leafDiff = leafRank(a.title) - leafRank(b.title);
              if (leafDiff !== 0) return leafDiff;
            }
          }
          // Components/EmptyState/Docs topic order (Figma left → right)
          {
            const parts = componentsParts;
            if (
              parts(a.title)[0] === "Components" &&
              parts(a.title)[1] === "EmptyState" &&
              parts(a.title)[2] === "Docs" &&
              parts(b.title)[0] === "Components" &&
              parts(b.title)[1] === "EmptyState" &&
              parts(b.title)[2] === "Docs"
            ) {
              const leafRank = (title) => {
                const leaf = parts(title)[3] || "";
                const i = emptyStateDocsPages.indexOf(leaf);
                return i === -1 ? emptyStateDocsPages.length : i;
              };
              const leafDiff = leafRank(a.title) - leafRank(b.title);
              if (leafDiff !== 0) return leafDiff;
            }
          }
          // Components/Story/Docs topic order (Figma left → right)
          {
            const parts = componentsParts;
            if (
              parts(a.title)[0] === "Components" &&
              parts(a.title)[1] === "Story" &&
              parts(a.title)[2] === "Docs" &&
              parts(b.title)[0] === "Components" &&
              parts(b.title)[1] === "Story" &&
              parts(b.title)[2] === "Docs"
            ) {
              const leafRank = (title) => {
                const leaf = parts(title)[3] || "";
                const i = storyDocsPages.indexOf(leaf);
                return i === -1 ? storyDocsPages.length : i;
              };
              const leafDiff = leafRank(a.title) - leafRank(b.title);
              if (leafDiff !== 0) return leafDiff;
            }
          }
          // Components/ProductsCards/Docs topic order (Figma left → right)
          {
            const parts = componentsParts;
            if (
              parts(a.title)[0] === "Components" &&
              parts(a.title)[1] === "ProductsCards" &&
              parts(a.title)[2] === "Docs" &&
              parts(b.title)[0] === "Components" &&
              parts(b.title)[1] === "ProductsCards" &&
              parts(b.title)[2] === "Docs"
            ) {
              const leafRank = (title) => {
                const leaf = parts(title)[3] || "";
                const i = productsCardsDocsPages.indexOf(leaf);
                return i === -1 ? productsCardsDocsPages.length : i;
              };
              const leafDiff = leafRank(a.title) - leafRank(b.title);
              if (leafDiff !== 0) return leafDiff;
            }
          }
          // Components/Widgets/Docs topic order (Figma left → right)
          {
            const parts = componentsParts;
            if (
              parts(a.title)[0] === "Components" &&
              parts(a.title)[1] === "Widgets" &&
              parts(a.title)[2] === "Docs" &&
              parts(b.title)[0] === "Components" &&
              parts(b.title)[1] === "Widgets" &&
              parts(b.title)[2] === "Docs"
            ) {
              const leafRank = (title) => {
                const leaf = parts(title)[3] || "";
                const i = widgetsDocsPages.indexOf(leaf);
                return i === -1 ? widgetsDocsPages.length : i;
              };
              const leafDiff = leafRank(a.title) - leafRank(b.title);
              if (leafDiff !== 0) return leafDiff;
            }
          }
          // Components/PersonalFinanceWidgets/Docs topic order (Figma left → right)
          {
            const parts = componentsParts;
            if (
              parts(a.title)[0] === "Components" &&
              parts(a.title)[1] === "PersonalFinanceWidgets" &&
              parts(a.title)[2] === "Docs" &&
              parts(b.title)[0] === "Components" &&
              parts(b.title)[1] === "PersonalFinanceWidgets" &&
              parts(b.title)[2] === "Docs"
            ) {
              const leafRank = (title) => {
                const leaf = parts(title)[3] || "";
                const i = personalFinanceWidgetsDocsPages.indexOf(leaf);
                return i === -1 ? personalFinanceWidgetsDocsPages.length : i;
              };
              const leafDiff = leafRank(a.title) - leafRank(b.title);
              if (leafDiff !== 0) return leafDiff;
            }
          }
          // Components/Calendar/Docs topic order (Figma left → right)
          {
            const parts = componentsParts;
            if (
              parts(a.title)[0] === "Components" &&
              parts(a.title)[1] === "Calendar" &&
              parts(a.title)[2] === "Docs" &&
              parts(b.title)[0] === "Components" &&
              parts(b.title)[1] === "Calendar" &&
              parts(b.title)[2] === "Docs"
            ) {
              const leafRank = (title) => {
                const leaf = parts(title)[3] || "";
                const i = calendarDocsPages.indexOf(leaf);
                return i === -1 ? calendarDocsPages.length : i;
              };
              const leafDiff = leafRank(a.title) - leafRank(b.title);
              if (leafDiff !== 0) return leafDiff;
            }
          }
          // Components/ThemeSelector/Docs topic order (Figma left → right)
          {
            const parts = componentsParts;
            if (
              parts(a.title)[0] === "Components" &&
              parts(a.title)[1] === "ThemeSelector" &&
              parts(a.title)[2] === "Docs" &&
              parts(b.title)[0] === "Components" &&
              parts(b.title)[1] === "ThemeSelector" &&
              parts(b.title)[2] === "Docs"
            ) {
              const leafRank = (title) => {
                const leaf = parts(title)[3] || "";
                const i = themeSelectorDocsPages.indexOf(leaf);
                return i === -1 ? themeSelectorDocsPages.length : i;
              };
              const leafDiff = leafRank(a.title) - leafRank(b.title);
              if (leafDiff !== 0) return leafDiff;
            }
          }
          // Components/Bottomsheet/Docs topic order (Figma left → right)
          {
            const parts = componentsParts;
            if (
              parts(a.title)[0] === "Components" &&
              parts(a.title)[1] === "Bottomsheet" &&
              parts(a.title)[2] === "Docs" &&
              parts(b.title)[0] === "Components" &&
              parts(b.title)[1] === "Bottomsheet" &&
              parts(b.title)[2] === "Docs"
            ) {
              const leafRank = (title) => {
                const leaf = parts(title)[3] || "";
                const i = bottomsheetDocsPages.indexOf(leaf);
                return i === -1 ? bottomsheetDocsPages.length : i;
              };
              const leafDiff = leafRank(a.title) - leafRank(b.title);
              if (leafDiff !== 0) return leafDiff;
            }
          }
          // Components/Mobile Native Components/Docs topic order (Figma canvas 755:4645)
          {
            const parts = (title) => String(title).split("/");
            if (
              parts(a.title)[0] === "Components" &&
              parts(a.title)[1] === "Mobile Native Components" &&
              parts(a.title)[2] === "Docs" &&
              parts(b.title)[0] === "Components" &&
              parts(b.title)[1] === "Mobile Native Components" &&
              parts(b.title)[2] === "Docs"
            ) {
              const leafRank = (title) => {
                const leaf = parts(title)[3] || "";
                const i = mobileNativeComponentsDocsPages.indexOf(leaf);
                return i === -1 ? mobileNativeComponentsDocsPages.length : i;
              };
              const leafDiff = leafRank(a.title) - leafRank(b.title);
              if (leafDiff !== 0) return leafDiff;
            }
          }
          // Components/Range/Docs topic order (Figma left → right)
          {
            const parts = componentsParts;
            if (
              parts(a.title)[0] === "Components" &&
              parts(a.title)[1] === "Range" &&
              parts(a.title)[2] === "Docs" &&
              parts(b.title)[0] === "Components" &&
              parts(b.title)[1] === "Range" &&
              parts(b.title)[2] === "Docs"
            ) {
              const leafRank = (title) => {
                const leaf = parts(title)[3] || "";
                const i = rangeDocsPages.indexOf(leaf);
                return i === -1 ? rangeDocsPages.length : i;
              };
              const leafDiff = leafRank(a.title) - leafRank(b.title);
              if (leafDiff !== 0) return leafDiff;
            }
          }
          // Components/Upload/Docs topic order (Figma left → right)
          {
            const parts = componentsParts;
            if (
              parts(a.title)[0] === "Components" &&
              parts(a.title)[1] === "Upload" &&
              parts(a.title)[2] === "Docs" &&
              parts(b.title)[0] === "Components" &&
              parts(b.title)[1] === "Upload" &&
              parts(b.title)[2] === "Docs"
            ) {
              const leafRank = (title) => {
                const leaf = parts(title)[3] || "";
                const i = uploaderDocsPages.indexOf(leaf);
                return i === -1 ? uploaderDocsPages.length : i;
              };
              const leafDiff = leafRank(a.title) - leafRank(b.title);
              if (leafDiff !== 0) return leafDiff;
            }
          }
          // Components/Cards & Accounts & Finance/Docs topic order (Figma left → right)
          {
            const parts = componentsParts;
            if (
              parts(a.title)[0] === "Components" &&
              parts(a.title)[1] === "Cards & Accounts & Finance" &&
              parts(a.title)[2] === "Docs" &&
              parts(b.title)[0] === "Components" &&
              parts(b.title)[1] === "Cards & Accounts & Finance" &&
              parts(b.title)[2] === "Docs"
            ) {
              const leafRank = (title) => {
                const leaf = parts(title)[3] || "";
                const i = creditAccountFinanceDocsPages.indexOf(leaf);
                return i === -1 ? creditAccountFinanceDocsPages.length : i;
              };
              const leafDiff = leafRank(a.title) - leafRank(b.title);
              if (leafDiff !== 0) return leafDiff;
            }
          }
          // Components/Tabs/Docs topic order (Figma left → right)
          {
            const parts = componentsParts;
            if (
              parts(a.title)[0] === "Components" &&
              parts(a.title)[1] === "Tabs" &&
              parts(a.title)[2] === "Docs" &&
              parts(b.title)[0] === "Components" &&
              parts(b.title)[1] === "Tabs" &&
              parts(b.title)[2] === "Docs"
            ) {
              const leafRank = (title) => {
                const leaf = parts(title)[3] || "";
                const i = tabsDocsPages.indexOf(leaf);
                return i === -1 ? tabsDocsPages.length : i;
              };
              const leafDiff = leafRank(a.title) - leafRank(b.title);
              if (leafDiff !== 0) return leafDiff;
            }
          }
          // Components/Banners/Docs topic order (Figma left → right)
          {
            const parts = componentsParts;
            if (
              parts(a.title)[0] === "Components" &&
              parts(a.title)[1] === "Banners" &&
              parts(a.title)[2] === "Docs" &&
              parts(b.title)[0] === "Components" &&
              parts(b.title)[1] === "Banners" &&
              parts(b.title)[2] === "Docs"
            ) {
              const leafRank = (title) => {
                const leaf = parts(title)[3] || "";
                const i = bannersDocsPages.indexOf(leaf);
                return i === -1 ? bannersDocsPages.length : i;
              };
              const leafDiff = leafRank(a.title) - leafRank(b.title);
              if (leafDiff !== 0) return leafDiff;
            }
          }
          // Components/Blocks/Docs topic order (Figma left → right)
          {
            const parts = componentsParts;
            if (
              parts(a.title)[0] === "Components" &&
              parts(a.title)[1] === "Blocks" &&
              parts(a.title)[2] === "Docs" &&
              parts(b.title)[0] === "Components" &&
              parts(b.title)[1] === "Blocks" &&
              parts(b.title)[2] === "Docs"
            ) {
              const leafRank = (title) => {
                const leaf = parts(title)[3] || "";
                const i = blocksDocsPages.indexOf(leaf);
                return i === -1 ? blocksDocsPages.length : i;
              };
              const leafDiff = leafRank(a.title) - leafRank(b.title);
              if (leafDiff !== 0) return leafDiff;
            }
          }
          return a.title.localeCompare(b.title, undefined, { numeric: true });
        }
        // Foundations/Typography story order matches Figma page 24:2
        if (
          String(a.title) === "Foundations/Typography" &&
          String(b.title) === "Foundations/Typography"
        ) {
          const typographyStories = [
            "Platform agnostic",
            "Font Weight",
            "Font Size",
            "Line Height",
            "English",
            "Arabic",
            "Saudi Riyal Symbol",
          ];
          const typoRank = (name) => {
            const i = typographyStories.indexOf(String(name));
            return i === -1 ? typographyStories.length : i;
          };
          const typoDiff = typoRank(a.name) - typoRank(b.name);
          if (typoDiff !== 0) return typoDiff;
        }
        // Foundations/Border Radius — Figma page 69:6599
        if (
          String(a.title) === "Foundations/Border Radius" &&
          String(b.title) === "Foundations/Border Radius"
        ) {
          const borderRadiusStories = ["Border radius", "Border stroke"];
          const brRank = (name) => {
            const i = borderRadiusStories.indexOf(String(name));
            return i === -1 ? borderRadiusStories.length : i;
          };
          const brDiff = brRank(a.name) - brRank(b.name);
          if (brDiff !== 0) return brDiff;
        }
        // Foundations/Responsive Grid — Figma page 69:6658
        if (
          String(a.title) === "Foundations/Responsive Grid" &&
          String(b.title) === "Foundations/Responsive Grid"
        ) {
          const responsiveGridStories = [
            "Grid",
            "Mobile",
            "Tablet",
            "Responsive Device Grid",
            "Samsung Fold behaviour",
            "Design-Dev Workspace",
          ];
          const rgRank = (name) => {
            const i = responsiveGridStories.indexOf(String(name));
            return i === -1 ? responsiveGridStories.length : i;
          };
          const rgDiff = rgRank(a.name) - rgRank(b.name);
          if (rgDiff !== 0) return rgDiff;
        }
        const isAll = (name) => /^all\s?variants$/i.test(name);
        if (isAll(a.name) !== isAll(b.name)) return isAll(a.name) ? -1 : 1;
        return a.name.localeCompare(b.name, undefined, { numeric: true });
      },
    },
    layout: "fullscreen",
    // Canvas fill — switch from the toolbar "Backgrounds" control.
    // Wrapper is transparent on web so these values show through.
    backgrounds: {
      default: "White",
      values: [
        { name: "White", value: "#FFFFFF" },
        { name: "Block gray", value: "#F2F3F4" },
        { name: "Subtle gray", value: "#FAFAFA" },
        { name: "Light gray", value: "#EEEEEE" },
        { name: "Red tonal", value: "#FBE5E7" },
        { name: "Navy", value: "#1E2E42" },
        { name: "Black", value: "#000000" },
      ],
    },
    docs: {
      theme: createSabTheme(`Pulse Design System ${versionLabel}`),
      // Foundations: hide native Show code / Copy code (see FoundationsDocsContainer).
      container: FoundationsDocsContainer,
    },
  },

  globalTypes: {
    theme: {
      description: "Color theme for the canvas",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: [
          { value: "light", title: "Light Mode", icon: "circlehollow" },
          { value: "dark", title: "Dark Mode", icon: "circle" },
        ],
        dynamicTitle: true,
      },
    },
    locale: {
      description: "Story language / direction",
      toolbar: {
        // Icon-only: Storybook defaults dynamicTitle to true, so turn it off.
        icon: "globe",
        items: [
          { value: "en", title: "English", right: "EN", icon: "globe" },
          { value: "ar", title: "Arabic", right: "AR", icon: "globe" },
        ],
        dynamicTitle: false,
      },
    },
  },

  initialGlobals: {
    theme: "light",
    locale: "en",
  },

  decorators: [
    (Story, context) => {
      // Docs wrappers / autodocs / CSF Docs stories: always light (ignore Dark Mode toolbar).
      const themeKey = isDocsContext(context)
        ? "light"
        : context.globals?.theme === "dark"
          ? "dark"
          : "light";
      const locale = context.globals?.locale === "ar" ? "ar" : "en";

      // Keep i18n in sync before render so t()/tx() and args translation match the toolbar.
      if (i18n.language !== locale) {
        void i18n.changeLanguage(locale);
      }

      const translatedArgs = deepTranslateArgs(context.args, locale);

      return (
        <GestureHandlerRootView style={gestureRootStyle}>
          <SafeAreaProvider>
            <I18nextProvider i18n={i18n}>
              <View style={canvasRootStyle}>
                <ThemeProvider>
                  <ThemeFromGlobals themeKey={themeKey}>
                    <StoryBookWrapper locale={locale} showLanguageSwitcher={false}>
                      <View style={storySlotStyle} key={locale}>
                        {/*
                          withStorySourcePanel adds Show/Hide + Copy code under individual
                          stories (e.g. Default-only files). All variants + Foundations
                          (incl. Docs embeds) are skipped — see storySourceDecorator.tsx.
                        */}
                        {withStorySourcePanel(
                          () => <Story args={translatedArgs} />,
                          {
                            ...context,
                            args: translatedArgs,
                            // Docs mode can omit title; keep id/kind for Foundations skip.
                            title: context.title ?? context.kind,
                            id: context.id,
                          },
                        )}
                      </View>
                    </StoryBookWrapper>
                  </ThemeFromGlobals>
                </ThemeProvider>
              </View>
            </I18nextProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      );
    },
  ],
};

const gestureRootStyle = {
  flex: 1,
  width: "100%",
  minHeight: "100%",
};

const canvasRootStyle = {
  flex: 1,
  width: "100%",
  maxWidth: "100%",
  minWidth: 0,
  minHeight: "100%",
  height: "100%",
  overflow: "visible",
};

const storySlotStyle = {
  flex: 1,
  width: "100%",
  maxWidth: "100%",
  minWidth: 0,
  minHeight: 0,
  overflow: "visible",
  alignItems: "center",
  justifyContent: "flex-start",
};

if (typeof document !== "undefined" && document.title) {
  document.title = `Pulse Design System ${versionLabel}`;
}

export default preview;
