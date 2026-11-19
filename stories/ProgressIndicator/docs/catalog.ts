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

/** Progress Indicator — Figma Final Pulse canvas (82:1799); per-section hi-res exports. */
export const PROGRESS_INDICATOR_DOCS_PAGES: DocPage[] = [
  {
    title: "Progress Indicator_Linear - Documentation",
    storyTitle: "Components/ProgressIndicator/Docs/Progress Indicator_Linear - Documentation",
    images: [
      img(require("./assets/progress-indicator-linear-documentation-00.webp"), 2400, 360),
      img(require("./assets/progress-indicator-linear-documentation-01.webp"), 2400, 1000),
      img(require("./assets/progress-indicator-linear-documentation-02.webp"), 2400, 200),
      img(require("./assets/progress-indicator-linear-documentation-03.webp"), 2400, 178),
      img(require("./assets/progress-indicator-linear-documentation-04.webp"), 2400, 168),
      img(require("./assets/progress-indicator-linear-documentation-05.webp"), 2400, 178),
      img(require("./assets/progress-indicator-linear-documentation-06.webp"), 2400, 178),
      img(require("./assets/progress-indicator-linear-documentation-07.webp"), 2400, 544),
      img(require("./assets/progress-indicator-linear-documentation-08.webp"), 2400, 200),
      img(require("./assets/progress-indicator-linear-documentation-09.webp"), 2400, 178),
      img(require("./assets/progress-indicator-linear-documentation-10.webp"), 2400, 400),
      img(require("./assets/progress-indicator-linear-documentation-11.webp"), 2400, 200),
      img(require("./assets/progress-indicator-linear-documentation-12.webp"), 2400, 178),
      img(require("./assets/progress-indicator-linear-documentation-13.webp"), 2400, 912),
      img(require("./assets/progress-indicator-linear-documentation-14.webp"), 2400, 96),
      img(require("./assets/progress-indicator-linear-documentation-15.webp"), 2400, 976),
      img(require("./assets/progress-indicator-linear-documentation-16.webp"), 2400, 96),
      img(require("./assets/progress-indicator-linear-documentation-17.webp"), 2400, 200),
      img(require("./assets/progress-indicator-linear-documentation-18.webp"), 2400, 178),
      img(require("./assets/progress-indicator-linear-documentation-19.webp"), 2400, 178),
      img(require("./assets/progress-indicator-linear-documentation-20.webp"), 2400, 688),
      img(require("./assets/progress-indicator-linear-documentation-21.webp"), 2400, 178),
      img(require("./assets/progress-indicator-linear-documentation-22.webp"), 2400, 178),
      img(require("./assets/progress-indicator-linear-documentation-23.webp"), 2400, 688),
      img(require("./assets/progress-indicator-linear-documentation-24.webp"), 2400, 200),
      img(require("./assets/progress-indicator-linear-documentation-25.webp"), 2400, 178),
      img(require("./assets/progress-indicator-linear-documentation-26.webp"), 2400, 88),
      img(require("./assets/progress-indicator-linear-documentation-27.webp"), 2400, 1649),
    ],
  },
  {
    title: "Progress Indicator_Circular  - Documentation",
    storyTitle: "Components/ProgressIndicator/Docs/Progress Indicator_Circular  - Documentation",
    images: [
      img(require("./assets/progress-indicator-circular-documentation-00.webp"), 2400, 360),
      img(require("./assets/progress-indicator-circular-documentation-01.webp"), 2400, 1000),
      img(require("./assets/progress-indicator-circular-documentation-02.webp"), 2400, 200),
      img(require("./assets/progress-indicator-circular-documentation-03.webp"), 2400, 178),
      img(require("./assets/progress-indicator-circular-documentation-04.webp"), 2400, 324),
      img(require("./assets/progress-indicator-circular-documentation-05.webp"), 2400, 178),
      img(require("./assets/progress-indicator-circular-documentation-06.webp"), 2400, 178),
      img(require("./assets/progress-indicator-circular-documentation-07.webp"), 2400, 948),
      img(require("./assets/progress-indicator-circular-documentation-08.webp"), 2400, 200),
      img(require("./assets/progress-indicator-circular-documentation-09.webp"), 2400, 178),
      img(require("./assets/progress-indicator-circular-documentation-10.webp"), 2400, 976),
      img(require("./assets/progress-indicator-circular-documentation-11.webp"), 2400, 96),
      img(require("./assets/progress-indicator-circular-documentation-12.webp"), 2400, 976),
      img(require("./assets/progress-indicator-circular-documentation-13.webp"), 2400, 96),
      img(require("./assets/progress-indicator-circular-documentation-14.webp"), 2400, 200),
      img(require("./assets/progress-indicator-circular-documentation-15.webp"), 2400, 178),
      img(require("./assets/progress-indicator-circular-documentation-16.webp"), 2400, 178),
      img(require("./assets/progress-indicator-circular-documentation-17.webp"), 2400, 688),
      img(require("./assets/progress-indicator-circular-documentation-18.webp"), 2400, 178),
      img(require("./assets/progress-indicator-circular-documentation-19.webp"), 2400, 178),
      img(require("./assets/progress-indicator-circular-documentation-20.webp"), 2400, 688),
      img(require("./assets/progress-indicator-circular-documentation-21.webp"), 2400, 178),
      img(require("./assets/progress-indicator-circular-documentation-22.webp"), 2400, 178),
      img(require("./assets/progress-indicator-circular-documentation-23.webp"), 2400, 688),
      img(require("./assets/progress-indicator-circular-documentation-24.webp"), 2400, 200),
      img(require("./assets/progress-indicator-circular-documentation-25.webp"), 2400, 178),
      img(require("./assets/progress-indicator-circular-documentation-26.webp"), 2400, 88),
      img(require("./assets/progress-indicator-circular-documentation-27.webp"), 2400, 464),
    ],
  },
  {
    title: "Exchange rate indicator  - Documentation",
    storyTitle: "Components/ProgressIndicator/Docs/Exchange rate indicator  - Documentation",
    images: [
      img(require("./assets/exchange-rate-indicator-documentation-00.webp"), 2400, 360),
      img(require("./assets/exchange-rate-indicator-documentation-01.webp"), 2400, 1000),
      img(require("./assets/exchange-rate-indicator-documentation-02.webp"), 2400, 200),
      img(require("./assets/exchange-rate-indicator-documentation-03.webp"), 2400, 178),
      img(require("./assets/exchange-rate-indicator-documentation-04.webp"), 2400, 296),
      img(require("./assets/exchange-rate-indicator-documentation-05.webp"), 2400, 178),
      img(require("./assets/exchange-rate-indicator-documentation-06.webp"), 2400, 178),
      img(require("./assets/exchange-rate-indicator-documentation-07.webp"), 2400, 1360),
      img(require("./assets/exchange-rate-indicator-documentation-08.webp"), 2400, 200),
      img(require("./assets/exchange-rate-indicator-documentation-09.webp"), 2400, 178),
      img(require("./assets/exchange-rate-indicator-documentation-10.webp"), 2400, 528),
      img(require("./assets/exchange-rate-indicator-documentation-11.webp"), 2400, 200),
      img(require("./assets/exchange-rate-indicator-documentation-12.webp"), 2400, 178),
      img(require("./assets/exchange-rate-indicator-documentation-13.webp"), 2400, 912),
      img(require("./assets/exchange-rate-indicator-documentation-14.webp"), 2400, 96),
      img(require("./assets/exchange-rate-indicator-documentation-15.webp"), 2400, 912),
      img(require("./assets/exchange-rate-indicator-documentation-16.webp"), 2400, 96),
      img(require("./assets/exchange-rate-indicator-documentation-17.webp"), 2400, 200),
      img(require("./assets/exchange-rate-indicator-documentation-18.webp"), 2400, 178),
      img(require("./assets/exchange-rate-indicator-documentation-19.webp"), 2400, 178),
      img(require("./assets/exchange-rate-indicator-documentation-20.webp"), 2400, 688),
      img(require("./assets/exchange-rate-indicator-documentation-21.webp"), 2400, 178),
      img(require("./assets/exchange-rate-indicator-documentation-22.webp"), 2400, 178),
      img(require("./assets/exchange-rate-indicator-documentation-23.webp"), 2400, 688),
      img(require("./assets/exchange-rate-indicator-documentation-24.webp"), 2400, 200),
      img(require("./assets/exchange-rate-indicator-documentation-25.webp"), 2400, 178),
      img(require("./assets/exchange-rate-indicator-documentation-26.webp"), 2400, 88),
      img(require("./assets/exchange-rate-indicator-documentation-27.webp"), 2400, 632),
    ],
  },
];
