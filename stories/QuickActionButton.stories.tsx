import * as allStories from "./QuickActionButton.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import { QuickActionButton } from "../src/components/button/QuickActionButton";
import MyAccounts from "../src/components/icons/banking/MyAccounts";
import { useTheme } from "../src/context/theme/themeContext";

export default {
  title: "Components/QuickActionButton",
  component: QuickActionButton,
  argTypes: {
    type: {
      action: "Type",
      control: "radio",
      options: ["vertical", "horizontal"],
    },
  },
  args: {
    type: "vertical",
    loading: false,
  },
};

const InteractiveTemplate = (args: any) => {
  const { isDarkTheme, theme } = useTheme();

  const icon = (
    <MyAccounts
      fill={isDarkTheme ? theme.primarycolor4static : theme.primarycolor3static}
    />
  );
  return <QuickActionButton {...args} icon={icon} />;
};

export const Vertical = {
  render: InteractiveTemplate,
  args: {
    type: "vertical",
    text: "Button",
    onButtonPress: () => {
      console.log("Button Pressed");
    },
  },
};

export const VerticalWithBadge = {
  render: InteractiveTemplate,
  args: {
    type: "vertical",
    text: "Button",
    onButtonPress: () => {
      console.log("Button Pressed");
    },
    badgeProps: {
      number: 1,
      type: "warning",
    },
  },
};

export const Horizontal = {
  render: InteractiveTemplate,
  args: {
    type: "horizontal",
    text: "Button",
    onButtonPress: () => {
      console.log("Button Pressed");
    },
  },
};

export const HorizontalWithBadge = {
  render: InteractiveTemplate,
  args: {
    type: "horizontal",
    text: "Button",
    onButtonPress: () => {
      console.log("Button Pressed");
    },
    badgeProps: {
      number: 1,
      type: "warning",
    },
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "Vertical",
    "VerticalWithBadge",
    "Horizontal",
    "HorizontalWithBadge",
]);
