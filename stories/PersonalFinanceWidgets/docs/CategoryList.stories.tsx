import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { PERSONAL_FINANCE_WIDGETS_DOCS_PAGES } from "./catalog";

const page = PERSONAL_FINANCE_WIDGETS_DOCS_PAGES.find((p) => p.title === "Category List")!;

export default {
  title: "Components/Data Display/PersonalFinanceWidgets/Docs/Category List",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Personal Finance Widgets canvas (2702:8148) → Category List. */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · Data Display · PersonalFinanceWidgets"
      images={page.images}
    />
  ),
};
