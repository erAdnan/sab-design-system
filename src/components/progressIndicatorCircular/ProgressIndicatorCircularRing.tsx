import React, { FC, ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";

export interface ProgressIndicatorCircularRingProps {
  size: number;
  strokeWidth: number;
  progress: number;
  trackColor: string;
  progressColor: string;
  children?: ReactNode;
}

/**
 * Circular progress ring (track + progress arc). Renders children centered inside.
 *
 * @property size - Outer size (width/height) of the ring in px.
 * @property strokeWidth - Stroke width of the ring.
 * @property progress - Progress from 0 to 1 (1 = full ring).
 * @property trackColor - Color of the unfilled track.
 * @property progressColor - Color of the filled progress segment.
 * @property children - Content to render in the center (e.g. time text).
 */
export const ProgressIndicatorCircularRing: FC<ProgressIndicatorCircularRingProps> = ({
  size,
  strokeWidth,
  progress,
  trackColor,
  progressColor,
  children,
}) => {
  const radius = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = (1 - Math.min(1, Math.max(0, progress))) * circumference;

  return (
    <View style={[styles.wrapper, { width: size, height: size }]}>
      <Svg width={size} height={size} style={styles.svg}>
        <Circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="transparent"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        <Circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="transparent"
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
        />
      </Svg>
      {children != null ? (
        <View style={[styles.content, { width: size, height: size }]}>{children}</View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  svg: {
    position: "absolute",
  },
  content: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});
