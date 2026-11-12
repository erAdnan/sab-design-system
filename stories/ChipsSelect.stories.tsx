import * as allStories from "./ChipsSelect.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import { BadgeSize, BadgeType } from "../src/components/badge/Badge";
import { ChipsSelect } from "../src/components/chips/ChipsSelect";
import { centerStoryDecorator } from "../.storybook/centerStoryDecorator";

export default {
  title: "Components/ChipsSelect",
  component: ChipsSelect,
  decorators: [centerStoryDecorator],
  argTypes: {
    showBadge: { action: "Badge", control: "boolean" },
    label: {
      action: "Chips label",
      control: "text",
    },
    "badgeProps.size": {
      action: "Badge size",
      control: "radio",
      options: Object.keys(BadgeSize),
    },
    "badgeProps.type": {
      action: "Badge type",
      control: "radio",
      options: Object.keys(BadgeType),
    },
    "badgeProps.number": { action: "Badge number", control: "text" },
  },
  args: {
    showBadge: false,
    "badgeProps.size": BadgeSize.small,
    "badgeProps.type": BadgeType.primary,
    "badgeProps.number": 5,
    label: "Label",
    loading: false
  },
};

export const Default = {
  args: {},
};

export const WithBadge = {
  args: {
    showBadge: true,
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "Default",
    "WithBadge",
]);
