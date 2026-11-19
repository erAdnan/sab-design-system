import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { GRAPH_DOCS_PAGES } from "./catalog";

const page = GRAPH_DOCS_PAGES.find((p) => p.title === "Bar Graph")!;

export default {
  title: "Components/Graph/Docs/Bar Graph",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Graph canvas (11572:15448) → Bar Graph. */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · Graph"
      images={page.images}
    />
  ),
};
