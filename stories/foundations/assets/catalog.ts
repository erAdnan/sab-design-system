import { ImageSourcePropType } from "react-native";

export type DocImage = {
  source: ImageSourcePropType;
  /** width / height (React Native aspectRatio) */
  aspectRatio: number;
};

const img = (source: ImageSourcePropType, w: number, h: number): DocImage => ({
  source,
  aspectRatio: w / h,
});

/** Figma Final Pulse Assets → Icon Sizes (1465:11160). */
export const ICON_SIZES_IMAGES: DocImage[] = [
  img(require("./assets/icon-sizes.webp"), 2640, 1515),
];

/** Figma Final Pulse Assets → Patterns (2314:14901). */
export const PATTERNS_IMAGES: DocImage[] = [
  img(require("./assets/patterns.webp"), 1846, 953),
];

/** Figma Final Pulse Assets → Merchant Logos (16159:25728). */
export const MERCHANT_LOGOS_IMAGES: DocImage[] = [
  img(require("./assets/merchant-logos.webp"), 2845, 1629),
];

/** Figma Final Pulse Assets → Biller Logos (15912:18212). */
export const BILLER_LOGOS_IMAGES: DocImage[] = [
  img(require("./assets/biller-logos.webp"), 2011, 1150),
];

/** Figma Final Pulse Assets → Local Banks Icons (9390:11482) reference sheet. */
export const LOCAL_BANKS_DOC_IMAGES: DocImage[] = [
  img(require("./assets/local-banks-icons.webp"), 923, 1481),
];
