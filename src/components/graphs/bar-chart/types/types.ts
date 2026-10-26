/** Single bar: label (e.g. "1-7", "Mon", "Feb"), value, and whether this bar's label is active (black) */
export interface BarChartDataPoint {
  label: string;
  value: number;
  isActive?: boolean;
}

/** Either top filters (Weekly/Monthly + date nav) or bottom filters (This Month / Last Month / 3 Months), never both */
export type BarChartFilterVariant = "top" | "bottom";

/** Amount display: SAR/currency font or plain number + " Kg" suffix */
export type BarChartAmountSuffix = "currency" | "kg";

/** Top filter granularity when filterVariant is "top" */
export type BarChartTopGranularity = "weekly" | "monthly";

/** Bottom filter option when filterVariant is "bottom" */
export type BarChartBottomTimeFrame = 
  | "thisMonth"
  | "lastMonth"
  | "3Months"
  | "6Months"
  | "12Months"
  | "currentYear"
  | "lastYear";