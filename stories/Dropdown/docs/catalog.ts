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
 * Dropdown docs — Figma Final Pulse canvas Dropdown.
 * Per-section hi-res exports stitched in catalog order.
 */
export const DROPDOWN_DOCS_PAGES: DocPage[] = [
  {
    title: "Dropdown- Home Page",
    storyTitle: "Components/Dropdown/Docs/Dropdown- Home Page",
    images: [
      img(require("./assets/dropdown-home-page-00.webp"), 2400, 462),
      img(require("./assets/dropdown-home-page-01.webp"), 2400, 1200),
      img(require("./assets/dropdown-home-page-02.webp"), 2400, 200),
      img(require("./assets/dropdown-home-page-03.webp"), 2400, 178),
      img(require("./assets/dropdown-home-page-04.webp"), 2400, 362),
      img(require("./assets/dropdown-home-page-05.webp"), 2400, 178),
      img(require("./assets/dropdown-home-page-06.webp"), 2400, 178),
      img(require("./assets/dropdown-home-page-07.webp"), 2400, 1440),
      img(require("./assets/dropdown-home-page-08.webp"), 2400, 178),
      img(require("./assets/dropdown-home-page-09.webp"), 2400, 178),
      img(require("./assets/dropdown-home-page-10.webp"), 2400, 1120),
      img(require("./assets/dropdown-home-page-11.webp"), 2400, 200),
      img(require("./assets/dropdown-home-page-12.webp"), 2400, 178),
      img(require("./assets/dropdown-home-page-13.webp"), 2400, 624),
      img(require("./assets/dropdown-home-page-14.webp"), 2400, 200),
      img(require("./assets/dropdown-home-page-15.webp"), 2400, 178),
      img(require("./assets/dropdown-home-page-16.webp"), 2400, 912),
      img(require("./assets/dropdown-home-page-17.webp"), 2400, 96),
      img(require("./assets/dropdown-home-page-18.webp"), 2400, 912),
      img(require("./assets/dropdown-home-page-19.webp"), 2400, 96),
      img(require("./assets/dropdown-home-page-20.webp"), 2400, 912),
      img(require("./assets/dropdown-home-page-21.webp"), 2400, 200),
      img(require("./assets/dropdown-home-page-22.webp"), 2400, 178),
      img(require("./assets/dropdown-home-page-23.webp"), 2400, 178),
      img(require("./assets/dropdown-home-page-24.webp"), 2400, 688),
      img(require("./assets/dropdown-home-page-25.webp"), 2400, 178),
      img(require("./assets/dropdown-home-page-26.webp"), 2400, 178),
      img(require("./assets/dropdown-home-page-27.webp"), 2400, 688),
      img(require("./assets/dropdown-home-page-28.webp"), 2400, 178),
      img(require("./assets/dropdown-home-page-29.webp"), 2400, 178),
      img(require("./assets/dropdown-home-page-30.webp"), 2400, 688),
      img(require("./assets/dropdown-home-page-31.webp"), 2400, 178),
      img(require("./assets/dropdown-home-page-32.webp"), 2400, 178),
      img(require("./assets/dropdown-home-page-33.webp"), 2400, 416),
      img(require("./assets/dropdown-home-page-34.webp"), 2400, 416),
      img(require("./assets/dropdown-home-page-35.webp"), 2400, 200),
      img(require("./assets/dropdown-home-page-36.webp"), 2400, 178),
      img(require("./assets/dropdown-home-page-37.webp"), 2382, 1022),
    ],
  },
];
