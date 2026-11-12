import * as allStories from "./ProductsCardsSummary.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import { useState } from "react";
import { ProductsCardsSummary } from "../src/components/productsCards/ProductsCardsSummary";
import {
  ListItemActionType,
  ListItemBadgeType,
} from "../src/components/list/ListItem";
import {
  fontMediumLarge,
  spacingXS,
} from "../src/assets/styles/constants/size";

export default {
  title: "Components/ProductsCardsSummary",
  component: ProductsCardsSummary,
  argTypes: {
    label: { action: "Initial value", control: "text" },
    text: { action: "Initial value", control: "text" },
    addonProps: { action: "Initial value", control: "object" },
  },
  args: {
    label: "Category",
    text: "Product Name",
    addonProps: null,
    loading: false,
  },
};

export const Default = {
  args: {
    label: "Name",
    text: "Marc Gunther",
  },
};

export const ReviewScreen = {
  args: {
    label: "Category",
    text: "sava 300 SR_WORKING WW",
    addonProps: {
      type: "amount",
    },
    amount: 200,
  },
};

const InteractiveTemplateShoppingCart = (args: any) => {
  const price = 200;
  const [amount, setAmount] = useState(price);
  const [isVisible, setIsVisible] = useState(true);

  const handleButtonPressDelete = (val: number) => {
    args.addonProps.onButtonPressDelete(val);
    setIsVisible(false);
  };

  return isVisible ? (
    <ProductsCardsSummary
      {...args}
      addonProps={{
        ...args.addonProps,
        onButtonPress: (val: number) => setAmount(val * price),
        onButtonPressDelete: handleButtonPressDelete,
      }}
      amount={amount}
    />
  ) : null;
};

export const ShoppingCart = {
  render: InteractiveTemplateShoppingCart,
  args: {
    label: "Category",
    text: "Product Name",
    addonProps: {
      type: "delete",
      quantity: 1,
      onButtonPressDelete: (val: number) => console.log("Delete", val),
      id: 1,
    },
    extraContentPrimary: "Unlimited",
    extraContentSecondary: "7 days",
  },
};

export const ShoppingCartNoExtraContent = {
  render: InteractiveTemplateShoppingCart,
  args: {
    label: "Category",
    text: "Product Name",
    addonProps: {
      type: "delete",
      quantity: 1,
      onButtonPressDelete: (val: number) => console.log("Delete", val),
      id: 1,
    },
  },
};

export const PurchaseHistorySuccess = {
  args: {
    label: "Category",
    text: "Product Name",
    addonProps: {
      type: "confirmation-status",
    },
    amount: 100,
    primaryActionButtonProps: {
      buttonText: { children: "Preview Voucher" },
    },
    secondaryActionButtonProps: {
      buttonText: { children: "Purchase Again" },
    },
  },
};

export const PurchaseHistoryEmpty = {
  args: {
    label: "Category",
    text: "SAB Umlaty Multi Currency Card VISA",
    addonProps: {
      type: "empty",
    },
    amount: 100,
  },
};

export const PurchaseHistorySuccessOneActionButton = {
  args: {
    label: "Category",
    text: "Product Name",
    addonProps: {
      type: "confirmation-status",
    },
    amount: 200,
    primaryActionButtonProps: {
      buttonText: { children: "Preview Voucher" },
      onButtonPress: () => console.log("Primary button pressed"),
    },
  },
};

export const PurchaseHistoryActionButtonShare = {
  args: {
    label: "Category",
    text: "Product Name",
    addonProps: {
      type: "share",
      onButtonPress: () => console.log("Share pressed"),
    },
    amount: 200,
    primaryActionButtonProps: {
      buttonText: { children: "Preview Voucher" },
      onButtonPress: () => console.log("Primary button pressed"),
    },
    secondaryActionButtonProps: {
      buttonText: { children: "Purchase Again" },
      onButtonPress: () => console.log("Secondary button pressed"),
    },
  },
};

export const PurchaseHistoryOneActionButtonShare = {
  args: {
    label: "Category",
    text: "Product Name",
    addonProps: {
      type: "share",
      onButtonPress: () => console.log("Share pressed"),
    },
    amount: 200,
    primaryActionButtonProps: {
      buttonText: { children: "Preview Voucher" },
      onButtonPress: () => console.log("Primary button pressed"),
    },
  },
};

const list = [
  {
    label: { children: "Expiry Date", variant: "primarycolor2_100static" },
    badgeType: ListItemBadgeType.text,
    badgeText: "13/05/24",
    badgeTextProps: {
      bold: true,
      size: fontMediumLarge,
      variant: "primarytextcolor",
    },
    showDivider: false,
    onItemPress: () => console.log("Copy pressed"),
    overrideStyles: { paddingVertical: spacingXS },
  },
  {
    label: { children: "Date Of Purchase", variant: "primarycolor2_100static" },
    badgeType: ListItemBadgeType.text,
    badgeText: "13/05/24",
    badgeTextProps: {
      bold: true,
      size: fontMediumLarge,
      variant: "primarytextcolor",
    },
    showDivider: false,
    onItemPress: () => console.log("Copy pressed"),
    overrideStyles: { paddingVertical: spacingXS },
  },
  {
    label: { children: "Redeem Code", variant: "primarycolor2_100static" },
    actionType: ListItemActionType.copy,
    badgeType: ListItemBadgeType.text,
    badgeText: "ABCDFEDG1234",
    badgeTextProps: {
      bold: true,
      size: fontMediumLarge,
      variant: "primarytextcolor",
    },
    showDivider: false,
    onItemPress: () => console.log("Copy pressed"),
    overrideStyles: { paddingVertical: spacingXS },
  },
  {
    label: { children: "PIN", variant: "primarycolor2_100static" },
    actionType: ListItemActionType.copy,
    badgeType: ListItemBadgeType.text,
    badgeText: "0123456789",
    badgeTextProps: {
      bold: true,
      size: fontMediumLarge,
      variant: "primarytextcolor",
      numberOfLines: 1,
      overrideStyles: { maxWidth: 100 },
    },
    showDivider: false,
    onItemPress: () => console.log("Copy pressed"),
    overrideStyles: { paddingVertical: spacingXS },
  },
];

export const PurchaseHistoryListActionButtonShare = {
  args: {
    label: "Category",
    text: "Product Name",
    addonProps: {
      type: "share",
      onButtonPress: () => console.log("Share pressed"),
    },
    amount: 200,
    list: list,
    primaryActionButtonProps: {
      buttonText: { children: "Preview Voucher" },
      onButtonPress: () => console.log("Primary button pressed"),
    },
    secondaryActionButtonProps: {
      buttonText: { children: "Purchase Again" },
      onButtonPress: () => console.log("Secondary button pressed"),
    },
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "Default",
    "ReviewScreen",
    "ShoppingCart",
    "ShoppingCartNoExtraContent",
    "PurchaseHistorySuccess",
    "PurchaseHistoryEmpty",
    "PurchaseHistorySuccessOneActionButton",
    "PurchaseHistoryActionButtonShare",
    "PurchaseHistoryOneActionButtonShare",
    "PurchaseHistoryListActionButtonShare",
]);
