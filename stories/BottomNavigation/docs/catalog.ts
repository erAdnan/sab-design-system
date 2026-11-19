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
 * Bottom Navigation docs — Figma canvas sections, per-page order.
 * Per-section hi-res exports (scale 2; workspace sheet scale 1) stitched in catalog order.
 */
export const BOTTOM_NAVIGATION_DOCS_PAGES: DocPage[] = [
  {
    title: "Bottom Navigation",
    storyTitle: "Components/Navigation/Bottom Navigation/Docs/Bottom Navigation",
    images: [
      img(require("./assets/bottom-navigation-00.webp"), 2400, 474),
      img(require("./assets/bottom-navigation-01.webp"), 2400, 1000),
      img(require("./assets/bottom-navigation-02.webp"), 2400, 200),
      img(require("./assets/bottom-navigation-03.webp"), 2400, 178),
      img(require("./assets/bottom-navigation-04.webp"), 2400, 330),
      img(require("./assets/bottom-navigation-05.webp"), 2400, 178),
      img(require("./assets/bottom-navigation-06.webp"), 2400, 178),
      img(require("./assets/bottom-navigation-07.webp"), 2400, 514),
      img(require("./assets/bottom-navigation-08.webp"), 2400, 200),
      img(require("./assets/bottom-navigation-09.webp"), 2400, 178),
      img(require("./assets/bottom-navigation-10.webp"), 2400, 657),
      img(require("./assets/bottom-navigation-11.webp"), 2400, 200),
      img(require("./assets/bottom-navigation-12.webp"), 2400, 178),
      img(require("./assets/bottom-navigation-13.webp"), 2400, 912),
      img(require("./assets/bottom-navigation-14.webp"), 2400, 96),
      img(require("./assets/bottom-navigation-15.webp"), 2400, 912),
      img(require("./assets/bottom-navigation-16.webp"), 2400, 96),
      img(require("./assets/bottom-navigation-17.webp"), 2400, 912),
      img(require("./assets/bottom-navigation-18.webp"), 2400, 200),
      img(require("./assets/bottom-navigation-19.webp"), 2400, 178),
      img(require("./assets/bottom-navigation-20.webp"), 2400, 1088),
      img(require("./assets/bottom-navigation-21.webp"), 2400, 255),
      img(require("./assets/bottom-navigation-22.webp"), 2400, 178),
      img(require("./assets/bottom-navigation-23.webp"), 2400, 880),
      img(require("./assets/bottom-navigation-24.webp"), 2400, 1266),
      img(require("./assets/bottom-navigation-25.webp"), 2400, 1636),
      img(require("./assets/bottom-navigation-26.webp"), 2400, 200),
      img(require("./assets/bottom-navigation-27.webp"), 2400, 178),
      img(require("./assets/bottom-navigation-28.webp"), 2400, 88),
      img(require("./assets/bottom-navigation-29.webp"), 1200, 2718),
    ],
  },
  {
    title: "Bottom navigation / 03 · iOS guidelines",
    storyTitle: "Components/Navigation/Bottom Navigation/Docs/Bottom navigation / 03 · iOS guidelines",
    images: [
      img(require("./assets/bottom-nav-ios-guidelines-00.webp"), 3200, 342),
      img(require("./assets/bottom-nav-ios-guidelines-01.webp"), 3200, 900),
      img(require("./assets/bottom-nav-ios-guidelines-02.webp"), 3200, 2000),
      img(require("./assets/bottom-nav-ios-guidelines-03.webp"), 3200, 880),
    ],
  },
  {
    title: "Bottom navigation / 04 · Android guidelines",
    storyTitle: "Components/Navigation/Bottom Navigation/Docs/Bottom navigation / 04 · Android guidelines",
    images: [
      img(require("./assets/bottom-nav-android-guidelines-00.webp"), 3200, 342),
      img(require("./assets/bottom-nav-android-guidelines-01.webp"), 3200, 900),
      img(require("./assets/bottom-nav-android-guidelines-02.webp"), 3200, 2120),
      img(require("./assets/bottom-nav-android-guidelines-03.webp"), 3200, 900),
    ],
  },
];
