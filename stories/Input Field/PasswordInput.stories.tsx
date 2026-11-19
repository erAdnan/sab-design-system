import * as allStories from "./PasswordInput.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { PasswordInput } from "../../src/components/input/PasswordInput";
import { mobileContentDecorators } from "../../.storybook/mobileContentFrame";

export default {
  decorators: mobileContentDecorators,
  title: "Components/Data Entry/Input Field/Password",
  component: PasswordInput,
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

export const PasswordInputDefault = {
  args: {
    placeholder: "Type password...",
  },
};

export const PasswordInputErrorText = {
  args: {
    placeholder: "Type password...",
    error: true,
    helperText: "Must contain at least one numeric character",
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "PasswordInputDefault",
    "PasswordInputErrorText",
]);
