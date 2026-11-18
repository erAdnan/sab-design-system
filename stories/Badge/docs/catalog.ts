import { ImageSourcePropType } from "react-native";

export type DocImage = {
  source: ImageSourcePropType;
  /** width / height (React Native aspectRatio) */
  aspectRatio: number;
};

export type DocPage = {
  title: string;
  storyTitle: string;
  images: DocImage[];
};

const img = (source: ImageSourcePropType, w: number, h: number): DocImage => ({
  source,
  aspectRatio: w / h,
});

/**
 * Badge docs — Figma Final Pulse canvas Badge.
 * Per-section hi-res exports stitched in catalog order.
 */
export const BADGE_DOCS_PAGES: DocPage[] = [
  {
    title: "Badge",
    storyTitle: "Components/Badge/Docs/Badge",
    images: [
      img(require("./assets/badge-00.webp"), 2400, 306),
      img(require("./assets/badge-01.webp"), 2400, 1000),
      img(require("./assets/badge-02.webp"), 2400, 200),
      img(require("./assets/badge-03.webp"), 2400, 178),
      img(require("./assets/badge-04.webp"), 2400, 128),
      img(require("./assets/badge-05.webp"), 2400, 178),
      img(require("./assets/badge-06.webp"), 2400, 178),
      img(require("./assets/badge-07.webp"), 2400, 1008),
      img(require("./assets/badge-08.webp"), 2400, 200),
      img(require("./assets/badge-09.webp"), 2400, 178),
      img(require("./assets/badge-10.webp"), 2400, 496),
      img(require("./assets/badge-11.webp"), 2400, 200),
      img(require("./assets/badge-12.webp"), 2400, 178),
      img(require("./assets/badge-13.webp"), 2400, 1264),
      img(require("./assets/badge-14.webp"), 2400, 96),
      img(require("./assets/badge-15.webp"), 2400, 200),
      img(require("./assets/badge-16.webp"), 2400, 178),
      img(require("./assets/badge-17.webp"), 2400, 178),
      img(require("./assets/badge-18.webp"), 2400, 1352),
      img(require("./assets/badge-19.webp"), 2400, 178),
      img(require("./assets/badge-20.webp"), 2400, 178),
      img(require("./assets/badge-21.webp"), 2400, 1080),
      img(require("./assets/badge-22.webp"), 2400, 178),
      img(require("./assets/badge-23.webp"), 2400, 178),
      img(require("./assets/badge-24.webp"), 2400, 178),
      img(require("./assets/badge-25.webp"), 608, 848),
      img(require("./assets/badge-26.webp"), 2400, 200),
    ],
  },
];