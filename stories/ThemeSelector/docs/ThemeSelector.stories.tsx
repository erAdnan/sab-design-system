import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { THEME_SELECTOR_DOCS_PAGES } from "./catalog";

const page = THEME_SELECTOR_DOCS_PAGES.find((p) => p.title === "Theme selector")!;

export default {
  title: "Components/Data Display/ThemeSelector/Docs/Theme selector",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Theme selector canvas (15234:56750). */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · Data Display · ThemeSelector"
      images={page.images}
    />
  ),
};
