import * as allStories from "./AccountInput.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { AccountInput } from "../../src/components/input/AccountInput";
import { mobileContentDecorators } from "../../.storybook/mobileContentFrame";

export default {
  decorators: mobileContentDecorators,
  title: "Components/Data Entry/Input Field/AccountInput",
  component: AccountInput,
  argTypes: {
    error: { action: "Input error", control: "boolean" },
    disabled: { action: "Input disabled", control: "boolean" },
  },
  args: {
    error: false,
    disabled: false,
    loading: false,
  },
};

export const AccountInputWithSA = {
  args: {
    showSA: true,
    label: "Label",
    placeholder: "Enter name",
  },
};

export const AccountInputWithSAAndQR = {
  args: {
    showSA: true,
    showQR: true,
    label: "Label",
    placeholder: "Enter name",
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "AccountInputWithSA",
    "AccountInputWithSAAndQR",
]);
