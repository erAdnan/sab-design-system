import * as allStories from "./FloatingButton.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import { FloatingButton } from "../src/components/newButtons/FloatingButton";
import Prepaid from "../src/components/icons/outline/Prepaid";
import ChevronEffectUp from "../src/components/icons/arrows/chevron/ChevronEffectUp";
import { centerStoryDecorator } from "../.storybook/centerStoryDecorator";

export default {
  decorators: [centerStoryDecorator],
  title: "Components/FloatingButton",
  component: FloatingButton,
  argTypes: {
    variant: { control: "select", options: ["redAccent", "grayAccent"] },
    text: { control: "text" },
    onButtonPress: { action: "pressed" },
  },
  args: {
    variant: "redAccent",
    text: "Add Card to AlAwwal Pay",
  },
};

export const RedAccent = {
  render: (args: any) => <FloatingButton {...args} />,
  args: {
    variant: "redAccent",
    text: "Add Card to AlAwwal Pay",
    icon: <Prepaid />,
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

// Gallery at the 343 mobile content width. FloatingButton sizes to its content and is not absolutely
// positioned itself (the host screen pins it), so stacking only needs a bit of extra spacing; each button is
// left-aligned in the column like it would sit on a screen.
export const AllVariants = createAllVariantsStory(
  allStories,
  ["RedAccent", "GrayAccent", "IconOnly", "TextOnly"],
  { gap: 32, itemStyle: { alignItems: "flex-start" } },
);
