import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { TEXT_DOCS_PAGES } from "./catalog";

const page = TEXT_DOCS_PAGES.find((p) => p.title === "Title Actions")!;

export default {
  title: "Components/Text/Docs/Title Actions",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Text → Title Actions — Documentation (22009:4014). */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · Text"
      images={page.images}
    />
  ),
};
