import { Title } from "../src/components/text/Title";
import { TextColor } from "../src/types/TextColor";
import Home from "../src/components/icons/functionals/Home";
import Edit from "../src/components/icons/functionals/Edit";
import i18n from "i18next";
import {
  fontMedium,
  fontMediumLarge,
} from "../src/assets/styles/constants/size";
import { Text } from "../src/components/text/Text";

export default {
  title: "Components/Title",
  component: Title,
  argTypes: {
    // title
    children: { action: "Title text", type: "string", control: "text" },
    variant: {
      action: "Title variant",
      control: "radio",
      options: Object.keys(TextColor),
    },
    size: {
      action: "Title size",
      control: "number",
    },
    subtitle: { action: "Subtitle text", control: "text" },
    subtitleSize: {
      action: "Subtitle size",
      control: "number",
    },
    subtitleVariant: {
      action: "Subtitle variant",
      control: "text",
    },
  },
  args: {
    subtitle: "",
    size: fontMediumLarge,
    subtitleSize: fontMedium,
    variant: "primarytextcolor",
    subtitleVariant: "primarytextcolor",
  },
};

export const SimpleTitle = {
  args: {
    children: i18n.t("titleText"),
  },
};

export const TitleWithSubtitle = {
  args: {
    children: i18n.t("titleText"),
    subtitle: i18n.t("subtitleText"),
  },
};

export const TitleWithIconLeft = {
  args: {
    children: i18n.t("titleText"),
    iconLeft: <Home />,
  },
};

export const TitleWithIconRigth = {
  args: {
    children: i18n.t("titleText"),
    iconRight: <Edit />,
  },
};

export const TitleWithAction = {
  args: {
    children: i18n.t("titleText"),
    action: <Text>{i18n.t("viewAll")}</Text>,
  },
};

export const TitleWithActionAndSubtitle = {
  args: {
    children: i18n.t("titleText"),
    action: <Text>{i18n.t("viewAll")}</Text>,
    subtitle: i18n.t("subtitleText"),
  },
};

export const TitleWithActionAndSubtitleWithDivider = {
  args: {
    children: i18n.t("titleText"),
    action: <Text>{i18n.t("viewAll")}</Text>,
    subtitle: i18n.t("subtitleText"),
    showDivider: true,
  },
};
