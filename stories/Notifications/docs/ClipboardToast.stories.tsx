import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { NOTIFICATIONS_DOCS_PAGES } from "./catalog";

const page = NOTIFICATIONS_DOCS_PAGES.find((p) => p.title === "Clipboard Toast")!;

export default {
  title: "Components/Data Display/Notifications/Docs/Clipboard Toast",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Notifications canvas (11:3655) → Clipboard Toast. */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · Data Display · Notifications"
      images={page.images}
    />
  ),
};
