import * as allStories from "./EntryBanner.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import { EntryBanner } from "../src/components/banner/EntryBanner";
import { mobileContentDecorators } from "../.storybook/mobileContentFrame";

export default {
  decorators: mobileContentDecorators,
  title: "Components/EntryBanner",
  component: EntryBanner,
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    type: {
      control: { type: "radio" },
      options: ["illustration", "graph"],
    },
    small: { control: "boolean" },
  },
  args: {
    title: "All your accounts, one view",
    description: "Safely link other bank accountsba ",
    small: false,
  },
};

export const Illustration = {
  args: {
    type: "illustration",
  },
};

export const Graph = {
  args: {
    type: "graph",
  },
};

export const Small = {
  args: {
    type: "illustration",
    small: true,
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "Illustration",
    "Graph",
    "Small",
]);
