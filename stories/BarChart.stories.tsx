import * as allStories from "./BarChart.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { useState, useMemo } from "react";
import {
  BarChartWrapper,
  type BarChartDataPoint,
  type BarChartFilterVariant,
  type BarChartAmountSuffix,
  type BarChartBottomTimeFrame,
  type BarChartTopGranularity,
} from "../src/components/graphs/bar-chart";
import { mobileContentDecorators } from "../.storybook/mobileContentFrame";

const meta: Meta<typeof BarChartWrapper> = {
  decorators: mobileContentDecorators,
  title: "Components/BarChartWrapper",
  component: BarChartWrapper,
  argTypes: {
    filterVariant: {
      control: "radio",
      options: ["top", "bottom"],
      description: "Top filters (Weekly/Monthly + nav) or bottom (This Month / Last Month / 3 Months)",
    },
    totalLabel: {
      control: "text",
      description: "Label above total (e.g. Total Spent, Total CO₂e)",
    },
    amountSuffix: {
      control: "radio",
      options: ["currency", "kg"],
      description: "Amount with SAR font or with Kg suffix",
    },
    currency: {
      control: "text",
      description: "Currency when amountSuffix is currency",
    },
    isLoading: {
      control: "boolean",
      description: "Show loading skeleton instead of chart",
    },
    yAxisTicks: {
      control: "object",
      description: "Optional Y-axis tick values (e.g. [100, 1000])",
    },
    showOneMonthOption: {
      control: "boolean",
      description: "Show the 1 Month (This Month) bottom filter",
    },
    showThreeMonthsOption: {
      control: "boolean",
      description: "Show the 3 Months bottom filter",
    },
    showSixMonthsOption: {
      control: "boolean",
      description: "Show the 6 Months bottom filter",
    },
  },
};

export default meta;

type Story = StoryObj<typeof BarChartWrapper>;

/** Bottom filters + 3 Months: 3 bars (prev, current, next month), currency amount */
const threeMonthsData: BarChartDataPoint[] = [
  { label: "Feb", value: 4200 },
  { label: "Mar", value: 5100, isActive: true },
  { label: "Apr", value: 4800 },
];

/** This month: weeks 1–4, values above 1000, active Week 3 */
const thisMonthWeeksData: BarChartDataPoint[] = [
  { label: "1-7", value: 1000 },
  { label: "8-14", value: 1400 },
  { label: "15-21", value: 2200, isActive: true },
  { label: "22-28", value: 1600 },
];

/** Last month: different week labels and values */
const lastMonthWeeksData: BarChartDataPoint[] = [
  { label: "1-7", value: 800 },
  { label: "8-14", value: 1200 },
  { label: "15-21", value: 2400, isActive: true },
  { label: "22-28", value: 0 },
];

/** Top filters + Monthly: Week 1–4, active Week 3 */
const monthWeeksData: BarChartDataPoint[] = [
  { label: "Week 1", value: 1000 },
  { label: "Week 2", value: 1400 },
  { label: "Week 3", value: 2200, isActive: true },
  { label: "Week 4", value: 1600 },
];

/** Top filters + Weekly: 7 days, active Wednesday */
const weekDaysData: BarChartDataPoint[] = [
  { label: "Mon", value: 200 },
  { label: "Tue", value: 350 },
  { label: "Wed", value: 520, isActive: true },
  { label: "Thu", value: 280 },
  { label: "Fri", value: 410 },
  { label: "Sat", value: 180 },
  { label: "Sun", value: 90 },
];

/** Multiple weeks so arrows change data (prev/next week) */
const weeklyPeriods: { label: string; data: BarChartDataPoint[] }[] = [
  { label: "22 June 25 - 28 June 25", data: [
    { label: "Mon", value: 120 }, { label: "Tue", value: 280 }, { label: "Wed", value: 190 },
    { label: "Thu", value: 310 }, { label: "Fri", value: 250, isActive: true }, { label: "Sat", value: 90 }, { label: "Sun", value: 140 },
  ]},
  { label: "29 June 25 - 5 July 25", data: weekDaysData },
  { label: "6 July 25 - 12 July 25", data: [
    { label: "Mon", value: 380 }, { label: "Tue", value: 220 }, { label: "Wed", value: 410, isActive: true },
    { label: "Thu", value: 190 }, { label: "Fri", value: 290 }, { label: "Sat", value: 150 }, { label: "Sun", value: 110 },
  ]},
];

/** Multiple months so arrows change data */
const monthlyPeriods: { label: string; data: BarChartDataPoint[] }[] = [
  { label: "May 2025", data: [
    { label: "Week 1", value: 800 }, { label: "Week 2", value: 1100 }, { label: "Week 3", value: 1900, isActive: true }, { label: "Week 4", value: 1200 },
  ]},
  { label: "June 2025", data: monthWeeksData },
  { label: "July 2025", data: [
    { label: "Week 1", value: 1500 }, { label: "Week 2", value: 1800 }, { label: "Week 3", value: 2100, isActive: true }, { label: "Week 4", value: 900 },
  ]},
];

/** Empty data: same shape as Default story so layout/distances match. All values 0, grey bars. */
const emptyThisMonth: BarChartDataPoint[] = [
  { label: "1-7", value: 0 },
  { label: "8-14", value: 0 },
  { label: "15-21", value: 0, isActive: true },
  { label: "22-28", value: 0 },
];
const emptyLastMonth: BarChartDataPoint[] = [
  { label: "1-7", value: 0 },
  { label: "8-14", value: 0 },
  { label: "15-21", value: 0, isActive: true },
  { label: "22-28", value: 0 },
];
const empty3Months: BarChartDataPoint[] = [
  { label: "Feb", value: 0 },
  { label: "Mar", value: 0, isActive: true },
  { label: "Apr", value: 0 },
];

/** Bottom filters: switch This Month / Last Month / 3 Months for data. All controls (label, amount suffix, currency, loading, yAxisTicks). */
export const Default: Story = {
  render: function DefaultStory(args) {
    const [active, setActive] = useState<BarChartBottomTimeFrame>("thisMonth");
    const { data, totalAmount, periodLabel } = useMemo(() => {
      if (active === "3Months") {
        return {
          data: threeMonthsData,
          totalAmount: threeMonthsData.reduce((s, d) => s + d.value, 0),
          periodLabel: "Last 3 months",
        };
      }
      if (active === "thisMonth") {
        return {
          data: thisMonthWeeksData,
          totalAmount: thisMonthWeeksData.reduce((s, d) => s + d.value, 0),
          periodLabel: "May 2025",
        };
      }
      return {
        data: lastMonthWeeksData,
        totalAmount: lastMonthWeeksData.reduce((s, d) => s + d.value, 0),
        periodLabel: "April 2025",
      };
    }, [active]);
    return (
      <BarChartWrapper
        {...args}
        filterVariant="bottom"
        activeBottomTimeFrame={active}
        onBottomTimeFrameChange={setActive}
        data={data}
        totalAmount={totalAmount}
        periodLabel={periodLabel}
      />
    );
  },
  args: {
    totalLabel: "Total Spent",
    amountSuffix: "currency",
    currency: "SAR",
    filterVariant: "bottom",
    periodLabel: "May 2025",
    totalAmount: 6200,
    data: thisMonthWeeksData,
    isLoading: false,
    yAxisTicks: undefined,
  },
};

/** Empty chart: same layout as Default, grey bars (all values 0). Bottom filter works: This Month (4 weeks), Last Month (4 weeks), 3 Months (3 bars). */
export const Empty: Story = {
  args: {
    totalLabel: "Total Spent",
    amountSuffix: "currency",
    currency: "SAR",
    filterVariant: "bottom",
    periodLabel: "May 2025",
    totalAmount: 0,
    data: emptyThisMonth,
    isLoading: false,
    yAxisTicks: undefined,
  },
  render: function EmptyStory(args) {
    const [active, setActive] = useState<BarChartBottomTimeFrame>("thisMonth");
    const { data, periodLabel } = useMemo(() => {
      if (active === "3Months") {
        return { data: empty3Months, periodLabel: "Last 3 months" };
      }
      if (active === "thisMonth") {
        return { data: emptyThisMonth, periodLabel: "May 2025" };
      }
      return { data: emptyLastMonth, periodLabel: "April 2025" };
    }, [active]);
    return (
      <BarChartWrapper
        {...args}
        filterVariant="bottom"
        activeBottomTimeFrame={active}
        onBottomTimeFrameChange={setActive}
        data={data}
        totalAmount={0}
        periodLabel={periodLabel}
      />
    );
  },
};

/** Top filters + weekly view: date nav only (no Weekly/Monthly button group). Arrows change week. */
export const TopFiltersWeekly: Story = {
  render: function TopFiltersWeeklyStory(args) {
    const [weekIndex, setWeekIndex] = useState(1);
    const period = weeklyPeriods[Math.min(weekIndex, weeklyPeriods.length - 1)] ?? weeklyPeriods[0];
    const periodLabel = period?.label ?? "";
    const data = Array.isArray(period?.data) ? period.data : [];
    const total = data.reduce((s, d) => s + d.value, 0);
    const canGoPrevious = weekIndex > 0;
    const canGoNext = weekIndex < weeklyPeriods.length - 1;
    return (
      <BarChartWrapper
        {...args}
        filterVariant="top"
        topGranularity="weekly"
        periodLabel={periodLabel}
        totalAmount={total}
        data={data}
        onPreviousPeriod={() => setWeekIndex((i) => Math.max(0, i - 1))}
        onNextPeriod={() => setWeekIndex((i) => Math.min(weeklyPeriods.length - 1, i + 1))}
        canGoPrevious={canGoPrevious}
        canGoNext={canGoNext}
      />
    );
  },
  args: {
    totalLabel: "Total Spent",
    amountSuffix: "currency",
    currency: "SAR",
    filterVariant: "top",
    periodLabel: "29 June 25 - 5 July 25",
    totalAmount: 2030,
    data: weekDaysData,
    isLoading: false,
    yAxisTicks: undefined,
  },
};

/** Top filters + monthly view: date nav only (no Weekly/Monthly button group). Arrows change month. */
export const TopFiltersMonthly: Story = {
  render: function TopFiltersMonthlyStory(args) {
    const [monthIndex, setMonthIndex] = useState(1);
    const period = monthlyPeriods[Math.min(monthIndex, monthlyPeriods.length - 1)] ?? monthlyPeriods[0];
    const periodLabel = period?.label ?? "";
    const data = Array.isArray(period?.data) ? period.data : [];
    const total = data.reduce((s, d) => s + d.value, 0);
    const canGoPrevious = monthIndex > 0;
    const canGoNext = monthIndex < monthlyPeriods.length - 1;
    return (
      <BarChartWrapper
        {...args}
        filterVariant="top"
        topGranularity="monthly"
        periodLabel={periodLabel}
        totalAmount={total}
        data={data}
        onPreviousPeriod={() => setMonthIndex((i) => Math.max(0, i - 1))}
        onNextPeriod={() => setMonthIndex((i) => Math.min(monthlyPeriods.length - 1, i + 1))}
        canGoPrevious={canGoPrevious}
        canGoNext={canGoNext}
      />
    );
  },
  args: {
    totalLabel: "Total Spent",
    amountSuffix: "currency",
    currency: "SAR",
    filterVariant: "top",
    periodLabel: "June 2025",
    totalAmount: 6200,
    data: monthWeeksData,
    isLoading: false,
    yAxisTicks: undefined,
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "Default",
    "Empty",
    "TopFiltersWeekly",
    "TopFiltersMonthly",
]);
