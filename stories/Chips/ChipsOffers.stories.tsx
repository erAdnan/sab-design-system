import * as allStories from "./ChipsOffers.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { ChipsOffers } from "../../src/components/chips/ChipsOffers";
import { centerStoryDecorator } from "../../.storybook/centerStoryDecorator";

export default {
  title: "Components/Data Display/Chips/ChipsOffers",
  component: ChipsOffers,
  decorators: [centerStoryDecorator],
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

export const AllVariants = createAllVariantsStory(allStories, [
    "Centered",
    "Left",
    "Right",
    "New",
]);
