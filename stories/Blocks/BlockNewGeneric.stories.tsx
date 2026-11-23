import * as allStories from "./BlockNewGeneric.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { NewGeneric } from "../../src/components/block/NewGeneric";
import Prepaid from "../../src/components/icons/outline/Prepaid";
import { actuatedNormalize } from "../../src/assets/styles/utils/pixelScaling";

export default {
  title: "Components/Data Display/Blocks/BlockNewGeneric",
  component: NewGeneric,
  argTypes: {
    text: { action: "Text", control: "text" },
    type: { action: "Size", control: "radio", options: ["default", "large"] },
    isChip: { control: null,  },
    badgeNumber: { control: "number" }
  },
  args: {
    size: "default",
    loading: false,
  },
};

export const Default = {
  artTypes: {
    isChip: { action: "isChip", control: "boolean"}
  },
  args: {
    text: "Text",
    isChip: false,
  },
};

export const WithBadge = {
  args: {
    text: "Text",
    isChip: false,
    badgeNumber: 1,
  },
};

export const WithBadgeOverflow = {
  args: {
    text: "Text",
    isChip: false,
    badgeNumber: 12,
  },
};

export const Large = {
  artTypes: {
    isChip: { control: null }
  },
  args: {
	size: "large",
	text: "Text", 
    imgProps: {
      url: require('../../src/assets/images/houseIllustration.png'),
      isAbsolutePath: true,
      overrideImageStyles: {objectFit: "contain"}
    }
  },
};

/** Figma new.block.generic Size=Categories (167×75) — SAB Store+ category tile */
export const Categories = {
  args: {
    size: "default",
    isCategory: true,
    text: "Bags",
    icon: <Prepaid width={actuatedNormalize(48)} height={actuatedNormalize(48)} />,
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "Default",
    "WithBadge",
    "WithBadgeOverflow",
    "Large",
    "Categories",
]);
