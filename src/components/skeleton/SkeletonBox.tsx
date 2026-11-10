import React, { FC, useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { radiusS } from "../../assets/styles/constants/size";
import { useTheme } from "../../context/theme/themeContext";

interface SkeletonBoxProps {
  shape: "circle" | "square" | "line";
  size: "small" | "medium" | "large" | "extralarge";
  overrideStyles?: any;
}

export const SkeletonBox: FC<SkeletonBoxProps> = ({
  shape,
  size,
  overrideStyles,
}) => {
  const { theme } = useTheme();
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
    inputRange: [0, 1.5],
    outputRange: [theme.stylesblockbg, theme.primarycolor4static], // light gray to white
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
      width: actuatedNormalize(240), maxWidth: "100%", flexShrink: 1,
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
    ></Animated.View>
  );
};
