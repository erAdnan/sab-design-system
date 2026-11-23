import { useMemo } from "react";
import { useWindowDimensions } from "react-native";
import { canvasTier, type CanvasTier } from "../../../src/assets/styles/utils/responsive";

export type PulseDocBreakpoint = "mobile" | "tablet" | "desktop";

export function pulseBreakpoint(width: number): PulseDocBreakpoint {
  const tier = canvasTier(width);
  if (tier === "smallMobile" || tier === "largeMobile") return "mobile";
  if (tier === "tablet") return "tablet";
  return "desktop";
}

type PulseDocLayout = {
  width: number;
  tier: CanvasTier;
  breakpoint: PulseDocBreakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  /** Outer page / header horizontal padding */
  pagePadX: number;
  pagePadY: number;
  /** Stacked content vertical rhythm */
  sectionGap: number;
  /** Card / band inner padding */
  cardPad: number;
  /** Header title */
  headerTitleSize: number;
  headerTitleLine: number;
  headerEyebrowSize: number;
  /** Section titles (Ecosystem) */
  sectionTitleSize: number;
  sectionTitleLine: number;
  /** Body copy */
  bodySize: number;
  bodyLine: number;
  /** Card title */
  cardTitleSize: number;
  cardTitleLine: number;
  /** Grid card minimum width before wrapping */
  cardMinWidth: number;
  /** Hero / closing display title */
  displaySize: number;
  displayLine: number;
  /** Corner radius for bands */
  radius: number;
  /** Max content width */
  maxContent: number;
};

const LAYOUTS: Record<PulseDocBreakpoint, Omit<PulseDocLayout, "width" | "tier" | "breakpoint" | "isMobile" | "isTablet" | "isDesktop">> = {
  mobile: {
    pagePadX: 16,
    pagePadY: 20,
    sectionGap: 16,
    cardPad: 20,
    headerTitleSize: 22,
    headerTitleLine: 28,
    headerEyebrowSize: 13,
    sectionTitleSize: 26,
    sectionTitleLine: 32,
    bodySize: 16,
    bodyLine: 22,
    cardTitleSize: 17,
    cardTitleLine: 22,
    cardMinWidth: 10000, // force single column
    displaySize: 26,
    displayLine: 32,
    radius: 16,
    maxContent: 1440,
  },
  tablet: {
    pagePadX: 28,
    pagePadY: 28,
    sectionGap: 20,
    cardPad: 24,
    headerTitleSize: 26,
    headerTitleLine: 32,
    headerEyebrowSize: 14,
    sectionTitleSize: 32,
    sectionTitleLine: 38,
    bodySize: 18,
    bodyLine: 26,
    cardTitleSize: 18,
    cardTitleLine: 24,
    cardMinWidth: 280,
    displaySize: 30,
    displayLine: 36,
    radius: 20,
    maxContent: 1440,
  },
  desktop: {
    pagePadX: 48,
    pagePadY: 40,
    sectionGap: 24,
    cardPad: 32,
    headerTitleSize: 34,
    headerTitleLine: 41,
    headerEyebrowSize: 15,
    sectionTitleSize: 38,
    sectionTitleLine: 41,
    bodySize: 22,
    bodyLine: 28,
    cardTitleSize: 20,
    cardTitleLine: 25,
    cardMinWidth: 260,
    displaySize: 34,
    displayLine: 40,
    radius: 24,
    maxContent: 1440,
  },
};

/** Responsive spacing/type tokens for Pulse Design System Storybook docs. */
export function usePulseDocLayout(): PulseDocLayout {
  const { width } = useWindowDimensions();
  return useMemo(() => {
    const tier = canvasTier(width);
    const breakpoint = pulseBreakpoint(width);
    const base = LAYOUTS[breakpoint];
    return {
      width,
      tier,
      breakpoint,
      isMobile: breakpoint === "mobile",
      isTablet: breakpoint === "tablet",
      isDesktop: breakpoint === "desktop",
      ...base,
    };
  }, [width]);
}
