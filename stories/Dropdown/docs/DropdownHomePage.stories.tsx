import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { DROPDOWN_DOCS_PAGES } from "./catalog";

const page = DROPDOWN_DOCS_PAGES.find((p) => p.title === "Dropdown- Home Page")!;

export default {
  title: "Components/Dropdown/Docs/Dropdown- Home Page",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Dropdown canvas (2096:12300) → Dropdown- Home Page. */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · Dropdown"
      images={page.images}
    />
  ),
};
