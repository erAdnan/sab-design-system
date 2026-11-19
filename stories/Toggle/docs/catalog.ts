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
 * Toggle docs — Figma Final Pulse canvas Toggle (8:3497).
 * Per-section hi-res exports (scale 2) stitched in catalog order.
 */
export const TOGGLE_DOCS_PAGES: DocPage[] = [
  {
    title: "Toggle",
    storyTitle: "Components/Data Entry/Toggle/Docs/Toggle",
    images: [
      img(require("./assets/toggle-00.webp"), 2400, 360),
      img(require("./assets/toggle-01.webp"), 2400, 1000),
      img(require("./assets/toggle-02.webp"), 2400, 200),
      img(require("./assets/toggle-03.webp"), 2400, 178),
      img(require("./assets/toggle-04.webp"), 2400, 240),
      img(require("./assets/toggle-05.webp"), 2400, 178),
      img(require("./assets/toggle-06.webp"), 2400, 178),
      img(require("./assets/toggle-07.webp"), 2400, 366),
      img(require("./assets/toggle-08.webp"), 2400, 200),
      img(require("./assets/toggle-09.webp"), 2400, 178),
      img(require("./assets/toggle-10.webp"), 2400, 528),
      img(require("./assets/toggle-11.webp"), 2400, 200),
      img(require("./assets/toggle-12.webp"), 2400, 178),
      img(require("./assets/toggle-13.webp"), 2400, 912),
      img(require("./assets/toggle-14.webp"), 2400, 96),
      img(require("./assets/toggle-15.webp"), 2400, 976),
      img(require("./assets/toggle-16.webp"), 2400, 200),
      img(require("./assets/toggle-17.webp"), 2400, 178),
      img(require("./assets/toggle-18.webp"), 2400, 178),
      img(require("./assets/toggle-19.webp"), 2400, 1024),
      img(require("./assets/toggle-20.webp"), 2400, 112),
      img(require("./assets/toggle-21.webp"), 2400, 200),
      img(require("./assets/toggle-22.webp"), 2400, 178),
      img(require("./assets/toggle-23.webp"), 2400, 896),
      img(require("./assets/toggle-24.webp"), 2400, 200),
      img(require("./assets/toggle-25.webp"), 2400, 178),
      img(require("./assets/toggle-26.webp"), 2400, 88),
      img(require("./assets/toggle-27.webp"), 1498, 641),
    ],
  },
];
