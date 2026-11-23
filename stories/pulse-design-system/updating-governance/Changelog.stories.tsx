import React from "react";
import { FigmaDocPage } from "../rules-and-patterns/FigmaDocPage";
import { UPDATING_GOVERNANCE_PAGES } from "./catalog";

const page = UPDATING_GOVERNANCE_PAGES.find((p) => p.title === "Changelog")!;

export default {
  title: "Pulse Design System/Updating Governance/Changelog",
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
      eyebrow="Updating Governance"
      images={page.images}
    />
  ),
};
