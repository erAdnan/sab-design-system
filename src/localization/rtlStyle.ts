import { I18nManager, Platform, StyleSheet, TextStyle } from "react-native";

/**
 * Web's I18nManager.isRTL is hard-coded false. Storybook still sets
 * `document.dir`, and that is what mirrors rows in the browser.
 */
export function isReadingRtl(isRtl = I18nManager.isRTL): boolean {
  if (isRtl) return true;
  if (Platform.OS !== "web" || typeof document === "undefined") return false;
  return document.documentElement?.dir === "rtl";
}

/**
 * Alignment of the reading edge: left in LTR, right in RTL.
 *
 * iOS and Android swap `left` and `right` once the layout direction is RTL
 * (see RCTAttributedTextUtils and ReactBaseTextShadowNode). Passing "right"
 * therefore paints on the physical left. Web does not swap, so it needs "right".
 */
export function readingEdgeAlign(isRtl = I18nManager.isRTL): "left" | "right" {
  if (!isReadingRtl(isRtl)) return "left";
  return Platform.OS === "web" ? "right" : "left";
}

/**
 * Make a hardcoded `textAlign: "left"` (line start) or `"right"` (line end)
 * land on that physical edge in RTL.
 * `writingDirection: "ltr"` keeps Latin runs on the physical left.
 */
export function withReadingTextAlign<T>(styles: T, isRtl = I18nManager.isRTL): T {
  if (!isReadingRtl(isRtl) || styles == null) return styles;
  if (Array.isArray(styles)) {
    return styles.map((item) => withReadingTextAlign(item, isRtl)) as T;
  }
  const flat =
    typeof styles === "number" ? StyleSheet.flatten(styles) : (styles as TextStyle);
  if (!flat || typeof flat !== "object") return styles;
  const style = flat;
  if (style.textAlign !== "left" && style.textAlign !== "right") return styles;

  // writingDirection ltr stays on the physical left. Everywhere else, "left"
  // and "right" both mean the reading edge (physical right while RTL).
  const physicalLeft = Platform.OS === "web" ? "left" : "right";
  const next = style.writingDirection === "ltr" ? physicalLeft : readingEdgeAlign(true);
  if (next === style.textAlign) return styles;
  return { ...style, textAlign: next } as T;
}
