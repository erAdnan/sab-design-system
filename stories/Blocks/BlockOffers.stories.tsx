import * as allStories from "./BlockOffers.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { BlockOffers } from "../../src/components/block/Offers";

export default {
  title: "Components/Blocks/BlockOffers",
  component: BlockOffers,
  argTypes: {
    category: { action: "Category", control: "text" },
    title: { action: "Title", control: "text" },
    type: {
      action: "Type",
      control: "radio",
      options: ["discount", "cashback"],
    },
    validity: { action: "Validity", control: "text" },
    validityLabel: { action: "Validity label", control: "text" },
    showAction: { action: "Show action", control: "boolean" }
  },
  args: {
    category: "Category",
    title: "Title",   
  },
};

export const DiscountAction = {
  args: {
    type: "discount",
    showAction: true,
  },
};

export const DiscountValidity = {
  args: {
    type: "discount",
    validity: "12/05/2026",
    validityLabel: "Valid until",
    showAction: false,
  },
};

export const CashbackAction = {
  args: {
    type: "cashback",
    showAction: true,
  },
};

export const CashbackValidity = {
  args: {
    type: "cashback",
    validity: "12/05/2026",
    validityLabel: "Valid until",
    showAction: false,
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "DiscountAction",
    "DiscountValidity",
    "CashbackAction",
    "CashbackValidity",
]);
