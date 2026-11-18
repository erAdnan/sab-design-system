import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { DIVIDER_DOC_IMAGES } from "./catalog";

export default {
  title: "Components/Divider/Docs",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Divider — Documentation (22013:576 / canvas 262:2754). */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title="Divider"
      eyebrow="Components · Divider"
      images={DIVIDER_DOC_IMAGES}
    />
  ),
};
