import * as allStories from "./InfoMarketingBanner.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import { InfoMarketingBanner } from "../src/components/banner/InfoMarketingBanner";

export default {
  title: "Components/Info Marketing Banner",
  component: InfoMarketingBanner
}

export const Medium = {
  args: {
    size: 'medium',
    imageProps: {url: "https://static0.makeuseofimages.com/wordpress/wp-content/uploads/2024/09/an-iphone-16-in-hand-with-a-blue-gradient-background.jpg?q=49&fit=crop&w=1100&h=618&dpr=2"},
    headline: "Headline",
    description: "Experience the next level of performance with iPhone 16. Sleeker design, smarter camera, and all-day power.",
    chips: [
      {
        type: "centered",
        label: "Label",
        loading: false,
      },
      {
        type: "centered",
        label: "Label",
        loading: false,
      },
    ]
  }
}

export const Large = {
  args: {
    size: 'large',
    imageProps: {url: "https://static0.makeuseofimages.com/wordpress/wp-content/uploads/2024/09/an-iphone-16-in-hand-with-a-blue-gradient-background.jpg?q=49&fit=crop&w=1100&h=618&dpr=2"},
    headline: "Headline",
    description: "Experience the next level of performance with iPhone 16. Sleeker design, smarter camera, and all-day power.",
    chips: [
      {
        type: "centered",
        label: "Label",
        loading: false,
      },
      {
        type: "centered",
        label: "Label",
        loading: false,
      },
    ]
  }
}

export const LargeWithHeadline2 = {
  args: {
    size: 'large',
    headline2: "Headline",
    imageProps: {url: "https://static0.makeuseofimages.com/wordpress/wp-content/uploads/2024/09/an-iphone-16-in-hand-with-a-blue-gradient-background.jpg?q=49&fit=crop&w=1100&h=618&dpr=2"},
    headline: "Headline",
    description: "Experience the next level of performance with iPhone 16. Sleeker design, smarter camera, and all-day power.",
    chips: [
      {
        type: "centered",
        label: "Label",
        loading: false,
      },
      {
        type: "centered",
        label: "Label",
        loading: false,
      },
    ]
  }
}

export const AllVariants = createAllVariantsStory(allStories, [
    "Medium",
    "Large",
    "LargeWithHeadline2",
]);
