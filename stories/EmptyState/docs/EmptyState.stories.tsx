import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { EMPTY_STATE_DOCS_PAGES } from "./catalog";

const page = EMPTY_STATE_DOCS_PAGES.find((p) => p.title === "Empty State")!;

export default {
  title: "Components/Data Display/EmptyState/Docs/Empty State",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Empty State Note canvas (36:576) → Empty State. */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · Data Display · Empty State"
      images={page.images}
    />
  ),
};
