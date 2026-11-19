import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { PROGRESS_INDICATOR_DOCS_PAGES } from "./catalog";

const page = PROGRESS_INDICATOR_DOCS_PAGES.find((p) => p.title === "Exchange rate indicator  - Documentation")!;

export default {
  title: "Components/ProgressIndicator/Docs/Exchange rate indicator  - Documentation",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Progress Indicator canvas (82:1799) → Exchange rate indicator  - Documentation. */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · Progress Indicator"
      images={page.images}
    />
  ),
};
