import * as allStories from "./AccountViewAll.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
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
  // Figma fixed-size cards: keep intrinsic width and center the row (no fluid stretch).
  const { width } = useWindowDimensions();
  const stacked = width < 560;
  const cell = { minWidth: 0 };
  return (
    <View
      style={{
        display: "flex",
        flexDirection: stacked ? "column" : "row",
        flexWrap: "wrap",
        gap: spacingXS,
        maxWidth: "100%",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
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



// ---- Figma parity (Cards & Accounts page 227:2376, accounts.view.all): Type=Carousel (217x118) per Account Type / Status ----
export const CurrentCarousel = {
  args: {
    type: "carousel",
    variant: "current",
    accountNumber: "124356797977",
    accountNumberShort: "*1234",
  },
};

export const MudarabahCarousel = {
  args: {
    type: "carousel",
    variant: "mudarabah",
    accountNumber: "124356797977",
    accountNumberShort: "*1234",
  },
};

export const GreenDepositCarousel = {
  args: {
    type: "carousel",
    variant: "green deposit",
    accountNumber: "124356797977",
    accountNumberShort: "*1234",
  },
};

export const GreenDepositInProgressCarousel = {
  args: {
    type: "carousel",
    variant: "green deposit",
    accountNumber: "124356797977",
    accountNumberShort: "*1234",
    chipsInfoProps: { label: "In Progress", state: "warning" },
    showChipsInfo: true,
  },
};

export const WafferAccountCarousel = {
  args: {
    type: "carousel",
    variant: "waffer account",
    accountNumber: "124356797977",
    accountNumberShort: "*1234",
  },
};

export const IslamicCommodityCarousel = {
  args: {
    type: "carousel",
    variant: "islamic commodity account",
    accountNumber: "124356797977",
    accountNumberShort: "*1234",
  },
};

export const IslamicCommodityInProgressCarousel = {
  args: {
    type: "carousel",
    variant: "islamic commodity account",
    accountNumber: "124356797977",
    accountNumberShort: "*1234",
    chipsInfoProps: { label: "In Progress", state: "warning" },
    showChipsInfo: true,
  },
};

export const FamilyAccountCarousel = {
  args: {
    type: "carousel",
    variant: "family account",
    accountNumber: "124356797977",
    accountNumberShort: "*1234",
  },
};

export const HSBCGlobalCarousel = {
  args: {
    type: "carousel",
    variant: "hsbc global account",
    accountNumber: "124356797977",
    accountNumberShort: "*1234",
  },
};

export const CashWalletCarousel = {
  args: {
    type: "carousel",
    variant: "cash wallet",
    accountNumber: "124356797977",
    accountNumberShort: "*1234",
  },
};

export const JointAccountCarousel = {
  args: {
    type: "carousel",
    variant: "joint account",
    accountNumber: "124356797977",
    accountNumberShort: "*1234",
  },
};

export const SafeDepositLockerCarousel = {
  args: {
    type: "carousel",
    variant: "safe deposit locker",
    accountNumber: "124356797977",
    accountNumberShort: "*1234",
  },
};

export const SafeDepositLockerInProgressCarousel = {
  args: {
    type: "carousel",
    variant: "safe deposit locker",
    accountNumber: "124356797977",
    accountNumberShort: "*1234",
    chipsInfoProps: { label: "In Progress", state: "warning" },
    showChipsInfo: true,
  },
};

export const SafeDepositLockerInProgress = {
  args: {
    type: "default",
    variant: "safe deposit locker",
    accountNumber: "124356797977",
    accountNumberShort: "*1234",
    chipsInfoProps: { label: "In Progress", state: "warning" },
    showChipsInfo: true,
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "Current",
    "Mudarabah",
    "GreenDeposit",
    "GreenDepositInProgress",
    "WafferAccount",
    "IslamicCommodity",
    "IslamicCommodityInProgress",
    "FamilyAccount",
    "HSBCGlobal",
    "CashWallet",
    "PortfolioAccount",
    "JointAccount",
    "SafeDepositLocker",
    "TwoCardsExample",
    "CurrentCarousel",
    "MudarabahCarousel",
    "GreenDepositCarousel",
    "GreenDepositInProgressCarousel",
    "WafferAccountCarousel",
    "IslamicCommodityCarousel",
    "IslamicCommodityInProgressCarousel",
    "FamilyAccountCarousel",
    "HSBCGlobalCarousel",
    "CashWalletCarousel",
    "JointAccountCarousel",
    "SafeDepositLockerCarousel",
    "SafeDepositLockerInProgressCarousel",
    "SafeDepositLockerInProgress",
]);
