import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { BANNERS_DOCS_PAGES } from "./catalog";

const page = BANNERS_DOCS_PAGES.find((p) => p.title === "Marketing Banner")!;

export default {
  title: "Components/Banners/Docs/Marketing Banner",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Banners canvas (1314:9025) → Marketing Banner. */
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
