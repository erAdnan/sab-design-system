import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { RADIO_BUTTON_DOCS_PAGES } from "./catalog";

const page = RADIO_BUTTON_DOCS_PAGES.find((p) => p.title === "Radio Button")!;

export default {
  title: "Components/Radio Button/Docs/Radio Button",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Radio Button canvas (8:3487) → Radio Button. */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · Radio Button"
      images={page.images}
    />
  ),
};
