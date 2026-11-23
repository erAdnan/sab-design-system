import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { docTokens as t } from "./docTokens";

export type ChannelItem = {
  name: string;
  description: string;
};

export const ChannelList: FC<{ items: ChannelItem[] }> = ({ items }) => (
  <View style={styles.list}>
    {items.map((item) => (
      <View key={item.name} style={styles.row}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.desc}>{item.description}</Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  list: {
    width: "100%",
    borderWidth: 1,
    borderColor: t.borderMuted,
    borderRadius: t.radius,
    overflow: "hidden",
  },
  row: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: t.borderMuted,
    gap: 6,
    backgroundColor: t.white,
  },
  name: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "700",
    color: t.navy,
  },
  desc: {
    fontSize: 14,
    lineHeight: 22,
    color: t.graySoft,
  },
});
