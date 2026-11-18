import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { BANNERS_DOCS_PAGES } from "./catalog";

const page = BANNERS_DOCS_PAGES.find((p) => p.title === "Promotional Banner \u2014 Documentation")!;

export default {
  title: "Components/Banners/Docs/Promotional Banner \u2014 Documentation",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Banners canvas (1314:9025) → Promotional Banner — Documentation. */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · Banners"
      images={page.images}
    />
  ),
};
