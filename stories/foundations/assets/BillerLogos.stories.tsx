import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { BILLER_LOGOS_IMAGES } from "./catalog";

export default {
  title: "Foundations/Assets/Biller Logos",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse Assets → Biller Logos (15912:18212). */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title="Biller Logos"
      eyebrow="Foundations · Assets"
      images={BILLER_LOGOS_IMAGES}
    />
  ),
};
