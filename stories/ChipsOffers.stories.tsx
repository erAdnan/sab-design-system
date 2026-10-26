import { ChipsOffers } from "../src/components/chips/ChipsOffers";

export default {
  title: "Components/ChipsOffers",
  component: ChipsOffers,
  argTypes: {
    type: {
      action: "Chips type",
      control: "radio",
      options: ["centered", "right", "left", "new"],
    },
      action: "Chips label",
      control: "text",
    },
  args: {
    type: "centered",
    label: "Label",
    loading: false,
  },
};

export const Centered = {
  args: {
    type: "centered",
  },
};

export const Left = {
  args: {
    type: "left",
  },
};

export const Right = {
  args: {
    type: "right",
  },
};

export const New = {
  args: {
    type: "new",
    label: "New",
    overrideLabelStyles: {color : "#FFFFFF"}
  },
};