import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { WIDGETS_DOCS_PAGES } from "./catalog";

const page = WIDGETS_DOCS_PAGES.find((p) => p.title === "Tile/List Widget")!;

export default {
  title: "Components/Data Display/Widgets/Docs/Tile List Widget",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/**
 * Figma Pulse Design System → Widgets canvas → Tile/List Widget (22198:59223).
 * https://www.figma.com/design/icrv7MTnVLGbxHB3eZcu3Z/00.-Pulse-Design-System?node-id=22198-59223
 */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · Data Display · Widgets"
      images={page.images}
    />
  ),
};
