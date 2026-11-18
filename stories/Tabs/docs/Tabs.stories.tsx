import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { TABS_DOCS_PAGES } from "./catalog";

const page = TABS_DOCS_PAGES.find((p) => p.title === "Tabs")!;

export default {
  title: "Components/Tabs/Docs/Tabs",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Tabs canvas (8:3521) → Tabs. */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · Tabs"
      images={page.images}
    />
  ),
};
