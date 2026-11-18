import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { HEADER_DOCS_PAGES } from "./catalog";

const page = HEADER_DOCS_PAGES.find((p) => p.title === "Pre-login Add-on")!;

export default {
  title: "Components/Header/Docs/Pre-login Add-on",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Header canvas (8:2922) → Pre-login Add-on. */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · Header"
      images={page.images}
    />
  ),
};
