import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { TOGGLE_DOCS_PAGES } from "./catalog";

const page = TOGGLE_DOCS_PAGES.find((p) => p.title === "Toggle")!;

export default {
  title: "Components/Toggle/Docs/Toggle",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Toggle canvas (8:3497) → Toggle. */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · Toggle"
      images={page.images}
    />
  ),
};
