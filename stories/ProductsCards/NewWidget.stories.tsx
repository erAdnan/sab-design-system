import * as allStories from "./NewWidget.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { useTranslation } from "react-i18next";
import Gift from "../../src/components/icons/other/Gift";
import { NewWidget } from "../../src/components/widget/NewWidget";

export default {
  title: "Components/Data Display/ProductsCards/New Widget",
  component: NewWidget,
  argTypes: {
    size: {
      action: "Size",
      control: "radio",
      options: [
        "small",
        "medium",
        "large",
        "extra-large",
      ],
    },
    color: {
      action: "Color",
      control: "radio",
      options: ["red", "neutral", "purple", "green", "amber"]
    }
  },
  args: {
    headline: "Headline",
    icon: <Gift />,
    color: "red",
    loading: false
  },
};

export const Small = {
  args: {
    icon: <Gift />,
    size: "small",
  },
};

export const Medium = {
  args: {
    icon: <Gift />,
    size: "medium",
    text: "Some text goes here"
  },
};
export const Large = {
  args: {
    icon: <Gift />,
    size: "large",
    text: "Some text goes here and it can take up to two lines"
  },
};
export const ExtraLarge = {
  args: {
    icon: <Gift />,
    size: "extra-large",
    text: "Some text goes here and it can take up to three lines"
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "Small",
    "Medium",
    "Large",
    "ExtraLarge",
]);
