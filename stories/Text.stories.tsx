import { Text } from "../src/components/text/Text";
import Edit from "../src/components/icons/functionals/Edit";
import { fontMedium } from "../src/assets/styles/constants/size";
import en from "../src/localization/locales/en";
import { useStoryCopy } from "./helpers/useStoryCopy";

const SAMPLE_TEXT = en.stories.simpleText;

export default {
  title: "Components/Text",
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
    size: fontMedium,
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
