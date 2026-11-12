import * as allStories from "./FilterTag.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import Plus from "../src/components/icons/outline/Plus";
import { Filter } from "../src/components/tags/Filter";

export default {
  title: 'Components/FilterTag',
  component: Filter,
}

export const Default = {
  args: {
    label: "Label",
    leftIcon: <Plus />,
    rightIcon: <Plus />
  }
};
export const Selected = {
  args: {
    label: "Label",
    leftIcon: <Plus />,
    rightIcon: <Plus />,
    selected: true
  } 
}

export const AllVariants = createAllVariantsStory(allStories, [
    "Default",
    "Selected",
]);
