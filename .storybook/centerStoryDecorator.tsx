import React from "react";
import { View, type ViewStyle } from "react-native";
import type { Decorator } from "@storybook/react";

/**
 * Horizontally centers the story (top-aligned on Y).
 *
 * Uses a ROW container with `justifyContent: "center"` instead of a column with
 * `alignItems: "center"`. Many components (chips, etc.) set `alignSelf: "flex-start"`
 * on their root (and others use `alignSelf: "stretch"`), which overrides a parent's `alignItems` in a column layout and pins
 * them to the left. In a row, `alignSelf` only affects the vertical axis, so the
 * main-axis centering always wins and the child keeps its intrinsic width.
 */
const centerStoryStyle: ViewStyle = {
  // No `flex: 1`: the wrapper must hug its content vertically. Otherwise it fills the whole canvas and
  // children with `alignSelf: "stretch"` (ChangeActionButton, EmptyState, ...) get stretched to full height
  // in this row layout.
  flexGrow: 0,
  flexShrink: 0,
  width: "100%",
  maxWidth: "100%",
  minWidth: 0,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "flex-start",
};

export const centerStoryDecorator: Decorator = (Story) => (
  <View style={centerStoryStyle}>
    <Story />
  </View>
);
