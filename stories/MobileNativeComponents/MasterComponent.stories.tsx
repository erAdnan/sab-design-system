import React from "react";
import { View, StyleSheet } from "react-native";
import * as allStories from "./MasterComponent.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { HomeIndicator } from "../../src/components/mobileNative/HomeIndicator";
import { StatusBarIPhone } from "../../src/components/mobileNative/StatusBarIPhone";
import { IOSRateAlert } from "../../src/components/mobileNative/IOSRateAlert";
import { IOSNumbersKeyboard } from "../../src/components/mobileNative/IOSNumbersKeyboard";
import { spacingS } from "../../src/assets/styles/constants/size";

/**
 * Figma: Mobile Native Components → iOs Components master (1173:2174)
 * Status Bar · Home Indicator · Rate Alert (iOS.review.native) · iOs.keyboard Numbers
 * https://www.figma.com/design/JC6uz9pPKMGCUSiA7a8gob/00.-SAB-DS-Components-and-Foundations?node-id=1173-2174
 */
export default {
  title: "Components/Mobile Native Components/iOS Native",
};

const styles = StyleSheet.create({
  stack: {
    gap: spacingS,
    alignItems: "center",
  },
});

/** Figma Status Bar - iPhone */
export const StatusBar = {
  render: () => <StatusBarIPhone />,
};

/** Figma Home Indicator Mode=Light | Dark */
export const HomeIndicatorLight = {
  render: () => (
    <View style={{ backgroundColor: "#FFFFFF", paddingVertical: 16 }}>
      <HomeIndicator mode="light" />
    </View>
  ),
};

export const HomeIndicatorDark = {
  render: () => (
    <View style={{ backgroundColor: "#000000", paddingVertical: 16 }}>
      <HomeIndicator mode="dark" />
    </View>
  ),
};

/** Figma iOS.review.native — App Store rate alert */
export const RateAlert = {
  render: () => (
    <IOSRateAlert
      rating={4}
      onCancel={() => {}}
      onSubmit={() => {}}
    />
  ),
};

/** Figma iOs.keyboard Type=Numbers, Dark Mode=False */
export const IOSKeyboardNumbers = {
  render: () => (
    <IOSNumbersKeyboard
      onKeyPress={() => {}}
      onDelete={() => {}}
      onSymbols={() => {}}
    />
  ),
};

/** All master pieces together */
export const Overview = {
  render: () => (
    <View style={styles.stack}>
      <StatusBarIPhone />
      <IOSRateAlert rating={4} />
      <IOSNumbersKeyboard />
      <HomeIndicator mode="light" />
    </View>
  ),
};

export const AllVariants = createAllVariantsStory(allStories, [
  "StatusBar",
  "HomeIndicatorLight",
  "HomeIndicatorDark",
  "RateAlert",
  "IOSKeyboardNumbers",
]);
