import * as allStories from "./LinkIconButton.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import { LinkIconButton } from "../src/components/button/LinkIconButton";
import DocumentEdit from "../src/components/icons/functionals/DocumentEdit";

export default {
  title: "Components/Link Icon Button",
  component: LinkIconButton,
};

export const Default = {
  args: {
    icon: <DocumentEdit />,
    onButtonPress: () => console.log("Link Icon Button Pressed"),
    loading: false,
  },
};

export const Disabled = {
  args: {
    icon: <DocumentEdit />,
    onButtonPress: () => console.log("Link Icon Button Pressed"),
    disabled: true,
    loading: false,
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "Default",
    "Disabled",
]);
