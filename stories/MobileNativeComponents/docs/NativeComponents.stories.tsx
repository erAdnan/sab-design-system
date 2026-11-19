import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { MOBILE_NATIVE_COMPONENTS_DOCS_PAGES } from "./catalog";

const page = MOBILE_NATIVE_COMPONENTS_DOCS_PAGES.find(
  (p) => p.title === "Native Components"
)!;

export default {
  title: "Mobile Native Components/Docs/Native Components",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Mobile Native Components canvas (755:4645). */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Mobile Native Components"
      images={page.images}
    />
  ),
};
