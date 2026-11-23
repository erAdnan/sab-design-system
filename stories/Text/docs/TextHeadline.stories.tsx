import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { TEXT_DOCS_PAGES } from "./catalog";

const page = TEXT_DOCS_PAGES.find((p) => p.title === "Text Headline")!;

export default {
  title: "Components/Layout/Text/Docs/Text Headline",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Text → Text Headline — Documentation (22009:4051). */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · Layout · Text"
      images={page.images}
    />
  ),
};
