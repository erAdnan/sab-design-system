import * as allStories from "./PasswordStrength.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import { PasswordStrength } from "../src/components/passwordStrength/PasswordStrength";
import { mobileContentDecorators } from "../.storybook/mobileContentFrame";

export default {
  decorators: mobileContentDecorators,
  title: "Components/PasswordStrength",
  component: PasswordStrength,
  tags: ["!autodocs"],
  argTypes: {
    label: { control: "text" },
    strength: {
      control: "radio",
      options: ["strong", "weak", "normal"],
    },
    loading: { control: "boolean" },
  },
  args: {
    label: "Password strength",
    strength: "strong",
    loading: false,
  },
};

export const Strong = {
  args: {
    label: "Strong",
    strength: "strong",
    loading: false,
  },
};

export const Weak = {
  args: {
    label: "Weak",
    strength: "weak",
    loading: false,
  },
};

export const Normal = {
  args: {
    label: "Normal",
    strength: "normal",
    loading: false,
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
  "Strong",
  "Weak",
  "Normal",
]);
