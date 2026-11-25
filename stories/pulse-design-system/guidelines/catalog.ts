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
    images: [img(require("./assets/terminology.webp"), 1400, 3019)],
  },
  {
    title: "Spacing",
    storyTitle: "Pulse Design System/Guidelines/Spacing",
    images: [
      img(require("./assets/spacing-01-rules.webp"), 2800, 3592),
      img(require("./assets/spacing-02-xs.webp"), 2800, 2946),
      img(require("./assets/spacing-03-s.webp"), 2800, 2871),
      img(require("./assets/spacing-04-m.webp"), 2800, 2871),
      img(require("./assets/spacing-05-l.webp"), 2800, 2871),
      img(require("./assets/spacing-06-general.webp"), 2800, 3227),
    ],
  },
  {
    title: "Colours",
    storyTitle: "Pulse Design System/Guidelines/Colours",
    images: [img(require("./assets/colours.webp"), 2800, 15974)],
  },
  {
    title: "Font Size",
    storyTitle: "Pulse Design System/Guidelines/Font Size",
    images: [
      img(require("./assets/font-size-01-rules.webp"), 2800, 3996),
      img(require("./assets/font-size-02-title3.webp"), 2800, 2898),
      img(require("./assets/font-size-03-headline.webp"), 2800, 2898),
      img(require("./assets/font-size-04-body.webp"), 2800, 2770),
      img(require("./assets/font-size-05-general.webp"), 2800, 2998),
    ],
  },
  {
    title: "Spacing — English & Arabic",
    storyTitle: "Pulse Design System/Guidelines/Spacing — English & Arabic",
    images: [img(require("./assets/spacing-english-arabic.webp"), 1400, 10068)],
  },
  {
    title: "Padding",
    storyTitle: "Pulse Design System/Guidelines/Padding",
    images: [img(require("./assets/padding.webp"), 2800, 11263)],
  },
  {
    title: "Border Radius",
    storyTitle: "Pulse Design System/Guidelines/Border Radius",
    images: [img(require("./assets/border-radius.webp"), 2800, 9860)],
  },
  {
    title: "Icon Sizes",
    storyTitle: "Pulse Design System/Guidelines/Icon Sizes",
    images: [img(require("./assets/icon-sizes.webp"), 2800, 12131)],
  },
  {
    title: "Layout",
    storyTitle: "Pulse Design System/Guidelines/Layout",
    images: [img(require("./assets/layout.webp"), 1400, 7841)],
  },
  {
    title: "Basic Screen Construction",
    storyTitle: "Pulse Design System/Guidelines/Basic Screen Construction",
    images: [img(require("./assets/basic-screen-construction.webp"), 2880, 847)],
  },
];
