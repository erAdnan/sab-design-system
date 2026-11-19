import * as allStories from "./CardsPreviewModule.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { useState } from "react";
import { PreviewModule } from "../../src/components/cards/PreviewModule";
import { LanguageWrapper } from "../../src/components/local/LanguageWrapper";

export default {
  title: "Components/Cards & Accounts & Finance/CardsPreviewModule",
  component: PreviewModule,
  argTypes: {
    type: {
      action: "Type",
      control: "radio",
      options: ["cards", "account", "finance", "portfolio"],
    },
    showChipsInfo: { action: "Show chips info", control: "boolean" },
  },
  args: {
    type: "account",
    showChipsInfo: true,
    "chipsInfoProps.label": "In-Active",
    "chipsInfoProps.state": "error",
    accountName: " Account name",
    accountNumber: "4272-2201-0114-9091",
    balanceLabel: "Balance",
    balance: "56,234.00",
    tooltipText: "Tooltip text",
    availableLimitLabel: "Available Limit",
    availableLimit: "86,234.00",
    creditLimitLabel: "Credit Limit (95%)",
    creditLimit: "92,000.00",
    creditLimitPercentage: 40,
    loading: false
  },
};

export const Account = {
  args: {
    type: "account",
    cardTitle: "Current Account",
    accountName: "Account name Account name Account name A name Account name",
  },
};

export const Finance = {
  args: {
    type: "finance",
    cardTitle: "Personal Finance Loan",
    balanceLabel: "Principle Outstanding",
  },
};

export const Portfolio = {
  args: {
    type: "portfolio",
    cardTitle: "Current Account Current Acc Current Acc",
    accountName: "Account name",
    accountNumber: "4272-2201-0114-9091",
    balanceLabel: "Principle Outstanding",
  },
};

export const Cards = {
  args: {
    type: "cards",
    cardTitle: "SAB Signature Visa",
    accountName: "SAB Signature Visa Credit card",
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "Account",
    "Finance",
    "Portfolio",
    "Cards",
]);
