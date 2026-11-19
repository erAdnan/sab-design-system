import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { BADGE_DOCS_PAGES } from "./catalog";

const page = BADGE_DOCS_PAGES.find((p) => p.title === "Badge")!;

export default {
  title: "Components/Data Display/Badge/Docs/Badge",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Badge canvas (215:1827) → Badge. */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · Data Display · Badge"
      images={page.images}
    />
  ),
};
