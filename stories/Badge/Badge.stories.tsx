import * as allStories from "./Badge.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { centerStoryDecorator } from "../../.storybook/centerStoryDecorator";
import { View, Text } from "react-native";
import {
  Badge,
  BadgeSize,
  BadgeType,
} from "../../src/components/badge/Badge";
import {
  spacingM,
  spacingS,
  spacingXS,
  fontSmall,
} from "../../src/assets/styles/constants/size";
import { useTheme } from "../../src/context/theme/themeContext";

export default {
  title: "Components/Data Display/Badge",
  component: Badge,
  tags: ["!autodocs"],
  decorators: [centerStoryDecorator],
  argTypes: {
    size: {
      control: "radio",
      options: Object.values(BadgeSize),
    },
    type: {
      control: "radio",
      options: Object.values(BadgeType),
    },
    number: { control: "number" },
    maxCount: { control: "number" },
    loading: { control: "boolean" },
  },
  args: {
    size: BadgeSize.small,
    type: BadgeType.primary,
    number: 1,
    loading: false,
  },
};

export const Default = {};

export const Primary = {
  args: {
    type: BadgeType.primary,
    size: BadgeSize.small,
    number: 3,
  },
};

export const Warning = {
  args: {
    type: BadgeType.warning,
    size: BadgeSize.small,
    number: 3,
  },
};

export const Success = {
  args: {
    type: BadgeType.success,
    size: BadgeSize.small,
    number: 3,
  },
};

export const Neutral = {
  args: {
    type: BadgeType.neutral,
    size: BadgeSize.small,
    number: 3,
  },
};

export const Reverse = {
  args: {
    type: BadgeType.reverse,
    size: BadgeSize.small,
    number: 3,
  },
};

export const ExtraSmall = {
  args: {
    size: BadgeSize.xs,
    type: BadgeType.primary,
    number: 1,
  },
};

export const Small = {
  args: {
    size: BadgeSize.small,
    type: BadgeType.primary,
    number: 5,
  },
};

export const Large = {
  args: {
    size: BadgeSize.large,
    type: BadgeType.primary,
    number: 8,
  },
};

/** Caps display (e.g. 100 → "99+") — matches Figma overflow pill. */
export const MaxCountOverflow = {
  args: {
    type: BadgeType.primary,
    size: BadgeSize.small,
    number: 120,
    maxCount: 99,
  },
};

export const Loading = {
  args: {
    loading: true,
  },
};

const COUNT_SEQUENCE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

const TYPE_ROWS: { type: BadgeType; label: string; sizes: BadgeSize[] }[] = [
  {
    type: BadgeType.primary,
    label: "Primary",
    sizes: [BadgeSize.xs, BadgeSize.small, BadgeSize.large],
  },
  {
    type: BadgeType.warning,
    label: "Warning",
    sizes: [BadgeSize.xs, BadgeSize.small, BadgeSize.large],
  },
  {
    type: BadgeType.success,
    label: "Success",
    sizes: [BadgeSize.small, BadgeSize.large],
  },
  {
    type: BadgeType.neutral,
    label: "Neutral",
    sizes: [BadgeSize.small, BadgeSize.large],
  },
  {
    type: BadgeType.reverse,
    label: "Reverse",
    sizes: [BadgeSize.small, BadgeSize.large],
  },
];

/** Figma Badge canvas matrix: types × sizes × 1–10 + 99+. */
const CatalogueMatrix = () => {
  const { theme } = useTheme();

  return (
    <View style={{ gap: spacingM, paddingVertical: spacingS }}>
      {TYPE_ROWS.map(({ type, label, sizes }) => (
        <View key={type} style={{ gap: spacingXS }}>
          <Text
            style={{
              color: theme.primarytextcolor,
              fontSize: fontSmall,
              marginBottom: spacingXS,
            }}
          >
            {label}
          </Text>
          {sizes.map((size) => (
            <View
              key={`${type}-${size}`}
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
                gap: spacingXS,
                marginBottom: spacingXS,
              }}
            >
              {COUNT_SEQUENCE.map((n) => (
                <Badge key={n} type={type} size={size} number={n} />
              ))}
              <Badge type={type} size={size} number={120} maxCount={99} />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export const Catalogue = {
  name: "Catalogue",
  render: () => <CatalogueMatrix />,
  parameters: {
    controls: { disable: true },
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
  "Default",
  "Primary",
  "Warning",
  "Success",
  "Neutral",
  "Reverse",
  "ExtraSmall",
  "Small",
  "Large",
  "MaxCountOverflow",
  "Loading",
  "Catalogue",
]);
