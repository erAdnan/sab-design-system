import { Generic } from "../src/components/block/Generic";

export default {
  title: "Components/BlockGeneric",
  component: Generic,
  argTypes: {
    name: { action: "Name", control: "text" },
    extraContent: { action: "Extra content", control: "text" },
    type: { action: "Type", control: "radio", options: ["solid", "pattern"] },
  },
  args: {
    type: "solid",
    extraContent: "",
    loading: false,
  },
};

export const Solid = {
  args: {
    name: "Name",
  },
};

export const Pattern = {
  args: {
    name: "Name",
    type: "pattern",
  },
};

export const SolidExtraContent = {
  args: {
    name: "Name",
    extraContent: "Text content",
    type: "solid",
  },
};

export const PatternExtraContent = {
  args: {
    name: "Name",
    extraContent: "Text content",
    type: "pattern",
  },
};
