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

/**
 * Typography · Platform agnostic (Figma 22374:812 under page 24:2).
 * Section exports keep text sharp (full frame is ~10k tall).
 */
export const PLATFORM_AGNOSTIC_IMAGES: DocImage[] = [
  img(require("./assets/01-overview.webp"), 1400, 949),
  img(require("./assets/02-font-family.webp"), 1400, 888),
  img(require("./assets/03-token-contract.webp"), 1400, 697),
  img(require("./assets/04-font-weights.webp"), 1400, 761),
  img(require("./assets/05-size-hierarchy.webp"), 1400, 1174),
  img(require("./assets/06-metrics.webp"), 1400, 859),
  img(require("./assets/07-figma-organisation.webp"), 1400, 1118),
  img(require("./assets/08-usage-guidelines.webp"), 1400, 1081),
  img(require("./assets/09-accessibility.webp"), 1400, 728),
  img(require("./assets/10-platform-implementation.webp"), 1400, 925),
  img(require("./assets/11-it-handoff.webp"), 1400, 1306),
];
