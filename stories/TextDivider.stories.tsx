import * as allStories from "./TextDivider.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import { TextDivider } from "../src/components/text/TextDivider";
import en from "../src/localization/locales/en";
import { useStoryCopy } from "./helpers/useStoryCopy";
import { mobileContentDecorators } from "../.storybook/mobileContentFrame";

const SAMPLE_HEADLINE = en.stories.pageTitle;
const SAMPLE_BODY = en.stories.loremIpsum;

export default {
  decorators: mobileContentDecorators,
  title: "Components/TextDivider",
  component: TextDivider,
  args: {
    headline: SAMPLE_HEADLINE,
    text: SAMPLE_BODY,
    subTitle: true,
  },
};

const TextDivderInteractive = (args: any) => {
  const copy = useStoryCopy();
  return (
    <TextDivider
      {...args}
      headline={copy.resolvePageTitle(args.headline)}
      text={copy.resolveLoremIpsum(args.text)}
      linkButtonLink={
        args.linkButtonLink
          ? copy.resolveLinkText(args.linkButtonLink)
          : args.linkButtonLink
      }
      tooltipProps={
        args.tooltipProps
          ? {
              ...args.tooltipProps,
              text: copy.resolveTooltipText(args.tooltipProps.text),
            }
          : args.tooltipProps
      }
    />
  );
};

export const PageTitle = {
  render: TextDivderInteractive,
  args: {
    type: "Page Title",
    headline: SAMPLE_HEADLINE,
    text: SAMPLE_BODY,
  },
};

export const Promotional = {
  render: TextDivderInteractive,
  args: {
    type: "Promotional",
    headline: SAMPLE_HEADLINE,
    text: SAMPLE_BODY,
  },
};

export const Bottomsheet = {
  render: TextDivderInteractive,
  args: {
    type: "BottomSheet",
    headline: SAMPLE_HEADLINE,
    text: SAMPLE_BODY,
  },
};

export const InPageDefault = {
  render: TextDivderInteractive,
  args: {
    type: "In Page",
    headline: SAMPLE_HEADLINE,
    text: SAMPLE_BODY,
    link: true,
    linkButtonLink: en.stories.linkText,
  },
};

export const InPageBadge = {
  render: TextDivderInteractive,
  args: {
    type: "In Page",
    headline: SAMPLE_HEADLINE,
    text: SAMPLE_BODY,
    badge: true,
    badgeProps: {
      number: 5,
    },
  },
};

export const InPageTooltip = {
  render: TextDivderInteractive,
  args: {
    type: "In Page",
    headline: SAMPLE_HEADLINE,
    text: SAMPLE_BODY,
    tooltip: true,
    tooltipProps: {
      text: en.stories.tooltipText,
    },
  },
};

export const InPageOverideStyle = {
  render: TextDivderInteractive,
  args: {
    type: "In Page",
    headline: SAMPLE_HEADLINE,
    text: SAMPLE_BODY,
    linkButtonLink: en.stories.linkText,
    mainWrapper: { alignItems: "center", justifyContent: "center" },
    descriptionStyle: { alignSelf: "center", textAlign: "center" },
    headlineStyle: { alignSelf: "center", textAlign: "center", flex: 1 },
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "PageTitle",
    "Promotional",
    "Bottomsheet",
    "InPageDefault",
    "InPageBadge",
    "InPageTooltip",
    "InPageOverideStyle",
]);
