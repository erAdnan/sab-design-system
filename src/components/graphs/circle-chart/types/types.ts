export interface CircleChartSegment {
    label: string;
    value: number;
    color?: string; // optional; uses default purple palette if not set
  }
  
  export type CircleChartVariant = "primary" | "secondary";
  
  export type TimeFrame =
    | "thisMonth"
    | "lastMonth"
    | "3Months"
    | "6Months"
    | "12Months"
    | "currentYear"
    | "lastYear";
  