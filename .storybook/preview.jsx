import { useEffect } from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { I18nextProvider } from "react-i18next";
import { ThemeProvider, useTheme } from "../src/context/theme/themeContext.tsx";
import { StoryBookWrapper } from "../src/components/local/StoryBookWrapper.tsx";
import i18n from "../src/localization/i18n";
import { deepTranslateArgs } from "../src/localization/tx";
import { versionLabel } from "./version";
import { createSabTheme } from "./createSabTheme";

/**
 * Web Storybook only (.storybook). On-device Storybook uses `.rnstorybook`
 * and does not load this preview / manager toolbar.
 */
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
      // Sidebar order: Pulse Design System, Components, Foundations; alphabetical by title. Inside each
      // component the "All variants" story comes first, so opening a component lands on it (Storybook
      // selects the first story of a component). Remaining stories stay alphabetical.
      storySort: (a, b) => {
        if (a.id === b.id) return 0;
        const top = ["Pulse Design System", "Components", "Foundations"];
        const pulsePages = [
          "Pulse Design Ecosystem",
          "Rules & Patterns",
          "Guidelines",
          "Journey",
          "Updating Governance",
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
          "Governance Model - DS Communication channel",
          "Changelog",
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
            // Updating Governance topic order (Figma top → bottom)
            if (parts(a.title)[1] === "Updating Governance") {
              const leafRank = (title) => {
                const leaf = parts(title)[2] || "";
                const i = governancePages.indexOf(leaf);
                return i === -1 ? governancePages.length : i;
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
            "Scale",
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
          const borderRadiusStories = ["Border Radius", "Border Stroke"];
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
      const themeKey = context.globals?.theme === "dark" ? "dark" : "light";
      const locale = context.globals?.locale === "ar" ? "ar" : "en";

      // Keep i18n in sync before render so t()/tx() and args translation match the toolbar.
      if (i18n.language !== locale) {
        void i18n.changeLanguage(locale);
      }

      const translatedArgs = deepTranslateArgs(context.args, locale);

      return (
        <SafeAreaProvider>
          <I18nextProvider i18n={i18n}>
            <View style={canvasRootStyle}>
              <ThemeProvider>
                <ThemeFromGlobals themeKey={themeKey}>
                  <StoryBookWrapper locale={locale} showLanguageSwitcher={false}>
                    <View style={storySlotStyle} key={locale}>
                      <Story args={translatedArgs} />
                    </View>
                  </StoryBookWrapper>
                </ThemeFromGlobals>
              </ThemeProvider>
            </View>
          </I18nextProvider>
        </SafeAreaProvider>
      );
    },
  ],
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
