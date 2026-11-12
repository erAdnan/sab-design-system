import { MessageInput } from "../src/components/input/MessageInput";
import { mobileContentDecorators } from "../.storybook/mobileContentFrame";

export default {
  decorators: mobileContentDecorators,
  title: "Components/MessageInput",
  component: MessageInput,
};

export const MessageInputDefault = {
  args: {
    placeholder: "Type message...",
    loading: false,
  },
};
