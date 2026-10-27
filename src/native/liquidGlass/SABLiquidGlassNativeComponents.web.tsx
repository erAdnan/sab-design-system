import React from "react";
import { View, type ColorValue, type ViewProps } from "react-native";

export type SABLiquidGlassViewProps = ViewProps & {
  interactive?: boolean;
  effect?: "clear" | "regular" | "none";
  tintColor?: ColorValue;
  colorScheme?: "light" | "dark" | "system";
};

export type SABLiquidGlassContainerViewProps = ViewProps & {
  spacing?: number;
};

/** Web Storybook stand-in. Device builds keep the native view. */
export function SABLiquidGlassView(props: SABLiquidGlassViewProps) {
  return <View {...props} />;
}

export function SABLiquidGlassContainerView(
  props: SABLiquidGlassContainerViewProps
) {
  return <View {...props} />;
}
