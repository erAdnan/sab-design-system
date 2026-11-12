import * as allStories from "./Icons.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { centerStoryDecorator } from "../../.storybook/centerStoryDecorator";
import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Icon from "../../src/components/icon/Icon";
import {
  ArrowSvgsDark,
  ArrowSvgsLight,
  BankingSvgsDark,
  BankingSvgsLight,
  FilledSvgsDark,
  FilledSvgsLight,
  FunctionalsSvgsDark,
  FunctionalsSvgsLight,
  NotificationsSvgsDark,
  NotificationsSvgsLight,
  OthersSvgsDark,
  OthersSvgsLight,
  Sab360SvgsDark,
  Sab360SvgsLight,
  SocialSvgsDark,
  SocialSvgsLight,
} from "../../src/components/icon/IconList";
import {
  fontLarge,
  fontMedium,
  fontSmall,
  spacingL,
  spacingM,
  spacingS,
  spacingXS,
} from "../../src/assets/styles/constants/size";
import { Text } from "../../src/components/text/Text";
import { SearchInput } from "../../src/components/input/SearchInput";
import { actuatedNormalize } from "../../src/assets/styles/utils/pixelScaling";
import { useTheme } from "../../src/context/theme/themeContext";

type IconType =
  | "arrows"
  | "banking"
  | "functionals"
  | "notifications"
  | "other"
  | "social"
  | "sab360"
  | "filled";

type IconModule = Record<string, unknown>;

type IconEntry = {
  type: IconType;
  name: string;
  category: string;
};

const iconNames = (light: IconModule, dark: IconModule): string[] =>
  [...new Set([...Object.keys(light), ...Object.keys(dark)])].sort((a, b) =>
    a.localeCompare(b)
  );

const ICON_CATEGORIES: {
  type: IconType;
  label: string;
  light: IconModule;
  dark: IconModule;
}[] = [
  {
    type: "arrows",
    label: "Arrows",
    light: ArrowSvgsLight,
    dark: ArrowSvgsDark,
  },
  {
    type: "banking",
    label: "Banking",
    light: BankingSvgsLight,
    dark: BankingSvgsDark,
  },
  {
    type: "functionals",
    label: "Functionals",
    light: FunctionalsSvgsLight,
    dark: FunctionalsSvgsDark,
  },
  {
    type: "notifications",
    label: "Notifications",
    light: NotificationsSvgsLight,
    dark: NotificationsSvgsDark,
  },
  {
    type: "other",
    label: "Others",
    light: OthersSvgsLight,
    dark: OthersSvgsDark,
  },
  {
    type: "social",
    label: "Social",
    light: SocialSvgsLight,
    dark: SocialSvgsDark,
  },
  {
    type: "sab360",
    label: "Sab 360",
    light: Sab360SvgsLight,
    dark: Sab360SvgsDark,
  },
  {
    type: "filled",
    label: "Filled",
    light: FilledSvgsLight,
    dark: FilledSvgsDark,
  },
];

const ALL_ICONS: IconEntry[] = ICON_CATEGORIES.flatMap(
  ({ type, label, light, dark }) =>
    iconNames(light, dark).map((name) => ({
      type,
      name,
      category: label,
    }))
);

const TOTAL_SVG_ICONS = ALL_ICONS.length;

export default {
  title: "Foundations/Icons",
  component: Icon,
};

const IconsGallery = () => {
  const { theme } = useTheme();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_ICONS;
    return ALL_ICONS.filter(
      (icon) =>
        icon.name.toLowerCase().includes(q) ||
        icon.category.toLowerCase().includes(q)
    );
  }, [query]);

  const grouped = useMemo(() => {
    const map = new Map<string, IconEntry[]>();
    for (const icon of filtered) {
      const list = map.get(icon.category) ?? [];
      list.push(icon);
      map.set(icon.category, list);
    }
    return ICON_CATEGORIES.map(({ label }) => ({
      label,
      icons: map.get(label) ?? [],
    })).filter((group) => group.icons.length > 0);
  }, [filtered]);

  const styles = StyleSheet.create({
    container: {
      paddingBottom: actuatedNormalize(spacingL),
      gap: actuatedNormalize(spacingM),
    },
    header: {
      gap: actuatedNormalize(spacingS),
    },
    countRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: actuatedNormalize(spacingXS),
      alignItems: "baseline",
    },
    category: {
      marginTop: actuatedNormalize(spacingS),
      gap: actuatedNormalize(spacingS),
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: actuatedNormalize(12),
    },
    cell: {
      width: actuatedNormalize(88),
      alignItems: "center",
      gap: actuatedNormalize(spacingXS),
      paddingVertical: actuatedNormalize(spacingXS),
      paddingHorizontal: actuatedNormalize(spacingXS),
      borderRadius: actuatedNormalize(8),
      backgroundColor: theme.primarybgclr,
    },
    empty: {
      marginTop: actuatedNormalize(spacingM),
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text bold size={fontLarge}>
          SVG Icons
        </Text>
        <View style={styles.countRow}>
          <Text bold size={fontMedium}>
            Total: {TOTAL_SVG_ICONS}
          </Text>
          <Text size={fontMedium} variant="primarycolor2_100static">
            {query.trim()
              ? `· Showing ${filtered.length} match${filtered.length === 1 ? "" : "es"}`
              : "· All categories"}
          </Text>
        </View>
        {/* @ts-ignore SearchInput props vary by TextFieldInput */}
        <SearchInput
          error={false}
          fetched={false}
          placeholder="Search by icon name..."
          onSearchTextChange={setQuery}
          useWhiteBackground
        />
      </View>

      {grouped.length === 0 ? (
        <View style={styles.empty}>
          <Text size={fontMedium}>No icons match “{query.trim()}”.</Text>
        </View>
      ) : (
        grouped.map((group) => (
          <View key={group.label} style={styles.category}>
            <Text bold size={fontLarge}>
              {group.label} ({group.icons.length})
            </Text>
            <View style={styles.grid}>
              {group.icons.map((icon) => (
                <View key={`${icon.type}-${icon.name}`} style={styles.cell}>
                  <Icon type={icon.type} name={icon.name} width={28} height={28} />
                  <Text
                    size={fontSmall}
                    overrideStyles={{ textAlign: "center" }}
                    numberOfLines={2}
                  >
                    {icon.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export const AllIcons = {
  render: () => <IconsGallery />,
};

// The full searchable SVG icon catalog at the 343 mobile content width (3 icon cells per row).
export const AllVariants = {
  ...createAllVariantsStory(allStories, ["AllIcons"]),
  decorators: [centerStoryDecorator],
};
