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
  img(require("./assets/bottom-sheet-01.webp"), 2880, 1242),
  img(require("./assets/bottom-sheet-02.webp"), 2880, 2354),
  img(require("./assets/bottom-sheet-03.webp"), 2880, 5340),
  img(require("./assets/bottom-sheet-04.webp"), 2880, 3468),
  img(require("./assets/bottom-sheet-05.webp"), 2880, 3188),
  img(require("./assets/bottom-sheet-06.webp"), 2880, 3118),
  img(require("./assets/bottom-sheet-07.webp"), 2880, 9336),
  img(require("./assets/bottom-sheet-08.webp"), 2880, 6922),
  img(require("./assets/bottom-sheet-09.webp"), 2880, 1434),
  img(require("./assets/bottom-sheet-10.webp"), 2880, 1504),
  img(require("./assets/bottom-sheet-11.webp"), 2880, 3748),
  img(require("./assets/bottom-sheet-12.webp"), 2880, 9558),
  img(require("./assets/bottom-sheet-13.webp"), 2880, 5896),
  img(require("./assets/bottom-sheet-14.webp"), 2880, 3148),
  img(require("./assets/bottom-sheet-15.webp"), 2880, 5318),
  img(require("./assets/bottom-sheet-16.webp"), 2880, 7568),
  img(require("./assets/bottom-sheet-17.webp"), 2880, 3288),
  img(require("./assets/bottom-sheet-18.webp"), 2880, 3148),
  img(require("./assets/bottom-sheet-19.webp"), 2880, 7524),
  img(require("./assets/bottom-sheet-20.webp"), 2880, 9908),
  img(require("./assets/bottom-sheet-21.webp"), 2880, 6154),
  img(require("./assets/bottom-sheet-22.webp"), 2880, 10528),
  // Blocks 23–24 exceed WebP max at 2× — exported at 1× full height
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
    // Figma Final Pulse 22021:178029 — section exports (full frame exceeds MCP 4096 long-side cap)
    images: [
      img(require("./assets/levels-of-navigation-01-nav-rules-title.webp"), 2880, 35),
      img(require("./assets/levels-of-navigation-02-intro.webp"), 2226, 138),
      img(require("./assets/levels-of-navigation-03-overview-diagram.webp"), 2880, 388),
      img(require("./assets/levels-of-navigation-04-callout-a.webp"), 2880, 339),
      img(require("./assets/levels-of-navigation-05-phones-a.webp"), 2880, 1107),
      img(require("./assets/levels-of-navigation-06-callout-b.webp"), 2880, 308),
      img(require("./assets/levels-of-navigation-07-callout-c.webp"), 2880, 308),
      img(require("./assets/levels-of-navigation-08-callout-d.webp"), 2880, 371),
      img(require("./assets/levels-of-navigation-09-callout-e.webp"), 2880, 497),
      img(require("./assets/levels-of-navigation-10-callout-f.webp"), 2880, 529),
      img(require("./assets/levels-of-navigation-11-callout-g.webp"), 2880, 529),
      img(require("./assets/levels-of-navigation-12-callout-h.webp"), 2880, 371),
      img(require("./assets/levels-of-navigation-13-callout-i.webp"), 2880, 596),
      img(require("./assets/levels-of-navigation-14-phones-b.webp"), 2880, 1107),
      img(require("./assets/levels-of-navigation-15-journey-title.webp"), 2880, 35),
      img(require("./assets/levels-of-navigation-16-journey-intro.webp"), 2542, 271),
      img(require("./assets/levels-of-navigation-17-journey-phones.webp"), 2880, 1731),
    ],
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
    images: [
      img(require("./assets/marketing-and-engagement-01.webp"), 1400, 8517),
      img(require("./assets/marketing-and-engagement-02.webp"), 1400, 8518),
    ],
  },
  {
    folder: "Rules",
    title: "Rating & Feedback",
    storyTitle: "Pulse Design System/Rules & Patterns/Rules/Rating & Feedback",
    images: [
      img(require("./assets/rating-and-feedback-01.webp"), 2800, 13659),
      img(require("./assets/rating-and-feedback-02.webp"), 2800, 13660),
    ],
  },
  {
    folder: "Rules",
    title: "Rating & Feedback Variants",
    storyTitle: "Pulse Design System/Rules & Patterns/Rules/Rating & Feedback Variants",
    images: [
      img(require("./assets/rating-and-feedback-variants-01.webp"), 2800, 12399),
      img(require("./assets/rating-and-feedback-variants-02.webp"), 2800, 12400),
    ],
  },
  {
    folder: "Rules",
    title: "Card Related Alerts & Actions",
    storyTitle: "Pulse Design System/Rules & Patterns/Rules/Card Related Alerts & Actions",
    images: [
      img(require("./assets/card-related-alerts-and-actions-01.webp"), 2800, 11071),
      img(require("./assets/card-related-alerts-and-actions-02.webp"), 2800, 11072),
    ],
  },
  {
    folder: "Rules",
    title: "Government Service Promotion",
    storyTitle: "Pulse Design System/Rules & Patterns/Rules/Government Service Promotion",
    images: [
      img(require("./assets/government-service-promotion-01.webp"), 2800, 11244),
      img(require("./assets/government-service-promotion-02.webp"), 2800, 11245),
    ],
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
    images: [
      img(require("./assets/bottom-sheet-button-group-rules-01.webp"), 2800, 8773),
      img(require("./assets/bottom-sheet-button-group-rules-02.webp"), 2800, 8774),
    ],
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
