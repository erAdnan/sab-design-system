import * as allStories from "./Tracker.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import { Tracker } from "../src/components/tracker/Tracker";
import { RagIconType } from "../src/components/rag/Rag";
import { View } from "react-native";
import { mobileContentDecorators } from "../.storybook/mobileContentFrame";

export default {
  decorators: mobileContentDecorators,
  title: "Components/Tracker",
  component: Tracker,
  tags: ["!autodocs"],
  argTypes: {
    textHeadline: { action: "Tracker left title", control: "text" },
    text2: { action: "Tracker left subtitle", control: "text" },
    type: {
      action: "RAG type",
      control: "radio",
      options: Object.keys(RagIconType),
    },
    rightText2: { action: "Tracker right subtitle", control: "text" },
    loading: { action: "Tracker loading", control: "boolean" },
    number: { action: "Tracker number", control: "number" },
    balance: { action: "Tracker balance", control: "boolean" },
    "icon.type": { action: "Icon type", control: "text" },
    "icon.name": { action: "Icon name", control: "text" },
  },
  args: {
    balance: true,
    "icon.type": "banking",
    "icon.name": "mobile",
    loading: false,
  },
};

const TemplateWithIcons = (args: any) => {
  return (
    <View style={{ display: "flex", flexDirection: "column" }}>
      <Tracker
        {...args}
        type={RagIconType.icon}
        icon={{ type: "banking", name: "card" }}
      />
      <Tracker
        {...args}
        type={RagIconType.icon}
        icon={{ type: "banking", name: "mobile" }}
      />
      <Tracker
        {...args}
        type={RagIconType.icon}
        icon={{ type: "banking", name: "mobile_tick" }}
      />
    </View>
  );
};

export const Success = {
  args: {
    textHeadline: "Headline",
    text2: "Body Copy",
    type: RagIconType.success,
    rightTextHeadline: "63.50",
    rightText2: "Content",
  },
};

export const SuccessNoBalance = {
  args: {
    textHeadline: "Headline",
    text2: "Body Copy",
    type: RagIconType.success,
    rightTextHeadline: "63.50",
    rightText2: "Content",
    balance: false,
  },
};

export const Error = {
  args: {
    textHeadline: "Headline",
    text2: "Body Copy",
    type: RagIconType.error,
    rightTextHeadline: "63.50",
    rightText2: "Content",
  },
};

export const Warning = {
  args: {
    textHeadline: "Headline",
    text2: "Body Copy",
    type: RagIconType.warning,
    rightTextHeadline: "63.50",
    rightText2: "Content",
  },
};

export const Info = {
  args: {
    textHeadline: "Headline",
    text2: "Body Copy",
    type: RagIconType.info,
    rightTextHeadline: "63.50",
    rightText2: "Content",
  },
};

export const Icon = {
  args: {
    textHeadline: "Headline",
    text2: "Body Copy",
    type: RagIconType.icon,
    rightTextHeadline: "63.50",
    rightText2: "Content",
  },
};

export const Number = {
  args: {
    textHeadline: "Headline",
    text2: "Body Copy",
    type: RagIconType.number,
    rightTextHeadline: "63.50",
    rightText2: "Content",
    number: 5,
  },
};

export const Empty = {
  args: {
    textHeadline: "Headline",
    text2: "Body Copy",
    type: RagIconType.empty,
    rightTextHeadline: "63.50",
    rightText2: "Content",
    loading: false,
  },
};

export const Spinner = {
  args: {
    textHeadline: "Headline",
    text2: "Body Copy",
    type: RagIconType.spinner,
    rightTextHeadline: "63.50",
    rightText2: "Content",
    loading: true,
  },
};

export const Icons = {
  render: TemplateWithIcons,
  args: {
    textHeadline: "Headline",
    text2: "Body Copy",
    type: RagIconType.icon,
    rightTextHeadline: "63.50",
    rightText2: "Content",
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "Success",
    "SuccessNoBalance",
    "Error",
    "Warning",
    "Info",
    "Icon",
    "Number",
    "Empty",
    "Spinner",
    "Icons",
]);
