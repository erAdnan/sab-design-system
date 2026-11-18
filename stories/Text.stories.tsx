import * as allStories from "./Text.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import { Text } from "../src/components/text/Text";
import Edit from "../src/components/icons/functionals/Edit";
import { fontMediumLarge } from "../src/assets/styles/constants/size";
import en from "../src/localization/locales/en";
import { useStoryCopy } from "./helpers/useStoryCopy";

const SAMPLE_TEXT = en.stories.simpleText;

export default {
  title: "Components/Text/Text",
  component: Text,
  argTypes: {
    children: { control: "text" },
    variant: {
      control: "text",
    },
    size: {
      control: "number",
    },
  },
  args: {
    children: SAMPLE_TEXT,
    // Figma text.text: Body 15/20
    size: fontMediumLarge,
    variant: "primarytextcolor",
    loading: false,
    textWidth: 80,
  },
};

const TranslatedText = (args: any) => {
  const copy = useStoryCopy();
  return <Text {...args} children={copy.resolveSimpleText(args.children)} />;
};

export const SimpleText = {
  render: TranslatedText,
  args: {
    children: SAMPLE_TEXT,
  },
};

export const SimpleTextWithDivider = {
  render: TranslatedText,
  args: {
    children: SAMPLE_TEXT,
    showDivider: true,
    overrideStyles: { paddingBottom: 8 },
  },
};

export const TextWithIconLeft = {
  render: TranslatedText,
  args: {
    children: SAMPLE_TEXT,
    iconLeft: <Edit />,
  },
};

export const TextWithIconRigth = {
  render: TranslatedText,
  args: {
    children: SAMPLE_TEXT,
    iconRight: <Edit />,
  },
};

export const TextCopyable = {
  render: TranslatedText,
  args: {
    children: SAMPLE_TEXT,
    copyable: true,
  },
};

export const TextEditable = {
  render: TranslatedText,
  args: {
    children: SAMPLE_TEXT,
    editable: true,
  },
};

export const TextWithBulletPoint = {
  render: TranslatedText,
  args: {
    children: SAMPLE_TEXT,
    showBulletPoint: true,
    bulletPointProps: { type: "disc", variant: "primary" },
  },
  argTypes: {
    "bulletPointProps.type": {
      control: "radio",
      options: ["success", "disc"],
    },
    "bulletPointProps.variant": {
      control: "radio",
      options: ["primary", "secondary"],
    },
  },
};

// ---- Figma parity (Text page 8:3574, text.text): Hierarchy x Bullet x Editable x Copyable ----
export const TextSecondary = {
  render: TranslatedText,
  args: {
    children: SAMPLE_TEXT,
    variant: "primarytextcolor2",
  },
};

export const TextSecondaryEditable = {
  render: TranslatedText,
  args: {
    children: SAMPLE_TEXT,
    variant: "primarytextcolor2",
    editable: true,
  },
};

export const TextSecondaryCopyable = {
  render: TranslatedText,
  args: {
    children: SAMPLE_TEXT,
    variant: "primarytextcolor2",
    copyable: true,
  },
};

export const TextSecondaryWithBulletPoint = {
  render: TranslatedText,
  args: {
    children: SAMPLE_TEXT,
    variant: "primarytextcolor2",
    showBulletPoint: true,
    bulletPointProps: { type: "disc", variant: "secondary" },
  },
};

export const TextSecondaryWithSuccessBulletPoint = {
  render: TranslatedText,
  args: {
    children: SAMPLE_TEXT,
    variant: "primarytextcolor2",
    showBulletPoint: true,
    bulletPointProps: { type: "success", variant: "secondary" },
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "SimpleText",
    "SimpleTextWithDivider",
    "TextWithIconLeft",
    "TextWithIconRigth",
    "TextCopyable",
    "TextEditable",
    "TextWithBulletPoint",
    "TextSecondary",
    "TextSecondaryEditable",
    "TextSecondaryCopyable",
    "TextSecondaryWithBulletPoint",
    "TextSecondaryWithSuccessBulletPoint",
]);
