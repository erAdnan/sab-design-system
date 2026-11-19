import * as allStories from "./DateInput.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { DateInput } from "../../src/components/input/DateInput";
import { mobileContentDecorators } from "../../.storybook/mobileContentFrame";

export default {
  decorators: mobileContentDecorators,
  title: "Components/Input Field/DateInput",
  component: DateInput,
  argTypes: {
    error: { action: "Input error", control: "boolean" },
    disabled: { action: "Input disabled", control: "boolean" },
  },
  args: {
    error: false,
    disabled: false,
    loading: false,
  },
};

export const DateInputSimple = {
  args: {
    placeholder: "Select date...",
  },
};

export const DateInputWithLabelAndHelperText = {
  args: {
    label: "Start date:",
    helperText: "Helper text",
    placeholder: "Select date...",
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "DateInputSimple",
    "DateInputWithLabelAndHelperText",
]);
