import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { CALENDAR_DOCS_PAGES } from "./catalog";

const page = CALENDAR_DOCS_PAGES.find((p) => p.title === "Calendar")!;

export default {
  title: "Components/Calendar/Docs/Calendar",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Calendar canvas (14209:10136) → Calendar. */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · Calendar"
      images={page.images}
    />
  ),
};
