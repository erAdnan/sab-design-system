import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path, G } from "react-native-svg";
import { CircleChartSegment } from "../types/types";
import {
  CIRCLE_CHART_COLORS,
  INNER_CIRCLE_SIZE,
  CHART_ICON_SIZE,
  CHART_GAP as GAP_CONST,
  CHART_CENTER_ICON_COLOR,
  CHART_DEFAULT_STROKE_WIDTH,
  CHART_EMPTY_RING_COLOR,
  CIRCLE_CHART_SKELETON,
} from "../utils/constants";
import ShoppingIcon from "../../../../assets/svgs/light/sab360/shopping.svg";
import { SkeletonBox } from "../../../skeleton/SkeletonBox";
import { actuatedNormalize } from "../../../../assets/styles/utils/pixelScaling";

const INNER_CIRCLE_BG = "rgba(211, 137, 0, 0.10)";


export interface DonutGraphProps {
  segments: CircleChartSegment[];
  size?: number;
  strokeWidth?: number;
  /** Custom center icon; receives icon size (px) and icon color (hex). Use the color for fill so it matches the default icon. */
  renderCenterIcon?: (iconSize: number, iconColor: string) => React.ReactNode;
  /** Background color for the full ring when there is no data (e.g. theme.stylesblockbg). Defaults to CHART_EMPTY_RING_COLOR. */
  emptyRingColor?: string;
  /** Background color for the inner circle behind the center icon. Defaults to INNER_CIRCLE_BG. */
  iconBgColor?: string;
  /** When true, shows a circular skeleton instead of the donut. */
  isLoading?: boolean;
}

/** Path for one donut segment (outer arc + lines + inner arc) */
const getSegmentPath = (
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  startAngleRad: number,
  endAngleRad: number
): string => {
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
  const largeArc = endAngleRad - startAngleRad > Math.PI ? 1 : 0;
  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}`,
    "Z",
  ].join(" ");
};

/** Full donut ring path (360°). SVG arc from point to same point doesn't draw, so use two half-arcs. */
const getFullRingPath = (
  cx: number,
  cy: number,
  outerR: number,
  innerR: number
): string => {
  const half1 = getSegmentPath(cx, cy, outerR, innerR, -Math.PI / 2, Math.PI / 2);
  const half2 = getSegmentPath(cx, cy, outerR, innerR, Math.PI / 2, -Math.PI / 2 + 2 * Math.PI);
  return `${half1} ${half2}`;
};

const DESIGN_OUTER_R = INNER_CIRCLE_SIZE / 2 + GAP_CONST + CHART_DEFAULT_STROKE_WIDTH;

const SEGMENT_GAP_RAD = (2 * Math.PI) / 180;

export const DonutGraph = ({
  segments,
  size = 200,
  strokeWidth = CHART_DEFAULT_STROKE_WIDTH,
  renderCenterIcon,
  emptyRingColor = CHART_EMPTY_RING_COLOR,
  iconBgColor = INNER_CIRCLE_BG,
  isLoading = false,
}: DonutGraphProps) => {
  const graphDiameter = size;
  const scale = graphDiameter / (2 * DESIGN_OUTER_R);

  const innerR = (INNER_CIRCLE_SIZE / 2) * scale;
  const ringGap = GAP_CONST * scale;
  const ringInnerR = innerR + ringGap;
  const ringWidth = strokeWidth * scale;
  const outerR = ringInnerR + ringWidth;

  const chartSize = graphDiameter + 2 * GAP_CONST;
  const cx = chartSize / 2;
  const cy = chartSize / 2;

  const segmentsWithColors = useMemo(() => {

    const positive = segments.filter((s) => Number(s.value) > 0);
    if (!positive.length) return [];
    const total = positive.reduce((sum, s) => sum + s.value, 0);
    if (total <= 0) return [];
    const sorted = [...positive].sort((a, b) => b.value - a.value);
    return sorted.map((seg, i) => ({
      ...seg,
      color: seg.color ?? CIRCLE_CHART_COLORS[i % CIRCLE_CHART_COLORS.length],
      share: seg.value / total,
    }));
  }, [segments]);

  const paths = useMemo(() => {
    const pathList: { path: string; color: string }[] = [];
    const n = segmentsWithColors.length;
    if (n === 0) {
      const fullRingPath = getFullRingPath(cx, cy, outerR, ringInnerR);
      return [{ path: fullRingPath, color: emptyRingColor }];
    }
    if (n === 1) {
      return [
        {
          path: getFullRingPath(cx, cy, outerR, ringInnerR),
          color: segmentsWithColors[0].color,
        },
      ];
    }
    const totalGapRad = n * SEGMENT_GAP_RAD;
    const availableRad = 2 * Math.PI - totalGapRad;
    let startRad = -Math.PI / 2;
    for (const seg of segmentsWithColors) {
      const segmentAngle = seg.share * availableRad;
      const endRad = startRad + segmentAngle;
      pathList.push({
        path: getSegmentPath(cx, cy, outerR, ringInnerR, startRad, endRad),
        color: seg.color,
      });
      startRad = endRad + SEGMENT_GAP_RAD;
    }
    return pathList;
  }, [segmentsWithColors, cx, cy, outerR, ringInnerR, emptyRingColor]);

  const innerCircleSize = innerR * 2;
  const iconSize = CHART_ICON_SIZE;

  if (isLoading) {
    return (
      <View style={loadingStyles.container}>
        <SkeletonBox
          shape="circle"
          size="extralarge"
          overrideStyles={{
            width: size,
            height: size,
            borderRadius: actuatedNormalize(CIRCLE_CHART_SKELETON.CHART_BORDER_RADIUS),
          }}
        />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    svg: {
      position: "absolute",
      width: chartSize,
      height: chartSize,
    },
    innerCircle: {
      width: innerCircleSize,
      height: innerCircleSize,
      borderRadius: innerCircleSize / 2,
      backgroundColor: iconBgColor,
      justifyContent: "center",
      alignItems: "center",
      gap: 9.333,
    },
    iconWrapper: {
      width: iconSize,
      height: iconSize,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <View style={styles.container}>
      <Svg style={styles.svg} width={chartSize} height={chartSize}>
        <G>
          {paths.map(({ path, color }, i) => (
            <Path key={i} d={path} fill={color} />
          ))}
        </G>
      </Svg>
      <View style={styles.innerCircle}>
        <View style={styles.iconWrapper}>
          {renderCenterIcon ? renderCenterIcon(iconSize, CHART_CENTER_ICON_COLOR) : <ShoppingIcon width={iconSize} height={iconSize} />}
        </View>
      </View>
    </View>
  );
};

const loadingStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
