import React from "react";
import { JourneyPage } from "./JourneyPage";

/**
 * Figma: SAB Source Inventory / IA Journey (22159:49773)
 * Root: “SAB mobile App All Journeys” — coded UI (not a downscaled WebP).
 */
export default {
  title: "Pulse Design System/Journey",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
    docs: {
      description: {
        component:
          "Mobile app IA Journey source inventory from Figma (node 22159:49773): SAB mobile App All Journeys.",
      },
    },
  },
};

export const Overview = {
  name: "Overview",
  render: () => <JourneyPage />,
};
