import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { CHIPS_DOCS_PAGES } from "./catalog";

const page = CHIPS_DOCS_PAGES.find((p) => p.title === "Chips \u2192 New \u2014 Documentation")!;

export default {
  title: "Components/Data Display/Chips/Docs/Chips \u2192 New \u2014 Documentation",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Chips canvas (146:2195) → Chips → New — Documentation. */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · Data Display · Chips"
      images={page.images}
    />
  ),
};
