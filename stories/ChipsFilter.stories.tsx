import { useState } from "react";
import { ChipsFilter } from "../src/components/chips/ChipsFilter";
import { View } from "react-native";

export default {
  title: "Components/ChipsFilter",
  component: ChipsFilter,
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
