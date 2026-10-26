import { widthL } from "../src/assets/styles/constants/size";
import { actuatedNormalize } from "../src/assets/styles/utils/pixelScaling";
import { ChangeActionButton } from "../src/components/button/ChangeActionButton";

export default {
  title: "Components/ChangeActionButton",
  component: ChangeActionButton,
  argTypes: {
    text: { action: "Checkbox text", control: "text" },
    extraContent: { action: "Extra content", control: "text" },
  },
  args: {
    text: "Current Account",
    extraContent: "**** 6234",
    onButtonPress: () => console.log("Button pressed"),
    loading: false,
  },
};

export const Default = {
  args: {
    onButtonPress: () => console.log("Button pressed"),
    overrideStyles: { width: actuatedNormalize(250) },
  },
};

export const NoExtraContent = {
  args: {
    onButtonPress: () => console.log("Button pressed"),
    extraContent: "",
    overrideStyles: { width: actuatedNormalize(180) },
  },
};
