import { TextText } from "../src/components/text/TextText";
import en from "../src/localization/locales/en";
import { useStoryCopy } from "./helpers/useStoryCopy";

const SAMPLE_TEXT = en.stories.simpleText;

export default {
  title: "Components/Text Text",
  component: TextText,
  argTypes: {
    hierarchy: {
      control: "radio",
      options: ["primary", "secondary"],
    },
    bullet: {
      control: "radio",
      options: ["true", "false", "true.success"],
    },
    editable: { control: "boolean" },
    copyable: { control: "boolean" },
    text: { control: "text" },
  },
  args: {
    text: SAMPLE_TEXT,
    hierarchy: "primary",
    bullet: "false",
    editable: false,
    copyable: false,
    loading: false,
    textWidth: 80,
  },
};

const TranslatedTextText = (args: any) => {
  const copy = useStoryCopy();
  return <TextText {...args} text={copy.resolveSimpleText(args.text)} />;
};

export const Text = {
  render: TranslatedTextText,
  args: {
    text: SAMPLE_TEXT,
  },
};
