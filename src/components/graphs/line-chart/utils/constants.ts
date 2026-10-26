
export const CHART_CONSTANTS = {
  DEFAULT_HEIGHT: 220,
  /** Horizontal screen margins when no parent width is measured (16px each side) */
  DEFAULT_MARGIN: 32,
  X_AXIS_HEIGHT: 25,
  /** Extra space below chart data so fill and bottom line sit just above the x-axis labels */
  CHART_BOTTOM_EXTRA: 28,
  /** 4px gap between chart lowest values and bottom line so both stay visible (e.g. when values are 0) */
  CHART_BOTTOM_LINE_GAP: 4,
  /**
   * Empty-state only: default gap between the grey zero-line and the x-axis baseline.
   * Compact (4) for PFM/Landing; Expenses overrides via `emptyChartBottomLineGap` (40).
   */
  EMPTY_CHART_BOTTOM_LINE_GAP: 4,
  /**
   * Empty-state shade under the zero-line. Dark needs higher opacity so the
   * gradient stays visible on pure black (`stylesbackground2` / `primaryinvert`).
   */
  EMPTY_CHART_SHADE_OPACITY: {
    LIGHT: 0.40,
    DARK: 0.30,
  },
  /** Vertical only — chart line/area stays full width; week labels use their own inset */
  CONTENT_INSET: {
    TOP: 20,
    BOTTOM: 20,
    LEFT: 0,
    RIGHT: 0,
  },
      LINE: {
        STROKE_WIDTH: 3,
        DOT_RADIUS: 6,
        DOT_STROKE_WIDTH: 2,
        BOTTOM_STROKE_WIDTH: 1.5,
        PATH_MULTIPLIER: 1.5,
        INDICATOR_STROKE_WIDTH: 2,
      },
  CLICKABLE: {
    /** Only the middle 80% of chart width is touchable; ends don't show tooltip */
    WIDTH_PERCENT: 0.8,
    TOUCH_RADIUS: 25,
  },
  GRADIENT: {
    START_COLOR: "#FFE3AB",
    START_OPACITY: 0.4,
    END_COLOR: "#FFFFFF",
    END_OPACITY: 0,
  },
  VARIANTS: {
    primary: {
      LINE_COLOR: "#FFBB33",
      GRADIENT: {
        START_COLOR: "#FFE3AB",
        START_OPACITY: 0.4,
        END_COLOR: "#FFFFFF",
        END_OPACITY: 0,
      },
    },
    secondary: {
      LINE_COLOR: "#805EC9",
      GRADIENT: {
        START_COLOR: "#9041BA",
        START_OPACITY: 0.4,
        END_COLOR: "#FFFFFF",
        END_OPACITY: 0,
      },
    },
  },
  OPACITY: {
    INACTIVE_LINE: 0.1,
    BOTTOM_LINE: 0.3,
  },
  INACTIVE_LINE_COLOR: {
    LIGHT: "rgba(0, 0, 0, 0.1)",
    DARK: "rgba(255, 255, 255, 0.1)",
  },
  FONT_SIZE: {
    X_AXIS: 12,
    TOOLTIP_AMOUNT: 13.019,
    TOOLTIP_DATE: 10.415,
  },
  TOOLTIP: {
    WIDTH: 79.608,
    HEIGHT: 51.103,
    ORIGINAL_WIDTH: 81,
    ORIGINAL_HEIGHT: 51,
    /** Keeps the movable arrow clear of the tooltip's rounded corners. */
    ARROW_EDGE_INSET: 14.5,
    VERTICAL_OFFSET: 12,
    VERTICAL_SPACING: 10,
    TEXT_SPACING: 10,
    AMOUNT_TEXT_Y_TOP: 24,
    AMOUNT_TEXT_Y_BOTTOM: 14,
    DATE_TEXT_OFFSET: 16,
    TEXT_VERTICAL_ALIGN: 0.35,
    STROKE_WIDTH_DIVISOR: 1,
  },
  /** No extra x-axis margin — wrapper already provides 16px L/R */
  X_AXIS_MARGIN: 0,
  X_AXIS_STYLE_HEIGHT: 32,
  /** Distance the x-axis labels sit up from the bottom of the label area — larger = closer to the axis line */
  X_AXIS_LABEL_GAP: 22,
  /** Horizontal inset so first/last x-axis labels aren’t clipped (covers “Week 1”, “Feb”, “2025”) */
  X_AXIS_LABEL_HORIZONTAL_INSET: 28,
  SKELETON: {
    LABEL_WIDTH: 80,
    DOT_SIZE: 4,
    PERIOD_WIDTH: 70,
    CURRENCY_WIDTH: 40,
    AMOUNT_WIDTH: 120,
    AVERAGE_WIDTH: 150,
    FILTER_ICON_SIZE: 24,
    FILTER_BUTTON_WIDTH: 90,
    FILTER_BUTTON_HEIGHT: 36,
    CHART_HEIGHT: 220,
    /** Figma `Line graph` skeleton (node 667:19378) */
    WAVE_HEIGHT: 157,
    TOTAL_SPENT_HEIGHT: 102,
  },
} as const;

export const getContentInset = () => ({
  top: CHART_CONSTANTS.CONTENT_INSET.TOP,
  bottom:
    CHART_CONSTANTS.CONTENT_INSET.BOTTOM +
    CHART_CONSTANTS.X_AXIS_HEIGHT +
    CHART_CONSTANTS.CHART_BOTTOM_EXTRA,
  left: CHART_CONSTANTS.CONTENT_INSET.LEFT,
  right: CHART_CONSTANTS.CONTENT_INSET.RIGHT,
});

