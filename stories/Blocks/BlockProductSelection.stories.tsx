import * as allStories from "./BlockProductSelection.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { ProductSelection } from "../../src/components/block/ProductSelection";

export default {
  title: "Components/Data Display/Blocks/BlockProductSelection",
  component: ProductSelection,
  argTypes: {
    title: { action: "Title", control: "text" },
    subtitle: { action: "Subtitle", control: "text" },
    value: { action: "Value", control: "text" },
    details: { action: "Details", control: "text" },
   selected: { action: "Selected", control: "boolean"}
  },
};

export const Default = {
  args: {
    title: "Title",
    subtitle: "Subtitle",
    value: "1,250.00",
    details: "5 cashback",
    selected: false
  },
};

export const Selected = {
  args: {
    title: "Title",
    subtitle: "Subtitle",
    value: "1,250.00",
    details: "5 cashback",
    selected: true
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "Default",
    "Selected",
]);
