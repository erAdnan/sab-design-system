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

/** PersonalFinanceWidgets — Figma Final Pulse canvas (2702:8148); header + body exports. */
export const PERSONAL_FINANCE_WIDGETS_DOCS_PAGES: DocPage[] = [
  {
    title: "Tag Widget",
    storyTitle: "Components/PersonalFinanceWidgets/Docs/Tag Widget",
    images: [
      img(require("./assets/tag-widget-00.webp"), 2800, 331),
      img(require("./assets/tag-widget-01.webp"), 1400, 3588),
    ],
  },
  {
    title: "Category List",
    storyTitle: "Components/PersonalFinanceWidgets/Docs/Category List",
    images: [
      img(require("./assets/category-list-00.webp"), 1400, 166),
      img(require("./assets/category-list-01.webp"), 1400, 6719),
    ],
  },
  {
    title: "Budget Card Widget",
    storyTitle: "Components/PersonalFinanceWidgets/Docs/Budget Card Widget",
    images: [
      img(require("./assets/budget-card-widget-00.webp"), 1400, 166),
      img(require("./assets/budget-card-widget-01.webp"), 1400, 7762),
    ],
  },
];
