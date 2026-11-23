import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { INPUT_FIELD_DOCS_PAGES } from "./catalog";

const page = INPUT_FIELD_DOCS_PAGES.find((p) => p.title === "Pin Input Documentation")!;

export default {
  title: "Components/Data Entry/Input Field/Docs/Pin Input Documentation",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/**
 * Figma: 00. Pulse Design System
 * https://www.figma.com/design/icrv7MTnVLGbxHB3eZcu3Z/00.-Pulse-Design-System?node-id=24006-293327
 */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · Data Entry · Input Field"
      images={page.images}
    />
  ),
};
