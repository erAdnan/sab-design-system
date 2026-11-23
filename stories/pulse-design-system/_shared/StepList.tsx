import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { docTokens as t } from "./docTokens";

export type StepItem = {
  title: string;
  body: string;
};

export const StepList: FC<{ items: StepItem[] }> = ({ items }) => (
  <View style={styles.list}>
    {items.map((item, index) => (
      <View key={item.title} style={styles.row}>
        <Text style={styles.index}>{String(index + 1).padStart(2, "0")}</Text>
        <View style={styles.copy}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.body}>{item.body}</Text>
        </View>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  list: { gap: 16, width: "100%" },
  row: {
    flexDirection: "row",
    gap: 16,
    padding: 20,
    backgroundColor: t.subtle,
    borderRadius: t.radius,
    borderWidth: 1,
    borderColor: t.border,
  },
  index: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
    color: t.red,
    minWidth: 32,
  },
  copy: { flex: 1, gap: 6 },
  title: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
    color: t.navy,
  },
  body: {
    fontSize: 14,
    lineHeight: 22,
    color: t.graySoft,
  },
});
