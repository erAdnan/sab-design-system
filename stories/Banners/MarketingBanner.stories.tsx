import * as allStories from "./MarketingBanner.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { MarketingBanner } from "../../src/components/banner/MarketingBanner";

export default {
  title: "Components/Banners/Marketing Banner",
  component: MarketingBanner,
  argTypes: {
    title: { action: "Label", control: "text" },
    linkButtonText: { action: "Link button text", control: "text" },
  },
  args: {
    imageUrl:
      "https://i.pinimg.com/474x/81/6f/5c/816f5c680f1dc28a4a17f9e484080ade.jpg",
    loading: false,
  },
};

export const Big = {
  args: {
    title: "AIFursan",
    description: "Get a card and unlock a 20% discount.",
    size: "big",
    onBannerPress: () => console.log("Banner Pressed"),
  },
};

export const Small = {
  args: {
    title: "AIFursan",
    description: "Get a card and unlock a 20% discount.",
    size: "small",
    onBannerPress: () => console.log("Banner Pressed"),
  },
};

// Figma marketing.banner: showLinkButton toggle (Big 343×284, Small 343×143).
export const BigWithLinkButton = {
  args: {
    title: "AIFursan",
    description: "Get a card and unlock a 20% discount.",
    size: "big",
    linkButtonText: "Link Button",
    underline: true,
    onLinkButtonPress: () => console.log("Link Pressed"),
    onBannerPress: () => console.log("Banner Pressed"),
  },
};

export const SmallWithLinkButton = {
  args: {
    title: "AIFursan",
    description: "Get a card and unlock a 20% discount.",
    size: "small",
    linkButtonText: "Link Button",
    underline: true,
    onLinkButtonPress: () => console.log("Link Pressed"),
    onBannerPress: () => console.log("Banner Pressed"),
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "Big",
    "Small",
    "BigWithLinkButton",
    "SmallWithLinkButton",
]);
