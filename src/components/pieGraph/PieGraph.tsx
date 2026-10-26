import React, { FC, ReactElement, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import { Text } from "../text/Text";
import Svg, { Circle } from "react-native-svg";
import { fontSmallMedium } from "../../assets/styles/constants/size";

interface PieSegment {
  percentage: number; // percentage of the circle (sum must be ≤ 100)
  color: string;      // stroke color for this segment
}

interface PieGraphProps {
  percentage: number;
  size?: "small" | "medium";
  dimension?: number;
  radius?: number;
  innerStrokeWidth?: number;
  outerStrokeWidth?: number;
  content?: ReactElement;
  strokeFillColor?: string;
  strokeColor?: string;
  segments?: PieSegment[]; // optional new prop for multi-colored stroke
}

/**
 * @property percentage - Number that should reflect the progress in percentage
 * @property size - Width, height and stroke will be adjusted
 * @property content - Optional, use when needed (e.g. Budget Card),if not passed, text with percentage will be displayed
 * @property strokeFillColor - Optional, use to override color of the filled portion
 * @property strokeColor - Optional, use to override color of the unfilled portion
 * @property segments - Optional, array of segments to create a multi-colored stroke
 * @property dimension - Optional, custom dimension for the pie graph
 * @property radius - Optional, custom radius for the pie graph
 * @property innerStrokeWidth - Optional, custom inner stroke width for the pie graph
 * @property outerStrokeWidth - Optional, custom outer stroke width for the pie graph
 */

export const PieGraph: FC<PieGraphProps> = ({
  percentage,
  size = "small",
  content,
  strokeFillColor,
  strokeColor,
  segments,
  dimension,
  radius,
  innerStrokeWidth,
  outerStrokeWidth,
}) => {
  const { theme } = useTheme();

  const validPercentage = useMemo(() => {
    if (percentage < 0) return 0;
    if (percentage > 100) return 100;
    else return percentage;
  }, [percentage]);

  const isSmall = useMemo(() => size === "small", [size]);
  const radiusInPixels = useMemo(() => radius || (isSmall ? 22 : 74), [isSmall, radius]);
  const dimensionInPixels = useMemo(() => dimension || (isSmall ? 48 : 168), [isSmall, dimension]);
  const innerStrokeWidthInPixels = useMemo(() => innerStrokeWidth || (isSmall ? 3 : 12), [isSmall, innerStrokeWidth]);
  const outerStrokeWidthInPixels = useMemo(() => outerStrokeWidth || (isSmall ? 4 : 16), [isSmall, outerStrokeWidth]);
  const circumference = 2 * Math.PI * radiusInPixels;
  const dashOffset = circumference - (circumference * validPercentage) / 100;

  const styles = StyleSheet.create({
    container: {
      height: dimensionInPixels,
      width: dimensionInPixels,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    },
    textContainer: {
      position: "absolute",
    },
    progressBar: {
      transform: [{ rotate: "-90deg" }],
      position: "absolute",
    },
  });
  return (
    <View style={styles.container}>
      <Svg style={styles.progressBar} width={dimensionInPixels} height={dimensionInPixels}>
        <Circle
          cx={dimensionInPixels / 2}
          cy={dimensionInPixels / 2}
          r={radiusInPixels}
          strokeWidth={innerStrokeWidthInPixels}
          stroke={strokeColor || theme.primarycolor3tonal}
          strokeLinecap="round"
          fill="none"
        />
       {segments && segments.length > 0 ? (
  <>
    {segments.map((seg, index) => {
      const dash = (circumference * seg.percentage) / 100;
      const gap = circumference - dash;

      // Calculate total rotation offset up to this segment
      const rotation = segments
        .slice(0, index)
        .reduce((sum, s) => sum + (360 * s.percentage) / 100, 0);

      return (
        <Circle
          key={`segment-${index}`}
          cx={dimensionInPixels / 2}
          cy={dimensionInPixels / 2}
          r={radiusInPixels}
          strokeWidth={outerStrokeWidthInPixels}
          stroke={seg.color}
          fill="none"
          strokeLinecap="round" 
          strokeDasharray={`${dash} ${gap}`}
          transform={`rotate(${rotation - 90}, ${dimensionInPixels / 2}, ${dimensionInPixels / 2})`}
        />
      );
    })}
  </>
) : (
  <Circle
    cx={dimensionInPixels / 2}
    cy={dimensionInPixels / 2}
    r={radiusInPixels}
    strokeWidth={outerStrokeWidthInPixels}
    stroke={strokeFillColor || theme.primarycolor3}
    fill="none"
    strokeLinecap="round"
    strokeDasharray={circumference}
    strokeDashoffset={dashOffset}
  />
)}
        
      </Svg>
      <View style={styles.textContainer}>
        {content || (
          <Text
            variant="primarycolor3"
            size={fontSmallMedium}
          >{`${validPercentage}%`}</Text>
        )}
      </View>
    </View>
  );
};
