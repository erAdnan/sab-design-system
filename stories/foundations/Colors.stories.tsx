import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { lightTheme } from "../../src/assets/styles/theme/light";
import {
  spacingS,
  spacingM,
  spacingL,
  fontMedium,
  fontLarge,
  radiusS,
} from "../../src/assets/styles/constants/size";
import { actuatedNormalize } from "../../src/assets/styles/utils/pixelScaling";

const swatches = [
  { name: "primarycolor", color: lightTheme.primarycolor },
  { name: "primarycolor3", color: lightTheme.primarycolor3 },
  { name: "primarybackground", color: lightTheme.primarybackground },
  { name: "primarybgclr", color: lightTheme.primarybgclr },
];

export default {
  title: "Foundations/Colors",
};

export const LightPalette = () => (
  <ScrollView contentContainerStyle={styles.wrap}>
    <Text style={styles.title}>Light theme swatches</Text>
    <View style={styles.row}>
      {swatches.map((item) => (
        <View key={item.name} style={styles.card}>
          <View style={[styles.swatch, { backgroundColor: item.color }]} />
          <Text style={styles.label}>{item.name}</Text>
          <Text style={styles.hex}>{String(item.color)}</Text>
        </View>
      ))}
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  wrap: { padding: actuatedNormalize(spacingL) },
  title: {
    fontSize: actuatedNormalize(fontLarge),
    marginBottom: actuatedNormalize(spacingM),
    fontWeight: "600",
  },
  row: { flexDirection: "row", flexWrap: "wrap", gap: actuatedNormalize(spacingS) },
  card: { width: "45%", marginBottom: actuatedNormalize(spacingM) },
  swatch: {
    height: actuatedNormalize(64),
    borderRadius: actuatedNormalize(radiusS),
    marginBottom: actuatedNormalize(spacingS),
  },
  label: { fontSize: actuatedNormalize(fontMedium), fontWeight: "600" },
  hex: { fontSize: actuatedNormalize(fontMedium), opacity: 0.7 },
});
