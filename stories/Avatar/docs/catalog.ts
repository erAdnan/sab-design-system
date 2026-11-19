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

/**
 * Avatar docs — Figma Final Pulse canvas Avatar.
 * Per-section hi-res exports stitched in catalog order.
 */
export const AVATAR_DOCS_PAGES: DocPage[] = [
  {
    title: "Avatar — Documentation",
    storyTitle: "Components/Data Display/Avatar/Docs/Avatar — Documentation",
    images: [
      img(require("./assets/avatar-documentation-00.webp"), 2400, 298),
      img(require("./assets/avatar-documentation-01.webp"), 2400, 80),
      img(require("./assets/avatar-documentation-02.webp"), 2400, 80),
      img(require("./assets/avatar-documentation-03.webp"), 2400, 1200),
      img(require("./assets/avatar-documentation-04.webp"), 2400, 458),
      img(require("./assets/avatar-documentation-05.webp"), 2400, 128),
      img(require("./assets/avatar-documentation-06.webp"), 2400, 2492),
      img(require("./assets/avatar-documentation-07.webp"), 2400, 128),
      img(require("./assets/avatar-documentation-08.webp"), 2400, 708),
      img(require("./assets/avatar-documentation-09.webp"), 2400, 80),
      img(require("./assets/avatar-documentation-10.webp"), 2400, 80),
      img(require("./assets/avatar-documentation-11.webp"), 2400, 1036),
      img(require("./assets/avatar-documentation-12.webp"), 2400, 80),
      img(require("./assets/avatar-documentation-13.webp"), 2400, 80),
      img(require("./assets/avatar-documentation-14.webp"), 2400, 1236),
      img(require("./assets/avatar-documentation-15.webp"), 2400, 64),
      img(require("./assets/avatar-documentation-16.webp"), 2400, 80),
      img(require("./assets/avatar-documentation-17.webp"), 2400, 2262),
      img(require("./assets/avatar-documentation-18.webp"), 2400, 80),
      img(require("./assets/avatar-documentation-19.webp"), 2400, 178),
      img(require("./assets/avatar-documentation-20.webp"), 2326, 95),
      img(require("./assets/avatar-documentation-21.webp"), 2400, 178),
      img(require("./assets/avatar-documentation-22.webp"), 2400, 688),
      img(require("./assets/avatar-documentation-23.webp"), 2400, 178),
      img(require("./assets/avatar-documentation-24.webp"), 2400, 688),
      img(require("./assets/avatar-documentation-25.webp"), 2400, 178),
      img(require("./assets/avatar-documentation-26.webp"), 2400, 688),
      img(require("./assets/avatar-documentation-27.webp"), 2400, 178),
      img(require("./assets/avatar-documentation-28.webp"), 2406, 694),
      img(require("./assets/avatar-documentation-29.webp"), 2400, 80),
      img(require("./assets/avatar-documentation-30.webp"), 2400, 80),
      img(require("./assets/avatar-documentation-31.webp"), 2400, 2792),
    ],
  },
  {
    title: "User profile — Documentation",
    storyTitle: "Components/Data Display/Avatar/Docs/User profile — Documentation",
    images: [
      img(require("./assets/user-profile-documentation-00.webp"), 2400, 298),
      img(require("./assets/user-profile-documentation-01.webp"), 2400, 80),
      img(require("./assets/user-profile-documentation-02.webp"), 2400, 80),
      img(require("./assets/user-profile-documentation-03.webp"), 2400, 1200),
      img(require("./assets/user-profile-documentation-04.webp"), 2400, 386),
      img(require("./assets/user-profile-documentation-05.webp"), 2400, 128),
      img(require("./assets/user-profile-documentation-06.webp"), 2400, 692),
      img(require("./assets/user-profile-documentation-07.webp"), 2400, 80),
      img(require("./assets/user-profile-documentation-08.webp"), 2400, 80),
      img(require("./assets/user-profile-documentation-09.webp"), 2400, 1492),
      img(require("./assets/user-profile-documentation-10.webp"), 2400, 64),
      img(require("./assets/user-profile-documentation-11.webp"), 2400, 80),
      img(require("./assets/user-profile-documentation-12.webp"), 2400, 1300),
      img(require("./assets/user-profile-documentation-13.webp"), 2400, 80),
      img(require("./assets/user-profile-documentation-14.webp"), 2400, 80),
      img(require("./assets/user-profile-documentation-15.webp"), 2400, 80),
      img(require("./assets/user-profile-documentation-16.webp"), 2400, 338),
    ],
  },
];
