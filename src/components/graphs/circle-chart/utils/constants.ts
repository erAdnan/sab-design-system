/** PFM/shopping donut segment colors (design tokens). Same in light and dark theme. */
export const CHART_SEGMENT_1 = "#F4ECF8";   // PFM/shopping/1 - lightest
export const CHART_SEGMENT_2 = "#EADCF2";
export const CHART_SEGMENT_3 = "#DDC1E6";
export const CHART_SEGMENT_4 = "#C89BD7";
export const CHART_SEGMENT_5 = "#C58DE5";
export const CHART_SEGMENT_6 = "#AE74C2";
export const CHART_SEGMENT_7 = "#AA60D5";
export const CHART_SEGMENT_8 = "#9355A4";
export const CHART_SEGMENT_9 = "#773398";
export const CHART_SEGMENT_10 = "#794487";
export const CHART_SEGMENT_11 = "#65396F";
export const CHART_SEGMENT_12 = "#55325D";
export const CHART_SEGMENT_13 = "#34183A";   // PFM/shopping/13 - darkest

/** Donut segment palette: 13 colors (PFM/shopping/1 to 13), lightest → darkest */
export const CIRCLE_CHART_COLORS = [
  CHART_SEGMENT_1,
  CHART_SEGMENT_2,
  CHART_SEGMENT_3,
  CHART_SEGMENT_4,
  CHART_SEGMENT_5,
  CHART_SEGMENT_6,
  CHART_SEGMENT_7,
  CHART_SEGMENT_8,
  CHART_SEGMENT_9,
  CHART_SEGMENT_10,
  CHART_SEGMENT_11,
  CHART_SEGMENT_12,
  CHART_SEGMENT_13,
];

/** Default donut graph diameter (px) */
export const CIRCLE_CHART_DEFAULT_SIZE = 200;

/** Margin (gap) around the donut so it is not cut off; used for container sizing. Also used as gap between inner circle and ring. */
export const CHART_GAP = 64;

/** Default donut ring thickness (px) */
export const CHART_DEFAULT_STROKE_WIDTH = 24;

/** Fill color for the default and custom center icon (matches shopping icon) */
export const CHART_CENTER_ICON_COLOR = "#9041BA";

/** Background color for the full donut ring when there is no data (Block-BG fallback) */
export const CHART_EMPTY_RING_COLOR = "#F2F3F4";

/** Inner circle and icon dimensions (design specs) */
export const INNER_CIRCLE_SIZE = 84;
export const INNER_CIRCLE_BORDER_RADIUS = 116.667;
/** Center icon size (px) - 24×24 */
export const CHART_ICON_SIZE = 24;

/** Skeleton placeholder dimensions (raw px; use with actuatedNormalize in components) */
export const CIRCLE_CHART_SKELETON = {
  LABEL_WIDTH: 80,
  DOT_SIZE: 4,
  PERIOD_WIDTH: 70,
  CURRENCY_WIDTH: 40,
  AMOUNT_WIDTH: 120,
  FILTER_ICON_SIZE: 24,
  FILTER_BUTTON_WIDTH: 90,
  FILTER_BUTTON_HEIGHT: 36,
  CHART_BORDER_RADIUS: 999,
} as const;
