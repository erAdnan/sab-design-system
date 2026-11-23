import * as allStories from "./ButtonListItem.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { listStoryDecorators } from "../../.storybook/listStoryFrame";
import { ButtonListItem } from "../../src/components/button/ButtonListItem";
import Icon from "../../src/components/icon/Icon";
import Home from "../../src/components/icons/functionals/Home";

export default {
  title: "Components/Navigation/Buttons/ButtonListItem",
  component: ButtonListItem,
  decorators: listStoryDecorators,
  argTypes: {
    "headline.text": { action: "Headline", control: "text" },
    "headline.badge": { action: "Badge", control: "boolean" },
    "headline.tooltip": { action: "Tooltip", control: "boolean" },
    "headline.tooltipText": { action: "Tooltip", control: "text" },
    "headline.badgeNotificationType": {
      action: "Badge type",
      control: "radio",
      options: ["primary", "success", "warning", "neutral", "reverse"],
    },
    "headline.badgeNotificationSize": {
      action: "Badge size",
      control: "radio",
      options: ["xs", "small", "large"],
    },
    "headline.badgeNotificationNumber": {
      action: "Badge number",
      control: "number",
    },
    content: { action: "Content", control: "text" },
    extraContent: { action: "Extra content", control: "text" },
    actionStatus: {
      action: "Action status",
      control: "radio",
      options: ["error", "success", "warning", "info"],
    },
    actionType: {
      action: "Action type",
      control: "radio",
      options: ["chevron", "status","icon"],
    },
  },
  args: {
    "headline.badge": false,
    "headline.tooltip": false,
    "headline.tooltipText": "Tooltip text",
    "headline.badgeNotificationType": "primary",
    "headline.badgeNotificationSize": "small",
    "headline.badgeNotificationNumber": 1,
    content: "",
    extraContent: "",
    actionType: "chevron",
    actionStatus: "success",
    loading: false,
    actionIcon:  <Icon type="functionals" name="call" /> ,
  },
};

export const Default = {
  args: {
    "headline.text": "Headline",
    content: "Item content",
  },
};

export const NoContent = {
  args: {
    "headline.text": "Headline",
    content: "",
  },
};

export const WithIcon = {
  args: {
    "headline.text": "Headline",
    content: "Item content",
    showIcon: true,
    icon: <Home />,
  },
};

export const WithStatus = {
  args: {
    "headline.text": "Headline",
    content: "Item content",
    showIcon: true,
    icon: <Home />,
    actionType: "status",
  },
};

export const WithExtraContent = {
  args: {
    "headline.text": "Headline",
    content: "Lorem Ipsum",
    extraContent: "Lorem Ipsum",
  },
};


export const AllVariants = createAllVariantsStory(allStories, [
    "Default",
    "NoContent",
    "WithIcon",
    "WithStatus",
    "WithExtraContent",
]);
