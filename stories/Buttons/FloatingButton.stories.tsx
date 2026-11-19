import * as allStories from "./FloatingButton.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { expect } from "storybook/test";
import { spy } from "../../.storybook/actions";
import { FloatingButton } from "../../src/components/newButtons/FloatingButton";
import Prepaid from "../../src/components/icons/outline/Prepaid";
import ChevronEffectUp from "../../src/components/icons/arrows/chevron/ChevronEffectUp";
import { centerStoryDecorator } from "../../.storybook/centerStoryDecorator";

export default {
  decorators: [centerStoryDecorator],
  title: "Components/Navigation/Buttons/FloatingButton",
  component: FloatingButton,
  argTypes: {
    variant: { control: "select", options: ["redAccent", "grayAccent"] },
    text: { control: "text" },
    onButtonPress: { action: "onButtonPress" },
  },
  args: {
    variant: "redAccent",
    text: "Add Card to AlAwwal Pay",
    onButtonPress: spy("onButtonPress"),
  },
};

export const RedAccent = {
  render: (args: any) => <FloatingButton {...args} />,
  args: {
    variant: "redAccent",
    text: "Add Card to AlAwwal Pay",
    icon: <Prepaid />,
  },
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.click(canvas.getByText("Add Card to AlAwwal Pay"));
    await expect(args.onButtonPress).toHaveBeenCalled();
  },
};

export const GrayAccent = {
  render: (args: any) => <FloatingButton {...args} />,
  args: {
    variant: "grayAccent",
    text: "Payments Services",
    icon: <ChevronEffectUp />,
  },
};

export const IconOnly = {
  render: (args: any) => <FloatingButton {...args} />,
  args: {
    variant: "redAccent",
    text: "",
    icon: <Prepaid />,
  },
};

export const TextOnly = {
  render: (args: any) => <FloatingButton {...args} />,
  args: {
    variant: "redAccent",
    text: "Add Card to AlAwwal Pay",
  },
};

export const AllVariants = createAllVariantsStory(
  allStories,
  ["RedAccent", "GrayAccent", "IconOnly", "TextOnly"],
  { gap: 32, itemStyle: { alignItems: "flex-start" } },
);
