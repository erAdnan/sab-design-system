import * as allStories from "./DropdownInput.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import Food from "../../src/components/icons/sab360/Food";
import { DropdownInput } from "../../src/components/input/DropdownInput";
import { mobileContentDecorators } from "../../.storybook/mobileContentFrame";

export default {
  decorators: mobileContentDecorators,
  title: "Components/Data Entry/Input Field/DropdownInput",
  component: DropdownInput,
  argTypes: {
    error: { action: "Input error", control: "boolean" },
    disabled: { action: "Input disabled", control: "boolean" },
    onItemClick: { action: "Dropdown opened" },
    onChevronIconPress: { action: "Chevron pressed" },
  },
  args: {
    error: false,
    disabled: false,
    loading: false,
    textInputInput: "",
    onChange: () => {},
  },
};

export const DropdownInputSimple = {
  args: {
    placeholder: "Choose option...",
  },
};

export const DropdownInputWithLabel = {
  args: {
    label: "Select one option:",
    placeholder: "Select date...",
  },
};

export const DropdownInputWithIconFilled = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    textInputInput: "Selected value",
    icon: <Food />
  },
};

export const DropdownInputWithIconFetched = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    textInputInput: "Fetched value",
    fetched: true,
    icon: <Food />
  },
};

export const DropdownInputWithFlagPlaceholder = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    textInputInput: "",
    showFlagPlaceholder: true,
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "DropdownInputSimple",
    "DropdownInputWithLabel",
    "DropdownInputWithIconFilled",
    "DropdownInputWithIconFetched",
    "DropdownInputWithFlagPlaceholder",
]);
