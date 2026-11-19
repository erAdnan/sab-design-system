import { MessageInput } from "../../src/components/input/MessageInput";
import { mobileContentDecorators } from "../../.storybook/mobileContentFrame";

export default {
  decorators: mobileContentDecorators,
  title: "Components/Data Entry/Input Field/Message",
  component: MessageInput,
};

export const MessageInputDefault = {
  args: {
    placeholder: "Type message...",
    loading: false,
  },
};
