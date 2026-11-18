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
 * Stepper docs — Figma Final Pulse Stepper documentation canvas (13:3737).
 * Per-section hi-res exports (scale 2) stitched in catalog order.
 */
export const STEPPER_DOCS_PAGES: DocPage[] = [
  {
    title: "Stepper",
    storyTitle: "Components/Stepper/Docs/Stepper",
    images: [
      img(require("./assets/stepper-00.webp"), 2400, 360),
      img(require("./assets/stepper-01.webp"), 2400, 1000),
      img(require("./assets/stepper-02.webp"), 2400, 200),
      img(require("./assets/stepper-03.webp"), 2400, 178),
      img(require("./assets/stepper-04.webp"), 2400, 240),
      img(require("./assets/stepper-05.webp"), 2400, 178),
      img(require("./assets/stepper-06.webp"), 2400, 178),
      img(require("./assets/stepper-07.webp"), 2400, 320),
      img(require("./assets/stepper-08.webp"), 2400, 200),
      img(require("./assets/stepper-09.webp"), 2400, 178),
      img(require("./assets/stepper-10.webp"), 2400, 784),
      img(require("./assets/stepper-11.webp"), 2400, 200),
      img(require("./assets/stepper-12.webp"), 2400, 178),
      img(require("./assets/stepper-13.webp"), 2400, 848),
      img(require("./assets/stepper-14.webp"), 2400, 96),
      img(require("./assets/stepper-15.webp"), 2400, 912),
      img(require("./assets/stepper-16.webp"), 2400, 200),
      img(require("./assets/stepper-17.webp"), 2400, 178),
      img(require("./assets/stepper-18.webp"), 2400, 178),
      img(require("./assets/stepper-19.webp"), 2400, 896),
      img(require("./assets/stepper-20.webp"), 2400, 178),
      img(require("./assets/stepper-21.webp"), 2400, 176),
      img(require("./assets/stepper-22.webp"), 2400, 178),
      img(require("./assets/stepper-23.webp"), 2400, 178),
      img(require("./assets/stepper-24.webp"), 2400, 768),
      img(require("./assets/stepper-25.webp"), 2400, 178),
      img(require("./assets/stepper-26.webp"), 2400, 1068),
      img(require("./assets/stepper-27.webp"), 2400, 88),
    ],
  },
];