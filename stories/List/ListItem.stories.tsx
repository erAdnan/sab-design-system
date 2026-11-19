import * as allStories from "./ListItem.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { listStoryDecorators } from "../../.storybook/listStoryFrame";
import {
  ListItem,
  ListItemActionType,
  ListItemBadgeType,
} from "../../src/components/list/ListItem";
import InfoFrame from "../../src/components/icons/status/InfoFrame";
import Tick from "../../src/components/icons/functionals/Tick";
import { BadgeSize } from "../../src/components/badge/Badge";
import { useTheme } from "../../src/context/theme/themeContext";
import { PieGraph } from "../../src/components/pieGraph/PieGraph";
import { Avatar } from "../../src/components/avatar/Avatar";
import { fontMediumLarge } from "../../src/assets/styles/constants/size";

export default {
  title: "Components/List/ListItem",
  component: ListItem,
  decorators: listStoryDecorators,
  argTypes: {
    badgeType: {
      action: "Text",
      control: "radio",
      options: Object.keys(ListItemBadgeType),
    },
    badgeSize: {
      action: "Text",
      control: "radio",
      options: ["xs", "small", "large"],
    },
    badgeText: "1",
    showDivider: { action: "Show divider", control: "boolean" },
    showBackground: { action: "Show background", control: "boolean" },
  },
  args: {
    badgeSize: BadgeSize.large,
    showDivider: false,
    showBackground: "false" as unknown as boolean,
    loading: false,
  },
};

const InfoIcon = (args: any) => {
  const { theme } = useTheme();

  return <InfoFrame color={theme.primarycolor3} />;
};

export const Simple = {
  args: {
    label: { children: "Label" },
    addOn: <InfoIcon />,
    addOnLoaderSize: "small",
  },
};

export const Checkbox = {
  args: {
    label: { children: "Label" },
    addOn: <InfoIcon />,
    addOnLoaderSize: "small",
    actionType: ListItemActionType.checkbox,
  },
};

export const RadioButton = {
  args: {
    label: { children: "Label" },
    addOn: <InfoIcon />,
    addOnLoaderSize: "small",
    actionType: ListItemActionType.radio,
  },
};

export const Chevron = {
  args: {
    label: { children: "Label" },
    addOn: <InfoIcon />,
    addOnLoaderSize: "small",
    actionType: ListItemActionType.chevron,
  },
};

export const Checkmark = {
  args: {
    label: { children: "Label" },
    addOn: <InfoIcon />,
    addOnLoaderSize: "small",
    actionType: ListItemActionType.checkmark,
  },
};

export const Edit = {
  args: {
    label: { children: "Label" },
    addOn: <InfoIcon />,
    addOnLoaderSize: "small",
    actionType: ListItemActionType.edit,
  },
};

export const Delete = {
  args: {
    label: { children: "Label" },
    addOn: <InfoIcon />,
    addOnLoaderSize: "small",
    actionType: ListItemActionType.delete,
  },
};

export const LabelWithValueCopy = {
  args: {
    label: { children: "Label" },
    valueText: { children: "Value" },
    actionType: ListItemActionType.copy,
  },
};

export const TitleWithBodyAndToggle = {
  args: {
    title: { children: "Dark theme" },
    bodyText: { children: "Body text" },
    addOn: <InfoIcon />,
    addOnLoaderSize: "small",
    actionType: ListItemActionType.toggle,
  },
};

export const TextWithChevron = {
  args: {
    label: { children: "Label" },
    addOn: <Tick />,
    addOnLoaderSize: "medium",
    actionType: ListItemActionType.chevron,
    badgeType: ListItemBadgeType.text,
    badgeText: "Content",
  },
};

export const TextWithTextAndCopy = {
  args: {
    label: { children: "Label" },
    actionType: ListItemActionType.copy,
    badgeType: ListItemBadgeType.text,
    badgeText: "Content",
  },
};

export const ValueTextWithLabel = {
  args: {
    label: { children: "Label" },
    badgeType: ListItemBadgeType.text,
    badgeText: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
    badgeTextProps: {bold: true, size: fontMediumLarge, variant: "primarytextcolor", overrideStyles: {textAlign: 'right'}}
  },
};

export const BadgeWithChevron = {
  args: {
    label: { children: "Label" },
    addOn: <Tick />,
    addOnLoaderSize: "medium",
    actionType: ListItemActionType.chevron,
    badgeType: ListItemBadgeType.badgeWarning,
    badgeSize: BadgeSize.large,
    badgeText: "1",
  },
};

export const ChipsWithChevron = {
  args: {
    label: { children: "Label" },
    addOn: <Tick />,
    addOnLoaderSize: "medium",
    actionType: ListItemActionType.chevron,
    badgeType: ListItemBadgeType.chipsInfo,
    chipsInfoProps: { label: "Inactive", type: "default", state: "error" },
  },
};

export const Balance = {
  args: {
    title: { children: "Headline" },
    bodyText: { children: "Body text" },
    badgeType: ListItemBadgeType.balance,
    balanceFirstValue: 12500,
    balanceSecondValue: 5000,
  },
};

export const BalanceWithStatus = {
  args: {
    title: { children: "Headline", subtitle: "Subtitle text" },
    bodyText: { children: "Body text" },
    badgeType: ListItemBadgeType.balanceWithStatus,
    balanceFirstValue: 12500,
    balanceSecondValue: 5000,
    balanceStatusState: "error",
    balanceStatusLabel: "Inactive",
  },
};

export const InlineWithBackground = {
  args: {
    label: { children: "Label" },
    addOn: <InfoIcon />,
    addOnLoaderSize: "small",
    actionType: ListItemActionType.chevron,
    showBackground: "true" as unknown as boolean,
  },
};

export const StackedBody = {
  args: {
    title: { children: "Headline", subtitle: "Subtitle text" },
    addOn: <InfoIcon />,
    addOnLoaderSize: "small",
  },
};

export const StackedBodyWithBackround = {
  args: {
    title: { children: "Headline", subtitle: "Subtitle text" },
    addOn: <InfoIcon />,
    addOnLoaderSize: "small",
    showBackground: "true" as unknown as boolean,
  },
};

export const StackedWithBodyText = {
  args: {
    title: { children: "Headline", subtitle: "Subtitle text" },
    bodyText: { children: "Body text" },
  },
};

export const StackedWithPieGraph = {
  args: {
    title: { children: "Headline", subtitle: "Subtitle text" },
    bodyText: { children: "Body text" },
    addOn: <PieGraph percentage={45} />,
    addOnLoaderSize: "large",
  },
};

const InteractiveTemplate = (args: any) => {
  return <ListItem {...args} showBackground={false} />;
};
export const StackedWithAvatar = {
  render: InteractiveTemplate,
  args: {
    title: { children: "Headline" },
    contentText: "Body text",
    addOn: <Avatar initials="JM" size="medium" />,
    addOnLoaderSize: "large",
  },
};

export const StackedWithTickCheckmark = {
  render: InteractiveTemplate,
  args: {
    title: { children: "Headline" },
    subTitle: {children:"Body text"},
    showBackground: "false" as unknown as boolean,
    actionType: ListItemActionType.checkmark,
    actionBadgeStyle:  {alignItems:"flex-start"},
  },
};

export const TitleWithBodyAndSpinner = {
  args: {
    title: { children: "Dark theme" },
    bodyText: { children: "Body text" },
    addOn: <InfoIcon />,
    addOnLoaderSize: "small",
    actionType: ListItemActionType.loading,
  },
};

export const NumberWithTextBadge = {
  args: {
    label: { children: "Label" },
    badgeType: ListItemBadgeType.numberWithText,
    badgeText: "kg",
    badgeNumber: "650"
  },
  argTypes: {
    badgeTextLeft: {
      action: 'Badge Text Left',
      control: 'text'
    }
  }
};

export const TitleWithInfoTooltip = {
  args: {
    title: { children: "Headline" },
    bodyText: { children: "Body copy" },
    addOn: <Avatar initials="JM" size="medium" />,
    addOnLoaderSize: "large",
    titleTooltipProps: {
      text: "More information about this item",
    },
    badgeType: ListItemBadgeType.chipsInfo,
    chipsInfoProps: { label: "Inactive", type: "default", state: "error" },
    actionType: ListItemActionType.radio,
  },
  argTypes: {
    "titleTooltipProps.text": { control: "text" },
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "Simple",
    "Checkbox",
    "RadioButton",
    "Chevron",
    "Checkmark",
    "Edit",
    "Delete",
    "LabelWithValueCopy",
    "TitleWithBodyAndToggle",
    "TextWithChevron",
    "TextWithTextAndCopy",
    "ValueTextWithLabel",
    "BadgeWithChevron",
    "ChipsWithChevron",
    "Balance",
    "BalanceWithStatus",
    "InlineWithBackground",
    "StackedBody",
    "StackedBodyWithBackround",
    "StackedWithBodyText",
    "StackedWithPieGraph",
    "StackedWithAvatar",
    "StackedWithTickCheckmark",
    "TitleWithBodyAndSpinner",
    "NumberWithTextBadge",
    "TitleWithInfoTooltip",
]);
