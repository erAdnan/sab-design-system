import { ChipInfo } from "../src/components/chips/ChipInfo";

export default {
  title: "Components/ChipInfo",
  component: ChipInfo,
  argTypes: {
    variant: {
      control: "radio",
      options: ["success", "warning", "error", "informative", "neutral"],
    },
    label: {
      control: "text",
    },
  },
  args: {
    variant: "success",
    label: "Label",
  },
};

export const Default = {};

export const Success = {
  args: {
    variant: "success",
    label: "Label",
  },
};

export const Warning = {
  args: {
    variant: "warning",
    label: "Label",
  },
};

export const Error = {
  args: {
    variant: "error",
    label: "Label",
  },
};

export const Informative = {
  args: {
    variant: "informative",
    label: "Label",
  },
};

export const Neutral = {
  args: {
    variant: "neutral",
    label: "Label",
  },
};
