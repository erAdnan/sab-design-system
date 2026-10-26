import { MarketingBanner } from "../src/components/banner/MarketingBanner";

export default {
  title: "Components/Marketing Banner",
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
