import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { LanguageCodes } from "./languages";
import en from "./locales/en";
import ar from "./locales/ar";

/**
 * Lightweight i18n bootstrap for the design-system Storybook / demos.
 * Host apps can replace or extend these resources; keys under `stories.*`
 * power the text component stories when the locale toolbar changes.
 */
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    compatibilityJSON: "v4",
    resources: {
      [LanguageCodes.en]: { translation: en },
      [LanguageCodes.ar]: { translation: ar },
    },
    lng: LanguageCodes.en,
    fallbackLng: LanguageCodes.en,
    interpolation: { escapeValue: false },
    // Return the key if missing so empty strings don't silently blank stories.
    returnNull: false,
    returnEmptyString: false,
  });
}

export default i18n;
