import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { PASSWORD_STRENGTH_DOCS_PAGES } from "./catalog";

const page = PASSWORD_STRENGTH_DOCS_PAGES.find((p) => p.title === "Password Strength")!;

export default {
  title: "Components/PasswordStrength/Docs/Password Strength",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → Password Strength canvas (8:3445) → Password Strength. */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · Password Strength"
      images={page.images}
    />
  ),
};
