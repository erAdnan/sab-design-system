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
 * Text component docs — Figma Final Pulse canvas `↳ Text` (8:3574).
 * Sections exported at 2× (headers omitted — FigmaDocPage supplies the title).
 */
export const TEXT_DOCS_PAGES: DocPage[] = [
  {
    title: "Title Actions",
    storyTitle: "Components/Layout/Text/Docs/Title Actions",
    images: [
      img(require("./assets/title-actions-01-description.webp"), 2400, 1434),
      img(require("./assets/title-actions-02-copy-me.webp"), 2400, 606),
      img(require("./assets/title-actions-03-variants.webp"), 2400, 704),
      img(require("./assets/title-actions-04-anatomy.webp"), 2400, 930),
      img(require("./assets/title-actions-05-guidelines.webp"), 2400, 1330),
      img(require("./assets/title-actions-06-behavior.webp"), 2400, 2030),
      img(require("./assets/title-actions-07-usage.webp"), 2400, 918),
      img(require("./assets/title-actions-08-component.webp"), 768, 248),
    ],
  },
  {
    title: "Text Headline",
    storyTitle: "Components/Layout/Text/Docs/Text Headline",
    images: [
      img(require("./assets/text-headline-01-description.webp"), 2400, 1434),
      img(require("./assets/text-headline-02-copy-me.webp"), 2400, 602),
      img(require("./assets/text-headline-03-variants.webp"), 2400, 2178),
      img(require("./assets/text-headline-04-types.webp"), 2400, 930),
      img(require("./assets/text-headline-05-guidelines.webp"), 2400, 1330),
      img(require("./assets/text-headline-06-behavior.webp"), 2400, 1638),
      img(require("./assets/text-headline-07-usage.webp"), 2400, 1318),
      img(require("./assets/text-headline-08-component.webp"), 450, 1160),
    ],
  },
  {
    title: "Body Text",
    storyTitle: "Components/Layout/Text/Docs/Body Text",
    images: [
      img(require("./assets/body-text-01-description.webp"), 2400, 1434),
      img(require("./assets/body-text-02-copy-me.webp"), 2400, 598),
      img(require("./assets/body-text-03-variants.webp"), 2400, 3072),
      img(require("./assets/body-text-04-types.webp"), 2400, 930),
      img(require("./assets/body-text-05-guidelines.webp"), 2400, 2550),
      img(require("./assets/body-text-06-behavior.webp"), 2400, 2054),
      img(require("./assets/body-text-07-usage.webp"), 2400, 3416),
    ],
  },
];
