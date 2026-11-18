import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { CHIPS_DOCS_PAGES } from "./catalog";

const page = CHIPS_DOCS_PAGES.find((p) => p.title === "Chips Select")!;

export default {
  title: "Components/Chips/Docs/Chips Select",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Chips canvas (146:2195) → Chips Select. */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · Chips"
      images={page.images}
    />
  ),
};
