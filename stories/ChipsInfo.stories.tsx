import { ChipsInfo } from "../src/components/chips/ChipsInfo";

export default {
  title: "Components/ChipsInfo",
  component: ChipsInfo,
  argTypes: {
    type: {
      action: "Chips type",
      control: "radio",
      options: ["default", "textWithIcon"],
    },
    state: {
      action: "Chips state",
      control: "radio",
      options: ["neutral", "success", "error", "warning", "info"],
    },
    showIcon: { action: "Vertical track", control: "boolean" },
    size: {
      action: "Chips size",
      control: "radio",
      options: ["large", "small"],
    },
    label: {
      action: "Chips label",
      control: "text",
    },
  },
  args: {
    showIcon: false,
    size: "small",
    type: "default",
    state: "neutral",
    label: "Label",
    loading: false,
  },
};

export const DefaultSuccess = {
  args: {
    state: "success",
  },
};

export const DefaultError = {
  args: {
    state: "error",
  },
};

export const DefaultWarning = {
  args: {
    state: "warning",
  },
};

export const DefaultInfo = {
  args: {
    state: "info",
  },
};

export const DefaultNeutral = {
  args: {
    state: "neutral",
  },
};

export const TextWithIconSuccess = {
  args: {
    type: "textWithIcon",
    state: "success",
  },
};

export const TextWithIconError = {
  args: {
    type: "textWithIcon",
    state: "error",
  },
};

export const TextWithIconWarning = {
  args: {
    type: "textWithIcon",
    state: "warning",
  },
};

export const TextWithIconInfo = {
  args: {
    type: "textWithIcon",
    state: "info",
  },
};
