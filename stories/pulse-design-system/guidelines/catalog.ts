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

/** Guidelines pages — Figma node 22021:151699 children (left → right). */
export const GUIDELINES_PAGES: DocPage[] = [
  {
    title: "Terminology",
    storyTitle: "Pulse Design System/Guidelines/Terminology",
    images: [img(require("./assets/terminology.png"), 1400, 3019)],
  },
  {
    title: "Spacing",
    storyTitle: "Pulse Design System/Guidelines/Spacing",
    images: [img(require("./assets/spacing.png"), 1400, 9705)],
  },
  {
    title: "Colours",
    storyTitle: "Pulse Design System/Guidelines/Colours",
    images: [img(require("./assets/colours.png"), 1400, 8015)],
  },
  {
    title: "Font Size",
    storyTitle: "Pulse Design System/Guidelines/Font Size",
    images: [img(require("./assets/font-size.png"), 1400, 9730)],
  },
  {
    title: "Spacing — English & Arabic",
    storyTitle: "Pulse Design System/Guidelines/Spacing — English & Arabic",
    images: [img(require("./assets/spacing-english-arabic.png"), 1400, 10068)],
  },
  {
    title: "Padding",
    storyTitle: "Pulse Design System/Guidelines/Padding",
    images: [img(require("./assets/padding.png"), 1400, 6026)],
  },
  {
    title: "Border Radius",
    storyTitle: "Pulse Design System/Guidelines/Border Radius",
    images: [img(require("./assets/border-radius.png"), 1400, 3616)],
  },
  {
    title: "Icon Sizes",
    storyTitle: "Pulse Design System/Guidelines/Icon Sizes",
    images: [img(require("./assets/icon-sizes.png"), 1400, 6144)],
  },
  {
    title: "Layout",
    storyTitle: "Pulse Design System/Guidelines/Layout",
    images: [img(require("./assets/layout.png"), 1400, 7841)],
  },
  {
    title: "Basic Screen Construction",
    storyTitle: "Pulse Design System/Guidelines/Basic Screen Construction",
    images: [img(require("./assets/basic-screen-construction.png"), 6705, 1973)],
  },
];
