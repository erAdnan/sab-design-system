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

/** Calendar — Figma Final Pulse canvas (14209:10136); header + body exports. */
export const CALENDAR_DOCS_PAGES: DocPage[] = [
  {
    title: "Calendar",
    storyTitle: "Components/Data Display/Calendar/Docs/Calendar",
    images: [
      img(require("./assets/calendar-00.webp"), 2800, 331),
      img(require("./assets/calendar-01.webp"), 1400, 10598),
    ],
  },
];
