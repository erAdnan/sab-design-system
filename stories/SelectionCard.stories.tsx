import React from "react";
import { View } from "react-native";
import { SelectionCard } from "../src/components/cards/SelectionCard";
import BirthdayIllustration from "../src/components/illustrations/Birthday";

const illustration = <BirthdayIllustration />;

export default {
  title: "Components/SelectionCard",
  component: SelectionCard,
  argTypes: {
    withBorder: {
      control: "boolean",
      description: "Accent border (e.g. selected)",
    },
    title: {
      control: "text",
      description: "Title below the illustration",
    },
    subtitle: {
      control: "text",
      description: "Optional Caption2 under the title",
    },
  },
  args: {
    title: "Birthday",
    subtitle: "",
    withBorder: false,
    image: illustration,
  },
  render: (args: any) => (
    <SelectionCard
      title={args.title}
      subtitle={args.subtitle || undefined}
      withBorder={args.withBorder}
      image={args.image ?? illustration}
    />
  ),
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ padding: 16, flexDirection: "row", gap: 16, flexWrap: "wrap" }}>
        <Story />
      </View>
    ),
  ],
};

export const Default = {
  args: {
    title: "Birthday",
    subtitle: "",
    withBorder: false,
    image: illustration,
  },
};

export const WithBorder = {
  args: {
    title: "Birthday",
    subtitle: "",
    withBorder: true,
    image: illustration,
  },
};

export const WithBorderAndSubtitle = {
  args: {
    title: "Birthday",
    subtitle: "Optional caption under the title",
    withBorder: true,
    image: illustration,
  },
};

export const WithSubtitleNoBorder = {
  args: {
    title: "Birthday",
    subtitle: "Optional caption under the title",
    withBorder: false,
    image: illustration,
  },
};
