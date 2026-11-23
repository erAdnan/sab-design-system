import { useCallback, useMemo } from "react";
import { useWindowDimensions, ViewStyle } from "react-native";
import { spacingS } from "../constants/size";
import { actuatedNormalize } from "./pixelScaling";

export type CanvasTier = "smallMobile" | "largeMobile" | "tablet" | "largeTablet";

/**
 * Storybook canvas tiers:
 * small mobile ~320, large mobile ~428, tablet ~768, large tablet ~1024.
 */
export function canvasTier(width: number): CanvasTier {
  if (width <= 360) return "smallMobile";
  if (width <= 480) return "largeMobile";
  if (width < 900) return "tablet";
  return "largeTablet";
}

/** Same stretch rules as Accordion: fill the selected canvas, don't lock a design width. */
export const fillFrame: ViewStyle = {
  width: "100%",
  maxWidth: "100%",
  minWidth: 0,
  alignSelf: "stretch",
};

/**
 * Width of the story/screen content box.
 * Storybook wraps every story in 16dp of padding on each side.
 */
export function contentSpan(windowWidth: number): number {
  // Matches StoryBookWrapper's 16dp padding on each side.
  const gutter = Math.max(spacingS * 2, 32);
  if (windowWidth <= 0) return 0;
  return Math.max(0, windowWidth - gutter);
}

export function useFluidWidth() {
  const { width, height } = useWindowDimensions();
  const tier = canvasTier(width);
  const span = contentSpan(width);

  /**
   * Figma fixed size: returns `actuatedNormalize(designWidth)` for width + maxWidth.
   * Without a designWidth, falls back to `fillFrame` (intentional full-bleed shells only).
   */
  const of = useCallback((designWidth?: number): ViewStyle => {
    if (designWidth == null) return fillFrame;
    const w = actuatedNormalize(designWidth);
    return { width: w, maxWidth: w, alignSelf: "center" };
  }, []);

  return useMemo(
    () => ({
      width,
      height,
      span,
      tier,
      isCompact: tier === "smallMobile" || tier === "largeMobile",
      isTabletUp: tier === "tablet" || tier === "largeTablet",
      of,
    }),
    [width, height, span, tier, of]
  );
}
