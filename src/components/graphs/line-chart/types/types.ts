export interface LineChartDataPoint {
  date: string; // ISO date string
  dateView: string; // Formatted date for display
  amount: number;
  currency: string;
  creditAmount?: number;
}

export type TimeFrame =
  | "thisMonth"
  | "lastMonth"
  | "3Months"
  | "6Months"
  | "12Months"
  | "currentYear"
  | "lastYear";

export type LineChartVariant = "primary" | "secondary";

export interface LineChartAppliedFilter {
  id: string;
  label: string;
  onRemove: () => void;
}

