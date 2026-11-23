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

/** Colour usage · Light & dark — Figma node 22345:8034. */
export const COLOUR_USAGE_IMAGES: DocImage[] = [
  img(require("./assets/01-header.webp"), 2800, 339),
  img(require("./assets/02-overview.webp"), 2800, 1682),
  img(require("./assets/03-surface.webp"), 2800, 2666),
  img(require("./assets/04-screen-background.webp"), 2800, 1198),
  img(require("./assets/05-container-background.webp"), 2800, 1180),
  img(require("./assets/06-grouped-lists.webp"), 2800, 1188),
  img(require("./assets/07-in-context-intro.webp"), 2800, 848),
  img(require("./assets/08-in-context-examples-1.webp"), 2800, 2852),
  img(require("./assets/09-in-context-examples-2.webp"), 2800, 3027),
  img(require("./assets/10-usage-rules.webp"), 2800, 1328),
];
