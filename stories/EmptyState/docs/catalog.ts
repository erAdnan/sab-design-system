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

/** Empty State — Figma Final Pulse canvas (36:576); per-section hi-res exports. */
export const EMPTY_STATE_DOCS_PAGES: DocPage[] = [
  {
    title: "Empty State",
    storyTitle: "Components/EmptyState/Docs/Empty State",
    images: [
      img(require("./assets/empty-state-00.webp"), 2400, 462),
      img(require("./assets/empty-state-01.webp"), 2400, 1200),
      img(require("./assets/empty-state-02.webp"), 2400, 670),
      img(require("./assets/empty-state-03.webp"), 2400, 2220),
      img(require("./assets/empty-state-04.webp"), 1200, 2524),
      img(require("./assets/empty-state-05.webp"), 2400, 750),
      img(require("./assets/empty-state-06.webp"), 2400, 1128),
      img(require("./assets/empty-state-07.webp"), 2400, 976),
      img(require("./assets/empty-state-08.webp"), 2400, 1040),
      img(require("./assets/empty-state-09.webp"), 2400, 976),
      img(require("./assets/empty-state-10.webp"), 2400, 352),
      img(require("./assets/empty-state-11.webp"), 2400, 416),
      img(require("./assets/empty-state-12.webp"), 766, 2624),
    ],
  },
];
