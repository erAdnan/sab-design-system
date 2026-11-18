import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { BOTTOM_NAVIGATION_DOCS_PAGES } from "./catalog";

const page = BOTTOM_NAVIGATION_DOCS_PAGES.find((p) => p.title === "Bottom navigation / 04 \u00b7 Android guidelines")!;

export default {
  title: "Components/Bottom Navigation/Docs/Bottom navigation / 04 \u00b7 Android guidelines",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Bottom Navigation canvas (7:237) → Bottom navigation / 04 · Android guidelines. */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · Bottom Navigation"
      images={page.images}
    />
  ),
};
