import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { TRACKER_DOCS_PAGES } from "./catalog";

const page = TRACKER_DOCS_PAGES.find((p) => p.title === "Tracker")!;

export default {
  title: "Components/Data Display/Tracker/Docs/Tracker",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Tracker canvas (4391:37792) → Tracker. */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · Data Display · Tracker"
      images={page.images}
    />
  ),
};
