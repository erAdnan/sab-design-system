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

/** Figma Final Pulse → Divider — Documentation (22013:576 / canvas 262:2754). */
export const DIVIDER_DOC_IMAGES: DocImage[] = [
  img(require("./assets/divider-01-description.webp"), 2400, 386),
  img(require("./assets/divider-02-copy-me.webp"), 2400, 610),
  img(require("./assets/divider-03-guidelines.webp"), 2400, 2578),
  img(require("./assets/divider-04-component.webp"), 2400, 276),
];
