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
 * Radio Button docs — Figma Final Pulse canvas Radio Button (8:3487).
 * Per-section hi-res exports (scale 2) stitched in catalog order.
 */
export const RADIO_BUTTON_DOCS_PAGES: DocPage[] = [
  {
    title: "Radio Button",
    storyTitle: "Components/Data Entry/Radio Button/Docs/Radio Button",
    images: [
      img(require("./assets/radio-button-00.webp"), 2400, 360),
      img(require("./assets/radio-button-01.webp"), 2400, 1000),
      img(require("./assets/radio-button-02.webp"), 2400, 200),
      img(require("./assets/radio-button-03.webp"), 2400, 178),
      img(require("./assets/radio-button-04.webp"), 2400, 240),
      img(require("./assets/radio-button-05.webp"), 2400, 178),
      img(require("./assets/radio-button-06.webp"), 2400, 178),
      img(require("./assets/radio-button-07.webp"), 2400, 400),
      img(require("./assets/radio-button-08.webp"), 2400, 200),
      img(require("./assets/radio-button-09.webp"), 2400, 178),
      img(require("./assets/radio-button-10.webp"), 2400, 112),
      img(require("./assets/radio-button-11.webp"), 2400, 464),
      img(require("./assets/radio-button-12.webp"), 2400, 200),
      img(require("./assets/radio-button-13.webp"), 2400, 178),
      img(require("./assets/radio-button-14.webp"), 2400, 912),
      img(require("./assets/radio-button-15.webp"), 2400, 96),
      img(require("./assets/radio-button-16.webp"), 2400, 912),
      img(require("./assets/radio-button-17.webp"), 2400, 200),
      img(require("./assets/radio-button-18.webp"), 2400, 178),
      img(require("./assets/radio-button-19.webp"), 2400, 178),
      img(require("./assets/radio-button-20.webp"), 2400, 896),
      img(require("./assets/radio-button-21.webp"), 2400, 178),
      img(require("./assets/radio-button-22.webp"), 2400, 178),
      img(require("./assets/radio-button-23.webp"), 2400, 112),
      img(require("./assets/radio-button-24.webp"), 1080, 688),
      img(require("./assets/radio-button-25.webp"), 2400, 178),
      img(require("./assets/radio-button-26.webp"), 2400, 240),
      img(require("./assets/radio-button-27.webp"), 2400, 200),
      img(require("./assets/radio-button-28.webp"), 2400, 178),
      img(require("./assets/radio-button-29.webp"), 2400, 576),
      img(require("./assets/radio-button-30.webp"), 2400, 178),
      img(require("./assets/radio-button-31.webp"), 2400, 200),
      img(require("./assets/radio-button-32.webp"), 2400, 178),
      img(require("./assets/radio-button-33.webp"), 2400, 88),
      img(require("./assets/radio-button-34.webp"), 1316, 808),
    ],
  },
];