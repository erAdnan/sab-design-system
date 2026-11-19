import * as allStories from "./Notifications.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import { mobileContentDecorators } from "../.storybook/mobileContentFrame";
import { NotificationList } from "../src/components/notificationList/NotificationList";

const KYC_BODY =
  "Please update your KYC information via SAB Online or SAB Mobile to avoid suspension of your account.";

export default {
  title: "Components/Notifications",
  component: NotificationList,
  decorators: mobileContentDecorators,
  tags: ["!autodocs"],
  args: {
    loading: false,
    title: "Title comes here",
    body: KYC_BODY,
    showStatus: true,
  },
  argTypes: {
    showStatus: { control: "boolean" },
    read: { control: "boolean" },
    loading: { control: "boolean" },
  },
};

/** Figma Notification.list — Language=English, State=Unread */
export const Unread = {
  args: {
    read: false,
    showStatus: true,
    title: "Title comes here",
    body: KYC_BODY,
    timeLabel: "Yesterday",
  },
};

/** Figma Notification.list — Language=English, State=Read */
export const Read = {
  args: {
    read: true,
    showStatus: false,
    title: "Title comes here",
    body: KYC_BODY,
    timeLabel: "24/06/24",
  },
};

/** Figma Notification.list — Language=Arabic, State=Unread */
export const UnreadArabic = {
  name: "Unread Arabic",
  globals: { locale: "ar" },
  args: {
    read: false,
    showStatus: true,
    title: "Title comes here",
    body: KYC_BODY,
    timeLabel: "Yesterday",
  },
};

/** Figma Notification.list — Language=Arabic, State=Read */
export const ReadArabic = {
  name: "Read Arabic",
  globals: { locale: "ar" },
  args: {
    read: true,
    showStatus: false,
    title: "Title comes here",
    body: KYC_BODY,
    timeLabel: "24/06/24",
  },
};

export const Loading = {
  args: {
    read: false,
    showStatus: true,
    title: "Title comes here",
    body: KYC_BODY,
    timeLabel: "Yesterday",
    loading: true,
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
  "Unread",
  "UnreadArabic",
  "Read",
  "ReadArabic",
  "Loading",
]);
