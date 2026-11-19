import * as allStories from "./SemiCircleGraph.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { SemiCircleGraph } from '../../src/components/graphs/semi-circle-chart/SemiCircleGraph';

export default {
  title: "Components/Graphs/SemiCircleGraph",
  component: SemiCircleGraph,
  argTypes: {
    percentage: {
      control: { type: "range", min: 1, max: 100, step: 1 },
      description: "Percentage value from 1-100",
    },
    mainText: {
      control: "text",
      description: "Main text label displayed above the amount",
    },
    amount: {
      control: "text",
      description: "Currency amount to display",
    },
    labelOne: {
      control: "text",
      description: "First label for the legend (typically 'Assets')",
    },
    labelTwo: {
      control: "text",
      description: "Second label for the legend (typically 'Liabilities')",
    },
    progressWidth: {
      control: { type: "number", min: 5, max: 50, step: 1 },
      description: "Width of the progress arc/border in pixels (default: 26)",
    },
  },
  args: {
    percentage: 75,
    mainText: "Current Net Worth",
    amount: "100,000,000.00",
    labelOne: "Assets",
    labelTwo: "Liabilities",
    progressWidth: 26,
  },
};

export const Default = {
  args: {
    percentage: 75,
    mainText: "Current Net Worth",
    amount: "100,000,000.00",
    labelOne: "Assets",
    labelTwo: "Liabilities",
  },
};

export const HighPercentage = {
  args: {
    percentage: 90,
    mainText: "Current Net Worth",
    amount: "250,000,000.00",
    labelOne: "Assets",
    labelTwo: "Liabilities",
  },
};

export const LowPercentage = {
  args: {
    percentage: 30,
    mainText: "Current Net Worth",
    amount: "50,000,000.00",
    labelOne: "Assets",
    labelTwo: "Liabilities",
  },
};

export const FullPercentage = {
  args: {
    percentage: 100,
    mainText: "Current Net Worth",
    amount: "100,000,000.00",
    labelOne: "Assets",
    labelTwo: "Liabilities",

  },
};

export const ThinBorder = {
  args: {
    percentage: 75,
    mainText: "Current Net Worth",
    amount: "100,000,000.00",
    labelOne: "Assets",
    labelTwo: "Liabilities",
    progressWidth: 16,
  },
};

export const ThickBorder = {
  args: {
    percentage: 75,
    mainText: "Current Net Worth",
    amount: "100,000,000.00",
    labelOne: "Assets",
    labelTwo: "Liabilities",
    progressWidth: 30,
  },
};


export const AllVariants = createAllVariantsStory(allStories, [
    "Default",
    "HighPercentage",
    "LowPercentage",
    "FullPercentage",
    "ThinBorder",
    "ThickBorder",
]);
