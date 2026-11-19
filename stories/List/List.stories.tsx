import * as allStories from "./List.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import React from "react";
import { View } from "react-native";
import { listStoryDecorators } from "../../.storybook/listStoryFrame";
import { List } from "../../src/components/list/List";
import {
  ListItemActionType,
  ListItemBadgeType,
} from "../../src/components/list/ListItem";
import { TransactionListItem } from "../../src/components/list/TransactionListItem";
import Icon from "../../src/components/icon/Icon";
import Tick from "../../src/components/icons/functionals/Tick";
import { BadgeSize } from "../../src/components/badge/Badge";
import { useTheme } from "../../src/context/theme/themeContext";
import InfoFrame from "../../src/components/icons/status/InfoFrame";

export default {
  title: "Components/Navigation/List/List",
  component: List,
  tags: ["!autodocs"],
  decorators: listStoryDecorators,
};

const TickIcon = (args: any) => {
  const { theme } = useTheme();

  return <Tick fill={theme.primarycolor3} />;
};

const InfoIcon = (args: any) => {
  const { theme } = useTheme();

  return <InfoFrame color={theme.primarycolor3} />;
};

export const ItemsWithCheckbox = {
  args: {
    items: [
      {
        label: { children: "Item 1" },
        actionType: ListItemActionType.checkbox,
        addOn: <InfoIcon />,
      },
      {
        label: { children: "Item 2" },
        actionType: ListItemActionType.checkbox,
        addOn: <InfoIcon />,
      },
      {
        label: { children: "Item 3" },
        actionType: ListItemActionType.checkbox,
        addOn: <InfoIcon />,
        showDivider: false,
      },
    ],
  },
};

export const ItemsWithChevron = {
  args: {
    items: [
      {
        label: { children: "Item 1" },
        actionType: ListItemActionType.chevron,
        addOn: <TickIcon />,
      },
      {
        label: { children: "Item 2" },
        actionType: ListItemActionType.chevron,
        addOn: <TickIcon />,
      },
      {
        label: { children: "Item 3" },
        actionType: ListItemActionType.chevron,
        addOn: <TickIcon />,
      },
    ],
  },
};

export const ItemsWithChevronAndBadge = {
  args: {
    items: [
      {
        label: { children: "Item 1" },
        actionType: ListItemActionType.chevron,
        badgeType: ListItemBadgeType.badgeSuccess,
        badgeSize: BadgeSize.large,
        badgeText: "1",
        addOn: <TickIcon />,
      },
      {
        label: { children: "Item 2" },
        actionType: ListItemActionType.chevron,
        badgeType: ListItemBadgeType.badgePrimary,
        badgeSize: BadgeSize.large,
        badgeText: "2",
        addOn: <TickIcon />,
      },
      {
        label: { children: "Item 3" },
        actionType: ListItemActionType.chevron,
        badgeType: ListItemBadgeType.badgeWarning,
        badgeSize: BadgeSize.large,
        badgeText: "3",
        addOn: <TickIcon />,
      },
    ],
  },
};

export const ItemsWithStackedContent = {
  args: {
    items: [
      {
        title: { children: "Item headline 1", subtitle: "Subtitle text" },
        bodyText: { children: "Body text" },
      },
      {
        title: { children: "Item headline 2", subtitle: "Subtitle text" },
        bodyText: { children: "Body text" },
      },
      {
        title: { children: "Item headline 3", subtitle: "Subtitle text" },
        bodyText: { children: "Body text" },
        showDivider: false,
      },
    ],
  },
};

export const ItemsWithToggleAndBackground = {
  args: {
    items: [
      {
        title: { children: "Dark theme" },
        bodyText: { children: "Body text" },
        addOn: <InfoIcon />,
        actionType: ListItemActionType.toggle,
        showBackground: true,
      },
      {
        title: { children: "Dark theme" },
        bodyText: { children: "Body text" },
        addOn: <InfoIcon />,
        actionType: ListItemActionType.toggle,
      },
      {
        title: { children: "Dark theme" },
        bodyText: { children: "Body text" },
        addOn: <InfoIcon />,
        actionType: ListItemActionType.toggle,
        showBackground: true,
      },
    ],
  },
};

const ShoppingIcon = () => (
  <Icon type="banking" name="shopping" width={24} height={24} />
);

const transactionListDecorator = (Story: React.ComponentType) => (
  <View style={{ width: "100%", maxWidth: "100%", minWidth: 0, alignSelf: "stretch" }}>
    <Story />
  </View>
);

const transactionListArgs = {
  label: "Credit Card Payment",
  secondaryLabel: "POS Transaction | Entertainment",
  amount: "SAR 500.00",
  secondaryAmount: "SAR 6,900,880.00",
  showDivider: false,
};

export const TransactionListItemDefault = {
  decorators: [transactionListDecorator],
  args: {
    ...transactionListArgs,
  },
  render: (args: React.ComponentProps<typeof TransactionListItem>) => (
    <TransactionListItem {...args} icon={<ShoppingIcon />} />
  ),
};

export const TransactionListItemLabelAndAmountOnly = {
  decorators: [transactionListDecorator],
  args: {
    ...transactionListArgs,
    secondaryLabel: undefined,
    secondaryAmount: undefined,
  },
  render: (args: React.ComponentProps<typeof TransactionListItem>) => (
    <TransactionListItem {...args} icon={<ShoppingIcon />} />
  ),
};

export const TransactionListItemList = {
  decorators: [transactionListDecorator],
  render: () => (
    <View>
      <TransactionListItem
        {...transactionListArgs}
        icon={<ShoppingIcon />}
        showDivider
      />
      <TransactionListItem
        label="Transfer to Savings"
        secondaryLabel="Online Banking"
        amount="SAR 1,200.00"
        secondaryAmount="SAR 6,899,680.00"
        icon={<ShoppingIcon />}
        showDivider
      />
      <TransactionListItem
        label="ATM Withdrawal"
        secondaryLabel="ATM | Riyadh"
        amount="SAR 300.00"
        secondaryAmount="SAR 6,899,380.00"
        icon={<ShoppingIcon />}
        showDivider={false}
      />
    </View>
  ),
};

export const AllVariants = createAllVariantsStory(allStories, [
    "ItemsWithCheckbox",
    "ItemsWithChevron",
    "ItemsWithChevronAndBadge",
    "ItemsWithStackedContent",
    "ItemsWithToggleAndBackground",
    "TransactionListItemDefault",
    "TransactionListItemLabelAndAmountOnly",
    "TransactionListItemList",
]);
