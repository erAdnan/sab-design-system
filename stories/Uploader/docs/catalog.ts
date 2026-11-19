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
 * Upload docs — Figma Upload canvas sections.
 * Per-section hi-res exports (scale 2) stitched in catalog order.
 */
export const UPLOADER_DOCS_PAGES: DocPage[] = [
  {
    title: "Upload",
    storyTitle: "Components/Data Entry/Uploader/Docs/Upload",
    images: [
      img(require("./assets/upload-00.webp"), 2400, 360),
      img(require("./assets/upload-01.webp"), 2400, 1000),
      img(require("./assets/upload-02.webp"), 2400, 200),
      img(require("./assets/upload-03.webp"), 2400, 178),
      img(require("./assets/upload-04.webp"), 2400, 240),
      img(require("./assets/upload-05.webp"), 2400, 178),
      img(require("./assets/upload-06.webp"), 2400, 178),
      img(require("./assets/upload-07.webp"), 2400, 808),
      img(require("./assets/upload-08.webp"), 2400, 200),
      img(require("./assets/upload-09.webp"), 2400, 178),
      img(require("./assets/upload-10.webp"), 2400, 912),
      img(require("./assets/upload-11.webp"), 2400, 200),
      img(require("./assets/upload-12.webp"), 2400, 178),
      img(require("./assets/upload-13.webp"), 2400, 912),
      img(require("./assets/upload-14.webp"), 2400, 96),
      img(require("./assets/upload-15.webp"), 2400, 912),
      img(require("./assets/upload-16.webp"), 2400, 200),
      img(require("./assets/upload-17.webp"), 2400, 178),
      img(require("./assets/upload-18.webp"), 2400, 178),
      img(require("./assets/upload-19.webp"), 2400, 688),
      img(require("./assets/upload-20.webp"), 2400, 178),
      img(require("./assets/upload-21.webp"), 2400, 688),
      img(require("./assets/upload-22.webp"), 2400, 178),
      img(require("./assets/upload-23.webp"), 2400, 178),
      img(require("./assets/upload-24.webp"), 2400, 688),
      img(require("./assets/upload-25.webp"), 2400, 178),
      img(require("./assets/upload-26.webp"), 2400, 688),
      img(require("./assets/upload-27.webp"), 2400, 178),
      img(require("./assets/upload-28.webp"), 2400, 178),
      img(require("./assets/upload-29.webp"), 2400, 960),
      img(require("./assets/upload-30.webp"), 2400, 178),
      img(require("./assets/upload-31.webp"), 2400, 200),
      img(require("./assets/upload-32.webp"), 2400, 178),
      img(require("./assets/upload-33.webp"), 2400, 88),
      img(require("./assets/upload-34.webp"), 1692, 1680),
    ],
  },
];
