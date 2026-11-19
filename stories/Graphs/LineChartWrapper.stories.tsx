import * as allStories from "./LineChartWrapper.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { LineChartWrapper, LineChartDataPoint } from "../../src/components/graphs/line-chart";
import { mobileContentDecorators } from "../../.storybook/mobileContentFrame";

// Default story data - has data for all three timeframes (thisMonth, lastMonth, 6Months)
const defaultThisMonthData: LineChartDataPoint[] = [
  { date: "2026-02-01T00:00:00", dateView: "1 February 26", amount: 250, currency: "SAR" },
  { date: "2026-02-02T00:00:00", dateView: "2 February 26", amount: 237, currency: "SAR" },
  { date: "2026-02-03T00:00:00", dateView: "3 February 26", amount: 34, currency: "SAR" },
  { date: "2026-02-04T00:00:00", dateView: "4 February 26", amount: 412, currency: "SAR" },
  { date: "2026-02-05T00:00:00", dateView: "5 February 26", amount: 321, currency: "SAR" },
  { date: "2026-02-06T00:00:00", dateView: "6 February 26", amount: 300, currency: "SAR" },
  { date: "2026-02-07T00:00:00", dateView: "7 February 26", amount: 456, currency: "SAR" },
  { date: "2026-02-08T00:00:00", dateView: "8 February 26", amount: 523, currency: "SAR" },
  { date: "2026-02-09T00:00:00", dateView: "9 February 26", amount: 687, currency: "SAR" },
];

const defaultLastMonthData: LineChartDataPoint[] = [
  { date: "2026-01-01T00:00:00", dateView: "1 January 26", amount: 100, currency: "SAR" },
  { date: "2026-01-02T00:00:00", dateView: "2 January 26", amount: 150, currency: "SAR" },
  { date: "2026-01-03T00:00:00", dateView: "3 January 26", amount: 200, currency: "SAR" },
  { date: "2026-01-04T00:00:00", dateView: "4 January 26", amount: 180, currency: "SAR" },
  { date: "2026-01-05T00:00:00", dateView: "5 January 26", amount: 250, currency: "SAR" },
  { date: "2026-01-06T00:00:00", dateView: "6 January 26", amount: 300, currency: "SAR" },
  { date: "2026-01-07T00:00:00", dateView: "7 January 26", amount: 280, currency: "SAR" },
  { date: "2026-01-08T00:00:00", dateView: "8 January 26", amount: 320, currency: "SAR" },
  { date: "2026-01-09T00:00:00", dateView: "9 January 26", amount: 290, currency: "SAR" },
  { date: "2026-01-10T00:00:00", dateView: "10 January 26", amount: 350, currency: "SAR" },
  { date: "2026-01-11T00:00:00", dateView: "11 January 26", amount: 400, currency: "SAR" },
  { date: "2026-01-12T00:00:00", dateView: "12 January 26", amount: 380, currency: "SAR" },
  { date: "2026-01-13T00:00:00", dateView: "13 January 26", amount: 420, currency: "SAR" },
  { date: "2026-01-14T00:00:00", dateView: "14 January 26", amount: 450, currency: "SAR" },
  { date: "2026-01-15T00:00:00", dateView: "15 January 26", amount: 500, currency: "SAR" },
  { date: "2026-01-16T00:00:00", dateView: "16 January 26", amount: 480, currency: "SAR" },
  { date: "2026-01-17T00:00:00", dateView: "17 January 26", amount: 520, currency: "SAR" },
  { date: "2026-01-18T00:00:00", dateView: "18 January 26", amount: 550, currency: "SAR" },
  { date: "2026-01-19T00:00:00", dateView: "19 January 26", amount: 600, currency: "SAR" },
  { date: "2026-01-20T00:00:00", dateView: "20 January 26", amount: 580, currency: "SAR" },
  { date: "2026-01-21T00:00:00", dateView: "21 January 26", amount: 620, currency: "SAR" },
  { date: "2026-01-22T00:00:00", dateView: "22 January 26", amount: 650, currency: "SAR" },
  { date: "2026-01-23T00:00:00", dateView: "23 January 26", amount: 700, currency: "SAR" },
  { date: "2026-01-24T00:00:00", dateView: "24 January 26", amount: 680, currency: "SAR" },
  { date: "2026-01-25T00:00:00", dateView: "25 January 26", amount: 720, currency: "SAR" },
  { date: "2026-01-26T00:00:00", dateView: "26 January 26", amount: 750, currency: "SAR" },
  { date: "2026-01-27T00:00:00", dateView: "27 January 26", amount: 800, currency: "SAR" },
  { date: "2026-01-28T00:00:00", dateView: "28 January 26", amount: 780, currency: "SAR" },
  { date: "2026-01-29T00:00:00", dateView: "29 January 26", amount: 820, currency: "SAR" },
  { date: "2026-01-30T00:00:00", dateView: "30 January 26", amount: 850, currency: "SAR" },
  { date: "2026-01-31T00:00:00", dateView: "31 January 26", amount: 900, currency: "SAR" },
];


// 6 Months data for Default story (Sep 2025 - Feb 2026)
const defaultSixMonthsData: LineChartDataPoint[] = [
  { date: "2025-09-15T00:00:00", dateView: "15 September 25", amount: 150, currency: "SAR" },
  { date: "2025-10-15T00:00:00", dateView: "15 October 25", amount: 180, currency: "SAR" },
  { date: "2025-11-15T00:00:00", dateView: "15 November 25", amount: 100, currency: "SAR" },
  { date: "2025-12-15T00:00:00", dateView: "15 December 25", amount: 250, currency: "SAR" },
  { date: "2026-01-15T00:00:00", dateView: "15 January 26", amount: 800, currency: "SAR" },
  { date: "2026-02-15T00:00:00", dateView: "15 February 26", amount: 160, currency: "SAR" },
];

// Combined data for Default story (all three timeframes)
const defaultData = [
  ...defaultThisMonthData,
  ...defaultLastMonthData,
  ...defaultSixMonthsData,
];

export default {
  decorators: mobileContentDecorators,
  title: "Components/Graphs/LineChartWrapper",
  component: LineChartWrapper,
  argTypes: {
    totalSpentLabel: {
      control: "text",
      description: "Label for the total spent section",
    },
    periodLabel: {
      control: "text",
      description: "Period label to display (e.g., 'May 2025')",
    },
    totalAmount: {
      control: "text",
      description: "Total amount to display (formatted string)",
    },
    averageAmount: {
      control: "text",
      description: "Average amount to display (formatted string)",
    },
    activeTimeFrame: {
      control: "select",
      options: ["thisMonth", "lastMonth", "6Months"],
      description: "Currently active time frame filter",
    },
    isLoading: {
      control: "boolean",
      description: "Show loading skeleton state",
    },
    variant: {
      control: "select",
      options: ["primary", "secondary"],
      description: "Chart variant (primary = default amber, secondary = PFM/education purple)",
    },
    xAxisLabels: {
      control: "object",
      description: "Custom x-axis labels (e.g. ['1', '6', '11', '16', '21', '26', '30']). When set, data is used as-is and filters are hidden.",
    },
  },
  args: {
    totalSpentLabel: "Total Spent",
    data: defaultData,
    activeTimeFrame: "thisMonth",
    variant: "primary",
    isLoading: false,
  },
};

export const Default = {
  args: {
    totalSpentLabel: "Total Spent",
    data: defaultData,
    activeTimeFrame: "thisMonth",
    isLoading: false,
  },
};

export const Loading = {
  args: {
    totalSpentLabel: "Total Spent",
    data: defaultData,
    activeTimeFrame: "thisMonth",
    isLoading: true,
  },
};

export const LastMonth = {
  args: {
    totalSpentLabel: "Total Spent",
    data: defaultLastMonthData,
    activeTimeFrame: "lastMonth",
    isLoading: false,
  },
};

export const SixMonths = {
  args: {
    totalSpentLabel: "Total Spent",
    data: defaultSixMonthsData,
    activeTimeFrame: "6Months",
    isLoading: false,
  },
};

// Secondary variant (PFM/Education) with custom x-axis labels – data passed in story
// Use valid dates: last label is "30" so last date must be the 30th (e.g. Mar 30); Feb has no 30th
const graphValues = ["1", "6", "11", "16", "21", "26", "30"];
const secondaryVariantData: LineChartDataPoint[] = [
  { date: "2026-03-01T00:00:00", dateView: "1", amount: 120, currency: "SAR" },
  { date: "2026-03-06T00:00:00", dateView: "6", amount: 280, currency: "SAR" },
  { date: "2026-03-11T00:00:00", dateView: "11", amount: 190, currency: "SAR" },
  { date: "2026-03-16T00:00:00", dateView: "16", amount: 350, currency: "SAR" },
  { date: "2026-03-21T00:00:00", dateView: "21", amount: 410, currency: "SAR" },
  { date: "2026-03-26T00:00:00", dateView: "26", amount: 320, currency: "SAR" },
  { date: "2026-03-30T00:00:00", dateView: "30", amount: 270, currency: "SAR" },
];

export const Secondary = {
  args: {
    totalSpentLabel: "Total Spent",
    data: secondaryVariantData,
    variant: "secondary",
    xAxisLabels: graphValues,
    isLoading: false,
  },
};


export const AllVariants = createAllVariantsStory(allStories, [
    "Default",
    "Loading",
    "LastMonth",
    "SixMonths",
    "Secondary",
]);
