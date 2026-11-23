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
 * Accordion docs — Figma Final Pulse canvas Accordion.
 * Per-section hi-res exports stitched in catalog order.
 */
export const ACCORDION_DOCS_PAGES: DocPage[] = [
  {
    title: "Accordion",
    storyTitle: "Components/Data Display/Accordion/Docs/Accordion",
    images: [
      img(require("./assets/accordion-00.webp"), 2400, 360),
      img(require("./assets/accordion-01.webp"), 2400, 1000),
      img(require("./assets/accordion-02.webp"), 2400, 200),
      img(require("./assets/accordion-03.webp"), 2400, 178),
      img(require("./assets/accordion-04.webp"), 2400, 968),
      img(require("./assets/accordion-05.webp"), 2400, 178),
      img(require("./assets/accordion-06.webp"), 2400, 178),
      img(require("./assets/accordion-07.webp"), 506, 72),
      img(require("./assets/accordion-08.webp"), 2100, 48),
      img(require("./assets/accordion-09.webp"), 2038, 96),
      img(require("./assets/accordion-10.webp"), 2038, 808),
      img(require("./assets/accordion-11.webp"), 2038, 808),
      img(require("./assets/accordion-12.webp"), 2038, 710),
      img(require("./assets/accordion-13.webp"), 2400, 74),
      img(require("./assets/accordion-14.webp"), 2038, 96),
      img(require("./assets/accordion-15.webp"), 2038, 2630),
      img(require("./assets/accordion-16.webp"), 2240, 574),
      img(require("./assets/accordion-17.webp"), 2240, 886),
      img(require("./assets/accordion-18.webp"), 2400, 200),
      img(require("./assets/accordion-19.webp"), 2400, 178),
      img(require("./assets/accordion-20.webp"), 2400, 944),
      img(require("./assets/accordion-21.webp"), 2400, 200),
      img(require("./assets/accordion-22.webp"), 2400, 178),
      img(require("./assets/accordion-23.webp"), 2400, 976),
      img(require("./assets/accordion-24.webp"), 2400, 96),
      img(require("./assets/accordion-25.webp"), 2400, 1040),
      img(require("./assets/accordion-26.webp"), 2400, 96),
      img(require("./assets/accordion-27.webp"), 2400, 200),
      img(require("./assets/accordion-28.webp"), 2400, 178),
      img(require("./assets/accordion-29.webp"), 2400, 178),
      img(require("./assets/accordion-30.webp"), 2400, 1472),
      img(require("./assets/accordion-31.webp"), 2400, 178),
      img(require("./assets/accordion-32.webp"), 2400, 178),
      img(require("./assets/accordion-33.webp"), 2400, 918),
      img(require("./assets/accordion-34.webp"), 2400, 200),
      img(require("./assets/accordion-35.webp"), 2400, 178),
      img(require("./assets/accordion-36.webp"), 2480, 1988),
      img(require("./assets/accordion-37.webp"), 2400, 178),
      img(require("./assets/accordion-38.webp"), 2400, 88),
      img(require("./assets/accordion-39.webp"), 2384, 64),
      img(require("./assets/accordion-40.webp"), 766, 384),
      img(require("./assets/accordion-41.webp"), 1532, 2742),
      img(require("./assets/accordion-42.webp"), 766, 2093),
    ],
  },
];
