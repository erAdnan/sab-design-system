import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import {
  spacingXXXS,
  spacingXXS,
  spacingXS,
  spacingS,
  spacingM,
  spacingL,
  spacingXL,
  radiusS,
  radiusM,
  radiusL,
} from "../../src/assets/styles/constants/size";
import { actuatedNormalize } from "../../src/assets/styles/utils/pixelScaling";

import { tx } from "../../src/localization/tx";
export default {
  title: "Foundations/Spacing",
};

const spaces = [
  { name: "XXXS", value: spacingXXXS },
  { name: "XXS", value: spacingXXS },
  { name: "XS", value: spacingXS },
  { name: "S", value: spacingS },
  { name: "M", value: spacingM },
  { name: "L", value: spacingL },
  { name: "XL", value: spacingXL },
];

const radii = [
  { name: "S", value: radiusS },
  { name: "M", value: radiusM },
  { name: "L", value: radiusL },
];

export const Tokens = () => (
  <ScrollView contentContainerStyle={styles.wrap}>
    <Text style={styles.title}>{tx("Spacing")}</Text>
    {spaces.map((item) => (
      <View key={item.name} style={styles.row}>
        <Text style={styles.label}>{item.name}</Text>
        <View
          style={[
            styles.bar,
            { width: actuatedNormalize(item.value * 4) || 2 },
          ]}
        />
        <Text style={styles.value}>{item.value}</Text>
      </View>
    ))}
    <Text style={[styles.title, { marginTop: actuatedNormalize(spacingL) }]}>
      Radius
    </Text>
    {radii.map((item) => (
      <View key={item.name} style={styles.row}>
        <Text style={styles.label}>{item.name}</Text>
        <View
          style={[
            styles.radiusPreview,
            { borderRadius: actuatedNormalize(item.value) },
          ]}
        />
        <Text style={styles.value}>{item.value}</Text>
      </View>
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  wrap: { padding: actuatedNormalize(spacingL) },
  title: { fontWeight: "700", marginBottom: actuatedNormalize(spacingM) },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: actuatedNormalize(spacingS),
  },
  label: { width: 56 },
  bar: { height: 12, backgroundColor: "#1B4B66", marginHorizontal: 8 },
  radiusPreview: {
    width: 40,
    height: 40,
    backgroundColor: "#1B4B66",
    marginHorizontal: 8,
  },
  value: { opacity: 0.7 },
});
