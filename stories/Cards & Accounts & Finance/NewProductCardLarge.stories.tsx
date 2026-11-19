import * as allStories from "./NewProductCardLarge.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import Beauty from "../../src/components/icons/other/Beauty";
import { NewProductCardLarge } from "../../src/components/productsCards/NewProductCardLarge";

export default {
  title: "Components/Data Display/Cards & Accounts & Finance/New Product Card Large",
  component: NewProductCardLarge
}

export const Vertical = {
  args: {
    imgProps: {
      url: require('../../src/assets/images/product_image.png'),
      isAbsolutePath: true
    },
    label: "Coach",
    description: "Tabby 26 Shoulder Bag",
    amount: "2,807",
    horizontal: false
  }
};

export const Horizontal = {
  args: {
    imgProps: {
      url: require('../../src/assets/images/product_image.png'),
      isAbsolutePath: true
    },
    label: "Marly",
    description: "G 580 with EQ Technology",
    amount: "2,807",
    horizontal: true,
    icon: <Beauty />,
    iconLabel: "Beauty"
  }  
}

export const AllVariants = createAllVariantsStory(allStories, [
    "Vertical",
    "Horizontal",
]);
