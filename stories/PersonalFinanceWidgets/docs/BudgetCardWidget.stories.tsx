import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { PERSONAL_FINANCE_WIDGETS_DOCS_PAGES } from "./catalog";

const page = PERSONAL_FINANCE_WIDGETS_DOCS_PAGES.find((p) => p.title === "Budget Card Widget")!;

export default {
  title: "Components/PersonalFinanceWidgets/Docs/Budget Card Widget",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Personal Finance Widgets canvas (2702:8148) → Budget Card Widget. */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · PersonalFinanceWidgets"
      images={page.images}
    />
  ),
};
