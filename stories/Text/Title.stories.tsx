import * as allStories from "./Title.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { Title } from "../../src/components/text/Title";
import { TextColor } from "../../src/types/TextColor";
import Home from "../../src/components/icons/functionals/Home";
import Edit from "../../src/components/icons/functionals/Edit";
import {
  fontMedium,
  fontMediumLarge,
} from "../../src/assets/styles/constants/size";
import { Text } from "../../src/components/text/Text";
import en from "../../src/localization/locales/en";
import { useStoryCopy } from "../helpers/useStoryCopy";

const SAMPLE_TITLE = en.stories.titleText;
const SAMPLE_SUBTITLE = en.stories.subtitleText;

export default {
  title: "Components/Text/Title",
  component: Title,
  argTypes: {
    children: { control: "text" },
    variant: {
      control: "radio",
      options: Object.keys(TextColor),
    },
    size: {
      control: "number",
    },
    subtitle: { control: "text" },
    subtitleSize: {
      control: "number",
    },
    subtitleVariant: {
      control: "text",
    },
  },
  args: {
    children: SAMPLE_TITLE,
    subtitle: "",
    size: fontMediumLarge,
    subtitleSize: fontMedium,
    variant: "primarytextcolor",
    subtitleVariant: "primarytextcolor",
  },
};

const TranslatedTitle = (args: any) => {
  const copy = useStoryCopy();
  const { withViewAllAction, action, children, subtitle, ...rest } = args;
  return (
    <Title
      {...rest}
      children={copy.resolveTitleText(children)}
      subtitle={subtitle ? copy.resolveSubtitleText(subtitle) : subtitle}
      action={withViewAllAction ? <Text>{copy.viewAll}</Text> : action}
    />
  );
};

export const SimpleTitle = {
  render: TranslatedTitle,
  args: {
    children: SAMPLE_TITLE,
  },
};

export const TitleWithSubtitle = {
  render: TranslatedTitle,
  args: {
    children: SAMPLE_TITLE,
    subtitle: SAMPLE_SUBTITLE,
  },
};

export const TitleWithIconLeft = {
  render: TranslatedTitle,
  args: {
    children: SAMPLE_TITLE,
    iconLeft: <Home />,
  },
};

export const TitleWithIconRigth = {
  render: TranslatedTitle,
  args: {
    children: SAMPLE_TITLE,
    iconRight: <Edit />,
  },
};

export const TitleWithAction = {
  render: TranslatedTitle,
  args: {
    children: SAMPLE_TITLE,
    withViewAllAction: true,
  },
};

export const TitleWithActionAndSubtitle = {
  render: TranslatedTitle,
  args: {
    children: SAMPLE_TITLE,
    withViewAllAction: true,
    subtitle: SAMPLE_SUBTITLE,
  },
};

export const TitleWithActionAndSubtitleWithDivider = {
  render: TranslatedTitle,
  args: {
    children: SAMPLE_TITLE,
    withViewAllAction: true,
    subtitle: SAMPLE_SUBTITLE,
    showDivider: true,
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "SimpleTitle",
    "TitleWithSubtitle",
    "TitleWithIconLeft",
    "TitleWithIconRigth",
    "TitleWithAction",
    "TitleWithActionAndSubtitle",
    "TitleWithActionAndSubtitleWithDivider",
]);
