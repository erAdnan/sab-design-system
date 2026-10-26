import { Selector } from "../src/components/range/Selector";

export default {
  title: "Components/Selector",
  component: Selector,
  argTypes: {
    amountHelperText: { control: "text" },
    helperTextLeft: { control: "text" },
    helperTextRight: { control: "text" },
    errorMessage: { control: "text" },
    label: { control: "text" },
    type: { control: "radio", options: ["single", "dobule"] },
  },
  args: {
    loading: false
  }
};

export const Default = {
  args: {
    minValue: 0,
    maxValue: 100,
    step: 1,
    defaultMinValue: 0,
    defaultMaxValue: 30,
    onChange: (range: number[]) => console.log(range),
    label: "Price range",
  },
};

export const WithError = {
  args: {
    minValue: 0,
    maxValue: 100,
    step: 1,
    defaultMinValue: 0,
    defaultMaxValue: 30,
    onChange: (range: number[]) => console.log(range),
    errorMessage: "Error message",
    label: "Price range",
  },
};

export const Single = {
  args: {
    minValue: 0,
    maxValue: 100,
    step: 1,
    defaultMinValue: 0,
    defaultMaxValue: 30,
    onChange: (range: number[]) => console.log(range),
    errorMessage: "Error message",
    label: "Price range",
    type: 'single'
  },
};

export const SingleWithErrors = {
  args: {
    minValue: 0,
    maxValue: 100,
    step: 1,
    defaultMinValue: 0,
    defaultMaxValue: 30,
    onChange: (range: number[]) => console.log(range),
    errorMessage: "Error message",
    label: "Price range",
    type: 'single',
    errorMessageLeft: "Error message"
  },
};

export const SingleWithHelperText = {
  args: {
    minValue: 0,
    maxValue: 100,
    step: 1,
    defaultMinValue: 0,
    defaultMaxValue: 30,
    onChange: (range: number[]) => console.log(range),
    helperTextRight: "Helper text",
    label: "Price range",
    type: 'single',
    helperTextLeft: "Helper text"
  },
};

export const WithAmountHelperText = {
  args: {
    minValue: 0,
    maxValue: 100,
    step: 1,
    defaultMinValue: 0,
    defaultMaxValue: 30,
    onChange: (range: number[]) => console.log(range),
    label: "Price range",
    type: 'single',
    amountHelperText: "Helper Text",
    helperTextLeft: "Helper Text",
    helperTextRight: "Helper Text",
  },
};
