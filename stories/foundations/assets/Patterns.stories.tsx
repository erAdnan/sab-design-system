import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { PATTERNS_IMAGES } from "./catalog";

export default {
  title: "Foundations/Assets/Patterns",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse Assets → Patterns (2314:14901). */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title="Patterns"
      eyebrow="Foundations · Assets"
      images={PATTERNS_IMAGES}
    />
  ),
};
