import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { STEPPER_DOCS_PAGES } from "./catalog";

const page = STEPPER_DOCS_PAGES.find((p) => p.title === "Stepper")!;

export default {
  title: "Components/Navigation/Stepper/Docs/Stepper",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Stepper canvas (13:3737) → Stepper. */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · Navigation · Stepper"
      images={page.images}
    />
  ),
};
