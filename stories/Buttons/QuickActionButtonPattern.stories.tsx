import * as allStories from "./QuickActionButtonPattern.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { buttonContentStoryDecorators } from "../../.storybook/buttonStoryFrame";
import { QuickActionButtonPattern } from "../../src/components/button/QuickActionButtonPattern";
import MyAccounts from "../../src/components/icons/banking/MyAccounts";
import { useTheme } from "../../src/context/theme/themeContext";

export default {
  title: "Components/Buttons/QuickActionButtonPattern",
  component: QuickActionButtonPattern,
  // Figma quickAction.pattern is 343 wide; keep it at mobile width and centered on desktop.
  decorators: buttonContentStoryDecorators,
  argTypes: {
    type: { action: "Type", control: "radio", options: [1, 2, 3, 4] },
  },
  args: {
    type: 4,
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

  switch (args.type) {
    case 4:
      return (
        <QuickActionButtonPattern
          {...args}
          quickActionButton1={{ ...args.quickActionButton1, icon }}
          quickActionButton2={{ ...args.quickActionButton2, icon }}
          quickActionButton3={{ ...args.quickActionButton3, icon }}
          quickActionButton4={{ ...args.quickActionButton4, icon }}
        />
      );
    case 3:
      return (
        <QuickActionButtonPattern
          {...args}
          quickActionButton1={{ ...args.quickActionButton1, icon }}
          quickActionButton2={{ ...args.quickActionButton2, icon }}
          quickActionButton3={{ ...args.quickActionButton3, icon }}
        />
      );
    case 2:
      return (
        <QuickActionButtonPattern
          {...args}
          quickActionButton1={{ ...args.quickActionButton1, icon }}
          quickActionButton2={{ ...args.quickActionButton2, icon }}
        />
      );
    case 1:
      return (
        <QuickActionButtonPattern
          {...args}
          quickActionButton1={{ ...args.quickActionButton1, icon }}
        />
      );
  }
};

export const Example4 = {
  render: InteractiveTemplate,
  args: {
    type: 4,
    quickActionButton1: {
      type: "vertical",
      text: "Accounts Visibility",
      onButtonPress: () => {
        console.log("Button Pressed");
      },
    },
    quickActionButton2: {
      type: "vertical",
      text: "My Accounts",
      onButtonPress: () => {
        console.log("Button Pressed");
      },
    },
    quickActionButton3: {
      type: "vertical",
      text: "New Accounts",
      onButtonPress: () => {
        console.log("Button Pressed");
      },
    },
    quickActionButton4: {
      type: "vertical",
      text: "Digital Statements",
      onButtonPress: () => {
        console.log("Button Pressed");
      },
    },
  },
};

export const Example3 = {
  render: InteractiveTemplate,
  args: {
    type: 3,
    quickActionButton1: {
      type: "vertical",
      text: "Accounts Visibility",
      onButtonPress: () => {
        console.log("Button Pressed");
      },
    },
    quickActionButton2: {
      type: "vertical",
      text: "My Accounts",
      onButtonPress: () => {
        console.log("Button Pressed");
      },
    },
    quickActionButton3: {
      type: "vertical",
      text: "New Accounts",
      onButtonPress: () => {
        console.log("Button Pressed");
      },
    },
  },
};

export const Example2 = {
  args: {
    type: 2,
    quickActionButton1: {
      type: "vertical",
      text: "Accounts Visibility",
      icon: <MyAccounts />,
      onButtonPress: () => {
        console.log("Button Pressed");
      },
    },
    quickActionButton2: {
      type: "vertical",
      text: "My Accounts",
      icon: <MyAccounts />,
      onButtonPress: () => {
        console.log("Button Pressed");
      },
    },
  },
};

export const Example1 = {
  args: {
    type: 1,
    quickActionButton1: {
      type: "vertical",
      text: "Accounts Visibility",
      icon: <MyAccounts />,
      onButtonPress: () => {
        console.log("Button Pressed");
      },
    },
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "Example4",
    "Example3",
    "Example2",
    "Example1",
]);
