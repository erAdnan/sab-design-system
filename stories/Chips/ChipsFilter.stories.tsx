import * as allStories from "./ChipsFilter.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { useState } from "react";
import { ChipsFilter } from "../../src/components/chips/ChipsFilter";
import { View } from "react-native";
import { centerStoryDecorator } from "../../.storybook/centerStoryDecorator";

export default {
  title: "Components/Data Display/Chips/ChipsFilter",
  component: ChipsFilter,
  decorators: [centerStoryDecorator],
  argTypes: {
    label:   { control: "text" },
    loading: { control: "boolean" },
    error:   { control: "boolean" },
  },
  args: {
    label: "Jan_2025.pdf",
    loading: false,
    error: false,
  },
};

const InteractiveTemplate = (args: any) => {
  const [isDeleted, setIsDeleted] = useState(false);

  return (
    <View style={{ display: isDeleted ? "none" : "flex" }}>
      <ChipsFilter {...args} onClosePress={() => setIsDeleted(true)} />
    </View>
  );
};

export const Default = {
  args: {},
};

export const Interactive = {
  render: InteractiveTemplate,
  args: {},
};

export const Error = {
  args: {
    error: true,
    label: "Jan_2025.pdf",
  },
};

export const Loading = {
  args: {
    loading: true,
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "Default",
    "Interactive",
    "Error",
    "Loading",
]);
