import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  ICON_COMPONENT_CATALOG,
  type IconComponentEntry,
} from "../../src/components/icons/iconComponentsCatalog";
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

/**
 * Gallery of every TSX SVG under `src/components/icons`.
 * Distinct from Foundations/Icons (asset map via `Icon` + IconList).
 */
export default {
  title: "Foundations/Icon Components",
  component: View,
};

const IconComponentsGallery = () => {
  const { theme } = useTheme();
  const [query, setQuery] = useState("");
  const iconFill = theme.primarycolor3;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ICON_COMPONENT_CATALOG;
    return ICON_COMPONENT_CATALOG.filter(
      (icon) =>
        icon.name.toLowerCase().includes(q) ||
        icon.folder.toLowerCase().includes(q) ||
        icon.path.toLowerCase().includes(q)
    );
  }, [query]);

  const grouped = useMemo(() => {
    const map = new Map<string, IconComponentEntry[]>();
    for (const icon of filtered) {
      const key = icon.folder || "(root)";
      const list = map.get(key) ?? [];
      list.push(icon);
      map.set(key, list);
    }
    return [...map.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([folder, icons]) => ({
        folder,
        icons: [...icons].sort((a, b) => a.name.localeCompare(b.name)),
      }));
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
      width: actuatedNormalize(96),
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
          Icon components (TSX)
        </Text>
        <View style={styles.countRow}>
          <Text bold size={fontMedium}>
            Total: {ICON_COMPONENT_CATALOG.length}
          </Text>
          <Text size={fontMedium} variant="primarycolor2_100static">
            {query.trim()
              ? `· Showing ${filtered.length} match${filtered.length === 1 ? "" : "es"}`
              : "· src/components/icons"}
          </Text>
        </View>
        {/* @ts-ignore SearchInput props vary by TextFieldInput */}
        <SearchInput
          error={false}
          fetched={false}
          placeholder="Search by name or folder..."
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
          <View key={group.folder} style={styles.category}>
            <Text bold size={fontLarge}>
              {group.folder} ({group.icons.length})
            </Text>
            <View style={styles.grid}>
              {group.icons.map((icon) => {
                const IconComp = icon.Component;
                return (
                  <View key={icon.path} style={styles.cell}>
                    <IconComp
                      width={28}
                      height={28}
                      fill={iconFill}
                    />
                    <Text
                      size={fontSmall}
                      overrideStyles={{ textAlign: "center" }}
                      numberOfLines={2}
                    >
                      {icon.name}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export const All = {
  render: () => <IconComponentsGallery />,
};
