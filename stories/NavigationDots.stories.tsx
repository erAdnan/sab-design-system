import * as allStories from "./NavigationDots.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import { NavigationDots } from "../src/components/navigationDots/NavigationDots";

export default {
    title: "Components/NavigationDots",
    component: NavigationDots,
    tags: ["!autodocs"],
};

export const FiveOrMore = {
    args: {
        numberOfDots: 5,
        activeDotIndex: 3
    },
};

export const Four = {
    args: {
        numberOfDots: 4,
        activeDotIndex: 3
    },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "FiveOrMore",
    "Four",
]);
