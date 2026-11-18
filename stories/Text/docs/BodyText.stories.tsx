import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { TEXT_DOCS_PAGES } from "./catalog";

const page = TEXT_DOCS_PAGES.find((p) => p.title === "Body Text")!;

export default {
  title: "Components/Text/Docs/Body Text",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Text → Body Text — Documentation (22009:4088). */
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
