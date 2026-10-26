import { FloatingButton } from "../src/components/newButtons/FloatingButton";
import Prepaid from "../src/components/icons/outline/Prepaid";
import ChevronEffectUp from "../src/components/icons/arrows/chevron/ChevronEffectUp";

export default {
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
