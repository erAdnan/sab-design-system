import React from "react";
import { View } from "react-native";
import { SearchInput } from "../src/components/input/SearchInput";

export default {
  title: "Components/SearchInput",
  component: SearchInput,
  argTypes: {
    placeholder:        { control: "text" },
    initialValue:       { control: "text" },
    showFilterIcon:     { control: "boolean" },
    disabled:           { control: "boolean" },
    useWhiteBackground: { control: "boolean" },
  },
  args: {
    placeholder: "Search",
    showFilterIcon: false,
    disabled: false,
    useWhiteBackground: false,
    error: false,
    fetched: false,
    textInputInput: "",
    onChange: () => {},
  },
};

/** Default empty state — no filter icon */
export const Default = {
  args: {
    placeholder: "Search",
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
