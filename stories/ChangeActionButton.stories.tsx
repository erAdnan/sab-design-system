import * as allStories from "./ChangeActionButton.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import { widthL } from "../src/assets/styles/constants/size";
import { actuatedNormalize } from "../src/assets/styles/utils/pixelScaling";
import { ChangeActionButton } from "../src/components/button/ChangeActionButton";
import { centerStoryDecorator } from "../.storybook/centerStoryDecorator";

export default {
  title: "Components/ChangeActionButton",
  component: ChangeActionButton,
  decorators: [centerStoryDecorator],
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

export const AllVariants = createAllVariantsStory(allStories, [
    "Default",
    "NoExtraContent",
]);
