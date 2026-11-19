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
 * Range docs — Figma Final Pulse canvas Range (22086:121825).
 * Per-section hi-res exports stitched in catalog order.
 */
export const RANGE_DOCS_PAGES: DocPage[] = [
  {
    title: "Range",
    storyTitle: "Components/Data Entry/Range/Docs/Range",
    images: [
      img(require("./assets/range-00.webp"), 2400, 250),
      img(require("./assets/range-01.webp"), 2400, 1000),
      img(require("./assets/range-02.webp"), 2400, 200),
      img(require("./assets/range-03.webp"), 2400, 178),
      img(require("./assets/range-04.webp"), 2400, 364),
      img(require("./assets/range-05.webp"), 2400, 178),
      img(require("./assets/range-06.webp"), 2400, 178),
      img(require("./assets/range-07.webp"), 2400, 4040),
      img(require("./assets/range-08.webp"), 2400, 200),
      img(require("./assets/range-09.webp"), 2400, 178),
      img(require("./assets/range-10.webp"), 2400, 1948),
      img(require("./assets/range-11.webp"), 2400, 200),
      img(require("./assets/range-12.webp"), 2400, 178),
      img(require("./assets/range-13.webp"), 2400, 912),
      img(require("./assets/range-14.webp"), 2400, 96),
      img(require("./assets/range-15.webp"), 2400, 200),
      img(require("./assets/range-16.webp"), 2400, 178),
      img(require("./assets/range-17.webp"), 2400, 178),
      img(require("./assets/range-18.webp"), 2400, 1024),
      img(require("./assets/range-19.webp"), 2400, 112),
      img(require("./assets/range-20.webp"), 2400, 200),
      img(require("./assets/range-21.webp"), 2400, 178),
      img(require("./assets/range-22.webp"), 2400, 512),
      img(require("./assets/range-23.webp"), 2400, 200),
      img(require("./assets/range-24.webp"), 2400, 178),
      img(require("./assets/range-25.webp"), 2400, 88),
      img(require("./assets/range-26.webp"), 1200, 2746),
      img(require("./assets/range-27.webp"), 770, 3040),
    ],
  },
];
