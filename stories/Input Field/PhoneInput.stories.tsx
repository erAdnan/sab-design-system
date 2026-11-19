import * as allStories from "./PhoneInput.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { PhoneInput } from "../../src/components/input/PhoneInput";
import { mobileContentDecorators } from "../../.storybook/mobileContentFrame";

export default {
  decorators: mobileContentDecorators,
  title: "Components/Data Entry/Input Field/Phone number",
  component: PhoneInput,
  argTypes: {
    error: { action: "Input error", control: "boolean" },
    labelTooltip: { action: "Label tooltip", control: "boolean" },
    labelMandatory: { action: "Label mandatory", control: "boolean" },
  },
  args: {
    error: false,
    disabled: false,
    hideLinkButton: true,
    labelMandatory: false,
    labelTooltip: false,
    "tooltipProps.text": "Some additional information",
    loading: false,
  },
};

const flagUrl =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Flag_of_Saudi_Arabia.svg/1200px-Flag_of_Saudi_Arabia.svg.png";

export const Default = {
  args: {
    countryCode: "+966",
    placeholder: "Enter mobile number...",
  },
};

export const DefaultWithHelperTextAndTooltip = {
  args: {
    countryCode: "+966",
    placeholder: "Enter mobile number...",
    helperText: "Helper text",
    label: "Label",
    labelTooltip: true,
  },
};

export const DefaultWithHelperTextAndTooltipAndError = {
  args: {
    countryCode: "+966",
    placeholder: "Enter mobile number...",
    helperText: "Helper text",
    label: "Label",
    labelTooltip: true,
    error: true,
  },
};

export const WithContact = {
  args: {
    showContactNumber: true,
    countryCode: "+966",
    placeholder: "Enter mobile number...",
  },
};

export const WithFlag = {
  args: {
    countryCodeShowFlag: true,
    countryCodeFlagImg: flagUrl,
    countryCode: "+966",
    placeholder: "Enter mobile number...",
  },
};

export const WithIcon = {
  args: {
    countryCode: "+966",
    countryCodeShowIcon: true,
    placeholder: "Enter mobile number...",
  },
};

export const WithFlagAndIcon = {
  args: {
    countryCodeShowFlag: true,
    countryCodeFlagImg: flagUrl,
    countryCode: "+966",
    countryCodeShowIcon: true,
    placeholder: "Enter mobile number...",
  },
};

export const CountyCodeDisabled = {
  args: {
    countryCode: "+966",
    countryCodeShowIcon: true,
    placeholder: "Enter mobile number...",
    countryCodeDisabled: true,
  },
};

export const PhoneInputDisabled = {
  args: {
    countryCode: "+966",
    countryCodeShowIcon: true,
    placeholder: "Enter mobile number...",
    disabled: true,
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "Default",
    "DefaultWithHelperTextAndTooltip",
    "DefaultWithHelperTextAndTooltipAndError",
    "WithContact",
    "WithFlag",
    "WithIcon",
    "WithFlagAndIcon",
    "CountyCodeDisabled",
    "PhoneInputDisabled",
]);
