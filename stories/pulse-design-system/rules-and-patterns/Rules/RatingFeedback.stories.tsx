import React from "react";
import { FigmaDocPage } from "../FigmaDocPage";
import { RULES_AND_PATTERNS_PAGES } from "../catalog";

const page = RULES_AND_PATTERNS_PAGES.find(
  (p) => p.folder === "Rules" && p.title === "Rating & Feedback"
)!;

export default {
  title: "Pulse Design System/Rules & Patterns/Rules/Rating & Feedback",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow={`Rules and Patterns · ${page.folder}`}
      images={page.images}
    />
  ),
};
