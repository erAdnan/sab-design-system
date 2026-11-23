import * as allStories from "./ThemeSelector.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import { ThemeSelector } from "../src/components/themeSelector/ThemeSelector";
import { centerStoryDecorator } from "../.storybook/centerStoryDecorator";

export default {
  decorators: [centerStoryDecorator],
  title: "Components/Data Display/ThemeSelector",
  component: ThemeSelector,
  tags: ["!autodocs"],
}

export const ThemeSelectorLight = {
  args: {
    label: "Light",
    type: "light",
  }
}

export const ThemeSelectorDark = {
  args: {
    label: "Dark",
    type: "dark",
  }
}

export const ThemeSelectorFoundingDay = {
  args: {
    label: "Founding Day",
    type: "foundingDay",
  }
}

export const ThemeSelectorNationalDay = {
  args: {
    label: "National Day",
    type: "nationalDay",
  }
}

export const AllVariants = createAllVariantsStory(allStories, [
    "ThemeSelectorLight",
    "ThemeSelectorDark",
    "ThemeSelectorFoundingDay",
    "ThemeSelectorNationalDay",
]);
