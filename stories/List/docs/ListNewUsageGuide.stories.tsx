import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { LIST_DOCS_PAGES } from "./catalog";

const page = LIST_DOCS_PAGES.find((p) => p.title === "List New \u2014 Usage guide")!;

export default {
  title: "Components/Navigation/List/Docs/List New \u2014 Usage guide",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → List canvas (257:2186) → List New — Usage guide. */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · Navigation · List"
      images={page.images}
    />
  ),
};
