import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { docTokens as t } from "./docTokens";

export type StatItem = {
  value: string;
  label: string;
  detail?: string;
};

export const StatGrid: FC<{ items: StatItem[] }> = ({ items }) => (
  <View style={styles.grid}>
    {items.map((item) => (
      <View key={item.label} style={styles.card}>
        <Text style={styles.value}>{item.value}</Text>
        <Text style={styles.label}>{item.label}</Text>
        {item.detail ? <Text style={styles.detail}>{item.detail}</Text> : null}
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    width: "100%",
  },
  card: {
    flexGrow: 1,
    flexBasis: 200,
    minWidth: 160,
    backgroundColor: t.block,
    borderRadius: t.radius,
    padding: 24,
    gap: 8,
  },
  value: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "700",
    color: t.red,
  },
  label: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
    color: t.navy,
  },
  detail: {
    fontSize: 14,
    lineHeight: 20,
    color: t.graySoft,
  },
});
