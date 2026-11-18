import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { BLOCKS_DOCS_PAGES } from "./catalog";

const page = BLOCKS_DOCS_PAGES.find((p) => p.title === "New_block.product-complex Documentation")!;

export default {
  title: "Components/Blocks/Docs/New_block.product-complex Documentation",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Blocks canvas (2243:10445) → New_block.product-complex Documentation. */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · Blocks"
      images={page.images}
    />
  ),
};
