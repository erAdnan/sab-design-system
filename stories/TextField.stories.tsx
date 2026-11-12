import * as allStories from "./TextField.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import { useState } from "react";
import { View } from "react-native";
import { TextFieldInput } from "../src/components/input/TextFieldInput";
import { RagIconType } from "../src/components/rag/Rag";
import { actuatedNormalize } from "../src/assets/styles/utils/pixelScaling";

export default {
  title: "Components/TextFieldInput",
  component: TextFieldInput,
  // Figma Input Field: fixed 343dp wide (label row 18, gap 8, 44dp field, 16/10 padding, radius 8).
  decorators: [
    (Story: any) => (
      <View style={{ width: actuatedNormalize(343) }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    fetched: {
      action: "Fetched state",
      control: "boolean",
    },
    error: { action: "Input error", control: "boolean" },
    disabled: { action: "Input disabled", control: "boolean" },
    linkButtonLink: { action: "Link button text", control: "text" },
    hideLinkButton: { action: "Hide link button", control: "boolean" },
    labelLinkButton: { action: "Label link text", control: "text" },
    labelMandatory: { action: "Label mandatory", control: "boolean" },
    labelTooltip: { action: "Label tooltip", control: "boolean" },
  },
  args: {
    fetched: false,
    error: false,
    disabled: false,
    hideLinkButton: true,
    labelMandatory: false,
    labelTooltip: false,
    "tooltipProps.text": "Some additional information",
    loading: false,
  },
};

const InputWithText = (args: any) => {
  const [input, setInput] = useState("");
  return (
    <TextFieldInput textInputInput={input} onChange={setInput} {...args} />
  );
};

export const TextField = {
  args: {
    label: "Label",
    helperText: "Helper text",
    placeholder: "Placeholder",
  },
};

export const TextareaField = {
  args: {
    label: "Label",
    helperText: "Helper text",
    placeholder: "Placeholder",
    multiline: true,
  },
};

export const TextFieldWithLabelLink = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    labelLinkButton: "Find Code",
  },
};

export const TextFieldWithFilledState = {
  render: InputWithText,
  args: {
    label: "Label",
    helperText: "Helper text",
    placeholder: "Placeholder",
  },
};


export const TextFieldVerifiedState = {
  render: InputWithText,
  args: {
    label: "Label",
    helperText: "Helper text",
    placeholder: "Placeholder",
    showStatus:true,
    ragIconType: RagIconType.success,
    ragSize:"small",
  },
};

// ---- Figma parity (Input Field page 8:2669, Type=Text Field): State x Error x Disabled ----
export const TextFieldError = {
  args: {
    label: "Label",
    helperText: "Helper text",
    placeholder: "Placeholder",
    error: true,
  },
};

export const TextFieldErrorFilled = {
  render: InputWithText,
  args: {
    label: "Label",
    helperText: "Helper text",
    placeholder: "Placeholder",
    error: true,
    textInputInput: "Filled value",
  },
};

export const TextFieldErrorWithStatus = {
  args: {
    label: "Label",
    helperText: "Helper text",
    placeholder: "Placeholder",
    error: true,
    showStatus: true,
    ragIconType: RagIconType.error,
    ragSize: "small",
  },
};

export const TextFieldDisabled = {
  args: {
    label: "Label",
    helperText: "Helper text",
    placeholder: "Placeholder",
    disabled: true,
  },
};

export const TextFieldDisabledFilled = {
  args: {
    label: "Label",
    helperText: "Helper text",
    placeholder: "Placeholder",
    disabled: true,
    textInputInput: "Filled value",
  },
};

export const TextFieldFetched = {
  args: {
    label: "Label",
    helperText: "Helper text",
    placeholder: "Placeholder",
    fetched: true,
    textInputInput: "Fetched value",
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "TextField",
    "TextareaField",
    "TextFieldWithLabelLink",
    "TextFieldWithFilledState",
    "TextFieldVerifiedState",
    "TextFieldError",
    "TextFieldErrorFilled",
    "TextFieldErrorWithStatus",
    "TextFieldDisabled",
    "TextFieldDisabledFilled",
    "TextFieldFetched",
]);
