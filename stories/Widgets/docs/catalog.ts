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
 * Widgets — Figma Pulse Design System canvas (2148:2).
 * https://www.figma.com/design/icrv7MTnVLGbxHB3eZcu3Z/00.-Pulse-Design-System?node-id=2148-2
 * - Widget (22186:45809)
 * - Tile/List Widget (22198:59223)
 */
export const WIDGETS_DOCS_PAGES: DocPage[] = [
  {
    title: "Widget",
    storyTitle: "Components/Data Display/Widgets/Docs/Widget",
    images: [
      img(require("./assets/widget-00.webp"), 2800, 331),
      img(require("./assets/widget-01.webp"), 2400, 1858),
      img(require("./assets/widget-02.webp"), 2400, 786),
      img(require("./assets/widget-03.webp"), 2400, 1064),
      img(require("./assets/widget-04.webp"), 2400, 1522),
      img(require("./assets/widget-05.webp"), 2400, 1946),
      img(require("./assets/widget-06.webp"), 2400, 1642),
      img(require("./assets/widget-07.webp"), 2400, 4610),
      img(require("./assets/widget-08.webp"), 2400, 906),
      img(require("./assets/widget-09.webp"), 2400, 1626),
    ],
  },
  {
    title: "Tile/List Widget",
    storyTitle: "Components/Data Display/Widgets/Docs/Tile List Widget",
    images: [
      img(require("./assets/tile-list-widget-00.webp"), 2800, 331),
      img(require("./assets/tile-list-widget-01.webp"), 2400, 1802),
      img(require("./assets/tile-list-widget-02.webp"), 2400, 878),
      img(require("./assets/tile-list-widget-03.webp"), 2400, 1330),
      img(require("./assets/tile-list-widget-04.webp"), 2400, 1634),
      img(require("./assets/tile-list-widget-05.webp"), 2400, 1650),
      img(require("./assets/tile-list-widget-06.webp"), 2400, 1026),
      img(require("./assets/tile-list-widget-07.webp"), 2400, 3846),
      img(require("./assets/tile-list-widget-08.webp"), 2400, 906),
      img(require("./assets/tile-list-widget-09.webp"), 2400, 770),
    ],
  },
];
