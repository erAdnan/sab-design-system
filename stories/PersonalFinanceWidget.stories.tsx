import * as allStories from "./PersonalFinanceWidget.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import { BudgetCard as BudgetCardWidget } from "../src/components/personalFinanceWidgets/BudgetCard";
import { Tag as TagWidget } from "../src/components/personalFinanceWidgets/Tag";
import { BarChart } from "../src/components/personalFinanceWidgets/BarChart";
import { CategoryList as CategoryListWidget } from "../src/components/personalFinanceWidgets/CategoryList";
import {
  ListItemActionType,
  ListItemBadgeType,
} from "../src/components/list/ListItem";
import Transport from "../src/components/icons/sab360/Transport";
import { CategoryCard as CategoryCardWidget } from "../src/components/personalFinanceWidgets/CategoryCard";
import Home from "../src/components/icons/sab360/Home";
import { lightTheme } from "../src/assets/styles/theme/light";
import Education from "../src/components/icons/sab360/Education";

export default {
  title: "Components/Data Display/PersonalFinanceWidgets",
  tags: ["!autodocs"],
  components: [
    TagWidget,
    BudgetCardWidget,
    BarChart,
    CategoryListWidget,
    CategoryCardWidget,
  ],
};

export const Tag = {
  name: "Tag Widget",
  render: TagWidget,
  args: {
    mainText: "#BusinessTrip",
    description: "43 Transactions",
    loading: false,
  },
};

export const MyActivityWeek = {
  render: BarChart,
  args: {
    headline: "Headline",
    description: "Starting with 27 Oct",
    amount: "",
    barChartItems: [
      { label: "Mon", percentage: "25" },
      { label: "Tue", percentage: "15" },
      { label: "Wed", percentage: "45" },
      { label: "Thu", percentage: "100" },
      { label: "Fri", percentage: "30" },
      { label: "Sat", percentage: "75" },
      { label: "Sun", percentage: "5" },
    ],
    loading: false,
  },
};

export const MyActivityMonth = {
  render: BarChart,
  args: {
    headline: "Headline",
    description: "",
    amount: "56,000.00",
    barChartItems: [
      { label: "W1", percentage: "25" },
      { label: "W2", percentage: "80" },
      { label: "W3", percentage: "75" },
      { label: "W4", percentage: "100" },
    ],
    loading: false,
  },
};
export const BudgetCard = {
  name: "Budget Card Widget",
  render: BudgetCardWidget,
  args: {
    amountRemaining: 10000,
    amountTotal: 60000,
    dailyAllowanceAmount: "3.97",
    pieGraphLabel: "Left to spend",
    pieGraphPercentage: 80,
    mainText: "This Month",
    boldText: "Budget",
    description: "7 days to go",
    status: "onTrack",
    loading: false,
  },
  argTypes: {
    status: {
      action: "Status",
      control: "radio",
      options: ["onTrack", "beCareful", "overspent"],
    },
    pieGraphPercentage: {
      action: "Status",
      control: "radio",
      options: [25, 50, 75, 90, 100],
    },
  },
};

export const CategoryList = {
  name: "Category List Widget",
  render: CategoryListWidget,
  args: {
    "listItemProps.title": { children: "Taxi" },
    "listItemProps.actionType": ListItemActionType.chevron,
    "listItemProps.badgeType": ListItemBadgeType.balance,
    "listItemProps.balanceFirstValue": 1250,
    progressIndicatorPercentage: 75,
    addonBackgroundColor: lightTheme.pfmTransport1,
    addonIcon: <Transport />,
    progressIndicatorColor: "rgba(161, 90, 79, 1)",
    loading: false,
  },
};

export const CategoryCardHorizontal = {
  name: "Content Card Widget",
  render: CategoryCardWidget,
  args: {
    "listItemProps.title": { children: "University" },
    "listItemProps.contentText": "Achieved July 2025",
    "listItemProps.badgeType": ListItemBadgeType.balance,
    "listItemProps.balanceLabel": "Target",
    "listItemProps.balanceFirstValue": 2500,
    progressIndicatorPercentage: 75,
    addonBackgroundColor: "#C7DCDB",
    //addonIcon: <Education fill={lightTheme.secondarycolor10} />,
    progressIndicatorColor: lightTheme.secondarycolor10,
    completed: true,
    savedAmount: "2000.00",
    savedAmountLabel: "Total Saved Amount",
    spentAmount: "2000.00",
    spentAmountLabel: "Spent",
    remainingAmount: "500.00",
    remainingAmountLabel: "Remaining",
    status: 'onTrack',
    statusText: "On Track",
    loading: false,
  },
  argTypes: {
    completed: { action: "Completed", control: "boolean" },
    argTypes: {
      status: {
        action: "Status",
        control: "radio",
        options: ["onTrack", "beCareful", "overspent"],
      },
    }
  },
};

export const CategoryCardHorizontalError = {
  name: "Content Card Widget Error",
  render: CategoryCardWidget,
  args: {
    "listItemProps.title": { children: "University" },
    "listItemProps.contentText": "Achieved July 2025",
    "listItemProps.badgeType": ListItemBadgeType.balance,
    "listItemProps.balanceLabel": "Target",
    "listItemProps.balanceFirstValue": 2500,
    progressIndicatorPercentage: 75,
    addonBackgroundColor: "#C7DCDB",
    addonIcon: <Education fill={lightTheme.secondarycolor10} />,
    progressIndicatorColor: lightTheme.secondarycolor10,
    completed: true,
    savedAmount: "2000.00",
    savedAmountLabel: "Total Saved Amount",
    spentAmount: "2000.00",
    spentAmountLabel: "Spent",
    remainingAmount: "500.00",
    remainingAmountLabel: "Remaining",
    errorMessage: "Neque porro quisquam est qui dolorem ipsum quia consectetur",
    loading: false,
  },
  argTypes: {
    completed: { action: "Completed", control: "boolean" },
  },
};

export const CategoryCardVertical = {
  name: "Content Card Vertical",
  render: CategoryCardWidget,
  args: {
    small: true,
    progressIndicatorPercentage: 75,
    addonIcon: <Home fill={lightTheme.secondarycolor10} />,
    progressIndicatorColor: lightTheme.secondarycolor10,
    amount: "2000.00",
    amountLabel: "15 days left",
    progressLabel: "75% completed",
    headline: "Home",
    loading: false,
  },
  argTypes: {
    completed: { action: "Completed", control: "boolean" },
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "Tag",
    "MyActivityWeek",
    "MyActivityMonth",
    "BudgetCard",
    "CategoryList",
    "CategoryCardHorizontal",
    "CategoryCardHorizontalError",
    "CategoryCardVertical",
]);
