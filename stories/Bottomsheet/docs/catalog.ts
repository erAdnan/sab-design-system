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

/** Bottomsheet — Figma Final Pulse canvas (17468:13574); header + body exports. */
export const BOTTOMSHEET_DOCS_PAGES: DocPage[] = [
  {
    title: "Bottomsheet - drawer",
    storyTitle: "Components/Bottomsheet/Docs/Bottomsheet - drawer",
    images: [
      img(require("./assets/bottomsheet-00.webp"), 2800, 331),
      img(require("./assets/bottomsheet-01.webp"), 1400, 6000),
      img(require("./assets/bottomsheet-02.webp"), 1400, 6000),
      img(require("./assets/bottomsheet-03.webp"), 1400, 6000),
      img(require("./assets/bottomsheet-04.webp"), 1400, 196),
    ],
  },
  {
    title: "Bottom sheet - Button group Rules",
    storyTitle:
      "Components/Bottomsheet/Docs/Bottom sheet - Button group Rules",
    images: [
      img(require("./assets/button-group-rules-00.webp"), 2800, 331),
      img(require("./assets/button-group-rules-01.webp"), 1400, 8539),
    ],
  },
  {
    title: "Bottom sheet Basic Rules",
    storyTitle: "Components/Bottomsheet/Docs/Bottom sheet Basic Rules",
    // Body doc.Blocks from Figma page 22021:232361 (same section set as Rules/Bottom sheet)
    images: [
      img(require("./assets/basic-rules-01.webp"), 1440, 621),
      img(require("./assets/basic-rules-02.webp"), 1440, 1177),
      img(require("./assets/basic-rules-03.webp"), 1440, 2670),
      img(require("./assets/basic-rules-04.webp"), 1440, 1734),
      img(require("./assets/basic-rules-05.webp"), 1440, 1594),
      img(require("./assets/basic-rules-06.webp"), 1440, 1559),
      img(require("./assets/basic-rules-07.webp"), 1440, 4668),
      img(require("./assets/basic-rules-08.webp"), 1440, 3461),
      img(require("./assets/basic-rules-09.webp"), 1440, 717),
      img(require("./assets/basic-rules-10.webp"), 1440, 752),
      img(require("./assets/basic-rules-11.webp"), 1440, 1874),
      img(require("./assets/basic-rules-12.webp"), 1440, 4779),
      img(require("./assets/basic-rules-13.webp"), 1440, 2948),
      img(require("./assets/basic-rules-14.webp"), 1440, 1574),
      img(require("./assets/basic-rules-15.webp"), 1440, 2659),
      img(require("./assets/basic-rules-16.webp"), 1440, 3784),
      img(require("./assets/basic-rules-17.webp"), 1440, 1644),
      img(require("./assets/basic-rules-18.webp"), 1440, 1574),
      img(require("./assets/basic-rules-19.webp"), 1440, 3762),
      img(require("./assets/basic-rules-20.webp"), 1440, 4954),
      img(require("./assets/basic-rules-21.webp"), 1440, 3077),
      img(require("./assets/basic-rules-22.webp"), 1440, 5264),
      img(require("./assets/basic-rules-23.webp"), 1440, 13030),
      img(require("./assets/basic-rules-24.webp"), 1440, 13990),
    ],
  },
];
