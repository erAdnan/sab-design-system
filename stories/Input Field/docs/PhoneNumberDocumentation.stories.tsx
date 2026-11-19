import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { INPUT_FIELD_DOCS_PAGES } from "./catalog";

const page = INPUT_FIELD_DOCS_PAGES.find((p) => p.title === "Phone Number Documentation")!;

export default {
  title: "Components/Data Entry/Input Field/Docs/Phone Number Documentation",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Input Field canvas (8:2669) → Phone Number Documentation. */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · Data Entry · Input Field"
      images={page.images}
    />
  ),
};
