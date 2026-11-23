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
 * Banners docs — Figma Final Pulse canvas `↳ Banners` (1314:9025).
 * Per-section hi-res exports (scale 2) stitched in catalog order.
 */
export const BANNERS_DOCS_PAGES: DocPage[] = [
  {
    title: "Marketing Banner",
    storyTitle: "Components/Data Display/Banners/Docs/Marketing Banner",
    images: [
      img(require("./assets/marketing-banner-00.webp"), 2400, 362),
      img(require("./assets/marketing-banner-01.webp"), 2400, 1000),
      img(require("./assets/marketing-banner-02.webp"), 2400, 200),
      img(require("./assets/marketing-banner-03.webp"), 2400, 178),
      img(require("./assets/marketing-banner-04.webp"), 2400, 382),
      img(require("./assets/marketing-banner-05.webp"), 2400, 178),
      img(require("./assets/marketing-banner-06.webp"), 2400, 178),
      img(require("./assets/marketing-banner-07.webp"), 2400, 880),
      img(require("./assets/marketing-banner-08.webp"), 2400, 200),
      img(require("./assets/marketing-banner-09.webp"), 2400, 178),
      img(require("./assets/marketing-banner-10.webp"), 2400, 1852),
      img(require("./assets/marketing-banner-11.webp"), 2400, 200),
      img(require("./assets/marketing-banner-12.webp"), 2400, 178),
      img(require("./assets/marketing-banner-13.webp"), 2400, 1264),
      img(require("./assets/marketing-banner-14.webp"), 2400, 96),
      img(require("./assets/marketing-banner-15.webp"), 2400, 1882),
      img(require("./assets/marketing-banner-16.webp"), 2400, 178),
      img(require("./assets/marketing-banner-17.webp"), 2400, 178),
      img(require("./assets/marketing-banner-18.webp"), 766, 982),
    ],
  },
  {
    title: "Promotional Banner — Documentation",
    storyTitle: "Components/Data Display/Banners/Docs/Promotional Banner — Documentation",
    images: [
      img(require("./assets/promotional-banner-documentation-00.webp"), 2400, 1290),
      img(require("./assets/promotional-banner-documentation-01.webp"), 2400, 718),
      img(require("./assets/promotional-banner-documentation-02.webp"), 2400, 822),
      img(require("./assets/promotional-banner-documentation-03.webp"), 2400, 1670),
      img(require("./assets/promotional-banner-documentation-04.webp"), 2400, 1210),
      img(require("./assets/promotional-banner-documentation-05.webp"), 2400, 1070),
      img(require("./assets/promotional-banner-documentation-06.webp"), 2400, 178),
      img(require("./assets/promotional-banner-documentation-07.webp"), 766, 600),
    ],
  },
  {
    title: "Entry Banner — Documentation",
    storyTitle: "Components/Data Display/Banners/Docs/Entry Banner — Documentation",
    images: [
      img(require("./assets/entry-banner-documentation-00.webp"), 2400, 1212),
      img(require("./assets/entry-banner-documentation-01.webp"), 2400, 692),
      img(require("./assets/entry-banner-documentation-02.webp"), 2400, 796),
      img(require("./assets/entry-banner-documentation-03.webp"), 2400, 2042),
      img(require("./assets/entry-banner-documentation-04.webp"), 2400, 1076),
      img(require("./assets/entry-banner-documentation-05.webp"), 2400, 1202),
      img(require("./assets/entry-banner-documentation-06.webp"), 2400, 1070),
      img(require("./assets/entry-banner-documentation-07.webp"), 2400, 178),
      img(require("./assets/entry-banner-documentation-08.webp"), 2400, 1276),
    ],
  },
];
