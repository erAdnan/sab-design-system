import React from 'react';
import { AccountViewAll } from "../src/components/cards/AccountsViewAll";
import { useWindowDimensions, View } from "react-native";
import { spacingXS } from "../src/assets/styles/constants/size";

export default {
  title: "Components/AccountViewAll",
  component: AccountViewAll,
  argTypes: {
    accountName: {
      action: "Account name",
      control: "text",
    },
    accountType: {
      action: "Account type",
      control: "text",
    },
    type: {
      action: "Type",
      control: "radio",
      options: ["default", "carousel"]
    },
    accountNumber: {
      action: "Account number",
      control: "text",
    },
    balance: {
      action: "Balance",
      control: "text",
    },
    variant: {
      action: "Variant", 
      control: 'radio',
      options: [
        'portfolio account',
        'cash wallet',
        'hsbc global account',
        'family account',
        'islamic commodity account',
        'waffer account',
        'green deposit',
        'mudarabah',
        'current',
        'joint account',
        'safe deposit locker',
      ],
    }
  },
  args: {
    balance: "3,000.00",
    loading: false,
    accountName: null,
    accountType: null, 
    showChipsInfo:false,
  },
};

const RowExample = (args: any) => {
  const { width } = useWindowDimensions();
  const stacked = width < 560;
  const cell = {
    width: stacked ? ("100%" as const) : undefined,
    flexGrow: stacked ? 0 : 1,
    flexBasis: stacked ? ("100%" as const) : 0,
    minWidth: 0,
  };
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: spacingXS,
        width: "100%",
        maxWidth: "100%",
        alignItems: "stretch",
      }}
    >
      <View style={cell}>
        <AccountViewAll {...args} variant="current" />
      </View>
      <View style={cell}>
        <AccountViewAll {...args} variant="hsbc global account" />
      </View>
    </View>
  );
};

export const Current = {
  args: {
    type: "default",
    variant: "current",
    accountNumber: "124356797977", 
    accountNumberShort: "*1234"
  },
};

export const Mudarabah = {
  args: {
    type: "default",
    variant: "mudarabah",
    accountNumber: "124356797977", 
    accountNumberShort: "*1234"
  },
};

export const GreenDeposit = {
  args: {
    type: "default",
    variant: "green deposit",
    accountNumber: "124356797977", 
    accountNumberShort: "*1234",
  },
};

export const GreenDepositInProgress = {
  args: {
    type: "default",
    variant: "green deposit",
    accountNumber: "124356797977", 
    accountNumberShort: "*1234",
    chipsInfoProps: { label: "In Progress", state: "warning" },
    showChipsInfo: true
  },
};


export const WafferAccount = {
  args: {
    type: "default",
    variant: "waffer account",
    accountNumber: "124356797977", 
    accountNumberShort: "*1234"
  },
};

export const IslamicCommodity = {
  args: {
    type: "default",
    variant: "islamic commodity account",
    accountNumber: "124356797977", 
    accountNumberShort: "*1234",
  },
};

export const IslamicCommodityInProgress = {
  args: {
    type: "default",
    variant: "islamic commodity account",
    accountNumber: "124356797977", 
    accountNumberShort: "*1234",
    chipsInfoProps: { label: "In Progress", state: "warning" },
    showChipsInfo: true

  },
};

export const FamilyAccount = {
  args: {
    type: "default",
    variant: "family account",
    accountNumber: "124356797977", 
    accountNumberShort: "*1234"
  },
};

export const HSBCGlobal = {
  args: {
    type: "default",
    variant: "hsbc global account",
    accountNumber: "124356797977", 
    accountNumberShort: "*1234"
  },
};

export const CashWallet = {
  args: {
    type: "default",
    variant: "cash wallet",
    accountNumber: "124356797977", 
    accountNumberShort: "*1234"
  },
};

export const PortfolioAccount = {
  args: {
    type: "default",
    variant: "portfolio account",
    accountNumber: "124356797977", 
    accountNumberShort: "*1234"
  },
};

export const JointAccount = {
  args: {
    type: "default",
    variant: "joint account",
    accountNumber: "124356797977", 
    accountNumberShort: "*1234"
  },
};

export const SafeDepositLocker = {
  args: {
    type: "default",
    variant: "safe deposit locker",
    accountNumber: "124356797977", 
    accountNumberShort: "*1234"
  },
};

export const TwoCardsExample = {
  render: RowExample,
  args: {
    type: "carousel",
    accountNumber: "124356797977", 
    accountNumberShort: "*1234"
  },
};


