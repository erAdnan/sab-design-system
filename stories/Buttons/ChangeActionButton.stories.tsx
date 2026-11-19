import * as allStories from "./ChangeActionButton.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { expect } from "storybook/test";
import { spy } from "../../.storybook/actions";
import { actuatedNormalize } from "../../src/assets/styles/utils/pixelScaling";
import { ChangeActionButton } from "../../src/components/button/ChangeActionButton";
import { centerStoryDecorator } from "../../.storybook/centerStoryDecorator";

export default {
  title: "Components/Buttons/ChangeActionButton",
  component: ChangeActionButton,
  decorators: [centerStoryDecorator],
  argTypes: {
    text: { control: "text" },
    extraContent: { control: "text" },
    onButtonPress: { action: "onButtonPress" },
  },
  args: {
    text: "Current Account",
    extraContent: "**** 6234",
    onButtonPress: spy("onButtonPress"),
    loading: false,
  },
};

export const Default = {
  args: {
    overrideStyles: { width: actuatedNormalize(250) },
  },
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.click(canvas.getByText("Current Account"));
    await expect(args.onButtonPress).toHaveBeenCalled();
  },
};

export const NoExtraContent = {
  args: {
    extraContent: "",
    overrideStyles: { width: actuatedNormalize(180) },
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
  "Default",
  "NoExtraContent",
]);
