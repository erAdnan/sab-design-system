import { LineChartDataPoint, TimeFrame } from "../types/types";

export interface TimeFrameDateRange {
  startDate: Date;
  endDate: Date;
}

export const isMultiMonthTimeFrame = (timeFrame: TimeFrame): boolean =>
  timeFrame === "3Months" ||
  timeFrame === "6Months" ||
  timeFrame === "12Months" ||
  timeFrame === "currentYear" ||
  timeFrame === "lastYear";

export const isYearTimeFrame = (timeFrame: TimeFrame): boolean =>
  timeFrame === "currentYear" || timeFrame === "lastYear";

export const getMonthCountForTimeFrame = (timeFrame: TimeFrame): number => {
  switch (timeFrame) {
    case "3Months":
      return 3;
    case "6Months":
      return 6;
    case "12Months":
      return 12;
    case "currentYear":
    case "lastYear":
      return 12;
    default:
      return 1;
  }
};

export const getTimeFrameDateRange = (
  timeFrame: TimeFrame,
  now = new Date()
): TimeFrameDateRange => {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let startDate: Date;
  let endDate = new Date(today);

  switch (timeFrame) {
    case "thisMonth":
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case "lastMonth":
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      endDate = new Date(now.getFullYear(), now.getMonth(), 0);
      break;
    case "3Months":
      startDate = new Date(now.getFullYear(), now.getMonth() - 2, 1);
      break;
    case "6Months":
      startDate = new Date(now.getFullYear(), now.getMonth() - 5, 1);
      break;
    case "12Months":
      startDate = new Date(now.getFullYear(), now.getMonth() - 11, 1);
      break;
    case "currentYear":
      startDate = new Date(now.getFullYear(), 0, 1);
      break;
    case "lastYear":
      startDate = new Date(now.getFullYear() - 1, 0, 1);
      endDate = new Date(now.getFullYear() - 1, 11, 31);
      break;
    default:
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  }

  return { startDate, endDate };
};

export const getMonthSlotsForTimeFrame = (
  timeFrame: TimeFrame,
  now = new Date()
): Array<{ month: number; year: number }> => {
  const slots: Array<{ month: number; year: number }> = [];

  switch (timeFrame) {
    case "3Months":
      for (let i = 2; i >= 0; i--) {
        const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
        slots.push({ month: monthDate.getMonth(), year: monthDate.getFullYear() });
      }
      break;
    case "6Months":
      for (let i = 5; i >= 0; i--) {
        const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
        slots.push({ month: monthDate.getMonth(), year: monthDate.getFullYear() });
      }
      break;
    case "12Months":
      for (let i = 11; i >= 0; i--) {
        const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
        slots.push({ month: monthDate.getMonth(), year: monthDate.getFullYear() });
      }
      break;
    case "currentYear":
      for (let month = 0; month < 12; month++) {
        slots.push({ month, year: now.getFullYear() });
      }
      break;
    case "lastYear": {
      const year = now.getFullYear() - 1;
      for (let month = 0; month < 12; month++) {
        slots.push({ month, year });
      }
      break;
    }
    default:
      break;
  }

  return slots;
};

export const getActiveMonthIndexForTimeFrame = (
  timeFrame: TimeFrame,
  now = new Date()
): number => {
  switch (timeFrame) {
    case "3Months":
      return 2;
    case "6Months":
      return 5;
    case "12Months":
      return 11;
    case "currentYear":
      return now.getMonth();
    case "lastYear":
      return 11;
    default:
      return -1;
  }
};

export const buildYearAxisLabels = (
  timeFrame: "currentYear" | "lastYear",
  dataLength: number,
  now = new Date()
): { labels: string[]; activeMonthIndex: number } => {
  const labels = Array.from({ length: dataLength }, () => "");
  const activeMonthIndex = getActiveMonthIndexForTimeFrame(timeFrame, now);
  const currentCalendarYear = now.getFullYear();

  if (timeFrame === "currentYear") {
    if (dataLength > 0 && activeMonthIndex !== 0) {
      labels[0] = String(currentCalendarYear - 1);
    }
    if (activeMonthIndex >= 0 && activeMonthIndex < dataLength) {
      labels[activeMonthIndex] = String(currentCalendarYear);
    }
    if (dataLength > 1 && activeMonthIndex !== dataLength - 1) {
      labels[dataLength - 1] = String(currentCalendarYear + 1);
    }
    return { labels, activeMonthIndex };
  }

  const targetYear = currentCalendarYear - 1;
  const middleIndex = Math.floor((dataLength - 1) / 2);

  if (dataLength > 0) {
    labels[0] = String(targetYear - 2);
  }
  if (middleIndex >= 0 && middleIndex < dataLength) {
    labels[middleIndex] = String(targetYear - 1);
  }
  if (activeMonthIndex >= 0 && activeMonthIndex < dataLength) {
    labels[activeMonthIndex] = String(targetYear);
  }

  return { labels, activeMonthIndex };
};

const toDateOnly = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const filterDataByTimeFrame = (
  data: LineChartDataPoint[],
  timeFrame: TimeFrame,
  now = new Date()
): LineChartDataPoint[] => {
  if (!data || data.length === 0) return [];

  const { startDate, endDate } = getTimeFrameDateRange(timeFrame, now);
  const startDateOnly = toDateOnly(startDate);
  const endDateOnly = toDateOnly(endDate);

  return data.filter((point) => {
    try {
      const pointDate = new Date(point.date);
      if (isNaN(pointDate.getTime())) return false;

      const pointDateOnly = toDateOnly(pointDate);
      return pointDateOnly >= startDateOnly && pointDateOnly <= endDateOnly;
    } catch {
      return false;
    }
  });
};
