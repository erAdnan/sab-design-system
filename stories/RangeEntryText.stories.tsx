import * as allStories from "./RangeEntryText.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import { RangeEntryText } from "../src/components/range/EntryText";
import { mobileContentDecorators } from "../.storybook/mobileContentFrame";

export default {
  decorators: mobileContentDecorators,
  title: "Components/RangeEntryText",
  component: RangeEntryText,
  argTypes: {
    minValue: { control: "text" },
    maxValue: { control: "text" },
    maxInput: { control: "boolean" },
  },
  args: {
    minValue: "",
    maxValue: "",
    error: false,
    label: "Price range",
    maxInput: true,
    onMinValueChange: (val: number) => console.log("min:", val),
    onMaxValueChange: (val: number) => console.log("max:", val),
  },
};

export const Default = { args: {} };

export const WithLabel = {
  args: { label: "Price range" },
};

export const MaxOnly = {
  args: { minValue: undefined, maxInput: true, label: "Max amount" },
};

export const MinOnly = {
  args: { maxInput: false, label: "Min amount" },
};

export const Error = {
  args: { error: true, label: "Price range" },
};

export const Filled = {
  args: { minValue: "500.00", maxValue: "1,000.00", label: "Price range" },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "Default",
    "WithLabel",
    "MaxOnly",
    "MinOnly",
    "Error",
    "Filled",
]);
