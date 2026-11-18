import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { RANGE_DOCS_PAGES } from "./catalog";

const page = RANGE_DOCS_PAGES.find((p) => p.title === "Range")!;

export default {
  title: "Components/Range/Docs/Range",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Range canvas (2379:34719) → Range. */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · Range"
      images={page.images}
    />
  ),
};
