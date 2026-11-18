import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { NAVIGATION_DOTS_DOCS_PAGES } from "./catalog";

const page = NAVIGATION_DOTS_DOCS_PAGES.find((p) => p.title === "Navigation Dots")!;

export default {
  title: "Components/NavigationDots/Docs/Navigation Dots",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Navigation Dots canvas (7279:49903) → Navigation Dots. */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · NavigationDots"
      images={page.images}
    />
  ),
};
