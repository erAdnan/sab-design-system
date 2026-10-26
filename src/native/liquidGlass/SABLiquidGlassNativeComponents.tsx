import type { ColorValue, ViewProps } from "react-native";
import { requireNativeComponent } from "react-native";

export type SABLiquidGlassViewProps = ViewProps & {
  interactive?: boolean;
  effect?: "clear" | "regular" | "none";
  tintColor?: ColorValue;
  colorScheme?: "light" | "dark" | "system";
};

export type SABLiquidGlassContainerViewProps = ViewProps & {
  spacing?: number;
};

export const SABLiquidGlassView =
  requireNativeComponent<SABLiquidGlassViewProps>("SABLiquidGlassView");

export const SABLiquidGlassContainerView =
  requireNativeComponent<SABLiquidGlassContainerViewProps>(
    "SABLiquidGlassContainerView"
  );
