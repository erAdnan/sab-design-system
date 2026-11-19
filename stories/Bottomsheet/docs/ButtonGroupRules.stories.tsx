import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { BOTTOMSHEET_DOCS_PAGES } from "./catalog";

const page = BOTTOMSHEET_DOCS_PAGES.find(
  (p) => p.title === "Bottom sheet - Button group Rules"
)!;

export default {
  title: "Components/Bottomsheet/Docs/Bottom sheet - Button group Rules",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Bottomsheet canvas (17468:13574) → Button group Rules. */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · Bottomsheet"
      images={page.images}
    />
  ),
};
