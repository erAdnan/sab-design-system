import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { AVATAR_DOCS_PAGES } from "./catalog";

const page = AVATAR_DOCS_PAGES.find((p) => p.title === "Avatar \u2014 Documentation")!;

export default {
  title: "Components/Avatar/Docs/Avatar \u2014 Documentation",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Avatar canvas (87:532) → Avatar — Documentation. */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · Avatar"
      images={page.images}
    />
  ),
};
