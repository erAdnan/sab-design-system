import * as allStories from "./TextTitle.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import { TextTitle } from "../src/components/text/TextTitle";
import en from "../src/localization/locales/en";
import { useStoryCopy } from "./helpers/useStoryCopy";

const SAMPLE_TITLE = en.stories.titleText;

export default {
  title: "Components/Text Title",
  component: TextTitle,
  argTypes: {
    text: { control: "text" },
    badge: { control: "boolean" },
    tooltip: { control: "boolean" },
    badgeNotificationType: {
      control: "radio",
      options: ["primary", "success", "warning", "neutral", "reverse"],
    },
    badgeNotificationSize: {
      control: "radio",
      options: ["small", "xs", "large"],
    },
    badgeNotificationNumber: {
      control: "number",
    },
  },
  args: {
    text: SAMPLE_TITLE,
    badge: false,
    tooltip: false,
    badgeNotificationType: "primary",
    badgeNotificationSize: "large",
    badgeNotificationNumber: 1,
    loading: false,
    textWidth: 80,
  },
};

const TranslatedTextTitle = (args: any) => {
  const copy = useStoryCopy();
  return (
    <TextTitle
      {...args}
      text={copy.resolveTitleText(args.text)}
      tooltipText={
        args.tooltip
          ? copy.resolveTooltipText(args.tooltipText)
          : args.tooltipText
      }
    />
  );
};

export const Text = {
  render: TranslatedTextTitle,
  args: {
    text: SAMPLE_TITLE,
    badge: false,
    badgeNotificationNumber: 1,
    badgeNotificationType: "primary",
  },
};

export const TextWithBadge = {
  render: TranslatedTextTitle,
  args: {
    text: SAMPLE_TITLE,
    badge: true,
    tooltip: false,
    badgeNotificationNumber: 1,
    badgeNotificationType: "primary",
  },
};

export const TextWithTooltip = {
  render: TranslatedTextTitle,
  args: {
    text: SAMPLE_TITLE,
    badge: false,
    tooltip: true,
    tooltipText: en.stories.tooltipText,
    badgeNotificationNumber: 1,
    badgeNotificationType: "primary",
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "Text",
    "TextWithBadge",
    "TextWithTooltip",
]);
