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

/** Updating Governance pages — Figma node 22021:151701 (top → bottom). */
export const UPDATING_GOVERNANCE_PAGES: DocPage[] = [
  {
    title: "Governance Model - DS Communication channel",
    storyTitle:
      "Pulse Design System/Updating Governance/Governance Model - DS Communication channel",
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
    storyTitle: "Pulse Design System/Updating Governance/Changelog",
    images: [img(require("./assets/changelog.webp"), 1280, 716)],
  },
];
