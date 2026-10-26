import React, { FC, ReactNode, useMemo } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import {
  isSABLiquidGlassSupported,
  SABLiquidGlassView,
  type SABLiquidGlassViewProps,
} from "../../native/liquidGlass";
import { sizeXL } from "../../assets/styles/constants/size";

export type LiquidGlassCircleButtonProps = {
  children?: ReactNode;
  onPress: () => void;
  disabled?: boolean;
  /** Circle diameter. Defaults to sizeXL (same as quick-action icons). */
  size?: number;
  /** Fallback fill when native liquid glass is unavailable. */
  fallbackBackgroundColor?: string;
  liquidGlassBackgroundColor?: string;
  style?: StyleProp<ViewStyle>;
  effect?: SABLiquidGlassViewProps["effect"];
  tintColor?: SABLiquidGlassViewProps["tintColor"];
  colorScheme?: SABLiquidGlassViewProps["colorScheme"];
};

/**
 * Circular pressable for iOS 26+ native liquid glass.
 * Uses interactive `SABLiquidGlassView` so press morphs like system glass buttons.
 * On unsupported platforms / OS versions, renders the semi-transparent circle fallback.
 */
export const LiquidGlassCircleButton: FC<LiquidGlassCircleButtonProps> = ({
  children,
  onPress,
  disabled = false,
  size = sizeXL,
  fallbackBackgroundColor = "rgba(255, 255, 255, 0.30)",
  liquidGlassBackgroundColor = "rgba(255, 255, 255, 0.10)",
  style,
  effect = "clear",
  tintColor,
  colorScheme,
}) => {
  const { isDarkTheme } = useTheme();

  const useNativeGlass = useMemo(() => isSABLiquidGlassSupported(), []);

  const resolvedColorScheme =
    colorScheme ?? (isDarkTheme ? "dark" : "light");

  const circleMetrics = useMemo(
    () => ({
      width: size,
      height: size,
      borderRadius: size / 2,
    }),
    [size]
  );

  if (useNativeGlass) {
    return (
      <SABLiquidGlassView
        interactive
        effect={effect}
        tintColor={tintColor}
        colorScheme={resolvedColorScheme}
        style={[styles.circle, circleMetrics, {backgroundColor: liquidGlassBackgroundColor},style]}
      >
        <Pressable
          accessibilityRole="button"
          disabled={disabled}
          onPress={onPress}
          style={styles.content}
        >
          {children}
        </Pressable>
      </SABLiquidGlassView>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.circle,
        circleMetrics,
        {
          backgroundColor: fallbackBackgroundColor,
          opacity: pressed ? 0.85 : 1,
        },
        style,
      ]}
    >
      <View pointerEvents="none" style={styles.content}>
        {children}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  circle: {
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
});
