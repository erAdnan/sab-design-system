import { AccountsCarousel } from "../src/components/cards/AccountsCarousel";
import { centerStoryDecorator } from "../.storybook/centerStoryDecorator";

export default {
  title: "Components/CardsAccountsCarousel",
  component: AccountsCarousel,
  decorators: [centerStoryDecorator],
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
    accountName: "Current account",
    accountNumber: "*****9091",
    balanceLabel: "Balance",
    balance: "56,240.00",
    loading: false,
  },
};

export const Default = {
  args: {},
};
