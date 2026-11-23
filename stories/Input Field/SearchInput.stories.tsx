import * as allStories from "./SearchInput.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import React from "react";
import { View } from "react-native";
import { expect } from "storybook/test";
import { spy } from "../../.storybook/actions";
import { SearchInput } from "../../src/components/input/SearchInput";
import { mobileContentDecorators } from "../../.storybook/mobileContentFrame";

export default {
  decorators: mobileContentDecorators,
  title: "Components/Data Entry/Input Field/Search New",
  component: SearchInput,
  argTypes: {
    placeholder:        { control: "text" },
    initialValue:       { control: "text" },
    showFilterIcon:     { control: "boolean" },
    disabled:           { control: "boolean" },
    useWhiteBackground: { control: "boolean" },
    onChange:           { action: "onChange" },
    onFilterIconPress:  { action: "onFilterIconPress" },
  },
  args: {
    placeholder: "Search",
    showFilterIcon: false,
    disabled: false,
    useWhiteBackground: false,
    error: false,
    fetched: false,
    textInputInput: "",
    onChange: spy("onChange"),
    onFilterIconPress: spy("onFilterIconPress"),
  },
};

/** Default empty state — no filter icon */
export const Default = {
  args: {
    placeholder: "Search",
  },
  play: async ({ canvas, userEvent, args }) => {
    const input =
      canvas.getByPlaceholderText?.("Search") ||
      canvas.getByRole("textbox");
    await userEvent.click(input);
    await userEvent.type(input, "sab");
    await expect(args.onChange).toHaveBeenCalled();
  },
};

/** Empty state with filter icon on the right */
export const WithFilterIcon = {
  args: {
    placeholder: "Search",
    showFilterIcon: true,
  },
};

/** Filled state — shows the red clear (X) icon */
export const Filled = {
  args: {
    placeholder: "Search",
    initialValue: "Placeholder",
  },
};

/** White background variant (primarywhite instead of the default grey) */
export const WhiteBackground = {
  args: {
    placeholder: "Search",
    useWhiteBackground: true,
  },
};

/** Disabled with filter icon */
export const Disabled = {
  args: {
    placeholder: "Search",
    disabled: true,
    showFilterIcon: true,
  },
};

/** All states (matches Figma) */
export const AllStates = {
  args: {
    useWhiteBackground: false,
  },
  render: (args: any) => (
    <View style={{ gap: 12, padding: 16 }}>
      <SearchInput
        placeholder="Search"
        showFilterIcon
        useWhiteBackground={args.useWhiteBackground}
        error={false}
        fetched={false}
        textInputInput=""
        onChange={() => {}}
      />
      <SearchInput
        placeholder="Search"
        initialValue="Placeholder"
        useWhiteBackground={args.useWhiteBackground}
        error={false}
        fetched={false}
        textInputInput=""
        onChange={() => {}}
      />
      <SearchInput
        placeholder="Search"
        useWhiteBackground={args.useWhiteBackground}
        error={false}
        fetched={false}
        textInputInput=""
        onChange={() => {}}
        autoFocus
      />
    </View>
  ),
};

export const AllVariants = createAllVariantsStory(allStories, [
    "Default",
    "WithFilterIcon",
    "Filled",
    "WhiteBackground",
    "Disabled",
    "AllStates",
]);
