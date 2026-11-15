import { I18nManager, Platform, StyleSheet, TextStyle, StyleProp } from "react-native";

const NATIVE_LIGHT = Platform.select({
  ios: "HelveticaNeue-Light",
  android: "sans-serif-light",
  default: undefined,
});
const NATIVE_REGULAR = Platform.select({
  ios: "HelveticaNeue",
  android: "sans-serif",
  default: undefined,
});
const NATIVE_MEDIUM = Platform.select({
  ios: "HelveticaNeue-Medium",
  android: "sans-serif-medium",
  default: undefined,
});
const NATIVE_BOLD = Platform.select({
  ios: "HelveticaNeue-Bold",
  android: "sans-serif-black",
  default: undefined,
});

const isRtl = I18nManager.isRTL;

/**
 * Native system fonts (IT structure).
 * Keep HSBC / HSBC_Medium / HSBC_Bold / HSBC_Light names so existing call sites stay unchanged.
 * SAR_Font is unchanged (platform-specific Saudi Riyal glyph font).
 */
export default {
  Bold: NATIVE_BOLD,
  Regular: NATIVE_REGULAR,
  Light: NATIVE_LIGHT,

  /**
   * Native bold/medium families often ignore `fontWeight`. Remap so weight applies correctly.
   * Usage: style={fonts.withTrueBoldWeight([{ fontFamily: fonts.HSBC_Bold }, styles.text])}
   */
  withTrueBoldWeight: (style: StyleProp<TextStyle>) => {
    const flattened = StyleSheet.flatten(style);
    if (flattened?.fontFamily === NATIVE_BOLD) {
      return [style, { fontFamily: NATIVE_REGULAR, fontWeight: "700" as const }];
    }
    if (flattened?.fontFamily === NATIVE_MEDIUM) {
      return [
        style,
        {
          fontFamily: NATIVE_MEDIUM,
          fontWeight: isRtl ? ("700" as const) : ("500" as const),
        },
      ];
    }
    return style;
  },

  HSBC: NATIVE_REGULAR,
  HSBC_Medium: NATIVE_MEDIUM,
  HSBC_Bold: NATIVE_BOLD,
  HSBC_Light: NATIVE_LIGHT,

  /**
   * Saudi Riyal glyph font.
   * - iOS: PostScript name from the TTF
   * - Android: linked asset name (filename without extension)
   * - Web/Storybook: CSS @font-face family registered in .storybook/preview-head.html
   */
  SAR_Font: Platform.select({
    ios: "SaudiRiyalMarch-Medium12",
    android: "SARFont",
    web: "SARFont",
    default: "SARFont",
  }),
};
