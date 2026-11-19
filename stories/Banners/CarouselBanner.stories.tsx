import * as allStories from "./CarouselBanner.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { CarouselBanner } from "../../src/components/banner/CarouselBanner";

export default {
  title: "Components/Banners/Carousel Banner",
  component: CarouselBanner,
  argTypes: {
    title: { action: "Label", control: "text" },
    description: { action: "Description", control: "text" },
    buttonText: { action: "Button text", control: "text" },
  },
  args: {
    loading: false,
  },
};

export const Default = {
  args: {
    title: "Don't Have an Account Yet?",
    description: "Open a new account with us in just a few easy steps. ",
    buttonText: "Open Account",
    onButtonPress: () => console.log("Button Pressed"),
  },
};

const image = require("../../src/assets/images/carouselBannerImagePattern.png");
export const Image = {
  args: {
    type: "image",
    title: "Headline",
    description: "Body copy comes here",
    backgroundImage: {
      url: image,
      isAbsolutePath: true,
    },
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "Default",
    "Image",
]);
