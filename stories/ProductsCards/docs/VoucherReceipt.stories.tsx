import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { PRODUCTS_CARDS_DOCS_PAGES } from "./catalog";

const page = PRODUCTS_CARDS_DOCS_PAGES.find((p) => p.title === "Voucher Receipt")!;

export default {
  title: "Components/Data Display/ProductsCards/Docs/Voucher Receipt",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Products card canvas (2379:30802) → Voucher Receipt. */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · Data Display · ProductsCards"
      images={page.images}
    />
  ),
};
