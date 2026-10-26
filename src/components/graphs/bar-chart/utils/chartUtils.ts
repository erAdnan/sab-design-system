import type {
  BarChartBottomTimeFrame,
  BarChartDataPoint,
} from "../types/types";

/** Fixed number of bar slots for each bottom time-frame filter. */
export const BAR_CHART_BOTTOM_SLOT_COUNT: Record<
  BarChartBottomTimeFrame,
  number
> = {
  thisMonth: 4,
  lastMonth: 4,
  "3Months": 3,
  "6Months": 6,
  "12Months": 12,
  currentYear: 12,
  lastYear: 12,
};

const WEEK_OF_MONTH_LABELS = ["1-7", "8-14", "15-21", "22-28"] as const;

const MONTH_ABBREVIATIONS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

/** Last `count` calendar months ending at `endDate`'s month (inclusive). */
function getRollingMonthLabels(
  count: number,
  endDate: Date = new Date()
): string[] {
  const labels: string[] = [];
  for (let i = count - 1; i >= 0; i -= 1) {
    const month = new Date(
      endDate.getFullYear(),
      endDate.getMonth() - i,
      1
    ).getMonth();
    labels.push(MONTH_ABBREVIATIONS[month]);
  }
  return labels;
}

/** Default x-axis labels used when padding empty bar slots. */
export function getDefaultBarLabels(
  timeFrame: BarChartBottomTimeFrame,
  endDate?: Date
): string[] {
  const count = BAR_CHART_BOTTOM_SLOT_COUNT[timeFrame];
  switch (timeFrame) {
    case "thisMonth":
    case "lastMonth":
      return [...WEEK_OF_MONTH_LABELS];
    case "currentYear":
    case "lastYear":
      return [...MONTH_ABBREVIATIONS];
    case "3Months":
    case "6Months":
    case "12Months":
      return getRollingMonthLabels(count, endDate);
    default:
      return Array.from({ length: count }, () => "");
  }
}

/**
 * Ensures the chart always renders a fixed number of bar slots for the active
 * bottom time frame — padding missing points with value 0 (and default labels)
 * or truncating when there are too many.
 */
export function ensureFixedBarSlots(
  data: BarChartDataPoint[],
  timeFrame: BarChartBottomTimeFrame,
  endDate?: Date
): BarChartDataPoint[] {
  const count = BAR_CHART_BOTTOM_SLOT_COUNT[timeFrame];
  const defaults = getDefaultBarLabels(timeFrame, endDate);
  const source = data ?? [];
  const result: BarChartDataPoint[] = [];

  for (let i = 0; i < count; i += 1) {
    const point = source[i];
    if (point) {
      result.push(point);
    } else {
      result.push({
        label: defaults[i] ?? "",
        value: 0,
      });
    }
  }

  return result;
}

export function clampStyleNumber(value: number, fallback: number): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
  return value;
}

export function getCeiling(maxVal: number, ticks: number[]): number {
  if (maxVal <= 0 || !ticks.length) return ticks.length ? Math.max(...ticks) : 10000;
  const sorted = [...ticks].sort((a, b) => a - b);
  const found = sorted.find((t) => t >= maxVal);
  if (found != null) return found;
  const maxTick = sorted[sorted.length - 1];
  let c = maxTick;
  while (c < maxVal) c += maxTick;
  return c;
}

export function getTickBottom(
  tickValue: number,
  params: {
    firstTick: number;
    ceiling: number;
    barAreaHeight: number;
    yBaselineOffset: number;
  }
): number {
  const { firstTick, ceiling, barAreaHeight, yBaselineOffset } = params;
  if (firstTick <= 0) return 0;
  if (tickValue <= firstTick) {
    return clampStyleNumber((tickValue / firstTick) * yBaselineOffset, 0);
  }
  if (ceiling === firstTick) return barAreaHeight;
  const bottom =
    yBaselineOffset +
    ((tickValue - firstTick) / (ceiling - firstTick)) *
      (barAreaHeight - yBaselineOffset);
  return clampStyleNumber(bottom, barAreaHeight);
}

export function computeBarScale(
  data: { value: number }[],
  ticks: number[],
  defaultCeiling: number,
  barAreaHeight: number,
  yBaselineOffset: number,
  noDataBarHeight: number,
  minBarHeight: number
): {
  ceiling: number;
  barHeights: number[];
  visibleTicks: number[];
  firstTick: number;
} {
  const visible = ticks.filter((t) => t <= defaultCeiling);
  const first = visible[0] ?? defaultCeiling;
  if (!data.length) {
    return {
      ceiling: defaultCeiling,
      barHeights: [],
      visibleTicks: ticks,
      firstTick: first,
    };
  }
  const maxVal = Math.max(...data.map((d) => d.value), 1);
  const ceiling = getCeiling(maxVal, ticks);
  const firstTick = ticks[0] ?? ceiling;
  const stretchZone = barAreaHeight - yBaselineOffset;
  const rangeAboveFirst = ceiling - firstTick;
  const barHeights = data.map((d) => {
    if (d.value <= 0) return noDataBarHeight;
    if (firstTick <= 0) return Math.max(minBarHeight, barAreaHeight);
    if (d.value <= firstTick) {
      const h = (d.value / firstTick) * yBaselineOffset;
      return clampStyleNumber(Math.max(minBarHeight, h), noDataBarHeight);
    }
    if (rangeAboveFirst <= 0) return Math.max(minBarHeight, barAreaHeight);
    const h =
      yBaselineOffset +
      ((d.value - firstTick) / rangeAboveFirst) * stretchZone;
    return clampStyleNumber(Math.max(minBarHeight, h), barAreaHeight);
  });
  return { ceiling, barHeights, visibleTicks: ticks, firstTick };
}
