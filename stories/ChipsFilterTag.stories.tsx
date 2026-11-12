import { View } from "react-native";
import { ChipsFilterTag } from "../src/components/chips/ChipsFilterTag";
import { centerStoryDecorator } from "../.storybook/centerStoryDecorator";

export default {
  title: "Components/ChipsFilterTag",
  component: ChipsFilterTag,
  decorators: [centerStoryDecorator],
  argTypes: {
    label: {
      action: "label",
      control: "text",
    },
  },
  args: {
    label: "Label",
    rightIcon:false,
    leftIcon:false,
    loading: false,
  },
};

export const Default = {
  args: {},
};

