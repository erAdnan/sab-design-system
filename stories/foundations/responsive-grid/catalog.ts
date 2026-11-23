import { ImageSourcePropType } from "react-native";

export type DocImage = {
  source: ImageSourcePropType;
  /** width / height (React Native aspectRatio) */
  aspectRatio: number;
};

export type DocPage = {
  title: string;
  storyName: string;
  images: DocImage[];
};

const img = (source: ImageSourcePropType, w: number, h: number): DocImage => ({
  source,
  aspectRatio: w / h,
});

/**
 * Responsive Grid doc pages — Figma canvas 69:6658 (excluding interactive Grid table).
 * Aspect ratios match exported PNG dimensions (long side capped at 4096 by Figma export).
 */
export const RESPONSIVE_GRID_PAGES: DocPage[] = [
  {
    title: "Mobile",
    storyName: "Mobile",
    images: [img(require("./assets/mobile.webp"), 2880, 1110)],
  },
  {
    title: "Tablet",
    storyName: "Tablet",
    images: [img(require("./assets/tablet.webp"), 2880, 1304)],
  },
  {
    title: "Responsive Device Grid",
    storyName: "Responsive Device Grid",
    images: [img(require("./assets/responsive-device-grid.webp"), 849, 4096)],
  },
  {
    title: "Samsung Fold behaviour",
    storyName: "Samsung Fold behaviour",
    images: [img(require("./assets/samsung-fold.webp"), 2880, 3669)],
  },
  {
    title: "Design-Dev Workspace",
    storyName: "Design-Dev Workspace",
    images: [img(require("./assets/design-dev-workspace.webp"), 2880, 2750)],
  },
];
