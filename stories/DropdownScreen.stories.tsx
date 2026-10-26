
import { ReactElement } from "react";
import { DropdownScreen } from "../src/components/dropdown/DropdownScreen";
import Icon from "../src/components/icon/Icon";

export default {
  title: "Components/DropdownScreen",
  component: DropdownScreen,
};

const InteractiveTemplate = (args: any) => {
  const handlePress = (value: any) => {
    console.log('DropdownMenuItem pressed', value);
  };

  return <DropdownScreen {...args} onItemPress={handlePress} />;
};

const menuIcon: ReactElement = <Icon type="functionals" name="menu"></Icon>;

export const WithIcons = {
  render: InteractiveTemplate,
  args: {
    items: [{ label: "Label", value: "label 1", icon: menuIcon }, { label: "Label", value: "label 2", icon: menuIcon }],
  },
};

export const NoIcons = {
  render: InteractiveTemplate,
  args: {
    items: [{ label: "Label", value: "label 1"}, { label: "Label", value: "label 2"}],
  },
};
