import * as allStories from "./Skeleton.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import { View } from "react-native";
import { SkeletonBox } from "../src/components/skeleton/SkeletonBox";
import { mobileContentDecorators } from "../.storybook/mobileContentFrame";

export default {
  decorators: mobileContentDecorators,
  title: "Components/Data Display/SkeletonBox",
  component: SkeletonBox,
  argTypes: {
    shape: {
      action: "Shape",
      control: "radio",
      options: ["circle", "square", "line"],
    },
    size: {
      action: "Size",
      control: "radio",
      options: ["small", "medium", "large", "extralarge"],
    },
  },
};

const InteractiveTemplate = (args: any) => {
  return (
    <View style={{ gap: 20 }}>
      <SkeletonBox {...args} />
      <SkeletonBox {...args} />
      <SkeletonBox {...args} />
    </View>
  );
};

export const SkeletonLines = {
  render: InteractiveTemplate,
  args: {
    shape: "line",
    size: "medium",
  },
};

export const SkeletonCircles = {
  render: InteractiveTemplate,
  args: {
    shape: "circle",
    size: "medium",
  },
};

export const SkeletonSquares = {
  render: InteractiveTemplate,
  args: {
    shape: "square",
    size: "medium",
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "SkeletonLines",
    "SkeletonCircles",
    "SkeletonSquares",
]);
