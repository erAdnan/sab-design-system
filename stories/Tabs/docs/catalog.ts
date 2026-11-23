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
 * Tabs docs — Figma Final Pulse canvas `↳ Tabs` (8:3521) → Tabs (22086:123815).
 * Per-section hi-res exports (scale 2) stitched in catalog order.
 */
export const TABS_DOCS_PAGES: DocPage[] = [
  {
    title: "Tabs",
    storyTitle: "Components/Data Display/Tabs/Docs/Tabs",
    images: [
      img(require("./assets/tabs-00.webp"), 2400, 446),
      img(require("./assets/tabs-01.webp"), 2400, 1000),
      img(require("./assets/tabs-02.webp"), 2400, 200),
      img(require("./assets/tabs-03.webp"), 2400, 178),
      img(require("./assets/tabs-04.webp"), 2400, 240),
      img(require("./assets/tabs-05.webp"), 2400, 178),
      img(require("./assets/tabs-06.webp"), 2400, 178),
      img(require("./assets/tabs-07.webp"), 2400, 584),
      img(require("./assets/tabs-08.webp"), 2400, 178),
      img(require("./assets/tabs-09.webp"), 2400, 178),
      img(require("./assets/tabs-10.webp"), 2400, 1412),
      img(require("./assets/tabs-11.webp"), 2400, 200),
      img(require("./assets/tabs-12.webp"), 2400, 178),
      img(require("./assets/tabs-13.webp"), 2400, 720),
      img(require("./assets/tabs-14.webp"), 2400, 200),
      img(require("./assets/tabs-15.webp"), 2400, 178),
      img(require("./assets/tabs-16.webp"), 2400, 912),
      img(require("./assets/tabs-17.webp"), 2400, 96),
      img(require("./assets/tabs-18.webp"), 2400, 976),
      img(require("./assets/tabs-19.webp"), 2400, 200),
      img(require("./assets/tabs-20.webp"), 2400, 178),
      img(require("./assets/tabs-21.webp"), 2400, 178),
      img(require("./assets/tabs-22.webp"), 2400, 1088),
      img(require("./assets/tabs-23.webp"), 2400, 178),
      img(require("./assets/tabs-24.webp"), 2400, 178),
      img(require("./assets/tabs-25.webp"), 2400, 200),
      img(require("./assets/tabs-26.webp"), 2400, 178),
      img(require("./assets/tabs-27.webp"), 2400, 896),
      img(require("./assets/tabs-28.webp"), 2400, 178),
      img(require("./assets/tabs-29.webp"), 2400, 200),
      img(require("./assets/tabs-30.webp"), 2400, 178),
      img(require("./assets/tabs-31.webp"), 838, 736),
      img(require("./assets/tabs-32.webp"), 2400, 88),
      img(require("./assets/tabs-33.webp"), 480, 470),
    ],
  },
];