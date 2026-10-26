import { useState } from "react";
import { TextFieldInput } from "../src/components/input/TextFieldInput";
import { RagIconType } from "../src/components/rag/Rag";

export default {
  title: "Components/TextFieldInput",
  component: TextFieldInput,
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
