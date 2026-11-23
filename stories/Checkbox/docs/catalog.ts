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
 * Checkbox docs — Figma Final Pulse canvas Check Box (8:3476).
 * Per-section hi-res exports (scale 2) stitched in catalog order.
 */
export const CHECKBOX_DOCS_PAGES: DocPage[] = [
  {
    title: "Check Box",
    storyTitle: "Components/Data Entry/Checkbox/Docs/Check Box",
    images: [
      img(require("./assets/check-box-00.webp"), 2400, 360),
      img(require("./assets/check-box-01.webp"), 2400, 1000),
      img(require("./assets/check-box-02.webp"), 2400, 200),
      img(require("./assets/check-box-03.webp"), 2400, 178),
      img(require("./assets/check-box-04.webp"), 2400, 240),
      img(require("./assets/check-box-05.webp"), 2400, 178),
      img(require("./assets/check-box-06.webp"), 2400, 178),
      img(require("./assets/check-box-07.webp"), 2400, 400),
      img(require("./assets/check-box-08.webp"), 2400, 200),
      img(require("./assets/check-box-09.webp"), 2400, 178),
      img(require("./assets/check-box-10.webp"), 2400, 464),
      img(require("./assets/check-box-11.webp"), 2400, 200),
      img(require("./assets/check-box-12.webp"), 2400, 178),
      img(require("./assets/check-box-13.webp"), 2400, 912),
      img(require("./assets/check-box-14.webp"), 2400, 96),
      img(require("./assets/check-box-15.webp"), 2400, 912),
      img(require("./assets/check-box-16.webp"), 2400, 200),
      img(require("./assets/check-box-17.webp"), 2400, 178),
      img(require("./assets/check-box-18.webp"), 2400, 178),
      img(require("./assets/check-box-19.webp"), 2400, 896),
      img(require("./assets/check-box-20.webp"), 2400, 178),
      img(require("./assets/check-box-21.webp"), 2400, 178),
      img(require("./assets/check-box-22.webp"), 2400, 112),
      img(require("./assets/check-box-23.webp"), 1080, 688),
      img(require("./assets/check-box-24.webp"), 2400, 178),
      img(require("./assets/check-box-25.webp"), 2400, 176),
      img(require("./assets/check-box-26.webp"), 2400, 200),
      img(require("./assets/check-box-27.webp"), 2400, 178),
      img(require("./assets/check-box-28.webp"), 2400, 640),
      img(require("./assets/check-box-29.webp"), 2400, 178),
      img(require("./assets/check-box-30.webp"), 2400, 778),
      img(require("./assets/check-box-31.webp"), 2400, 200),
    ],
  },
];
