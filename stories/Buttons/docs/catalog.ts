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
 * Button docs — Figma Final Pulse canvas `↳ Buttons` (7:189), left → right.
 * Per-section hi-res exports (scale 2) stitched in catalog order.
 */
export const BUTTON_DOCS_PAGES: DocPage[] = [
  {
    title: "Standalone Button",
    storyTitle: "Components/Navigation/Buttons/Docs/Standalone Button",
    images: [
      img(require("./assets/standalone-button-00.webp"), 2400, 360),
      img(require("./assets/standalone-button-01.webp"), 2400, 1000),
      img(require("./assets/standalone-button-02.webp"), 2400, 240),
      img(require("./assets/standalone-button-03.webp"), 2400, 912),
      img(require("./assets/standalone-button-04.webp"), 2400, 816),
      img(require("./assets/standalone-button-05.webp"), 2400, 976),
      img(require("./assets/standalone-button-06.webp"), 2400, 848),
      img(require("./assets/standalone-button-07.webp"), 2400, 912),
      img(require("./assets/standalone-button-08.webp"), 2400, 688),
      img(require("./assets/standalone-button-09.webp"), 2400, 688),
      img(require("./assets/standalone-button-10.webp"), 2400, 2128),
      img(require("./assets/standalone-button-11.webp"), 2400, 896),
      img(require("./assets/standalone-button-12.webp"), 2400, 896),
      img(require("./assets/standalone-button-13.webp"), 2400, 896),
      img(require("./assets/standalone-button-14.webp"), 2400, 3740),
    ],
  },
  {
    title: "Link Button",
    storyTitle: "Components/Navigation/Buttons/Docs/Link Button",
    images: [
      img(require("./assets/link-button-00.webp"), 2400, 360),
      img(require("./assets/link-button-01.webp"), 2400, 1000),
      img(require("./assets/link-button-02.webp"), 2400, 240),
      img(require("./assets/link-button-03.webp"), 2400, 960),
      img(require("./assets/link-button-04.webp"), 2400, 848),
      img(require("./assets/link-button-05.webp"), 2400, 976),
      img(require("./assets/link-button-06.webp"), 2400, 848),
      img(require("./assets/link-button-07.webp"), 2400, 912),
      img(require("./assets/link-button-08.webp"), 2400, 688),
      img(require("./assets/link-button-09.webp"), 2400, 688),
      img(require("./assets/link-button-10.webp"), 2400, 896),
      img(require("./assets/link-button-11.webp"), 2400, 896),
      img(require("./assets/link-button-12.webp"), 2400, 896),
      img(require("./assets/link-button-13.webp"), 1204, 1216),
    ],
  },
  {
    title: "Link Icons",
    storyTitle: "Components/Navigation/Buttons/Docs/Link Icons",
    images: [
      img(require("./assets/link-icons-00.webp"), 2400, 360),
      img(require("./assets/link-icons-01.webp"), 2400, 1000),
      img(require("./assets/link-icons-02.webp"), 2400, 240),
      img(require("./assets/link-icons-03.webp"), 2400, 440),
      img(require("./assets/link-icons-04.webp"), 2400, 400),
      img(require("./assets/link-icons-05.webp"), 2400, 912),
      img(require("./assets/link-icons-06.webp"), 2400, 912),
      img(require("./assets/link-icons-07.webp"), 2400, 688),
      img(require("./assets/link-icons-08.webp"), 2400, 688),
      img(require("./assets/link-icons-09.webp"), 782, 336),
    ],
  },
  {
    title: "Button Group",
    storyTitle: "Components/Navigation/Buttons/Docs/Button Group",
    images: [
      img(require("./assets/button-group-00.webp"), 2400, 360),
      img(require("./assets/button-group-01.webp"), 2400, 1000),
      img(require("./assets/button-group-02.webp"), 2400, 362),
      img(require("./assets/button-group-03.webp"), 2400, 674),
      img(require("./assets/button-group-04.webp"), 2400, 650),
      img(require("./assets/button-group-05.webp"), 2400, 912),
      img(require("./assets/button-group-06.webp"), 2400, 912),
      img(require("./assets/button-group-07.webp"), 2400, 848),
      img(require("./assets/button-group-08.webp"), 2400, 688),
      img(require("./assets/button-group-09.webp"), 2400, 688),
      img(require("./assets/button-group-10.webp"), 2400, 1024),
      img(require("./assets/button-group-11.webp"), 2400, 960),
      img(require("./assets/button-group-12.webp"), 1708, 1044),
    ],
  },
  {
    title: "Button Group Review",
    storyTitle: "Components/Navigation/Buttons/Docs/Button Group Review",
    images: [
      img(require("./assets/button-group-review-00.webp"), 2400, 360),
      img(require("./assets/button-group-review-01.webp"), 2400, 1000),
      img(require("./assets/button-group-review-02.webp"), 2400, 676),
      img(require("./assets/button-group-review-03.webp"), 2400, 788),
      img(require("./assets/button-group-review-04.webp"), 2400, 954),
      img(require("./assets/button-group-review-05.webp"), 2400, 912),
      img(require("./assets/button-group-review-06.webp"), 2400, 912),
      img(require("./assets/button-group-review-07.webp"), 2400, 848),
      img(require("./assets/button-group-review-08.webp"), 2400, 688),
      img(require("./assets/button-group-review-09.webp"), 2400, 688),
      img(require("./assets/button-group-review-10.webp"), 2400, 1024),
      img(require("./assets/button-group-review-11.webp"), 2400, 960),
      img(require("./assets/button-group-review-12.webp"), 2613, 2064),
      img(require("./assets/button-group-review-13.webp"), 1640, 1374),
    ],
  },
  {
    title: "Bottom sheet - Button group Rules",
    storyTitle: "Components/Navigation/Buttons/Docs/Bottom sheet - Button group Rules",
    images: [
      img(require("./assets/bottom-sheet-button-group-rules-00.webp"), 2400, 1914),
      img(require("./assets/bottom-sheet-button-group-rules-01.webp"), 2400, 1180),
      img(require("./assets/bottom-sheet-button-group-rules-02.webp"), 2400, 2344),
      img(require("./assets/bottom-sheet-button-group-rules-03.webp"), 2400, 2206),
      img(require("./assets/bottom-sheet-button-group-rules-04.webp"), 2400, 3754),
      img(require("./assets/bottom-sheet-button-group-rules-05.webp"), 2400, 3976),
    ],
  },
  {
    title: "Button List Item",
    storyTitle: "Components/Navigation/Buttons/Docs/Button List Item",
    images: [
      img(require("./assets/button-list-item-00.webp"), 2400, 360),
      img(require("./assets/button-list-item-01.webp"), 2400, 1000),
      img(require("./assets/button-list-item-02.webp"), 2400, 240),
      img(require("./assets/button-list-item-03.webp"), 2400, 454),
      img(require("./assets/button-list-item-04.webp"), 2400, 332),
      img(require("./assets/button-list-item-05.webp"), 2400, 912),
      img(require("./assets/button-list-item-06.webp"), 2400, 912),
      img(require("./assets/button-list-item-07.webp"), 2400, 688),
      img(require("./assets/button-list-item-08.webp"), 2400, 688),
      img(require("./assets/button-list-item-09.webp"), 2400, 896),
      img(require("./assets/button-list-item-10.webp"), 2400, 896),
      img(require("./assets/button-list-item-11.webp"), 1612, 350),
    ],
  },
  {
    title: "Quick Action",
    storyTitle: "Components/Navigation/Buttons/Docs/Quick Action",
    images: [
      img(require("./assets/button-quick-action-00.webp"), 2400, 360),
      img(require("./assets/button-quick-action-01.webp"), 2400, 1000),
      img(require("./assets/button-quick-action-02.webp"), 2400, 240),
      img(require("./assets/button-quick-action-03.webp"), 2400, 456),
      img(require("./assets/button-quick-action-04.webp"), 2400, 336),
      img(require("./assets/button-quick-action-05.webp"), 2400, 912),
      img(require("./assets/button-quick-action-06.webp"), 2400, 912),
      img(require("./assets/button-quick-action-07.webp"), 2400, 2080),
      img(require("./assets/button-quick-action-08.webp"), 2400, 688),
      img(require("./assets/button-quick-action-09.webp"), 2400, 896),
      img(require("./assets/button-quick-action-10.webp"), 2400, 896),
      img(require("./assets/button-quick-action-11.webp"), 2400, 896),
      img(require("./assets/button-quick-action-12.webp"), 1732, 1584),
    ],
  },
  {
    title: "New Hubs Button List Item",
    storyTitle: "Components/Navigation/Buttons/Docs/New Hubs Button List Item",
    images: [
      img(require("./assets/new-hubs-button-list-item-00.webp"), 2400, 360),
      img(require("./assets/new-hubs-button-list-item-01.webp"), 2400, 1000),
      img(require("./assets/new-hubs-button-list-item-02.webp"), 2400, 240),
      img(require("./assets/new-hubs-button-list-item-03.webp"), 2400, 464),
      img(require("./assets/new-hubs-button-list-item-04.webp"), 2400, 912),
      img(require("./assets/new-hubs-button-list-item-05.webp"), 2400, 912),
      img(require("./assets/new-hubs-button-list-item-06.webp"), 2400, 896),
      img(require("./assets/new-hubs-button-list-item-07.webp"), 2400, 896),
      img(require("./assets/new-hubs-button-list-item-08.webp"), 2400, 960),
      img(require("./assets/new-hubs-button-list-item-09.webp"), 1602, 848),
    ],
  },
  {
    title: "Segmented Button",
    storyTitle: "Components/Navigation/Buttons/Docs/Segmented Button",
    images: [
      img(require("./assets/segmented-button-00.webp"), 2400, 360),
      img(require("./assets/segmented-button-01.webp"), 2400, 1000),
      img(require("./assets/segmented-button-02.webp"), 2400, 240),
      img(require("./assets/segmented-button-03.webp"), 2400, 380),
      img(require("./assets/segmented-button-04.webp"), 2400, 592),
      img(require("./assets/segmented-button-05.webp"), 2400, 912),
      img(require("./assets/segmented-button-06.webp"), 2400, 848),
      img(require("./assets/segmented-button-07.webp"), 2400, 960),
      img(require("./assets/segmented-button-08.webp"), 2400, 896),
      img(require("./assets/segmented-button-09.webp"), 2400, 896),
      img(require("./assets/segmented-button-10.webp"), 1698, 1456),
    ],
  },
];
