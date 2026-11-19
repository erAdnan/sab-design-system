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

/** Mobile Native Components — Figma Final Pulse canvas (755:4645). */
export const MOBILE_NATIVE_COMPONENTS_DOCS_PAGES: DocPage[] = [
  {
    title: "Native Components",
    storyTitle: "Components/Mobile Native Components/Docs/Native Components",
    images: [
      img(require("./assets/native-components-00.webp"), 2800, 331),
      img(require("./assets/native-components-01.webp"), 1200, 180),
      img(require("./assets/native-components-02.webp"), 1200, 500),
      img(require("./assets/native-components-03.webp"), 1200, 1615),
      img(require("./assets/native-components-04.webp"), 1200, 7799),
      img(require("./assets/native-components-05.webp"), 1200, 1289),
    ],
  },
];
