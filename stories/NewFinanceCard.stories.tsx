import * as allStories from "./NewFinanceCard.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import { NewFinance } from "../src/components/cards/NewFinance";
import AccountInfo from "../src/components/icons/filled/AccountInfo";

export default {
  title: "Components/NewFinanceCard",
  component: NewFinance,
  argTypes: {
    label: {
      action: "Label",
      control: "text",
    },
    amount: {
      action: "Amount",
      control: "text",
    },
    accountNumber: {
      action: "Account Number",
      control: "text",
    },
    isNegativeAmount: {
      action: "Negative amount",
      control: "boolean",
    },
     showStatus: {
      action: "Show status",
      control: "boolean",
    },
    view: {
      action: "View",
      control: "radio",
      options: ["default", "full"]
    },
    // state: {
    //   action: "View",
    //   control: "radio",
    //   options: ["default", "inactive", "graph", "under-review"]
    // },
    rogressBarPercentage: {
      action: "Progress indicator percentage",
      control: "number",
    },
    graphPercentage: {
      action: "Graph percentage",
      control: "number",
    },
    remainingAmountLabel: {
      action: "Remaining amount label",
      control: "text",
    },
    nextInstallmentLabel: {
      action: "Next installment label",
      control: "text",
    },
     nextInstallmentAmount: {
      action: "Next installment amount",
      control: "text",
    },
    paidInstallmentsLabel: {
      action: "Paid installments label",
      control: "text",
    },
    paidInstallmentsAmount: {
      action: "Next installment amount",
      control: "number",
    },
    remainingInstallmentsAmount: {
      action: "remaining installment amount",
      control: "number",
    },
   
  },
  args: {
    label: "Label",
    amount: "56,240.00",
    remainingAmountLabel: "Remaining",
    remainingAmount: "156,240.00",
    nextInstallmentLabel: "Next Installment",
    nextInstallmentAmount: "3,678.00",
    paidInstallmentsAmount: 24,
    paidInstallmentsLabel: "Paid Installments",
    remainingInstallmentsAmount: 36,
    remainingInstallmentsLabel: "Remaining",
    graphPercentage: 45,
    progressBarPercentage: 45,
    accountNumber: "*1234",
    loading: false
  },
};

export const DefaultView = {
  args: {
    state: "default",
    view: "default",
    stateText: "Active",
    isNegativeAmount: true
  },
};

export const DefaultViewInactive = {
  args: {
    state: "inactive",
    view: "default",
    stateText: "Inactive",
    statusLabel: "Status",
    isNegativeAmount: true
  },
};

export const DefaultViewGraph = {
  args: {
    state: "graph",
    view: "default",
    isNegativeAmount: true
  },
};

export const DefaultViewUnderReview = {
  args: {
    state: "under-review",
    view: "default",
    isNegativeAmount: true,
    stateText: "Under Review"
  },
};

export const FullViewIcon = {
  args: {
    view: "full",
    isNegativeAmount: true,
    addOnType: 'icon',
    addOnProps: { icon: <AccountInfo /> },
    remainingAmountLabel: "Remaining Amount"
  },
};

export const FullViewAvatar = {
  args: {
    view: "full",
    isNegativeAmount: true,
    addOnType: 'avatar',
    addOnProps: { initials: 'JM' },
    remainingAmountLabel: "Remaining Amount"
  },
};

export const FullViewPieGraph = {
  args: {
    view: "full",
    isNegativeAmount: true,
    addOnType: 'pieGraph',
    remainingAmountLabel: "Remaining Amount"
  },
};


export const AllVariants = createAllVariantsStory(allStories, [
    "DefaultView",
    "DefaultViewInactive",
    "DefaultViewGraph",
    "DefaultViewUnderReview",
    "FullViewIcon",
    "FullViewAvatar",
    "FullViewPieGraph",
]);
