import * as allStories from "./LinkIconButton.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { expect } from "storybook/test";
import { spy } from "../../.storybook/actions";
import { LinkIconButton } from "../../src/components/button/LinkIconButton";
import DocumentEdit from "../../src/components/icons/functionals/DocumentEdit";

export default {
  title: "Components/Navigation/Buttons/Link Icon Button",
  component: LinkIconButton,
  argTypes: {
    onButtonPress: { action: "onButtonPress" },
  },
  args: {
    icon: <DocumentEdit />,
    onButtonPress: spy("onButtonPress"),
    loading: false,
  },
};

export const Default = {
  args: {},
  play: async ({ canvasElement, userEvent, args }) => {
    const target =
      (canvasElement.querySelector("[tabindex],button") as HTMLElement) ||
      (canvasElement.firstElementChild as HTMLElement);
    await userEvent.click(target);
    await expect(args.onButtonPress).toHaveBeenCalled();
  },
};

export const Disabled = {
  args: {
    disabled: true,
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
  "Default",
  "Disabled",
]);
