import i18n from "i18next";
import { TextText } from "../src/components/text/TextText";

export default {
  title: "Components/Text Text",
  component: TextText,
  argTypes: {
    hierarchy: {
      action: "Text hierarchy",
      control: "radio",
      options: ["primary", "secondary"],
    },
    bullet: {
      action: "Text bullet",
      control: "radio",
      options: ["true", "false", "true.success"],
    },
    editable: { action: "Text editable", control: "boolean" },
    copyable: { action: "Text copyable", control: "boolean" },
    text: { action: "Text text", type: "string", control: "text" },
  },
  args: {
    hierarchy: "primary",
    bullet: "false",
    editable: false,
    copyable: false,
    loading: false,
    textWidth: 80,
  },
};

export const Text = {
  args: {
    text: i18n.t("simpleText"),
  },
};
