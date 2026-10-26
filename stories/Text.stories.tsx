import { Text } from "../src/components/text/Text";
import { Size } from "../src/types/Size";
import { TextColor } from "../src/types/TextColor";
import Edit from "../src/components/icons/functionals/Edit";
import i18n from "i18next";
import { fontMedium } from "../src/assets/styles/constants/size";

export default {
  title: "Components/Text",
  component: Text,
  argTypes: {
    children: { action: "Text", control: "text" },
    variant: {
      action: "Text variant",
      control: "text",
    },
    size: {
      action: "Text size",
      control: "number",
    },
  },
  args: {
    size: fontMedium,
    variant: "primarytextcolor",
    loading: false,
    textWidth: 80,
  },
};

export const SimpleText = {
  args: {
    children: i18n.t("simpleText"),
  },
};

export const SimpleTextWithDivider = {
  args: {
    children: i18n.t("simpleText"),
    showDivider: true,
    overrideStyles: { paddingBottom: 8 },
  },
};

export const TextWithIconLeft = {
  args: {
    children: i18n.t("simpleText"),
    iconLeft: <Edit />,
  },
};

export const TextWithIconRigth = {
  args: {
    children: i18n.t("simpleText"),
    iconRight: <Edit />,
  },
};

export const TextCopyable = {
  args: {
    children: i18n.t("simpleText"),
    copyable: true,
  },
};

export const TextEditable = {
  args: {
    children: i18n.t("simpleText"),
    editable: true,
  },
};

export const TextWithBulletPoint = {
  args: {
    children: i18n.t("simpleText"),
    showBulletPoint: true,
  },
  argTypes: {
    "bulletPointProps.type": {
      action: "Bullet point type",
      control: "radio",
      options: ["success", "disc"],
    },
    "bulletPointProps.variant": {
      action: "Bullet point variant",
      control: "radio",
      options: ["primary", "secondary"],
    },
  },
};
