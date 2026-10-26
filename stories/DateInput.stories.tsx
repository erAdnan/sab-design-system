import { DateInput } from "../src/components/input/DateInput";

export default {
  title: "Components/DateInput",
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
