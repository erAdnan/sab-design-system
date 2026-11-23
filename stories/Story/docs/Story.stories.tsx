import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { STORY_DOCS_PAGES } from "./catalog";

const page = STORY_DOCS_PAGES.find((p) => p.title === "Story")!;

export default {
  title: "Components/Data Display/Story/Docs/Story",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Story canvas (2253:2450) → Story. */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · Data Display · Story"
      images={page.images}
    />
  ),
};
