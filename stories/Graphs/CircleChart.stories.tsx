import * as allStories from "./CircleChart.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import React from "react";
import {
  CircleChartWrapper,
  type CircleChartSegment,
  type DataByTimeFrame,
} from "../../src/components/graphs/circle-chart";
import {
  CIRCLE_CHART_DEFAULT_SIZE,
  CHART_DEFAULT_STROKE_WIDTH,
} from "../../src/components/graphs/circle-chart/utils/constants";
import FoodIcon from "../../src/assets/svgs/light/sab360/food.svg";
import { mobileContentDecorators } from "../../.storybook/mobileContentFrame";

const meta: Meta<typeof CircleChartWrapper> = {
  decorators: mobileContentDecorators,
  title: "Components/Data Display/Graphs/Circle Graph",
  component: CircleChartWrapper,
  argTypes: {
    totalSpentLabel: {
      control: "text",
      description: "Label displayed above the total amount",
    },
    currency: {
      control: "text",
      description: "Currency code (e.g. SAR)",
    },
    size: {
      control: { type: "number", min: 150, max: 350, step: 10 },
      description: "Chart size in px",
    },
    strokeWidth: {
      control: { type: "number", min: 8, max: 48, step: 2 },
      description: "Donut ring thickness in px",
    },
    variant: {
      control: "radio",
      options: ["primary", "secondary"],
      description: "Chart variant",
    },
    activeTimeFrame: {
      control: "radio",
      options: [
        "thisMonth",
        "lastMonth",
        "3Months",
        "6Months",
        "12Months",
        "currentYear",
        "lastYear",
      ],
      description: "Selected time frame (use with dataByTimeFrame)",
    },
    isLoading: {
      control: "boolean",
      description: "Show loading skeleton instead of chart",
    },
  },
};

export default meta;

const baseArgs = {
  totalSpentLabel: "Total Spent",
  currency: "SAR",
  size: CIRCLE_CHART_DEFAULT_SIZE,
};

type Story = StoryObj<typeof CircleChartWrapper>;

/** This month: 13 segments PFM/shopping/1–13 so all 13 chart colors are used (lightest→darkest) */
const thisMonthData: CircleChartSegment[] = [
  { label: "PFM/shopping/1", value: 1250 },
  { label: "PFM/shopping/2", value: 1100 },
  { label: "PFM/shopping/3", value: 980 },
  { label: "PFM/shopping/4", value: 860 },
  { label: "PFM/shopping/5", value: 740 },
  { label: "PFM/shopping/6", value: 620 },
  { label: "PFM/shopping/7", value: 520 },
  { label: "PFM/shopping/8", value: 440 },
  { label: "PFM/shopping/9", value: 360 },
  { label: "PFM/shopping/10", value: 290 },
  { label: "PFM/shopping/11", value: 230 },
  { label: "PFM/shopping/12", value: 180 },
  { label: "PFM/shopping/13", value: 140 },
];

/** Last month: more even spread */
const lastMonthData: CircleChartSegment[] = [
  { label: "Retail", value: 520 },
  { label: "Groceries", value: 480 },
  { label: "Fuel", value: 410 },
  { label: "Subscriptions", value: 390 },
  { label: "Dining", value: 350 },
  { label: "Travel", value: 280 },
  { label: "Health", value: 220 },
  { label: "Other", value: 150 },
];

/** 3 months: many small segments */
const threeMonthsData: CircleChartSegment[] = [
  { label: "PFM/shopping/13", value: 820 },
  { label: "PFM/shopping/12", value: 650 },
  { label: "PFM/shopping/11", value: 540 },
  { label: "PFM/shopping/9", value: 480 },
  { label: "Category A", value: 420 },
  { label: "Category B", value: 380 },
  { label: "Category C", value: 310 },
  { label: "Category D", value: 290 },
  { label: "Category E", value: 250 },
  { label: "Category F", value: 200 },
  { label: "Other", value: 134 },
];

/** 6 months: one dominant + long tail */
const sixMonthsData: CircleChartSegment[] = [
  { label: "Shopping", value: 4200 },
  { label: "Food", value: 2100 },
  { label: "Transport", value: 980 },
  { label: "Bills", value: 750 },
  { label: "Leisure", value: 520 },
  { label: "Other", value: 450 },
];

/** Data for all time frames; use with dataByTimeFrame so clicking filters shows different data. */
const dataByTimeFrame: DataByTimeFrame = {
  thisMonth: thisMonthData,
  lastMonth: lastMonthData,
  "3Months": threeMonthsData,
  "6Months": sixMonthsData,
};

/** All time-frame data (This Month / Last Month / 3 Months / 6 Months). All controls: label, currency, size, stroke, variant, time frame, loading. */
export const Default: Story = {
  args: {
    ...baseArgs,
    dataByTimeFrame,
    activeTimeFrame: "lastMonth",
    strokeWidth: CHART_DEFAULT_STROKE_WIDTH,
  },
};

/** Same as Default but with thicker donut ring. All data and all controls. */
export const ThickStroke: Story = {
  args: {
    ...baseArgs,
    dataByTimeFrame,
    activeTimeFrame: "lastMonth",
    strokeWidth: 40,
  },
};

/** Custom icon in the center (food icon). All time-frame data and all controls. */
export const CustomCenterIcon: Story = {
  render: (args) => (
    <CircleChartWrapper
      {...args}
      renderCenterIcon={(iconSize, iconColor) => (
        <FoodIcon width={iconSize} height={iconSize} fill={iconColor} />
      )}
    />
  ),
  args: {
    ...baseArgs,
    dataByTimeFrame,
    activeTimeFrame: "lastMonth",
    strokeWidth: CHART_DEFAULT_STROKE_WIDTH,
  },
};

/** Empty state: no segments, only center icon. Total SAR 0.00. Filters still visible. */
export const Empty: Story = {
  args: {
    ...baseArgs,
    data: [],
    activeTimeFrame: "thisMonth",
    strokeWidth: CHART_DEFAULT_STROKE_WIDTH,
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "Default",
    "ThickStroke",
    "CustomCenterIcon",
    "Empty",
]);
