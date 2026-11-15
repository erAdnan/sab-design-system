import * as allStories from "./ChipsSelect.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import { expect } from "storybook/test";
import { spy } from "../.storybook/actions";
import { BadgeSize, BadgeType } from "../src/components/badge/Badge";
import { ChipsSelect } from "../src/components/chips/ChipsSelect";
import { centerStoryDecorator } from "../.storybook/centerStoryDecorator";

export default {
  title: "Components/ChipsSelect",
  component: ChipsSelect,
  decorators: [centerStoryDecorator],
  argTypes: {
    showBadge: { control: "boolean" },
    label: { control: "text" },
    "badgeProps.size": {
      control: "radio",
      options: Object.keys(BadgeSize),
    },
    "badgeProps.type": {
      control: "radio",
      options: Object.keys(BadgeType),
    },
    "badgeProps.number": { control: "text" },
    onSelect: { action: "onSelect" },
  },
  args: {
    showBadge: false,
    "badgeProps.size": BadgeSize.small,
    "badgeProps.type": BadgeType.primary,
    "badgeProps.number": 5,
    label: "Label",
    loading: false,
    onSelect: spy("onSelect"),
  },
};

export const Default = {
  args: {},
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.click(canvas.getByText("Label"));
    await expect(args.onSelect).toHaveBeenCalled();
  },
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
