import * as allStories from "./BlockAccount.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import fonts from "../../src/assets/styles/constants/fonts";
import { Account } from "../../src/components/block/Account";
import i18n from "i18next";

export default {
  title: "Components/Blocks/BlockAccount",
  component: Account,
  argTypes: {
    headline: { action: "Headline", control: "text" },
    text: { action: "Text", control: "text" },
    isActive: { action: "Active", control: "boolean" },
    showAction: { action: "Show action", control: "boolean" },
    actionType: {
      action: "Action type",
      control: "radio",
      options: ["dropdown", "selection", "radioButton"],
    },
  },
  args: {
    isActive: true,
    showAction: true,
    actionType: "dropdown",
    loading: false,
    type: 'account'
  },
};

export const Balance = {
  args: {
    headline: i18n.t("blockAccountHeadline"),
    text: "1234-5678-91011",
    balance: "1,000,000.00",
  },
};

export const BalanceExtraContent = {
  args: {
    headline: i18n.t("blockAccountHeadline"),
    text: "1234-5678-91011",
    balance: "1,000,000.00",
    extraContent: "Extra Content",
  },
};

export const ChipsInfoStatus = {
  args: {
    headline: i18n.t("blockAccountHeadline"),
    text: "1234-5678-91011",
    balanceType: "chipInfoStatus",
    chipInfoStatusLabel: "Label",
  },
};

export const CardWithAction = {
  args: {
    headline: i18n.t("Premier Credit Card"),
    balance: "1,000,000.00",
    cardImageProps: {
      isAbsolutePath: true,
      url: require("../../src/assets/images/card-image.png"),
    },
    type: 'card'
  },
};

export const CurrencyWithFlagPlaceholder = {
  args: {
    headline: i18n.t("Currency"),
    balance: "1,000,000.00",
    type: 'currency'
  },
};

export const CurrencyWithFlagImage = {
  args: {
    headline: i18n.t("Currency"),
    balance: "1,000,000.00",
    type: 'currency',
    cardImageProps: {
      isAbsolutePath: true,
      url: require("../../src/assets/images/flagUS.png"),
    },
  },
};

export const EmptyAccount_NewVariant = {
  args: {
    headline: "Select Account",
    headlineTextProps: {fontfamily: 'HSBC_Medium'},
  },
};

export const DisabledAccount_NewVariant = {
  args: {
    headline: "Premier Account",
    headlineTextProps: {fontfamily: 'HSBC_Medium'},
    text: "1234-5678-91011",
    balance: "1,000,000.00",
    showAction: false,
    isActive: false
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "Balance",
    "BalanceExtraContent",
    "ChipsInfoStatus",
    "CardWithAction",
    "CurrencyWithFlagPlaceholder",
    "CurrencyWithFlagImage",
    "EmptyAccount_NewVariant",
    "DisabledAccount_NewVariant",
]);
