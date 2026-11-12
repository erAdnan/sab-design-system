import { useEffect } from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { I18nextProvider } from "react-i18next";
import { ThemeProvider, useTheme } from "../src/context/theme/themeContext.tsx";
import { StoryBookWrapper } from "../src/components/local/StoryBookWrapper.tsx";
import i18n from "../src/localization/i18n";
import { deepTranslateArgs } from "../src/localization/tx";
import { version, versionLabel } from "./version";

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
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    deepControls: { enabled: true },
    options: {
      // Must stay inline and self-contained (Storybook statically analyses it; no outer references).
      // Sidebar order: Components, Foundations, then everything else; alphabetical by title. Inside each
      // component the "All variants" story comes first, so opening a component lands on it (Storybook
      // selects the first story of a component). Remaining stories stay alphabetical.
      storySort: (a, b) => {
        if (a.id === b.id) return 0;
        const top = ["Components", "Foundations"];
        const rank = (title) => {
          const i = top.indexOf(String(title).split("/")[0]);
          return i === -1 ? top.length : i;
        };
        const rankDiff = rank(a.title) - rank(b.title);
        if (rankDiff !== 0) return rankDiff;
        if (a.title !== b.title) return a.title.localeCompare(b.title, undefined, { numeric: true });
        const isAll = (name) => /^all\s?variants$/i.test(name);
        if (isAll(a.name) !== isAll(b.name)) return isAll(a.name) ? -1 : 1;
        return a.name.localeCompare(b.name, undefined, { numeric: true });
      },
    },
    layout: "fullscreen",
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
    packageVersion: {
      description: "Published design-system package version for this build",
      toolbar: {
        title: versionLabel,
        icon: "info",
        items: [{ value: version, title: versionLabel }],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    theme: "light",
    locale: "en",
    packageVersion: version,
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
  document.title = `SAB Design System ${versionLabel}`;
}

export default preview;
