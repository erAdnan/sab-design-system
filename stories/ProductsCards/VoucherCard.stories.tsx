import * as allStories from "./VoucherCard.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { VoucherCard } from "../../src/components/productsCards/VoucherCard";

/**
 * Figma: 00. SAB DS Components and Foundations → Voucher Card (16159:31271)
 * https://www.figma.com/design/JC6uz9pPKMGCUSiA7a8gob/00.-SAB-DS-Components-and-Foundations?node-id=4252-23482
 */
export default {
  title: "Components/Data Display/ProductsCards/Voucher Card",
  component: VoucherCard,
  argTypes: {
    type: {
      control: "radio",
      options: ["default", "receipt"],
    },
    showSar: { control: "boolean" },
  },
  args: {
    type: "default",
    title: "Noon Gift Cards - KSA Store",
    subtitle: "50 Gift Card",
    showSar: true,
    validTill: "December 27, 2025",
    code: "MKHSJJJJ",
    pin: "309872",
    expiry: "Exp. 18/07/25",
  },
};

/** Figma Type=Default — title, amount, QR, valid till / code / pin */
export const Default = {};

/** Figma Type=Reciept — centered title, amount · expiry, QR */
export const Receipt = {
  args: {
    type: "receipt",
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
  "Default",
  "Receipt",
]);
