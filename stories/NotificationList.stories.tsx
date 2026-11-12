import * as allStories from "./NotificationList.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import { listStoryDecorators } from "../.storybook/listStoryFrame";
import { NotificationList } from "../src/components/notificationList/NotificationList";

export default {
  title: "Components/NotificationList",
  component: NotificationList,
  decorators: listStoryDecorators,
  args: {
    loading: false
  }
};

export const Unread = {
  args: {
    read: false,
    showStatus: true,
    title: "Hello Customer name",
    body: "Please update your KYC information via SAB Online or SAB Mobile to avoid suspension of your account.",
    timeLabel: "Yesterday"
  },
  argTypes: {
    showStatus: { action: "Show status", control: "boolean" }
  }
};

export const Read = {
  args: {
    read: true,
    title: "Hello Customer name",
    body: "Please update your KYC information via SAB Online or SAB Mobile to avoid suspension of your account.",
    timeLabel: "24/05/2025"
  },
};



export const AllVariants = createAllVariantsStory(allStories, [
    "Unread",
    "Read",
]);
