import { PortfolioCarousel } from "../src/components/cards/PortfolioCarousel";

export default {
  title: "Components/CardsPortfolioCarousel",
  component: PortfolioCarousel,
  argTypes: {
    accountName: {
      action: "Account name",
      control: "text",
    },
    accountNumber: {
      action: "Account number",
      control: "text",
    },
    balanceLabel: {
      action: "Balance label",
      control: "text",
    },
    balance: {
      action: "Balance",
      control: "text",
    },
  },
  args: {
    accountName: "Portfolio account",
    accountNumber: "*****9091",
    balanceLabel: "Ledger Balance",
    balance: "56,240.00",
    loading: false
  },
};

export const Default = {
  args: {},
};
