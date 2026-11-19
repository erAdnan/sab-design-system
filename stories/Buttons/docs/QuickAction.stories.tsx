import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { BUTTON_DOCS_PAGES } from "./catalog";

const page = BUTTON_DOCS_PAGES.find((p) => p.title === "Quick Action")!;

export default {
  title: "Components/Buttons/Docs/Quick Action",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Buttons canvas (7:189) → Quick Action. */
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
