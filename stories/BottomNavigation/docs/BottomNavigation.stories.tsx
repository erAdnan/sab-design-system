import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { BOTTOM_NAVIGATION_DOCS_PAGES } from "./catalog";

const page = BOTTOM_NAVIGATION_DOCS_PAGES.find((p) => p.title === "Bottom Navigation")!;

export default {
  title: "Components/Navigation/Bottom Navigation/Docs/Bottom Navigation",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Bottom Navigation canvas (7:237) → Bottom Navigation. */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · Navigation · Bottom Navigation"
      images={page.images}
    />
  ),
};
