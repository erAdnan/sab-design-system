import { LineChartDataPoint, TimeFrame } from "../types/types";
import i18next from "i18next";
import {
  filterDataByTimeFrame as filterByTimeFrame,
  getMonthCountForTimeFrame,
  getMonthSlotsForTimeFrame,
  getTimeFrameDateRange,
  isMultiMonthTimeFrame,
} from "./timeFrameRange";

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
const DEFAULT_CURRENCY = "SAR";
const MID_MONTH_DAY = 15;

export { filterByTimeFrame as filterDataByTimeFrame };

export const formatPeriodLabel = (timeFrame: TimeFrame, now = new Date()): string => {
  const monthNames = getMonthNames();
  switch (timeFrame) {
    case "thisMonth":
      return `${monthNames[now.getMonth()]} ${now.getFullYear()}`;
    case "lastMonth": {
      const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      return `${monthNames[lastMonthDate.getMonth()]} ${lastMonthDate.getFullYear()}`;
    }
    case "3Months":
    case "6Months":
    case "12Months": {
      const { startDate, endDate } = getTimeFrameDateRange(timeFrame, now);
      const startMonth = monthNames[startDate.getMonth()];
      const endMonth = monthNames[endDate.getMonth()];
      const startYear = startDate.getFullYear();
      const endYear = endDate.getFullYear();
      return startYear === endYear
        ? `${startMonth} - ${endMonth} ${endYear}`
        : `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
    }
    case "currentYear":
      return String(now.getFullYear());
    case "lastYear":
      return String(now.getFullYear() - 1);
    default:
      return i18next.t("timeFrame.thisMonth");
  }
};

export const formatCurrency = (amount: number, currency: string = DEFAULT_CURRENCY): string => {
  return `${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export const calculateTotals = (
  processedData: LineChartDataPoint[],
  timeFrame: TimeFrame,
  filteredData: LineChartDataPoint[]
) => {
  if (filteredData.length === 0) {
    return {
      total: 0,
      average: 0,
      currency: DEFAULT_CURRENCY,
    };
  }
  
  const currency = filteredData[0]?.currency || DEFAULT_CURRENCY;
  const dataToUse = isMultiMonthTimeFrame(timeFrame) ? processedData : filteredData;
  const total = dataToUse.reduce((sum, point) => sum + point.amount, 0);
  const average = isMultiMonthTimeFrame(timeFrame)
    ? total / getMonthCountForTimeFrame(timeFrame)
    : (filteredData.length > 0 ? total / filteredData.length : 0);
  
  return { total, average, currency };
};

export const processMonthlyAggregatedData = (
  filteredData: LineChartDataPoint[],
  timeFrame: TimeFrame,
  now = new Date()
): LineChartDataPoint[] => {
  const monthSlots = getMonthSlotsForTimeFrame(timeFrame, now).map((slot) => ({
    ...slot,
    data: [] as LineChartDataPoint[],
  }));

  if (filteredData && filteredData.length > 0) {
    filteredData.forEach((point) => {
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
  
  const aggregatedData: LineChartDataPoint[] = [];
  const currency =
    filteredData && filteredData.length > 0 ? filteredData[0].currency : DEFAULT_CURRENCY;
  
  monthSlots.forEach((monthInfo) => {
    const totalAmount =
      monthInfo.data.length > 0
        ? monthInfo.data.reduce((sum, point) => sum + point.amount, 0)
        : 0;

    aggregatedData.push({
      date: new Date(monthInfo.year, monthInfo.month, MID_MONTH_DAY).toISOString(),
      dateView: timeFrame === "currentYear" || timeFrame === "lastYear"
        ? String(monthInfo.year)
        : `${getMonthNames()[monthInfo.month]} ${monthInfo.year}`,
      amount: totalAmount,
      currency,
    });
  });
  
  return aggregatedData;
};

export const process6MonthsData = (
  filteredData: LineChartDataPoint[]
): LineChartDataPoint[] => processMonthlyAggregatedData(filteredData, "6Months");
