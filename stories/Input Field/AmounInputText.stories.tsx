import * as allStories from "./AmounInputText.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { AmountInputText } from "../../src/components/input/AmountInputText";
import { mobileContentDecorators } from "../../.storybook/mobileContentFrame";

export default {
  decorators: mobileContentDecorators,
  title: "Components/Data Entry/Input Field/Amount Entry Text",
  component: AmountInputText,
};

export const AmountInputTextWithLabel = {
  args: {
    inputProps: { placeholder: "Enter amount" },
    loading: false,
    label: "Label",
  },
};

export const AmountInputTextWithLabelErrorState = {
  args: {
    inputProps: {
      placeholder: "Enter amount",
      error: true,
      // helperText: "Invalid amount",
    },
    loading: false,
    label: "Label",
    error: true,
    helperText: "Invalid amount",
  },
};

export const AmountInputTextWithLabelDisabledFilledErrorState = {
  args: {
    inputProps: {
      placeholder: "Enter amount",
      textInputInput: "1,000.00",
      onChange: () => {},
      disabled: true,
      error: true,
    },
    loading: false,
    label: "Label",
    disabled: true,
    error: true,
    helperText: "Invalid amount",
  },
};

export const AmountInputTextWithTwoHelperText = {
  args: {
    inputProps: {
      placeholder: "Enter amount",
    },
    loading: false,
    label: "Label",
     helperText: "Current Limit: SAR 1,000,000.00",
      helperTextSecond: "Maximum Limit: SAR 5,000,000.00",
  },
};

export const AmountInputTextWithTwoHelperTextArabic = {
  args: {
    inputProps: {
      placeholder: "Enter amount",
    },
    loading: false,
    label: "Label",
    helperText: "7000,00 الحد الحالي: SAR سعودي",
    helperTextSecond: "7000,00 الحد الحالي: SAR سعودي",
  },
};


export const AmountInputTextMultiCurrency = {
  args: {
    inputProps: { placeholder: "Enter amount" },
    loading: false,
    label: "Label",
    secondcurrency: "USD",
    amountAddon: "multiple",
    onCurrencyChange: (value: string) => {
      console.log("Selected currency:", value);
    },
  },
};


export const AllVariants = createAllVariantsStory(allStories, [
    "AmountInputTextWithLabel",
    "AmountInputTextWithLabelErrorState",
    "AmountInputTextWithLabelDisabledFilledErrorState",
    "AmountInputTextWithTwoHelperText",
    "AmountInputTextWithTwoHelperTextArabic",
    "AmountInputTextMultiCurrency",
]);
