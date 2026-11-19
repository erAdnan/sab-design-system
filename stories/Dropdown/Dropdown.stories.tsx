import { useState } from "react";
import { View } from "react-native";
import { Dropdown } from "../../src/components/dropdown/Dropdown";
import { mobileContentDecorators } from "../../.storybook/mobileContentFrame";
import { actuatedNormalize } from "../../src/assets/styles/utils/pixelScaling";

export default {
  decorators: mobileContentDecorators,
  title: "Components/Dropdown/Dropdown",
  component: Dropdown,
  tags: ["!autodocs"],
};

const InteractiveTemplate = (args: any) => {
  const [active, setActive] = useState<string | number | null>(args.active ?? null);

  const handlePress = (value: any) => {
    console.log("DropdownMenuItem pressed", value);
  };

  return (
    <View
      style={{
        width: "100%",
        minHeight: actuatedNormalize(200),
        paddingTop: actuatedNormalize(48),
        paddingHorizontal: actuatedNormalize(16),
      }}
    >
      <Dropdown
        {...args}
        active={active}
        setActive={setActive}
        onItemPress={handlePress}
      />
    </View>
  );
};

export const Default = {
  render: InteractiveTemplate,
  args: {
    items: [
      { withSar: true, label: "Saudi Riyal", value: "dirh1" },
      { label: "(AED) Dirhams", value: "dirh2" },
    ],
    active: "dirh1",
  },
};
