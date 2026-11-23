import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { MERCHANT_LOGOS_IMAGES } from "./catalog";

export default {
  title: "Foundations/Assets/Merchant Logos",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse Assets → Merchant Logos (16159:25728). */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title="Merchant Logos"
      eyebrow="Foundations · Assets"
      images={MERCHANT_LOGOS_IMAGES}
    />
  ),
};
