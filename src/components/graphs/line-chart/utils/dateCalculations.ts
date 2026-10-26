import { LineChartDataPoint, TimeFrame } from "../types/types";
import i18next from "i18next";
import {
  getActiveMonthIndexForTimeFrame,
  getMonthSlotsForTimeFrame,
  isMultiMonthTimeFrame,
  isYearTimeFrame,
  buildYearAxisLabels,
} from "./timeFrameRange";

const WEEK_COUNT = 4;
const WEEK_MID_DAYS = [4, 11, 18, 25] as const;

const getMonthNames = (): string[] => {
  return [
    i18next.t("months.jan"),
    i18next.t("months.feb"),
    i18next.t("months.mar"),
    i18next.t("months.apr"),
    i18next.t("months.may"),
    i18next.t("months.jun"),
    i18next.t("months.jul"),
    i18next.t("months.aug"),
    i18next.t("months.sep"),
    i18next.t("months.oct"),
    i18next.t("months.nov"),
    i18next.t("months.dec"),
  ];
};

const getWeekLabels = (): string[] => [
  i18next.t("lineChart.week1"),
  i18next.t("lineChart.week2"),
  i18next.t("lineChart.week3"),
  i18next.t("lineChart.week4"),
];

const buildSparseMonthLabels = (
  months: string[],
  activeMonthIndex: number
): string[] => {
  const labels = Array.from({ length: months.length }, () => "");

  if (months.length === 0) return labels;
  if (months.length <= 3) return months;

  const middleIndex = Math.floor((months.length - 1) / 2);
  labels[0] = months[0];
  labels[middleIndex] = months[middleIndex];
  labels[months.length - 1] = months[months.length - 1];

  if (activeMonthIndex >= 0 && activeMonthIndex < months.length) {
    labels[activeMonthIndex] = months[activeMonthIndex];
  }

  return labels;
};

const getWeekIndexForDay = (day: number): number => {
  if (day <= 7) return 0;
  if (day <= 14) return 1;
  if (day <= 21) return 2;
  return 3;
};

export interface ProcessedChartData {
  values: number[];
  labels: string[];
  indices: number[];
  originalData: LineChartDataPoint[];
  activeMonthIndex?: number;
}

/**
 * Process chart data for multi-month timeframes (6/12 months, current/last year)
 */
const processMonthlyAggregatedChartData = (
  data: LineChartDataPoint[],
  timeFrame: TimeFrame
): ProcessedChartData => {
  const monthSlots = getMonthSlotsForTimeFrame(timeFrame).map((slot) => ({
    ...slot,
    data: [] as LineChartDataPoint[],
  }));

  if (data && data.length > 0) {
    data.forEach((point) => {
      try {
        const pointDate = new Date(point.date);
        if (!isNaN(pointDate.getTime())) {
          const monthIndex = monthSlots.findIndex(
            (slot) =>
              slot.month === pointDate.getMonth() && slot.year === pointDate.getFullYear()
          );
          if (monthIndex !== -1) {
            monthSlots[monthIndex].data.push(point);
          }
        }
      } catch {
        // Skip invalid dates
      }
    });
  }

  const values: number[] = [];
  const labels: string[] = [];
  const originalData: LineChartDataPoint[] = [];
  const currency = data && data.length > 0 ? data[0].currency : "SAR";

  monthSlots.forEach((monthInfo) => {
    const totalAmount =
      monthInfo.data.length > 0
        ? Math.max(0, monthInfo.data.reduce((sum, point) => sum + point.amount, 0))
        : 0;
    const totalCredit =
      monthInfo.data.length > 0
        ? monthInfo.data.reduce((sum, point) => sum + (point.creditAmount ?? 0), 0)
        : 0;

    values.push(totalAmount);
    originalData.push({
      date: new Date(monthInfo.year, monthInfo.month, 15).toISOString(),
      dateView: isYearTimeFrame(timeFrame)
        ? String(monthInfo.year)
        : `${getMonthNames()[monthInfo.month]} ${monthInfo.year}`,
      amount: totalAmount,
      creditAmount: totalCredit,
      currency,
    });

    if (timeFrame !== "lastYear") {
      labels.push(getMonthNames()[monthInfo.month]);
    }
  });

  const activeMonthIndex = getActiveMonthIndexForTimeFrame(timeFrame);

  if (timeFrame === "lastYear") {
    const { labels: yearLabels, activeMonthIndex: yearActiveIndex } =
      buildYearAxisLabels("lastYear", monthSlots.length);
    return {
      values,
      labels: yearLabels,
      indices: values.map((_, index) => index),
      originalData,
      activeMonthIndex: yearActiveIndex,
    };
  }

  return {
    values,
    labels:
      timeFrame === "12Months"
        ? buildSparseMonthLabels(labels, activeMonthIndex)
        : labels,
    indices: values.map((_, index) => index),
    originalData,
    activeMonthIndex,
  };
};

/**
 * Aggregate daily points into 4 weekly buckets for thisMonth.
 * Weeks: 1–7, 8–14, 15–21, 22–end of month.
 */
const processThisMonthWeeklyData = (
  data: LineChartDataPoint[],
  now = new Date()
): ProcessedChartData => {
  const targetYear = now.getFullYear();
  const targetMonth = now.getMonth();
  const daysInMonth = new Date(targetYear, targetMonth + 1, 0).getDate();

  const weekBuckets: LineChartDataPoint[][] = Array.from(
    { length: WEEK_COUNT },
    () => []
  );

  if (data && data.length > 0) {
    data.forEach((point) => {
      try {
        const pointDate = new Date(point.date);
        if (!isNaN(pointDate.getTime())) {
          const weekIndex = getWeekIndexForDay(pointDate.getDate());
          weekBuckets[weekIndex].push(point);
        }
      } catch {
        // Skip invalid dates
      }
    });
  }

  const currency = data?.[0]?.currency ?? "SAR";
  const weekLabels = getWeekLabels();
  const values: number[] = [];
  const labels: string[] = [];
  const originalData: LineChartDataPoint[] = [];

  for (let weekIndex = 0; weekIndex < WEEK_COUNT; weekIndex++) {
    const bucket = weekBuckets[weekIndex];
    const totalAmount =
      bucket.length > 0
        ? Math.max(0, bucket.reduce((sum, point) => sum + point.amount, 0))
        : 0;
    const totalCredit =
      bucket.length > 0
        ? bucket.reduce((sum, point) => sum + (point.creditAmount ?? 0), 0)
        : 0;
    const midDay = Math.min(WEEK_MID_DAYS[weekIndex], daysInMonth);

    values.push(totalAmount);
    labels.push(weekLabels[weekIndex]);
    originalData.push({
      date: new Date(targetYear, targetMonth, midDay).toISOString(),
      dateView: weekLabels[weekIndex],
      amount: totalAmount,
      creditAmount: totalCredit,
      currency,
    });
  }

  return {
    values,
    labels,
    indices: values.map((_, index) => index),
    originalData,
    activeMonthIndex: getWeekIndexForDay(now.getDate()),
  };
};

const generateLastMonthLabels = (
  processedData: LineChartDataPoint[],
  now = new Date()
): { labels: string[]; activeMonthIndex: number } => {
  const labels: string[] = [];
  let activeMonthIndex = -1;

  const targetMonth = now.getMonth() - 1;
  const targetYear = targetMonth < 0 ? now.getFullYear() - 1 : now.getFullYear();
  const normalizedTargetMonth = targetMonth < 0 ? 11 : targetMonth;

  const prevMonth = normalizedTargetMonth === 0 ? 11 : normalizedTargetMonth - 1;
  const nextMonth = normalizedTargetMonth === 11 ? 0 : normalizedTargetMonth + 1;

  const monthNames = getMonthNames();
  const prevMonthLabel = monthNames[prevMonth];
  const targetMonthLabel = monthNames[normalizedTargetMonth];
  const nextMonthLabel = monthNames[nextMonth];

  const firstIndex = 0;
  const lastIndex = processedData.length - 1;
  const middleIndex = Math.floor(processedData.length / 2);

  processedData.forEach((_, index) => {
    if (index === firstIndex) {
      labels.push(prevMonthLabel);
    } else if (index === middleIndex) {
      labels.push(targetMonthLabel);
      activeMonthIndex = index;
    } else if (index === lastIndex) {
      labels.push(nextMonthLabel);
    } else {
      labels.push("");
    }
  });

  return { labels, activeMonthIndex };
};

/**
 * Last month: daily data with prev / current / next month labels on the x-axis
 * (e.g. in July → May, June, July).
 */
const processLastMonthData = (
  data: LineChartDataPoint[],
  now = new Date()
): ProcessedChartData => {
  const targetMonth = now.getMonth() - 1;
  const targetYear = targetMonth < 0 ? now.getFullYear() - 1 : now.getFullYear();
  const normalizedTargetMonth = targetMonth < 0 ? 11 : targetMonth;

  const prevMonth = normalizedTargetMonth === 0 ? 11 : normalizedTargetMonth - 1;
  const prevYear =
    normalizedTargetMonth === 0 ? targetYear - 1 : targetYear;
  const nextMonth = normalizedTargetMonth === 11 ? 0 : normalizedTargetMonth + 1;
  const nextYear =
    normalizedTargetMonth === 11 ? targetYear + 1 : targetYear;

  const currency = data?.[0]?.currency ?? "SAR";

  const prevMonthData: LineChartDataPoint = {
    date: new Date(prevYear, prevMonth, 15).toISOString(),
    dateView: "",
    amount: 0,
    currency,
  };

  const nextMonthData: LineChartDataPoint = {
    date: new Date(nextYear, nextMonth, 15).toISOString(),
    dateView: "",
    amount: 0,
    currency,
  };

  const processedData = [prevMonthData, ...(data ?? []), nextMonthData];
  const processedValues = processedData.map((point) => Math.max(0, point.amount));
  const { labels, activeMonthIndex } = generateLastMonthLabels(processedData, now);

  return {
    values: processedValues,
    labels,
    indices: processedValues.map((_, index) => index),
    originalData: processedData,
    activeMonthIndex,
  };
};

export interface ProcessChartDataOptions {
  customXAxisLabels?: string[];
}

/**
 * Process chart data based on timeframe
 */
export const processChartData = (
  data: LineChartDataPoint[],
  timeFrame: TimeFrame,
  options?: ProcessChartDataOptions
): ProcessedChartData => {
  const customLabels = options?.customXAxisLabels;

  // When custom x-axis labels are provided and match data length, use data as-is
  if (customLabels && data && data.length > 0 && customLabels.length === data.length) {
    return {
      values: data.map((point) => Math.max(0, point.amount)),
      labels: customLabels,
      indices: data.map((_, index) => index),
      originalData: [...data],
      activeMonthIndex: Math.floor(data.length / 2),
    };
  }

  // For multi-month timeframes, aggregate data by month
  if (isMultiMonthTimeFrame(timeFrame)) {
    return processMonthlyAggregatedChartData(data, timeFrame);
  }

  // thisMonth: 4 weekly buckets (Week 1–4)
  if (timeFrame === "thisMonth") {
    return processThisMonthWeeklyData(data);
  }

  // lastMonth: daily data with adjacent month labels (e.g. May, Jun, Jul)
  if (timeFrame === "lastMonth") {
    return processLastMonthData(data);
  }
  
  if (!data || data.length === 0) {
    return {
      values: [],
      labels: [],
      indices: [],
      originalData: [],
    };
  }

  const processedValues = data.map((point) => Math.max(0, point.amount));

  return {
    values: processedValues,
    labels: processedValues.map(() => ""),
    indices: processedValues.map((_, index) => index),
    originalData: [...data],
    activeMonthIndex: -1,
  };
};

/**
 * Create empty chart data (for when no data is available)
 */
export const createEmptyChartData = (): ProcessedChartData => {
  const weekLabels = getWeekLabels();
  const activeWeekIndex = getWeekIndexForDay(new Date().getDate());
  const now = new Date();

  return {
    values: Array(WEEK_COUNT).fill(0),
    labels: weekLabels,
    indices: weekLabels.map((_, index) => index),
    originalData: weekLabels.map((label, index) => ({
      date: new Date(
        now.getFullYear(),
        now.getMonth(),
        WEEK_MID_DAYS[index]
      ).toISOString(),
      dateView: label,
      amount: 0,
      currency: "SAR",
    })),
    activeMonthIndex: activeWeekIndex,
  };
};
