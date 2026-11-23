import * as allStories from "./VoucherReceipt.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { VoucherReceipt } from "../../src/components/productsCards/VoucherReceipt";

/**
 * Figma: 00. SAB DS Components and Foundations → Voucher receipt (16168:37547)
 * https://www.figma.com/design/JC6uz9pPKMGCUSiA7a8gob/00.-SAB-DS-Components-and-Foundations?node-id=16168-37547
 */
export default {
  title: "Components/Data Display/ProductsCards/Voucher Receipt",
  component: VoucherReceipt,
  argTypes: {
    type: {
      control: "radio",
      options: ["card", "gifting"],
    },
    showSar: { control: "boolean" },
  },
  args: {
    type: "card",
    title: "Noon Gift Cards - KSA Store",
    subtitle: "50 Gift Card",
    expiry: "Exp. 18/07/25",
    showSar: true,
  },
};

/** Figma Language=English|Arabic, Type=Card — voucher + redeem details */
export const Default = {};

/** Alias for Card type (Figma Type=Card) */
export const Card = {
  args: {
    type: "card",
  },
};

/** Figma Type=Gifting — birthday illustration + message + To/Amount/Date/From */
export const Gifting = {
  args: {
    type: "gifting",
    to: "Receiver Name",
    amount: "50",
    date: "dd/mm/yy",
    from: "Sender Name",
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
  "Default",
  "Gifting",
]);
