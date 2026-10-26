import { FinanceCarousel } from "../src/components/cards/FinanceCarousel";

export default {
  title: "Components/CardsFinanceCarousel",
  component: FinanceCarousel,
  argTypes: {
    totalAmountLabel: {
      action: "Total amount label",
      control: "text",
    },
    remainingAmountLabel: {
      action: "Remaining amount label",
      control: "text",
    },
    nextInstallmentLabel: {
      action: "Next installment label",
      control: "text",
    },
    totalAmount: {
      action: "Total amount",
      control: "text",
    },
    remainingAmount: {
      action: "Remaining amount",
      control: "text",
    },
    nextInstallmentAmount: {
      action: "Next installment",
      control: "text",
    },
  },
  args: {
    totalAmountLabel: "Total Amount",
    totalAmount: "56,240.00",
    remainingAmountLabel: "Remaining Amount",
    remainingAmount: "156,240.00",
    nextInstallmentLabel: "Next Installment",
    nextInstallmentAmount: "3,678.00",
    loading: false
  },
};

export const Default = {
  args: {},
};
