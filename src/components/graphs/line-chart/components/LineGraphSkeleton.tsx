import React, { useEffect, useRef, useState } from "react";
import { Animated, LayoutChangeEvent, StyleSheet, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "../../../../context/theme/themeContext";
import { actuatedNormalize } from "../../../../assets/styles/utils/pixelScaling";
import {
  radiusS,
  spacingM,
  spacingS,
  spacingXS,
  spacingXXS,
} from "../../../../assets/styles/constants/size";
import { SkeletonBox } from "../../../skeleton/SkeletonBox";
import { CHART_CONSTANTS } from "../utils/constants";

/** Figma graph path (line-graph-wave.svg / node 667:19484) */
const WAVE_PATH =
  "M2.60387 4.66969L19.8545 15.3284C37.1052 25.9872 71.6065 47.3047 106.108 52.7903C140.609 58.2758 175.11 47.9294 209.612 43.3001C244.113 38.6708 278.614 39.7586 313.116 43.4908C347.617 47.223 382.118 53.5997 416.62 49.8683C451.121 46.1369 485.622 32.2974 520.123 37.4133C554.625 42.5292 589.126 66.6005 623.627 78.3626C658.129 90.1246 692.63 89.5775 727.131 88.2589C761.633 86.9404 796.134 84.8505 830.635 86.6837V148.861H2.60387V4.66969Z";

const WAVE_VIEWBOX = "0 0 833.239 151.465";

/** Figma graph asset crop relative to the 157px frame */
const WAVE_ASSET_WIDTH = 828.031;
const WAVE_ASSET_HEIGHT = 144.191;
const WAVE_OFFSET_LEFT = -414;
const WAVE_OFFSET_TOP = 16.81;
const FIGMA_FRAME_WIDTH = 343;

const AnimatedPath = Animated.createAnimatedComponent(Path);

/**
 * Line graph loading skeleton — Figma `04. Skeleton` / Line graph (667:19378).
 * Total Spent + wave graph + x-axis + tabs placeholders.
 */
export const LineGraphSkeleton = () => {
  const { theme } = useTheme();
  const [graphWidth, setGraphWidth] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const graphHeight = actuatedNormalize(CHART_CONSTANTS.SKELETON.WAVE_HEIGHT);
  const scale = graphWidth > 0 ? graphWidth / FIGMA_FRAME_WIDTH : 1;

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

  // Same pulse as SkeletonBox so the wave isn't a solid black blob
  const boneColor = animatedValue.interpolate({
    inputRange: [0, 1.5],
    outputRange: [theme.stylesblockbg, theme.primarycolor4static],
  });

  const onGraphLayout = (event: LayoutChangeEvent) => {
    setGraphWidth(event.nativeEvent.layout.width);
  };

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      backgroundColor: theme.stylesblockbg,
      borderRadius: radiusS,
      paddingHorizontal: spacingXS,
      gap: spacingM,
      overflow: "hidden",
    },
    totalSpent: {
      width: "100%",
      height: actuatedNormalize(CHART_CONSTANTS.SKELETON.TOTAL_SPENT_HEIGHT),
      gap: spacingXS,
      alignItems: "center",
      justifyContent: "center",
    },
    tabs: {
      width: "100%",
      gap: spacingS,
    },
    graphContainer: {
      width: "100%",
      gap: spacingXXS,
    },
    graph: {
      width: "100%",
      height: graphHeight,
      overflow: "hidden",
    },
    wave: {
      position: "absolute",
      left: WAVE_OFFSET_LEFT * scale,
      top: WAVE_OFFSET_TOP * scale,
    },
    fullWidth: {
      width: "100%",
    },
    smallRadius: {
      width: "100%",
      borderRadius: actuatedNormalize(2),
    },
  });

  return (
    <View style={styles.container} accessibilityRole="progressbar">
      <View style={styles.totalSpent}>
        <SkeletonBox
          shape="line"
          size="small"
          overrideStyles={styles.smallRadius}
        />
        <SkeletonBox
          shape="line"
          size="large"
          overrideStyles={styles.fullWidth}
        />
        <SkeletonBox
          shape="line"
          size="medium"
          overrideStyles={styles.fullWidth}
        />
      </View>

      <View style={styles.tabs}>
        <View style={styles.graphContainer}>
          <View style={styles.graph} onLayout={onGraphLayout}>
            {graphWidth > 0 && (
              <View style={styles.wave}>
                <Svg
                  width={WAVE_ASSET_WIDTH * scale}
                  height={WAVE_ASSET_HEIGHT * scale}
                  viewBox={WAVE_VIEWBOX}
                >
                  <AnimatedPath d={WAVE_PATH} fill={boneColor} />
                </Svg>
              </View>
            )}
          </View>
          <SkeletonBox
            shape="line"
            size="small"
            overrideStyles={styles.smallRadius}
          />
        </View>
        <SkeletonBox
          shape="line"
          size="medium"
          overrideStyles={styles.fullWidth}
        />
      </View>
    </View>
  );
};

export default LineGraphSkeleton;
