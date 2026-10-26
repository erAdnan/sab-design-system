import { NewChipsInfo } from "../src/components/chips/NewChipsInfo";

export default {
  title: "Components/NewChipsInfo",
  component: NewChipsInfo,
  argTypes: {
    state: {
      control: "radio",
      options: ["neutral", "success", "error", "warning", "info"],
    },
    label: {
      control: "text",
    },
    loading: {
      control: "boolean",
    },
  },
  args: {
    state: "neutral",
    label: "Label",
    loading: false,
  },
};

export const Default = {};

export const Warning = {
  args: {
    state: "warning",
    label: "Label",
  },
};

export const Success = {
  args: {
    state: "success",
    label: "Label",
  },
};

export const Info = {
  args: {
    state: "info",
    label: "Label",
  },
};

export const Error = {
  args: {
    state: "error",
    label: "Label",
  },
};

export const Neutral = {
  args: {
    state: "neutral",
    label: "Label",
  },
};

export const Arabic = {
  args: {
    state: "success",
    label: "ملصق",
  },
};

export const Loading = {
  args: {
    loading: true,
  },
};
