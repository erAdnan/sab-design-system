import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { CREDIT_ACCOUNT_FINANCE_DOCS_PAGES } from "./catalog";

const page = CREDIT_ACCOUNT_FINANCE_DOCS_PAGES.find((p) => p.title === "Credit Card")!;

export default {
  title: "Components/Cards & Accounts & Finance/Docs/Credit Card",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Cards & Accounts & Finance canvas (227:2376) → Credit Card. */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · Cards & Accounts & Finance"
      images={page.images}
    />
  ),
};
