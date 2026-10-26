import { SegmentedButton as SegmentedButtonComponent } from "../src/components/button/SegmentedButton";
import { BadgeType } from "../src/components/badge/Badge";
import Wallet from "../src/components/icons/filled/Wallet";
import Menu from "../src/components/icons/functionals/Menu";

const badgeTypeOptions = Object.keys(BadgeType);

export default {
  title: "Components/SegmentedButton",
  component: SegmentedButtonComponent,
  argTypes: {
    count: { action: "Count", control: "radio", options: [2, 3] },
    rounded: { control: "boolean" },
  },
  args: {
    count: 3,
    loading: false,
    rounded: false,
  },
};

export const Count3 = {
  args: {
    count: 3,
    buttonOne: {
      buttonText: "Button 1",
      onButtonPress: () => console.log("Button 1 pressed"),
    },
    buttonTwo: {
      buttonText: "Button 2",
      onButtonPress: () => console.log("Button 2 pressed"),
    },
    buttonThree: {
      buttonText: "Button 3",
      onButtonPress: () => console.log("Button 3 pressed"),
    },
  },
};

export const Count2Rounded = {
  args: {
    count: 2,
    rounded: true,
    buttonOne: {
      buttonText: "Button 1",
      onButtonPress: () => console.log("Button 1 pressed"),
    },
    buttonTwo: {
      buttonText: "Button 2",
      onButtonPress: () => console.log("Button 2 pressed"),
    },
  },
};

export const Count3Rounded = {
  args: {
    count: 3,
    rounded: true,
    buttonOne: {
      buttonText: "Button 1",
      onButtonPress: () => console.log("Button 1 pressed"),
    },
    buttonTwo: {
      buttonText: "Button 2",
      onButtonPress: () => console.log("Button 2 pressed"),
    },
    buttonThree: {
      buttonText: "Button 3",
      onButtonPress: () => console.log("Button 3 pressed"),
    },
  },
};

export const Count2 = {
  args: {
    count: 2,
    buttonOne: {
      buttonText: "Button 1",
      onButtonPress: () => console.log("Button 1 pressed"),
    },
    buttonTwo: {
      buttonText: "Button 2",
      onButtonPress: () => console.log("Button 2 pressed"),
    },
  },
};

export const Count2WithBadge = {
  args: {
    count: 2,
    buttonOne: {
      buttonText: "Button",
      badgeType: BadgeType.warning,
      onButtonPress: () => console.log("Button 1 pressed"),
    },
    buttonTwo: {
      buttonText: "Button",
      badgeType: BadgeType.neutral,
      onButtonPress: () => console.log("Button 2 pressed"),
    },
  },
};


export const Count2IconsRounded = {
  args: {
    count: 2,
    rounded: true,
    buttonOne: {
      buttonText: "Card view",
      icon: <Wallet />,
      onButtonPress: () => console.log("Card view pressed"),
    },
    buttonTwo: {
      buttonText: "List view",
      icon: <Menu />,
      onButtonPress: () => console.log("List view pressed"),
    },
  },
};
