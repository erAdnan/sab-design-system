import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { ICON_SIZES_IMAGES } from "./catalog";

export default {
  title: "Foundations/Assets/Icon Sizes",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse Assets → Icon Sizes (1465:11160). */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title="Icon Sizes"
      eyebrow="Foundations · Assets"
      images={ICON_SIZES_IMAGES}
    />
  ),
};
