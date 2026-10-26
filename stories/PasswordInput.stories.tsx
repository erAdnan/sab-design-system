import { PasswordInput } from "../src/components/input/PasswordInput";

export default {
  title: "Components/PasswordInput",
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
