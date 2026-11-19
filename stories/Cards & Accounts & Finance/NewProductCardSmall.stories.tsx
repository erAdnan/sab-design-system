import * as allStories from "./NewProductCardSmall.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { NewProductCardSmall } from "../../src/components/productsCards/NewProductCardSmall";

export default {
  title: "Components/Data Display/Cards & Accounts & Finance/New Product Card Small",
  component: NewProductCardSmall
}

export const Default = {
  args: {
    merchantName: "Noon Gift Card",
    discountLabel: "15% discount"
  }
};

export const WithLabel = {
  args: {
    merchantName: "Noon Gift Card",
    discountLabel: "15% discount",
    label: "Telecom"
  }
};

export const WithFavorite = {
  args: {
    merchantName: "Noon Gift Card",
    discountLabel: "15% discount",
    showFavorite: true,
    isFavorite: false
  }  
}

export const WithChipsAndFavorite = {
  args: {
    merchantName: "Noon Gift Card",
    discountLabel: "15% discount",
    showFavorite: true,
    isFavorite: false,
    showChips: true,
    chipsProps: {
      type: "new",
      label: "New",
      overrideLabelStyles: { color: "#FFFFFF" },
      overrideStyles: { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }
    }
  }  
}

export const AllVariants = createAllVariantsStory(allStories, [
    "Default",
    "WithLabel",
    "WithFavorite",
    "WithChipsAndFavorite",
]);
