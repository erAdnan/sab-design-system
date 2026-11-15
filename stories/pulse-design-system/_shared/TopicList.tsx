import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { docTokens as t } from "./docTokens";

export type TopicItem = {
  title: string;
  summary: string;
  bullets?: string[];
};

export const TopicList: FC<{ items: TopicItem[] }> = ({ items }) => (
  <View style={styles.list}>
    {items.map((item) => (
      <View key={item.title} style={styles.item}>
        <View style={styles.accent} />
        <View style={styles.copy}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.summary}>{item.summary}</Text>
          {item.bullets?.length ? (
            <View style={styles.bullets}>
              {item.bullets.map((b) => (
                <Text key={b} style={styles.bullet}>
                  • {b}
                </Text>
              ))}
            </View>
          ) : null}
        </View>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  list: { gap: 12, width: "100%" },
  item: {
    flexDirection: "row",
    backgroundColor: t.subtle,
    borderRadius: t.radius,
    borderWidth: 1,
    borderColor: t.border,
    overflow: "hidden",
  },
  accent: {
    width: 4,
    backgroundColor: t.red,
  },
  copy: {
    flex: 1,
    padding: 20,
    gap: 8,
  },
  title: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
    color: t.navy,
  },
  summary: {
    fontSize: 14,
    lineHeight: 22,
    color: t.graySoft,
  },
  bullets: { gap: 4, marginTop: 4 },
  bullet: {
    fontSize: 14,
    lineHeight: 22,
    color: t.graySoft,
  },
});
