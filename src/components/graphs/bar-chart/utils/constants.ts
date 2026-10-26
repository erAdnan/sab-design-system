/** Bar fill color (green) for all bars in the chart */
export const BAR_CHART_COLOR = "#32995A";

/** Fixed width (px) for each bar column */
export const BAR_WIDTH = 24;

/** Default chart height (px) */
export const BAR_CHART_DEFAULT_HEIGHT = 220;

/** Content inset for the chart area. bottom is 0 so bar-to-label gap is only BAR_CHART_BAR_TO_LABEL_GAP (8px). */
export const BAR_CHART_CONTENT_INSET = {
  top: 12,
  bottom: 0,
  left: 8,
  right: 8,
};

/** Width reserved for y-axis reference labels (e.g. SAR 1,000 / 10,000 or 1,000 kg on one line) */
export const BAR_CHART_Y_AXIS_WIDTH = 72;

/** Left inset (px) to shift y-axis labels a bit right from the edge */
export const BAR_CHART_Y_AXIS_LABEL_INSET_LEFT = 24;

/** Weekly view: non-negative inset so "SAR 10,000" is fully visible (no clipping) */
export const BAR_CHART_WEEKLY_Y_AXIS_LABEL_INSET_LEFT = 0;


/** Min width per bar+label column (weekly: "Mon", "Tue", etc.) */
export const BAR_SLOT_MIN_WIDTH = 44;

/** Min width per bar+label column for monthly view so "Week 1", "Week 2", etc. are fully visible */
export const BAR_CHART_MONTHLY_SLOT_MIN_WIDTH = 40;

/** Y-axis reference tick values shown for scale (no 0 for cleaner look) */
export const BAR_CHART_Y_TICKS = [1000, 10000];

/** Gap (px) between bottom of bars and x-axis labels */
export const BAR_CHART_BAR_TO_LABEL_GAP = 8;

/** Color for y-axis reference grid lines (dotted) */
export const BAR_CHART_GRID_LINE_COLOR = "#D1D1D1";

/** Line width (px) for y-axis grid lines - thin for subtle reference */
export const BAR_CHART_GRID_LINE_WIDTH = 0.75;

/** Max width (px) for the chart block so it stays centered under chart info */
export const BAR_CHART_MAX_WIDTH = 400;

/** Message shown when chart has no data */
export const BAR_CHART_NO_DATA_MESSAGE = "No Data Available";

/** Gray bar color when a bar has no data (value <= 0) - used as fallback */
export const BAR_CHART_NO_DATA_BAR_COLOR = "#D7D8D6";

/** Linear gradient for no-data bars: #D7D8D6 at 36% → 20% → 0% opacity (bottom to top) */
export const BAR_CHART_NO_DATA_GRADIENT_COLORS = [
  "rgba(215, 216, 214, 0.36)",
  "rgba(215, 216, 214, 0.2)",
  "rgba(215, 216, 214, 0)",
] as const;

/** Min height (px) for a no-data gray bar so it is clearly visible */
export const BAR_CHART_NO_DATA_BAR_HEIGHT = 24;

/** Min height (px) for any bar so it stays visible */
export const BAR_CHART_MIN_BAR_HEIGHT = 2;

/** Min width used when computing non-weekly content width */
export const BAR_CHART_CONTENT_MIN_WIDTH = 200;

/** Vertical distance (px) between y-axis tick labels (e.g. between 1000 and 10000) */
export const BAR_CHART_Y_TICK_SPACING = 48;

/** Distance (px) from bottom of bars to the 1000 y-axis line; 10000 is at BASELINE_OFFSET + TICK_SPACING */
export const BAR_CHART_Y_BASELINE_OFFSET = 48;

/** When 7 bars (weekly): margin (px) from left; 0 so bars sit further left */
export const BAR_CHART_WEEKLY_LEFT_OFFSET = 0;

/** Gap (px) between y-axis labels and the start of the bars (weekly view). Lower = bars closer to labels. */
export const BAR_CHART_WEEKLY_GAP_Y_AXIS_TO_BARS = 36;

/** Minimum gap (px) on the side when not in weekly mode (e.g. 4-bar monthly) */
export const BAR_CHART_MIN_SIDE_GAP = 48;

/** Skeleton placeholder dimensions (raw px; use with actuatedNormalize in components) */
export const BAR_CHART_SKELETON = {
  LABEL_WIDTH: 100,
  PERIOD_WIDTH: 80,
  AMOUNT_WIDTH: 120,
  CHART_HEIGHT: 220,
  FILTER_BUTTON_WIDTH: 88,
  FILTER_BUTTON_HEIGHT: 36,
  TOP_FILTER_NAV_HEIGHT: 56,
} as const;
