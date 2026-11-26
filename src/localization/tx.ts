import i18n from "i18next";
import { I18nManager } from "react-native";
import enToAr from "./literals/enToAr";

/** Device Storybook sets this so galleries translate before i18n finishes switching. */
let storyLocaleOverride: "en" | "ar" | null = null;

export function setStoryLocale(locale: "en" | "ar") {
  storyLocaleOverride = locale;
}

/**
 * Story locale shared by web and on-device Storybook.
 * Web passes the toolbar global (`en` | `ar`). Device has no toolbar global, so
 * Arabic follows the in-canvas language choice, then the RTL layout.
 */
export function resolveStoryLocale(globalsLocale?: unknown): "en" | "ar" {
  if (globalsLocale === "ar" || globalsLocale === "en") return globalsLocale;
  if (storyLocaleOverride) return storyLocaleOverride;
  if (I18nManager.isRTL) return "ar";
  return String(i18n.language ?? "").toLowerCase().startsWith("ar") ? "ar" : "en";
}

const isArabic = (locale?: string) => {
  if (locale == null || locale === "") return resolveStoryLocale() === "ar";
  return String(locale).toLowerCase().startsWith("ar");
};

/**
 * Translate a literal English UI string when Arabic is active.
 * Safe to call during render; parent re-renders on language change.
 */
export function tx(
  english: string | undefined | null,
  locale?: string,
): string {
  if (english == null) return "";
  if (!isArabic(locale)) return english;
  return enToAr[english] ?? english;
}

const REACT_ELEMENT =
  typeof Symbol === "function" && Symbol.for
    ? Symbol.for("react.element")
    : 0xeac7;

function isReactElement(value: unknown): boolean {
  return (
    !!value &&
    typeof value === "object" &&
    (value as { $$typeof?: unknown }).$$typeof === REACT_ELEMENT
  );
}

/**
 * Deep-translate plain string leaves in Storybook args / fixtures.
 * Skips functions, React elements, class instances, and non-plain objects.
 */
export function deepTranslateArgs<T>(value: T, locale?: string): T {
  if (typeof value === "string") {
    return tx(value, locale) as T;
  }
  if (value == null || typeof value !== "object") {
    return value;
  }
  if (typeof value === "function" || isReactElement(value)) {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((item) => deepTranslateArgs(item, locale)) as T;
  }
  // Plain object only
  const proto = Object.getPrototypeOf(value);
  if (proto !== Object.prototype && proto !== null) {
    return value;
  }
  const out: Record<string, unknown> = {};
  for (const [key, child] of Object.entries(
    value as Record<string, unknown>,
  )) {
    out[key] = deepTranslateArgs(child, locale);
  }
  return out as T;
}
