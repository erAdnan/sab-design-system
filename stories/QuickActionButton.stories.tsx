import * as allStories from "./QuickActionButton.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import { expect } from "storybook/test";
import { spy } from "../.storybook/actions";
import { QuickActionButton } from "../src/components/button/QuickActionButton";
import MyAccounts from "../src/components/icons/banking/MyAccounts";
import { useTheme } from "../src/context/theme/themeContext";

export default {
  title: "Components/QuickActionButton",
  component: QuickActionButton,
  argTypes: {
    type: {
      control: "radio",
      options: ["vertical", "horizontal"],
    },
    onButtonPress: { action: "onButtonPress" },
  },
  args: {
    type: "vertical",
    loading: false,
    onButtonPress: spy("onButtonPress"),
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
  },
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.click(canvas.getByText("Button"));
    await expect(args.onButtonPress).toHaveBeenCalled();
  },
};

export const VerticalWithBadge = {
  render: InteractiveTemplate,
  args: {
    type: "vertical",
    text: "Button",
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
  },
};

export const HorizontalWithBadge = {
  render: InteractiveTemplate,
  args: {
    type: "horizontal",
    text: "Button",
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
