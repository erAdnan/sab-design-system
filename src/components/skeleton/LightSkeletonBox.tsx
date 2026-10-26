import React, { FC, useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { radiusS } from "../../assets/styles/constants/size";

interface LightSkeletonBoxProps {
  shape: "circle" | "square" | "line";
  size: "small" | "medium" | "large" | "extralarge";
  overrideStyles?: any;
}

/** primary-white / styles-block-bg tokens for lite dashboard glass surfaces */
const LITE_SKELETON_COLORS = [
  "rgba(255, 255, 255, 0.10)",
  "rgba(255, 255, 255, 0.06)",
] as const;

/**
 * Same animation as SkeletonBox — only background colors differ for lite dashboard.
 */
export const LightSkeletonBox: FC<LightSkeletonBoxProps> = ({
  shape,
  size,
  overrideStyles,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loopAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    );
    loopAnimation.start();

    return () => loopAnimation.stop();
  }, [animatedValue]);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [...LITE_SKELETON_COLORS],
  });

  const styles = StyleSheet.create({
    container: {
      borderRadius: radiusS,
    },
    circle: {
      borderRadius: actuatedNormalize(100),
    },
    square: {},
    line: {
      width: actuatedNormalize(240),
    },
    small: {
      height: actuatedNormalize(24),
      width: actuatedNormalize(24),
    },
    medium: {
      height: actuatedNormalize(32),
      width: actuatedNormalize(32),
    },
    large: {
      height: actuatedNormalize(48),
      width: actuatedNormalize(48),
    },
    extralarge: {},
    linesmall: {
      height: actuatedNormalize(8),
    },
    linemedium: {
      height: actuatedNormalize(16),
    },
    linelarge: {
      height: actuatedNormalize(24),
    },
    lineextralarge: {
      height: actuatedNormalize(40),
    },
  });

  return (
    <Animated.View
      style={[
        styles.container,
        styles[shape],
        shape === "line" ? styles[`line${size}`] : styles[size],
        { backgroundColor },
        overrideStyles,
      ]}
    />
  );
};
