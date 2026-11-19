import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { UPLOADER_DOCS_PAGES } from "./catalog";

const page = UPLOADER_DOCS_PAGES.find((p) => p.title === "Upload")!;

export default {
  title: "Components/Data Entry/Upload/Docs/Upload",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Upload canvas (4120:21000) → Upload. */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · Data Entry · Upload"
      images={page.images}
    />
  ),
};
