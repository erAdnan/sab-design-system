import { NewGeneric } from "../src/components/block/NewGeneric";

export default {
  title: "Components/BlockNewGeneric",
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
      url: require('../src/assets/images/houseIllustration.png'),
      isAbsolutePath: true,
      overrideImageStyles: {objectFit: "contain"}
    }
  },
};