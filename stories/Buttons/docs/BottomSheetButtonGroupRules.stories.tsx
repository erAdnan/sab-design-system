import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { BUTTON_DOCS_PAGES } from "./catalog";

const page = BUTTON_DOCS_PAGES.find((p) => p.title === "Bottom sheet - Button group Rules")!;

export default {
  title: "Components/Buttons/Docs/Bottom sheet - Button group Rules",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Buttons canvas (7:189) → Bottom sheet - Button group Rules. */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · Buttons"
      images={page.images}
    />
  ),
};
