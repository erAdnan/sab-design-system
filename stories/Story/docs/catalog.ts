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

/** Story — Figma Final Pulse canvas (2253:2450); per-section hi-res exports. */
export const STORY_DOCS_PAGES: DocPage[] = [
  {
    title: "Story",
    storyTitle: "Components/Story/Docs/Story",
    images: [
      img(require("./assets/story-00.webp"), 2800, 331),
      img(require("./assets/story-01.webp"), 2400, 1666),
      img(require("./assets/story-02.webp"), 2400, 754),
      img(require("./assets/story-03.webp"), 2400, 1262),
      img(require("./assets/story-04.webp"), 2400, 1446),
      img(require("./assets/story-05.webp"), 2400, 1492),
      img(require("./assets/story-06.webp"), 2400, 2162),
      img(require("./assets/story-07.webp"), 2400, 1466),
      img(require("./assets/story-08.webp"), 2400, 682),
      img(require("./assets/story-09.webp"), 2400, 560),
    ],
  },
];
