import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { BLOCKS_DOCS_PAGES } from "./catalog";

const page = BLOCKS_DOCS_PAGES.find((p) => p.title === "new_block.generic Documentation")!;

export default {
  title: "Components/Blocks/Docs/new_block.generic Documentation",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Blocks canvas (2243:10445) → new_block.generic Documentation. */
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
