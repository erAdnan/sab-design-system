import * as allStories from "./ChipInfo.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { ChipInfo } from "../../src/components/chips/ChipInfo";
import { centerStoryDecorator } from "../../.storybook/centerStoryDecorator";

export default {
  title: "Components/Chips/ChipInfo",
  component: ChipInfo,
  decorators: [centerStoryDecorator],
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

export const AllVariants = createAllVariantsStory(allStories, [
    "Default",
    "Success",
    "Warning",
    "Error",
    "Informative",
    "Neutral",
]);
