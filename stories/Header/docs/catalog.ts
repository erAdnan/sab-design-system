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
 * Header docs — Figma Final Pulse Header canvas sections, per-page order.
 * Per-section hi-res exports (scale 2; workspace sheet scale 1) stitched in catalog order.
 */
export const HEADER_DOCS_PAGES: DocPage[] = [
  {
    title: "Header",
    storyTitle: "Components/Navigation/Header/Docs/Header",
    images: [
      img(require("./assets/header-00.webp"), 2400, 1506),
      img(require("./assets/header-01.webp"), 2400, 882),
      img(require("./assets/header-02.webp"), 2400, 178),
      img(require("./assets/header-03.webp"), 2400, 750),
      img(require("./assets/header-04.webp"), 2400, 814),
      img(require("./assets/header-05.webp"), 2400, 814),
      img(require("./assets/header-06.webp"), 2400, 792),
      img(require("./assets/header-07.webp"), 2400, 792),
      img(require("./assets/header-08.webp"), 2400, 750),
      img(require("./assets/header-09.webp"), 2400, 774),
      img(require("./assets/header-10.webp"), 2400, 814),
      img(require("./assets/header-11.webp"), 2400, 814),
      img(require("./assets/header-12.webp"), 2400, 814),
      img(require("./assets/header-13.webp"), 2400, 814),
      img(require("./assets/header-14.webp"), 2400, 792),
      img(require("./assets/header-15.webp"), 2400, 774),
      img(require("./assets/header-16.webp"), 2400, 178),
      img(require("./assets/header-17.webp"), 2400, 688),
      img(require("./assets/header-18.webp"), 2400, 688),
      img(require("./assets/header-19.webp"), 2400, 688),
      img(require("./assets/header-20.webp"), 2400, 688),
      img(require("./assets/header-21.webp"), 2400, 688),
      img(require("./assets/header-22.webp"), 2400, 688),
      img(require("./assets/header-23.webp"), 2400, 688),
      img(require("./assets/header-24.webp"), 2400, 688),
      img(require("./assets/header-25.webp"), 2400, 688),
      img(require("./assets/header-26.webp"), 2400, 2518),
      img(require("./assets/header-27.webp"), 2400, 1368),
      img(require("./assets/header-28.webp"), 2400, 1048),
      img(require("./assets/header-29.webp"), 2400, 178),
      img(require("./assets/header-30.webp"), 1200, 2685),
    ],
  },
  {
    title: "Supporting Actions",
    storyTitle: "Components/Navigation/Header/Docs/Supporting Actions",
    images: [
      img(require("./assets/supporting-actions-00.webp"), 2400, 1028),
      img(require("./assets/supporting-actions-01.webp"), 2400, 722),
      img(require("./assets/supporting-actions-02.webp"), 2400, 1350),
      img(require("./assets/supporting-actions-03.webp"), 2400, 868),
      img(require("./assets/supporting-actions-04.webp"), 2400, 1518),
      img(require("./assets/supporting-actions-05.webp"), 2400, 1084),
      img(require("./assets/supporting-actions-06.webp"), 2400, 868),
      img(require("./assets/supporting-actions-07.webp"), 2400, 572),
    ],
  },
  {
    title: "Level 1 Add-on",
    storyTitle: "Components/Navigation/Header/Docs/Level 1 Add-on",
    images: [
      img(require("./assets/level-1-add-on-00.webp"), 2400, 1012),
      img(require("./assets/level-1-add-on-01.webp"), 2400, 722),
      img(require("./assets/level-1-add-on-02.webp"), 2400, 1354),
      img(require("./assets/level-1-add-on-03.webp"), 2400, 1466),
      img(require("./assets/level-1-add-on-04.webp"), 2400, 1466),
      img(require("./assets/level-1-add-on-05.webp"), 2400, 1144),
      img(require("./assets/level-1-add-on-06.webp"), 2400, 868),
      img(require("./assets/level-1-add-on-07.webp"), 2400, 666),
    ],
  },
  {
    title: "Pre-login Add-on",
    storyTitle: "Components/Navigation/Header/Docs/Pre-login Add-on",
    images: [
      img(require("./assets/pre-login-add-on-00.webp"), 2400, 1012),
      img(require("./assets/pre-login-add-on-01.webp"), 2400, 722),
      img(require("./assets/pre-login-add-on-02.webp"), 2400, 1318),
      img(require("./assets/pre-login-add-on-03.webp"), 2400, 1486),
      img(require("./assets/pre-login-add-on-04.webp"), 2400, 1430),
      img(require("./assets/pre-login-add-on-05.webp"), 2400, 1068),
      img(require("./assets/pre-login-add-on-06.webp"), 2400, 852),
      img(require("./assets/pre-login-add-on-07.webp"), 2400, 630),
    ],
  },
  {
    title: "Segment Add-on",
    storyTitle: "Components/Navigation/Header/Docs/Segment Add-on",
    images: [
      img(require("./assets/segment-add-on-00.webp"), 2400, 1020),
      img(require("./assets/segment-add-on-01.webp"), 2400, 722),
      img(require("./assets/segment-add-on-02.webp"), 2400, 1314),
      img(require("./assets/segment-add-on-03.webp"), 2400, 1426),
      img(require("./assets/segment-add-on-04.webp"), 2400, 1482),
      img(require("./assets/segment-add-on-05.webp"), 2400, 1076),
      img(require("./assets/segment-add-on-06.webp"), 2400, 860),
      img(require("./assets/segment-add-on-07.webp"), 2400, 634),
    ],
  },
  {
    title: "Global Search",
    storyTitle: "Components/Navigation/Header/Docs/Global Search",
    images: [
      img(require("./assets/global-search-00.webp"), 2400, 1044),
      img(require("./assets/global-search-01.webp"), 2400, 722),
      img(require("./assets/global-search-02.webp"), 2400, 1382),
      img(require("./assets/global-search-03.webp"), 2400, 940),
      img(require("./assets/global-search-04.webp"), 2400, 1494),
      img(require("./assets/global-search-05.webp"), 2400, 1316),
      img(require("./assets/global-search-06.webp"), 2400, 884),
      img(require("./assets/global-search-07.webp"), 2400, 610),
    ],
  },
  {
    title: "Levels of Navigation",
    storyTitle: "Components/Navigation/Header/Docs/Levels of Navigation",
    images: [
      img(require("./assets/levels-of-navigation-00.webp"), 6384, 860),
      img(require("./assets/levels-of-navigation-01.webp"), 6384, 752),
      img(require("./assets/levels-of-navigation-02.webp"), 6384, 2454),
      img(require("./assets/levels-of-navigation-03.webp"), 6384, 682),
      img(require("./assets/levels-of-navigation-04.webp"), 6384, 682),
      img(require("./assets/levels-of-navigation-05.webp"), 6384, 822),
      img(require("./assets/levels-of-navigation-06.webp"), 6384, 1102),
      img(require("./assets/levels-of-navigation-07.webp"), 6384, 1172),
      img(require("./assets/levels-of-navigation-08.webp"), 6384, 1172),
      img(require("./assets/levels-of-navigation-09.webp"), 6384, 822),
      img(require("./assets/levels-of-navigation-10.webp"), 6384, 1322),
      img(require("./assets/levels-of-navigation-11.webp"), 6384, 2454),
      img(require("./assets/levels-of-navigation-12.webp"), 6384, 3838),
    ],
  },
];
