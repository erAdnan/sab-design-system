import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { PASSWORD_STRENGTH_DOCS_PAGES } from "./catalog";

const page = PASSWORD_STRENGTH_DOCS_PAGES.find((p) => p.title === "PIN")!;

export default {
  title: "Components/Data Display/PasswordStrength/Docs/PIN",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Password Strength canvas (8:3445) → PIN. */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · Data Display · Password Strength"
      images={page.images}
    />
  ),
};
