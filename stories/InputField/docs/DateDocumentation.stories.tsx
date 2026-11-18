import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { INPUT_FIELD_DOCS_PAGES } from "./catalog";

const page = INPUT_FIELD_DOCS_PAGES.find((p) => p.title === "Date Documentation")!;

export default {
  title: "Components/InputField/Docs/Date Documentation",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Input Field canvas (8:2669) → Date Documentation. */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · InputField"
      images={page.images}
    />
  ),
};
