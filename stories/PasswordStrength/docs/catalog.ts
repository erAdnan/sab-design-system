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

/** Password Strength — Figma Final Pulse canvas (8:3445); per-section hi-res exports. */
export const PASSWORD_STRENGTH_DOCS_PAGES: DocPage[] = [
  {
    title: "Password Strength",
    storyTitle: "Components/PasswordStrength/Docs/Password Strength",
    images: [
      img(require("./assets/password-strength-00.webp"), 2400, 462),
      img(require("./assets/password-strength-01.webp"), 2400, 1200),
      img(require("./assets/password-strength-02.webp"), 2400, 200),
      img(require("./assets/password-strength-03.webp"), 2400, 178),
      img(require("./assets/password-strength-04.webp"), 2400, 670),
      img(require("./assets/password-strength-05.webp"), 2400, 178),
      img(require("./assets/password-strength-06.webp"), 2400, 178),
      img(require("./assets/password-strength-07.webp"), 2400, 892),
      img(require("./assets/password-strength-08.webp"), 2400, 178),
      img(require("./assets/password-strength-09.webp"), 2400, 178),
      img(require("./assets/password-strength-10.webp"), 2400, 1478),
      img(require("./assets/password-strength-11.webp"), 2400, 200),
      img(require("./assets/password-strength-12.webp"), 2400, 178),
      img(require("./assets/password-strength-13.webp"), 2400, 330),
      img(require("./assets/password-strength-14.webp"), 2400, 330),
      img(require("./assets/password-strength-15.webp"), 2400, 330),
      img(require("./assets/password-strength-16.webp"), 2400, 200),
      img(require("./assets/password-strength-17.webp"), 2400, 178),
      img(require("./assets/password-strength-18.webp"), 2400, 976),
      img(require("./assets/password-strength-19.webp"), 2400, 96),
      img(require("./assets/password-strength-20.webp"), 2400, 1040),
      img(require("./assets/password-strength-21.webp"), 2400, 96),
      img(require("./assets/password-strength-22.webp"), 2400, 178),
      img(require("./assets/password-strength-23.webp"), 2400, 178),
      img(require("./assets/password-strength-24.webp"), 2400, 688),
      img(require("./assets/password-strength-25.webp"), 2400, 178),
      img(require("./assets/password-strength-26.webp"), 2400, 178),
      img(require("./assets/password-strength-27.webp"), 2400, 688),
      img(require("./assets/password-strength-28.webp"), 2400, 178),
      img(require("./assets/password-strength-29.webp"), 2400, 178),
      img(require("./assets/password-strength-30.webp"), 2400, 688),
      img(require("./assets/password-strength-31.webp"), 2400, 178),
      img(require("./assets/password-strength-32.webp"), 2400, 200),
      img(require("./assets/password-strength-33.webp"), 2400, 178),
      img(require("./assets/password-strength-34.webp"), 2400, 288),
      img(require("./assets/password-strength-35.webp"), 2400, 352),
      img(require("./assets/password-strength-36.webp"), 2400, 200),
      img(require("./assets/password-strength-37.webp"), 2400, 178),
      img(require("./assets/password-strength-38.webp"), 750, 206),
    ],
  },
  {
    title: "PIN",
    storyTitle: "Components/PasswordStrength/Docs/PIN",
    images: [
      img(require("./assets/pin-00.webp"), 2400, 462),
      img(require("./assets/pin-01.webp"), 2400, 1200),
      img(require("./assets/pin-02.webp"), 2400, 200),
      img(require("./assets/pin-03.webp"), 2400, 178),
      img(require("./assets/pin-04.webp"), 2400, 928),
      img(require("./assets/pin-05.webp"), 2400, 178),
      img(require("./assets/pin-06.webp"), 2400, 178),
      img(require("./assets/pin-07.webp"), 2400, 2208),
      img(require("./assets/pin-08.webp"), 2400, 178),
      img(require("./assets/pin-09.webp"), 2400, 178),
      img(require("./assets/pin-10.webp"), 2400, 3618),
      img(require("./assets/pin-11.webp"), 2400, 200),
      img(require("./assets/pin-12.webp"), 2400, 178),
      img(require("./assets/pin-13.webp"), 2400, 1106),
      img(require("./assets/pin-14.webp"), 2400, 1106),
      img(require("./assets/pin-15.webp"), 2400, 1106),
      img(require("./assets/pin-16.webp"), 2400, 200),
      img(require("./assets/pin-17.webp"), 2400, 178),
      img(require("./assets/pin-18.webp"), 2400, 976),
      img(require("./assets/pin-19.webp"), 2400, 96),
      img(require("./assets/pin-20.webp"), 2400, 1040),
      img(require("./assets/pin-21.webp"), 2400, 96),
      img(require("./assets/pin-22.webp"), 2400, 178),
      img(require("./assets/pin-23.webp"), 2400, 178),
      img(require("./assets/pin-24.webp"), 2400, 688),
      img(require("./assets/pin-25.webp"), 2400, 178),
      img(require("./assets/pin-26.webp"), 2400, 178),
      img(require("./assets/pin-27.webp"), 2400, 688),
      img(require("./assets/pin-28.webp"), 2400, 178),
      img(require("./assets/pin-29.webp"), 2400, 178),
      img(require("./assets/pin-30.webp"), 2400, 688),
      img(require("./assets/pin-31.webp"), 2400, 178),
      img(require("./assets/pin-32.webp"), 2400, 178),
      img(require("./assets/pin-33.webp"), 2400, 688),
      img(require("./assets/pin-34.webp"), 2400, 178),
      img(require("./assets/pin-35.webp"), 2400, 178),
      img(require("./assets/pin-36.webp"), 2400, 688),
      img(require("./assets/pin-37.webp"), 2400, 178),
      img(require("./assets/pin-38.webp"), 2400, 200),
      img(require("./assets/pin-39.webp"), 2400, 178),
      img(require("./assets/pin-40.webp"), 2400, 288),
      img(require("./assets/pin-41.webp"), 2400, 224),
      img(require("./assets/pin-42.webp"), 2400, 352),
      img(require("./assets/pin-43.webp"), 2400, 200),
      img(require("./assets/pin-44.webp"), 2400, 178),
      img(require("./assets/pin-45.webp"), 1072, 1256),
      img(require("./assets/pin-46.webp"), 1708, 2018),
    ],
  },
];
