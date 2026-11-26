import React, { useEffect, useState } from "react";
import { I18nManager, ScrollView, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { I18nextProvider } from "react-i18next";
import { ThemeProvider, useTheme } from "../src/context/theme/themeContext";
import { LanguageWrapper } from "../src/components/local/LanguageWrapper";
import { ThemeSwitch } from "../src/components/local/ThemeSwitch";
import i18n from "../src/localization/i18n";
import { deepTranslateArgs, resolveStoryLocale, setStoryLocale } from "../src/localization/tx";

/**
 * On-device Storybook for iOS and Android.
 * Web keeps `.storybook/preview.jsx` (manager toolbar + iframe scroll).
 * Here the same controls sit on the story canvas, and the canvas scrolls,
 * because the device story view clips overflow instead of scrolling.
 */
const storySort = require("../.storybook/storySort");

function DeviceCanvas({ Story, context }) {
  const { theme, isDarkTheme } = useTheme();
  const [picked, setPicked] = useState(null);
  const locale = picked ?? (I18nManager.isRTL ? "ar" : resolveStoryLocale());
  setStoryLocale(locale);
  useEffect(() => {
    const current = String(i18n.language ?? "").toLowerCase().startsWith("ar") ? "ar" : "en";
    if (current !== locale) {
      void i18n.changeLanguage(locale);
    }
  }, [locale]);
  const translatedArgs = deepTranslateArgs(context?.args, locale);

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        minHeight: 0,
        backgroundColor:
          theme?.stylesbackground2 ?? (isDarkTheme ? "#000000" : "#FFFFFF"),
      }}
    >
      <LanguageWrapper
        showSwitcher
        setArabic={(isArabic) => setPicked(isArabic ? "ar" : "en")}
        accessory={<ThemeSwitch overrideStyles={{ marginBottom: 0 }} />}
      >
        <ScrollView
          style={{ flex: 1, width: "100%", minHeight: 0 }}
          contentContainerStyle={{
            flexGrow: 1,
            width: "100%",
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 48,
          }}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled
          showsVerticalScrollIndicator
        >
          <View
            key={locale}
            style={{ width: "100%", maxWidth: "100%", minWidth: 0 }}
          >
            <Story args={translatedArgs} />
          </View>
        </ScrollView>
      </LanguageWrapper>
    </View>
  );
}

function DeviceStoryRoot(props) {
  return (
    <GestureHandlerRootView style={{ flex: 1, width: "100%", minHeight: 0 }}>
      <SafeAreaProvider>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider>
            <DeviceCanvas {...props} />
          </ThemeProvider>
        </I18nextProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

/** @type {import("@storybook/react-native").Preview} */
const preview = {
  parameters: {
    layout: "fullscreen",
    deepControls: { enabled: true },
    options: {
      storySort,
    },
  },
  decorators: [
    (Story, context) => (
      <DeviceStoryRoot Story={Story} context={context} />
    ),
  ],
};

export default preview;
