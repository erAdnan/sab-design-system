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

/** ProductsCards — Figma Final Pulse canvas (2379:30802); per-section hi-res exports. */
export const PRODUCTS_CARDS_DOCS_PAGES: DocPage[] = [
  {
    title: "Learning Product Cards",
    storyTitle: "Components/ProductsCards/Docs/Learning Product Cards",
    images: [
      img(require("./assets/learning-product-cards-00.webp"), 2800, 331),
      img(require("./assets/learning-product-cards-01.webp"), 2400, 1666),
      img(require("./assets/learning-product-cards-02.webp"), 2400, 972),
      img(require("./assets/learning-product-cards-03.webp"), 2400, 1518),
      img(require("./assets/learning-product-cards-04.webp"), 2400, 1822),
      img(require("./assets/learning-product-cards-05.webp"), 2400, 1192),
      img(require("./assets/learning-product-cards-06.webp"), 2400, 1202),
      img(require("./assets/learning-product-cards-07.webp"), 2400, 1578),
      img(require("./assets/learning-product-cards-08.webp"), 2400, 626),
      img(require("./assets/learning-product-cards-09.webp"), 2400, 776),
    ],
  },
  {
    title: "Voucher Receipt",
    storyTitle: "Components/ProductsCards/Docs/Voucher Receipt",
    images: [
      img(require("./assets/voucher-receipt-00.webp"), 2800, 331),
      img(require("./assets/voucher-receipt-01.webp"), 2400, 1666),
      img(require("./assets/voucher-receipt-02.webp"), 2400, 1570),
      img(require("./assets/voucher-receipt-03.webp"), 2400, 2714),
      img(require("./assets/voucher-receipt-04.webp"), 2400, 2962),
      img(require("./assets/voucher-receipt-05.webp"), 1200, 1687),
      img(require("./assets/voucher-receipt-06.webp"), 2400, 1754),
      img(require("./assets/voucher-receipt-07.webp"), 2400, 1718),
      img(require("./assets/voucher-receipt-08.webp"), 2400, 906),
      img(require("./assets/voucher-receipt-09.webp"), 2400, 2658),
    ],
  },
  {
    title: "Voucher Card",
    storyTitle: "Components/ProductsCards/Docs/Voucher Card",
    images: [
      img(require("./assets/voucher-card-00.webp"), 2800, 331),
      img(require("./assets/voucher-card-01.webp"), 2400, 1666),
      img(require("./assets/voucher-card-02.webp"), 2400, 918),
      img(require("./assets/voucher-card-03.webp"), 2400, 1410),
      img(require("./assets/voucher-card-04.webp"), 2400, 1658),
      img(require("./assets/voucher-card-05.webp"), 2400, 1978),
      img(require("./assets/voucher-card-06.webp"), 2400, 1010),
      img(require("./assets/voucher-card-07.webp"), 2400, 1066),
      img(require("./assets/voucher-card-08.webp"), 2400, 682),
      img(require("./assets/voucher-card-09.webp"), 2400, 1137),
    ],
  },
  {
    title: "Selection Card",
    storyTitle: "Components/ProductsCards/Docs/Selection Card",
    images: [
      img(require("./assets/selection-card-00.webp"), 2800, 331),
      img(require("./assets/selection-card-01.webp"), 2400, 1666),
      img(require("./assets/selection-card-02.webp"), 2400, 797),
      img(require("./assets/selection-card-03.webp"), 2400, 1167),
      img(require("./assets/selection-card-04.webp"), 2400, 1415),
      img(require("./assets/selection-card-05.webp"), 2400, 1623),
      img(require("./assets/selection-card-06.webp"), 2400, 945),
      img(require("./assets/selection-card-07.webp"), 2400, 1001),
      img(require("./assets/selection-card-08.webp"), 2400, 626),
      img(require("./assets/selection-card-09.webp"), 2400, 949),
    ],
  },
  {
    title: "Product Card/Summary",
    storyTitle: "Components/ProductsCards/Docs/Product Card/Summary",
    images: [
      img(require("./assets/product-card-summary-00.webp"), 2800, 331),
      img(require("./assets/product-card-summary-01.webp"), 2400, 1666),
      img(require("./assets/product-card-summary-02.webp"), 2400, 712),
      img(require("./assets/product-card-summary-03.webp"), 2400, 1862),
      img(require("./assets/product-card-summary-04.webp"), 2400, 1982),
      img(require("./assets/product-card-summary-05.webp"), 1200, 2138),
      img(require("./assets/product-card-summary-06.webp"), 2400, 860),
      img(require("./assets/product-card-summary-07.webp"), 2400, 2104),
      img(require("./assets/product-card-summary-08.webp"), 2400, 682),
      img(require("./assets/product-card-summary-09.webp"), 2400, 1176),
    ],
  },
];
