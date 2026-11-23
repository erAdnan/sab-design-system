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

/** Tracker — Figma Final Pulse canvas (4391:37792); per-section hi-res exports. */
export const TRACKER_DOCS_PAGES: DocPage[] = [
  {
    title: "Tracker",
    storyTitle: "Components/Data Display/Tracker/Docs/Tracker",
    images: [
      img(require("./assets/tracker-00.webp"), 2400, 360),
      img(require("./assets/tracker-01.webp"), 2400, 1000),
      img(require("./assets/tracker-02.webp"), 2400, 200),
      img(require("./assets/tracker-03.webp"), 2400, 178),
      img(require("./assets/tracker-04.webp"), 2400, 280),
      img(require("./assets/tracker-05.webp"), 2400, 178),
      img(require("./assets/tracker-06.webp"), 2400, 178),
      img(require("./assets/tracker-07.webp"), 2400, 1960),
      img(require("./assets/tracker-08.webp"), 2400, 200),
      img(require("./assets/tracker-09.webp"), 2400, 178),
      img(require("./assets/tracker-10.webp"), 2400, 912),
      img(require("./assets/tracker-11.webp"), 2400, 96),
      img(require("./assets/tracker-12.webp"), 2400, 912),
      img(require("./assets/tracker-13.webp"), 2400, 96),
      img(require("./assets/tracker-14.webp"), 2400, 200),
      img(require("./assets/tracker-15.webp"), 2400, 178),
      img(require("./assets/tracker-16.webp"), 2400, 178),
      img(require("./assets/tracker-17.webp"), 2400, 720),
      img(require("./assets/tracker-18.webp"), 2400, 178),
      img(require("./assets/tracker-19.webp"), 2400, 178),
      img(require("./assets/tracker-20.webp"), 2400, 688),
      img(require("./assets/tracker-21.webp"), 2400, 178),
      img(require("./assets/tracker-22.webp"), 2400, 200),
      img(require("./assets/tracker-23.webp"), 2400, 178),
      img(require("./assets/tracker-24.webp"), 2400, 88),
      img(require("./assets/tracker-25.webp"), 2400, 328),
    ],
  },
];
