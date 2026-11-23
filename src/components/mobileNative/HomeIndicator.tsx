import React, { FC } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";

export interface HomeIndicatorProps {
  /** Figma Home Indicator Mode=Light | Mode=Dark */
  mode?: "light" | "dark";
  containerStyle?: ViewStyle;
}

/**
 * iOS home indicator — Figma Mobile Native → Home Indicator (1200:2440)
 */
export const HomeIndicator: FC<HomeIndicatorProps> = ({
  mode = "light",
  containerStyle,
}) => {
  const { theme } = useTheme();
  const barColor =
    mode === "dark"
      ? theme.primarycolor4static ?? "#FFFFFF"
      : theme.primarycolorstatic ?? "#000000";

  return (
    <View style={[styles.track, containerStyle]}>
      <View style={[styles.bar, { backgroundColor: barColor }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    width: actuatedNormalize(375),
    height: actuatedNormalize(20),
    alignItems: "center",
    justifyContent: "center",
  },
  bar: {
    width: actuatedNormalize(133),
    height: actuatedNormalize(5),
    borderRadius: actuatedNormalize(100),
  },
});

export default HomeIndicator;
