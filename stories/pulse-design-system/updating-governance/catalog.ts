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

/** Fullwidth solidus so Storybook keeps one sidebar group (ASCII `/` would nest). */
const SECTION = "Pulse Design System/Governance ／ Operating Model";

/** Governance / Operating Model pages. */
export const UPDATING_GOVERNANCE_PAGES: DocPage[] = [
  {
    title: "Operating Model",
    storyTitle: `${SECTION}/Operating Model`,
    images: [img(require("./assets/operating-model.webp"), 3840, 2160)],
  },
  {
    title: "Governance Model - DS Communication channel",
    storyTitle: `${SECTION}/Governance Model - DS Communication channel`,
    images: [
      img(
        require("./assets/governance-model-ds-communication-channel.webp"),
        1280,
        992
      ),
    ],
  },
  {
    title: "Changelog",
    storyTitle: `${SECTION}/Changelog`,
    images: [img(require("./assets/changelog.webp"), 1280, 716)],
  },
];
