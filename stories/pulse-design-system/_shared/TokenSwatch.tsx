import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { docTokens as t } from "./docTokens";

export type TokenSwatchItem = {
  name: string;
  value: string;
  preview?: "radius" | "space" | "color";
  color?: string;
  size?: number;
};

export const TokenSwatchGrid: FC<{ items: TokenSwatchItem[] }> = ({ items }) => (
  <View style={styles.grid}>
    {items.map((item) => (
      <View key={item.name} style={styles.card}>
        <View style={styles.previewWrap}>
          {item.preview === "color" ? (
            <View style={[styles.colorChip, { backgroundColor: item.color ?? t.red }]} />
          ) : item.preview === "radius" ? (
            <View
              style={[
                styles.radiusChip,
                {
                  borderRadius: item.size ?? 8,
                },
              ]}
            />
          ) : (
            <View style={styles.spaceTrack}>
              <View style={[styles.spaceBar, { width: item.size ?? 16 }]} />
            </View>
          )}
        </View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.value}>{item.value}</Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    width: "100%",
  },
  card: {
    flexGrow: 1,
    flexBasis: 140,
    minWidth: 130,
    backgroundColor: t.subtle,
    borderRadius: t.radius,
    borderWidth: 1,
    borderColor: t.border,
    padding: 16,
    gap: 8,
  },
  previewWrap: {
    height: 48,
    justifyContent: "center",
  },
  colorChip: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: t.border,
  },
  radiusChip: {
    width: 48,
    height: 48,
    backgroundColor: t.redTonal,
    borderWidth: 2,
    borderColor: t.red,
  },
  spaceTrack: {
    height: 12,
    backgroundColor: t.border,
    borderRadius: 4,
    overflow: "hidden",
    justifyContent: "center",
  },
  spaceBar: {
    height: 12,
    backgroundColor: t.red,
  },
  name: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
    color: t.navy,
  },
  value: {
    fontSize: 13,
    lineHeight: 18,
    color: t.graySoft,
  },
});
