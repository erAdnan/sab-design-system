import i18n from "i18next";
import { TextTitle } from "../src/components/text/TextTitle";

export default {
  title: "Components/Text Title",
  component: TextTitle,
  argTypes: {
    text: { action: "Text text", type: "string", control: "text" },
    badge: { action: "Text badge", control: "boolean" },
    tooltip: { action: "Text tooltip", control: "boolean" },
    badgeNotificationType: {
      action: "Text badge notification type",
      control: "radio",
      options: ["primary", "success", "warning", "neutral", "reverse"],
    },
    badgeNotificationSize: {
      action: "Text badge notification size",
      control: "radio",
      options: ["small", "xs", "large"],
    },
    badgeNotificationNumber: {
      action: "Text badge notification number",
      type: "number",
      control: "number",
    },
  },
  args: {
    badge: false,
    tooltip: false,
    badgeNotificationType: "primary",
    badgeNotificationSize: "large",
    badgeNotificationNumber: 1,
    loading: false,
    textWidth: 80,
  },
};

export const Text = {
  args: {
    text: i18n.t("titleText"),
    badge: false,
    badgeNotificationNumber: 1,
    badgeNotificationType: "primary",
  },
};

export const TextWithBadge = {
  args: {
    text: i18n.t("titleText"),
    badge: true,
    tooltip: false,
    badgeNotificationNumber: 1,
    badgeNotificationType: "primary",
  },
};

export const TextWithTooltip = {
  args: {
    text: i18n.t("titleText"),
    badge: false,
    tooltip: true,
    tooltipText: i18n.t("titleText"),
    badgeNotificationNumber: 1,
    badgeNotificationType: "primary",
  },
};
