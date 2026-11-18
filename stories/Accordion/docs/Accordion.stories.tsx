import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { ACCORDION_DOCS_PAGES } from "./catalog";

const page = ACCORDION_DOCS_PAGES.find((p) => p.title === "Accordion")!;

export default {
  title: "Components/Accordion/Docs/Accordion",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Accordion canvas (103:637) → Accordion. */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · Accordion"
      images={page.images}
    />
  ),
};
