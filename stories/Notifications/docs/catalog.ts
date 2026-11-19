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

/** Notifications — Figma Final Pulse canvas (11:3655); per-section hi-res exports. */
export const NOTIFICATIONS_DOCS_PAGES: DocPage[] = [
  {
    title: "Snackbar",
    storyTitle: "Components/Notifications/Docs/Snackbar",
    images: [
      img(require("./assets/snackbar-00.webp"), 2400, 462),
      img(require("./assets/snackbar-01.webp"), 2400, 1200),
      img(require("./assets/snackbar-02.webp"), 2400, 200),
      img(require("./assets/snackbar-03.webp"), 2400, 178),
      img(require("./assets/snackbar-04.webp"), 2400, 670),
      img(require("./assets/snackbar-05.webp"), 2400, 178),
      img(require("./assets/snackbar-06.webp"), 2400, 178),
      img(require("./assets/snackbar-07.webp"), 2400, 2432),
      img(require("./assets/snackbar-08.webp"), 2400, 178),
      img(require("./assets/snackbar-09.webp"), 2400, 178),
      img(require("./assets/snackbar-10.webp"), 2400, 3178),
      img(require("./assets/snackbar-11.webp"), 2400, 200),
      img(require("./assets/snackbar-12.webp"), 2400, 178),
      img(require("./assets/snackbar-13.webp"), 2400, 688),
      img(require("./assets/snackbar-14.webp"), 2400, 688),
      img(require("./assets/snackbar-15.webp"), 2400, 352),
      img(require("./assets/snackbar-16.webp"), 2400, 416),
      img(require("./assets/snackbar-17.webp"), 782, 992),
      img(require("./assets/snackbar-18.webp"), 782, 992),
    ],
  },
  {
    title: "Clipboard Toast",
    storyTitle: "Components/Notifications/Docs/Clipboard Toast",
    images: [
      img(require("./assets/clipboard-toast-00.webp"), 2400, 462),
      img(require("./assets/clipboard-toast-01.webp"), 2400, 1200),
      img(require("./assets/clipboard-toast-02.webp"), 2400, 408),
      img(require("./assets/clipboard-toast-03.webp"), 2400, 892),
      img(require("./assets/clipboard-toast-04.webp"), 2400, 578),
      img(require("./assets/clipboard-toast-05.webp"), 2400, 976),
      img(require("./assets/clipboard-toast-06.webp"), 2400, 976),
      img(require("./assets/clipboard-toast-07.webp"), 2400, 688),
      img(require("./assets/clipboard-toast-08.webp"), 2400, 688),
      img(require("./assets/clipboard-toast-09.webp"), 2400, 688),
      img(require("./assets/clipboard-toast-10.webp"), 2400, 288),
      img(require("./assets/clipboard-toast-11.webp"), 2400, 352),
      img(require("./assets/clipboard-toast-12.webp"), 526, 176),
    ],
  },
  {
    title: "Disclaimer",
    storyTitle: "Components/Notifications/Docs/Disclaimer",
    images: [
      img(require("./assets/disclaimer-00.webp"), 2400, 462),
      img(require("./assets/disclaimer-01.webp"), 2400, 1200),
      img(require("./assets/disclaimer-02.webp"), 2400, 408),
      img(require("./assets/disclaimer-03.webp"), 2400, 892),
      img(require("./assets/disclaimer-04.webp"), 2400, 2448),
      img(require("./assets/disclaimer-05.webp"), 2400, 610),
      img(require("./assets/disclaimer-06.webp"), 2400, 594),
      img(require("./assets/disclaimer-07.webp"), 2400, 976),
      img(require("./assets/disclaimer-08.webp"), 2400, 976),
      img(require("./assets/disclaimer-09.webp"), 2400, 976),
      img(require("./assets/disclaimer-10.webp"), 2400, 688),
      img(require("./assets/disclaimer-11.webp"), 2400, 688),
      img(require("./assets/disclaimer-12.webp"), 2400, 688),
      img(require("./assets/disclaimer-13.webp"), 2400, 688),
      img(require("./assets/disclaimer-14.webp"), 2400, 688),
      img(require("./assets/disclaimer-15.webp"), 2400, 288),
      img(require("./assets/disclaimer-16.webp"), 2400, 288),
      img(require("./assets/disclaimer-17.webp"), 2400, 416),
      img(require("./assets/disclaimer-18.webp"), 726, 1032),
    ],
  },
  {
    title: "Notification",
    storyTitle: "Components/Notifications/Docs/Notification",
    images: [
      img(require("./assets/notification-00.webp"), 2400, 462),
      img(require("./assets/notification-01.webp"), 2400, 1200),
      img(require("./assets/notification-02.webp"), 2400, 408),
      img(require("./assets/notification-03.webp"), 2400, 1004),
      img(require("./assets/notification-04.webp"), 2400, 2172),
      img(require("./assets/notification-05.webp"), 2400, 726),
      img(require("./assets/notification-06.webp"), 2400, 662),
      img(require("./assets/notification-07.webp"), 2400, 912),
      img(require("./assets/notification-08.webp"), 2400, 1104),
      img(require("./assets/notification-09.webp"), 2400, 688),
      img(require("./assets/notification-10.webp"), 2400, 688),
      img(require("./assets/notification-11.webp"), 2400, 688),
      img(require("./assets/notification-12.webp"), 2400, 288),
      img(require("./assets/notification-13.webp"), 2400, 416),
      img(require("./assets/notification-14.webp"), 1516, 680),
    ],
  },
];
