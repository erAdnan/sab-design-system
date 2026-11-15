import { ImageSourcePropType } from "react-native";

export type DocImage = {
  source: ImageSourcePropType;
  /** width / height (React Native aspectRatio) */
  aspectRatio: number;
};

export type DocPage = {
  folder: "Rules" | "Patterns";
  title: string;
  storyTitle: string;
  images: DocImage[];
};

const img = (source: ImageSourcePropType, w: number, h: number): DocImage => ({
  source,
  aspectRatio: w / h,
});

const bottomSheetImages: DocImage[] = [
  img(require("./assets/bottom-sheet-01.webp"), 1440, 621),
  img(require("./assets/bottom-sheet-02.webp"), 1440, 1177),
  img(require("./assets/bottom-sheet-03.webp"), 1440, 2670),
  img(require("./assets/bottom-sheet-04.webp"), 1440, 1734),
  img(require("./assets/bottom-sheet-05.webp"), 1440, 1594),
  img(require("./assets/bottom-sheet-06.webp"), 1440, 1559),
  img(require("./assets/bottom-sheet-07.webp"), 1440, 4668),
  img(require("./assets/bottom-sheet-08.webp"), 1440, 3461),
  img(require("./assets/bottom-sheet-09.webp"), 1440, 717),
  img(require("./assets/bottom-sheet-10.webp"), 1440, 752),
  img(require("./assets/bottom-sheet-11.webp"), 1440, 1874),
  img(require("./assets/bottom-sheet-12.webp"), 1440, 4779),
  img(require("./assets/bottom-sheet-13.webp"), 1440, 2948),
  img(require("./assets/bottom-sheet-14.webp"), 1440, 1574),
  img(require("./assets/bottom-sheet-15.webp"), 1440, 2659),
  img(require("./assets/bottom-sheet-16.webp"), 1440, 3784),
  img(require("./assets/bottom-sheet-17.webp"), 1440, 1644),
  img(require("./assets/bottom-sheet-18.webp"), 1440, 1574),
  img(require("./assets/bottom-sheet-19.webp"), 1440, 3762),
  img(require("./assets/bottom-sheet-20.webp"), 1440, 4954),
  img(require("./assets/bottom-sheet-21.webp"), 1440, 3077),
  img(require("./assets/bottom-sheet-22.webp"), 1440, 5264),
  img(require("./assets/bottom-sheet-23.webp"), 1440, 13030),
  img(require("./assets/bottom-sheet-24.webp"), 1440, 13990),
];

/** Rules & Patterns pages — Figma node 22021:151423 children, split by canvas groups. */
export const RULES_AND_PATTERNS_PAGES: DocPage[] = [
  {
    folder: "Rules",
    title: "Documentation",
    storyTitle: "Pulse Design System/Rules & Patterns/Rules/Documentation",
    images: [img(require("./assets/documentation.webp"), 1440, 2538)],
  },
  {
    folder: "Rules",
    title: "Levels of Navigation",
    storyTitle: "Pulse Design System/Rules & Patterns/Rules/Levels of Navigation",
    images: [img(require("./assets/levels-of-navigation.webp"), 2880, 9051)],
  },
  {
    folder: "Rules",
    title: "Stories",
    storyTitle: "Pulse Design System/Rules & Patterns/Rules/Stories",
    images: [img(require("./assets/stories.webp"), 1440, 11269)],
  },
  {
    folder: "Rules",
    title: "Transmission Rules",
    storyTitle: "Pulse Design System/Rules & Patterns/Rules/Transmission Rules",
    images: [img(require("./assets/transmission-rules.webp"), 1440, 12942)],
  },
  {
    folder: "Rules",
    title: "Marketing & Engagement",
    storyTitle: "Pulse Design System/Rules & Patterns/Rules/Marketing & Engagement",
    images: [img(require("./assets/marketing-and-engagement.webp"), 1346, 16383)],
  },
  {
    folder: "Rules",
    title: "Rating & Feedback",
    storyTitle: "Pulse Design System/Rules & Patterns/Rules/Rating & Feedback",
    images: [img(require("./assets/rating-and-feedback.webp"), 1400, 13690)],
  },
  {
    folder: "Rules",
    title: "Rating & Feedback Variants",
    storyTitle: "Pulse Design System/Rules & Patterns/Rules/Rating & Feedback Variants",
    images: [img(require("./assets/rating-and-feedback-variants.webp"), 1400, 12400)],
  },
  {
    folder: "Rules",
    title: "Card Related Alerts & Actions",
    storyTitle: "Pulse Design System/Rules & Patterns/Rules/Card Related Alerts & Actions",
    images: [img(require("./assets/card-related-alerts-and-actions.webp"), 1400, 11104)],
  },
  {
    folder: "Rules",
    title: "Government Service Promotion",
    storyTitle: "Pulse Design System/Rules & Patterns/Rules/Government Service Promotion",
    images: [img(require("./assets/government-service-promotion.webp"), 1400, 11309)],
  },
  {
    folder: "Rules",
    title: "Bottom sheet",
    storyTitle: "Pulse Design System/Rules & Patterns/Rules/Bottom sheet",
    images: bottomSheetImages,
  },
  {
    folder: "Rules",
    title: "Bottom sheet - Button group Rules",
    storyTitle: "Pulse Design System/Rules & Patterns/Rules/Bottom sheet - Button group Rules",
    images: [img(require("./assets/bottom-sheet-button-group-rules.webp"), 1308, 8192)],
  },
  {
    folder: "Patterns",
    title: "Prelogin screens",
    storyTitle: "Pulse Design System/Rules & Patterns/Patterns/Prelogin screens",
    images: [img(require("./assets/prelogin-screens.webp"), 1063, 8192)],
  },
  {
    folder: "Patterns",
    title: "Postlogin screens",
    storyTitle: "Pulse Design System/Rules & Patterns/Patterns/Postlogin screens",
    images: [img(require("./assets/postlogin-screens.webp"), 1400, 15143)],
  },
  {
    folder: "Patterns",
    title: "Login screens",
    storyTitle: "Pulse Design System/Rules & Patterns/Patterns/Login screens",
    images: [img(require("./assets/login-screens.webp"), 1400, 8875)],
  },
  {
    folder: "Patterns",
    title: "Sub Hubs",
    storyTitle: "Pulse Design System/Rules & Patterns/Patterns/Sub Hubs",
    images: [img(require("./assets/sub-hubs.webp"), 1400, 13761)],
  },
  {
    folder: "Patterns",
    title: "Authentication",
    storyTitle: "Pulse Design System/Rules & Patterns/Patterns/Authentication",
    images: [img(require("./assets/authentication.webp"), 2243, 9955)],
  },
  {
    folder: "Patterns",
    title: "Status Screen - End of process",
    storyTitle: "Pulse Design System/Rules & Patterns/Patterns/Status Screen - End of process",
    images: [img(require("./assets/status-screen-end-of-process.webp"), 1464, 11777)],
  },
  {
    folder: "Patterns",
    title: "Virtual Card",
    storyTitle: "Pulse Design System/Rules & Patterns/Patterns/Virtual Card",
    images: [img(require("./assets/virtual-card.webp"), 1464, 7915)],
  },
  {
    folder: "Patterns",
    title: "Product info",
    storyTitle: "Pulse Design System/Rules & Patterns/Patterns/Product info",
    images: [img(require("./assets/product-info.webp"), 1464, 12932)],
  },
  {
    folder: "Patterns",
    title: "Product page",
    storyTitle: "Pulse Design System/Rules & Patterns/Patterns/Product page",
    images: [img(require("./assets/product-page.webp"), 1326, 16383)],
  },
];
