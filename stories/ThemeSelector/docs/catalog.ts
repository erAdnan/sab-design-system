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

/** Theme selector — Figma Final Pulse canvas (15234:56750); header + body exports. */
export const THEME_SELECTOR_DOCS_PAGES: DocPage[] = [
  {
    title: "Theme selector",
    storyTitle: "Components/ThemeSelector/Docs/Theme selector",
    images: [
      img(require("./assets/theme-selector-00.webp"), 2800, 331),
      img(require("./assets/theme-selector-01.webp"), 1400, 6902),
    ],
  },
];
