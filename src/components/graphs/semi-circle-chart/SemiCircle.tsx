import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { Animated, View, StyleSheet, ViewStyle } from "react-native";
import Svg, { Path } from "react-native-svg";

interface SemiCircleProps {
  progressShadowColor?: string;
  progressColor?: string;
  interiorCircleColor?: string;
  circleRadius?: number;
  progressWidth?: number;
  percentage: number;
  exteriorCircleStyle?: ViewStyle;
  interiorCircleStyle?: ViewStyle;
  animationSpeed?: number;
  initialPercentage?: number;
  minValue?: number;
  maxValue?: number;
  currentValue?: number;
  children?: React.ReactNode;
  segmentGapDegrees?: number;
}

const getSemiSegmentPath = (
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  startAngleRad: number,
  endAngleRad: number
): string => {
  const sweep = endAngleRad - startAngleRad;
  if (sweep <= 0.001) return "";

  const outerStart = {
    x: cx + outerR * Math.cos(startAngleRad),
    y: cy + outerR * Math.sin(startAngleRad),
  };
  const outerEnd = {
    x: cx + outerR * Math.cos(endAngleRad),
    y: cy + outerR * Math.sin(endAngleRad),
  };
  const innerEnd = {
    x: cx + innerR * Math.cos(endAngleRad),
    y: cy + innerR * Math.sin(endAngleRad),
  };
  const innerStart = {
    x: cx + innerR * Math.cos(startAngleRad),
    y: cy + innerR * Math.sin(startAngleRad),
  };
  const largeArc = sweep > Math.PI ? 1 : 0;

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}`,
    "Z",
  ].join(" ");
};

/**
 * SemiCircle Component
 * A modernized semicircle progress indicator using View-based approach with rotation animation
 * @property percentage - Percentage value from 0-100 to display on the gauge
 * @property progressColor - Color of the active progress portion
 * @property progressShadowColor - Color of the inactive/background portion
 * @property interiorCircleColor - Color of the interior circle (background)
 * @property circleRadius - Radius of the semicircle
 * @property progressWidth - Width of the progress arc
 * @property animationSpeed - Speed of the animation (default: 2)
 * @property initialPercentage - Starting percentage for animation (default: 0)
 */
export const SemiCircle: FC<SemiCircleProps> = ({
  progressShadowColor = "silver",
  progressColor = "steelblue",
  interiorCircleColor = "white",
  circleRadius = 100,
  progressWidth = 10,
  percentage,
  exteriorCircleStyle,
  interiorCircleStyle,
  animationSpeed = 2,
  initialPercentage = 0,
  minValue,
  maxValue,
  currentValue,
  children,
  segmentGapDegrees = 1,
}) => {
  const animatedPercentage = useRef(
    new Animated.Value(initialPercentage)
  ).current;
  const [displayPercentage, setDisplayPercentage] = useState(initialPercentage);

  const calculatedPercentage = useMemo(() => {
    if (percentage !== undefined) {
      return Math.max(Math.min(percentage, 100), 0);
    }

    if (currentValue !== undefined && minValue !== undefined && maxValue !== undefined) {
      const newPercent = ((currentValue - minValue) / (maxValue - minValue)) * 100;
      return Math.max(Math.min(newPercent, 100), 0);
    }

    return 0;
  }, [percentage, minValue, maxValue, currentValue]);

  useEffect(() => {
    const id = animatedPercentage.addListener(({ value }) => {
      setDisplayPercentage(value);
    });

    Animated.spring(animatedPercentage, {
      toValue: calculatedPercentage,
      speed: animationSpeed,
      useNativeDriver: false,
    }).start();

    return () => {
      animatedPercentage.removeListener(id);
    };
  }, [calculatedPercentage, animationSpeed, animatedPercentage]);

  const interiorCircleRadius = circleRadius - progressWidth;
  const cx = circleRadius;
  const cy = circleRadius;
  const outerR = circleRadius;
  const innerR = interiorCircleRadius;

  const gapRad = (Math.max(0, segmentGapDegrees) * Math.PI) / 180;
  const semiStart = Math.PI;
  const semiEnd = 2 * Math.PI;
  const semiSweep = Math.PI;

  const { assetsPath, liabilitiesPath } = useMemo(() => {
    const pct = Math.max(0, Math.min(100, displayPercentage)) / 100;
    const hasBoth = pct > 0.01 && pct < 0.99;
    const available = hasBoth ? Math.max(0, semiSweep - gapRad) : semiSweep;
    const assetsSweep = pct * available;
    const assetsStart = semiStart;
    const assetsEnd = assetsStart + assetsSweep;
    const liabilitiesStart = hasBoth ? assetsEnd + gapRad : assetsEnd;
    const liabilitiesEnd = semiEnd;

    return {
      assetsPath:
        assetsSweep > 0.001
          ? getSemiSegmentPath(cx, cy, outerR, innerR, assetsStart, assetsEnd)
          : "",
      liabilitiesPath:
        liabilitiesEnd - liabilitiesStart > 0.001
          ? getSemiSegmentPath(
              cx,
              cy,
              outerR,
              innerR,
              liabilitiesStart,
              liabilitiesEnd
            )
          : "",
    };
  }, [
    displayPercentage,
    gapRad,
    cx,
    cy,
    outerR,
    innerR,
    semiStart,
    semiEnd,
    semiSweep,
  ]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        exteriorCircle: {
          width: circleRadius * 2,
          height: circleRadius,
          alignItems: "center",
          overflow: "hidden",
        },
        svg: {
          position: "absolute",
          top: 0,
          left: 0,
        },
        interiorCircle: {
          width: interiorCircleRadius * 2,
          height: interiorCircleRadius,
          borderRadius: interiorCircleRadius,
          backgroundColor: interiorCircleColor,
          top: progressWidth,
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          paddingHorizontal: progressWidth * 0.5,
        },
      }),
    [circleRadius, progressWidth, interiorCircleColor, interiorCircleRadius]
  );

  return (
    <View style={[styles.exteriorCircle, exteriorCircleStyle]}>
      <Svg width={circleRadius * 2} height={circleRadius} style={styles.svg}>
        {liabilitiesPath !== "" && (
          <Path d={liabilitiesPath} fill={progressShadowColor} />
        )}
        {assetsPath !== "" && <Path d={assetsPath} fill={progressColor} />}
      </Svg>
      <View style={[styles.interiorCircle, interiorCircleStyle]}>
        {children}
      </View>
    </View>
  );
};
