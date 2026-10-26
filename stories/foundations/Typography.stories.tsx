import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import {
  spacingS,
  spacingM,
  spacingL,
  fontSmall,
  fontMedium,
  fontLarge,
  fontMediumLarge,
} from "../../src/assets/styles/constants/size";
import { actuatedNormalize } from "../../src/assets/styles/utils/pixelScaling";
import fonts from "../../src/assets/styles/constants/fonts";

export default {
  title: "Foundations/Typography",
};

const samples = [
  { label: "Small", size: fontSmall },
  { label: "Medium", size: fontMedium },
  { label: "Large", size: fontLarge },
  { label: "Medium Large", size: fontMediumLarge },
];

export const Scale = () => (
  <ScrollView contentContainerStyle={styles.wrap}>
    <Text style={styles.heading}>Type scale</Text>
    {samples.map((item) => (
      <Text
        key={item.label}
        style={{
          fontFamily: fonts.Regular,
          fontSize: actuatedNormalize(item.size),
          marginBottom: actuatedNormalize(spacingM),
        }}
      >
        {item.label} — The quick brown fox
      </Text>
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  wrap: { padding: actuatedNormalize(spacingL) },
  heading: {
    fontSize: actuatedNormalize(fontLarge),
    fontWeight: "700",
    marginBottom: actuatedNormalize(spacingS),
  },
});
