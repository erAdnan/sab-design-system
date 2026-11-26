import React from "react";
import { View } from "react-native";
import type { Decorator } from "@storybook/react-webpack5";
import { actuatedNormalize } from "../src/assets/styles/utils/pixelScaling";
import { centerStoryDecorator } from "./centerStoryDecorator";

/** Figma mobile frame width (375). */
export const MOBILE_FRAME_WIDTH = actuatedNormalize(375);

/** Figma mobile content width (375 frame - 2 × 16 horizontal padding = 343). */
export const MOBILE_CONTENT_WIDTH = actuatedNormalize(343);

/** `width: 100%` capped at `maxWidth`, so components that fill their parent don't span a desktop canvas. */
export const mobileWidthDecorator = (maxWidth: number): Decorator => (Story) => (
  <View style={{ width: "100%", maxWidth }}>
    <Story />
  </View>
);

/**
 * Shared Storybook frame: caps the story at the mobile content width (343) and centers it
 * horizontally. Use for any component that is `width: 100%` of its parent (inputs, banners,
 * indicators, list-like blocks, ...). Components keep filling their parent; only the story
 * canvas is constrained.
 */
export const mobileContentDecorators: Decorator[] = [
  mobileWidthDecorator(MOBILE_CONTENT_WIDTH),
  centerStoryDecorator,
];

/**
 * Full mobile frame (375). Use for bottom-sheet style components that bring their own 16px side
 * padding (ButtonGroupReview, ...) and are full-bleed on device.
 */
export const mobileFrameDecorators: Decorator[] = [
  mobileWidthDecorator(MOBILE_FRAME_WIDTH),
  centerStoryDecorator,
];
