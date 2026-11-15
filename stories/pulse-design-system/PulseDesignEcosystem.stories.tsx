import React from "react";
import { EcosystemPage } from "./ecosystem/EcosystemPage";

export default {
  title: "Pulse Design System/Pulse Design Ecosystem",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

export const Overview = {
  name: "Overview",
  render: () => <EcosystemPage />,
};
