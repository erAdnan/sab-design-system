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
 * Navigation Dots docs — Figma documentation canvas (22086:116384).
 * Per-section hi-res exports (scale 2) stitched in catalog order.
 */
export const NAVIGATION_DOTS_DOCS_PAGES: DocPage[] = [
  {
    title: "Navigation Dots",
    storyTitle: "Components/Navigation/NavigationDots/Docs/Navigation Dots",
    images: [
      img(require("./assets/navigation-dots-00.webp"), 2400, 360),
      img(require("./assets/navigation-dots-01.webp"), 2400, 1000),
      img(require("./assets/navigation-dots-02.webp"), 2400, 200),
      img(require("./assets/navigation-dots-03.webp"), 2400, 178),
      img(require("./assets/navigation-dots-04.webp"), 2400, 240),
      img(require("./assets/navigation-dots-05.webp"), 2400, 178),
      img(require("./assets/navigation-dots-06.webp"), 2400, 178),
      img(require("./assets/navigation-dots-07.webp"), 2400, 356),
      img(require("./assets/navigation-dots-08.webp"), 2400, 200),
      img(require("./assets/navigation-dots-09.webp"), 2400, 178),
      img(require("./assets/navigation-dots-10.webp"), 2400, 112),
      img(require("./assets/navigation-dots-11.webp"), 2400, 178),
      img(require("./assets/navigation-dots-12.webp"), 2400, 272),
      img(require("./assets/navigation-dots-13.webp"), 2400, 178),
      img(require("./assets/navigation-dots-14.webp"), 2400, 640),
      img(require("./assets/navigation-dots-15.webp"), 2400, 200),
      img(require("./assets/navigation-dots-16.webp"), 2400, 178),
      img(require("./assets/navigation-dots-17.webp"), 2400, 912),
      img(require("./assets/navigation-dots-18.webp"), 2400, 96),
      img(require("./assets/navigation-dots-19.webp"), 2400, 912),
      img(require("./assets/navigation-dots-20.webp"), 2400, 200),
      img(require("./assets/navigation-dots-21.webp"), 2400, 178),
      img(require("./assets/navigation-dots-22.webp"), 2400, 178),
      img(require("./assets/navigation-dots-23.webp"), 2400, 176),
      img(require("./assets/navigation-dots-24.webp"), 2400, 178),
      img(require("./assets/navigation-dots-25.webp"), 2400, 178),
      img(require("./assets/navigation-dots-26.webp"), 2400, 352),
      img(require("./assets/navigation-dots-27.webp"), 2400, 178),
      img(require("./assets/navigation-dots-28.webp"), 2400, 178),
      img(require("./assets/navigation-dots-29.webp"), 2400, 864),
      img(require("./assets/navigation-dots-30.webp"), 2400, 200),
      img(require("./assets/navigation-dots-31.webp"), 2400, 178),
      img(require("./assets/navigation-dots-32.webp"), 2400, 88),
      img(require("./assets/navigation-dots-33.webp"), 1608, 956),
    ],
  },
];