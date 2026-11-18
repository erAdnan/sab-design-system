import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { CHECKBOX_DOCS_PAGES } from "./catalog";

const page = CHECKBOX_DOCS_PAGES.find((p) => p.title === "Check Box")!;

export default {
  title: "Components/Checkbox/Docs/Check Box",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Check Box canvas (8:3476) → Check Box. */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · Checkbox"
      images={page.images}
    />
  ),
};
