import React from "react";
import { FigmaDocPage } from "../rules-and-patterns/FigmaDocPage";
import { GUIDELINES_PAGES } from "./catalog";

const page = GUIDELINES_PAGES.find((p) => p.title === "Colours")!;

export default {
  title: "Pulse Design System/Guidelines/Colours",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Guidelines"
      images={page.images}
    />
  ),
};
