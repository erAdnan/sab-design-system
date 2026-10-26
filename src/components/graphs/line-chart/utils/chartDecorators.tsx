import React, { useMemo, useEffect } from "react";
import { Circle, G, Line, Defs, LinearGradient, Stop, Path, Rect } from "react-native-svg";
import { LineChartTooltip } from "../components/Tooltip";
import { LineChartDataPoint } from "../types/types";
import { CHART_CONSTANTS } from "./constants";

interface DecoratorProps {
  x?: (index: number) => number;
  y?: (value: number) => number;
  data?: number[];
  line?: string;
  chartValues?: number[];
}

interface CustomLineProps extends DecoratorProps {
  activeLineColor: string;
  pathLength: number;
  strokeDashoffset: number;
  chartWidth: number;
  setPathLength: (length: number) => void;
}

export interface GradientConfig {
  startColor: string;
  startOpacity: number;
  endColor: string;
  endOpacity: number;
}

interface CustomGradientProps {
  showGradient: boolean;
  gradient?: GradientConfig;
}

interface BottomLineProps extends DecoratorProps {
  chartHeight: number;
  chartWidth: number;
  contentInset: { top: number; bottom: number; left: number; right: number };
  strokeColor?: string;
}

interface InteractiveDecoratorProps extends DecoratorProps {
  selectedIndex: number | null;
  displayData: { originalData: LineChartDataPoint[] };
  chartHeight: number;
  bottomLineY: number;
  contentInset: { top: number; bottom: number; left: number; right: number };
  isDarkTheme: boolean;
  activeLineColor: string;
  inactiveLineColor: string;
  isRTL?: boolean;
  showCategoryCredits?: boolean;
  chartWidth: number;
}

interface ClickableDotsProps extends DecoratorProps {
  displayData: { originalData: LineChartDataPoint[] };
  chartWidth: number;
  chartHeight: number;
  setSelectedIndex: (index: number) => void;
  onDataPointPress?: (dataPoint: LineChartDataPoint, index: number) => void;
}

export const CustomLine = ({
  line,
  activeLineColor,
  pathLength,
  strokeDashoffset,
  chartWidth,
  setPathLength,
}: CustomLineProps) => {
  if (!line) return null;

  const estimatePathLengthFromSvgPath = (path: string): number | null => {
    const numericParts = path.match(/-?\d*\.?\d+/g);
    if (!numericParts || numericParts.length < 4) {
      return null;
    }

    const coordinates: Array<{ x: number; y: number }> = [];
    for (let i = 0; i < numericParts.length - 1; i += 2) {
      const xCoord = Number(numericParts[i]);
      const yCoord = Number(numericParts[i + 1]);
      if (!Number.isFinite(xCoord) || !Number.isFinite(yCoord)) {
        return null;
      }
      coordinates.push({ x: xCoord, y: yCoord });
    }

    if (coordinates.length < 2) {
      return null;
    }

    let totalLength = 0;
    for (let i = 1; i < coordinates.length; i += 1) {
      const prev = coordinates[i - 1];
      const curr = coordinates[i];
      totalLength += Math.hypot(curr.x - prev.x, curr.y - prev.y);
    }

    return totalLength > 0 ? totalLength : null;
  };

  const estimatedLength = useMemo(() => {
    const svgLengthEstimate = estimatePathLengthFromSvgPath(line);
    if (svgLengthEstimate != null) {
      // Slightly overestimate so the full stroke is revealed even on highly curved paths.
      return svgLengthEstimate * 1.05;
    }

    return chartWidth * CHART_CONSTANTS.LINE.PATH_MULTIPLIER;
  }, [chartWidth, line]);

  useEffect(() => {
    setPathLength(estimatedLength);
  }, [line, estimatedLength, setPathLength]);

  return (
    <Path
      key="line"
      d={line}
      stroke={activeLineColor}
      strokeWidth={CHART_CONSTANTS.LINE.STROKE_WIDTH}
      fill="none"
      strokeDasharray={pathLength > 0 ? pathLength : undefined}
      strokeDashoffset={pathLength > 0 ? strokeDashoffset : undefined}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
};

export const CustomGradient = ({ showGradient, gradient }: CustomGradientProps) => {
  if (!showGradient) return null;

  const config = gradient ?? {
    startColor: CHART_CONSTANTS.GRADIENT.START_COLOR,
    startOpacity: CHART_CONSTANTS.GRADIENT.START_OPACITY,
    endColor: CHART_CONSTANTS.GRADIENT.END_COLOR,
    endOpacity: CHART_CONSTANTS.GRADIENT.END_OPACITY,
  };
  
  return (
    <Defs key="gradient">
      <LinearGradient
        id="areaGradient"
        x1="0%"
        y1="0%"
        x2="0%"
        y2="120%"
        gradientUnits="objectBoundingBox"
      >
        <Stop
          offset="0%"
          stopColor={config.startColor}
          stopOpacity={config.startOpacity}
        />
        <Stop
          offset="120%"
          stopColor={config.endColor}
          stopOpacity={config.endOpacity}
        />
      </LinearGradient>
    </Defs>
  );
};

export const BottomLine = ({
  x,
  data: chartValues,
  chartHeight,
  chartWidth,
  contentInset,
  strokeColor = "#305A85",
}: BottomLineProps) => {
  const bottomY = chartHeight - contentInset.bottom;
  const leftX = contentInset.left;
  const rightX = chartWidth - contentInset.right;

  if (x && chartValues && typeof x === "function" && chartValues.length > 0) {
    const firstX = Math.max(leftX, x(0));
    const lastX = Math.min(rightX, x(chartValues.length - 1));
    return (
      <Line
        x1={firstX}
        y1={bottomY}
        x2={lastX}
        y2={bottomY}
        stroke={strokeColor}
        strokeWidth={CHART_CONSTANTS.LINE.BOTTOM_STROKE_WIDTH}
      />
    );
  }

  return (
    <Line
      x1={leftX}
      y1={bottomY}
      x2={rightX}
      y2={bottomY}
      stroke={strokeColor}
      strokeWidth={CHART_CONSTANTS.LINE.BOTTOM_STROKE_WIDTH}
    />
  );
};

export const InteractiveDecorator = ({
  x,
  y,
  data: chartValues,
  selectedIndex,
  displayData,
  chartHeight,
  bottomLineY,
  contentInset,
  isDarkTheme,
  activeLineColor,
  inactiveLineColor,
  isRTL,
  showCategoryCredits = false,
  chartWidth,
}: InteractiveDecoratorProps) => {
  if (
    selectedIndex === null ||
    selectedIndex === undefined ||
    !displayData.originalData ||
    displayData.originalData.length === 0 ||
    !x ||
    !y ||
    !chartValues ||
    typeof x !== "function" ||
    typeof y !== "function"
  ) {
    return null;
  }

  if (
    selectedIndex < 0 ||
    selectedIndex >= displayData.originalData.length ||
    selectedIndex >= chartValues.length
  ) {
    return null;
  }

  const selectedData = displayData.originalData[selectedIndex];
  const xPos = x(selectedIndex);
  const yPos = y(chartValues[selectedIndex]);

  // Calculate middle point from bottom line upwards to chart top
  const chartTop = contentInset.top;
  const middlePoint = (bottomLineY + chartTop) / 2;
  const isInTopHalf = yPos < middlePoint;

  return (
    <G>
      <Line
        x1={xPos}
        y1={0}
        x2={xPos}
        y2={bottomLineY}
        stroke={isDarkTheme ? "#FFFFFF" : inactiveLineColor}
        strokeWidth={CHART_CONSTANTS.LINE.STROKE_WIDTH}
        strokeOpacity={CHART_CONSTANTS.OPACITY.BOTTOM_LINE}
      />
      <Circle
        cx={xPos}
        cy={yPos}
        r={CHART_CONSTANTS.LINE.DOT_RADIUS}
        stroke={activeLineColor}
        strokeWidth={CHART_CONSTANTS.LINE.DOT_STROKE_WIDTH}
        fill={activeLineColor}
      />
      <LineChartTooltip
        x={xPos}
        y={yPos}
        currency={selectedData.currency}
        amount={selectedData.amount}
        date={selectedData.date}
        creditAmount={selectedData.creditAmount}
        showCategoryCredits={showCategoryCredits}
        isTopHalf={isInTopHalf}
        isRTL={isRTL}
        chartWidth={chartWidth}
      />
    </G>
  );
};

export const ClickableDots = ({
  x,
  y,
  data: chartValues,
  displayData,
  chartWidth,
  chartHeight,
  setSelectedIndex,
  onDataPointPress,
}: ClickableDotsProps) => {
  if (
    !displayData.originalData ||
    displayData.originalData.length === 0 ||
    !x ||
    !y ||
    !chartValues ||
    typeof x !== "function"
  ) {
    return null;
  }

  const clickableStartPercent =
    (1 - CHART_CONSTANTS.CLICKABLE.WIDTH_PERCENT) / 2;
  const firstX = x(0);
  const lastX = x(chartValues.length - 1);
  const totalWidth = lastX - firstX;
  const clickableStartX = firstX + totalWidth * clickableStartPercent;
  const clickableEndX = firstX + totalWidth * (1 - clickableStartPercent);

  const handlePress = (event: any) => {
    // Get touch coordinates - try different event properties
    const touchX = event.nativeEvent?.locationX ?? event.nativeEvent?.pageX ?? 0;
    
    // Find the nearest data point based on actual touch X coordinate
    let nearestIndex = 0;
    let minDistance = Infinity;

    chartValues.forEach((value: number, index: number) => {
      const xPos = x(index);
      const distance = Math.abs(touchX - xPos);
      
      if (distance < minDistance) {
        minDistance = distance;
        nearestIndex = index;
      }
    });

    const nearestXPos = x(nearestIndex);
    const isClickable = nearestXPos >= clickableStartX && nearestXPos <= clickableEndX;

    if (isClickable && nearestIndex >= 0 && nearestIndex < displayData.originalData.length) {
      setSelectedIndex(nearestIndex);
      if (onDataPointPress && displayData.originalData[nearestIndex]) {
        onDataPointPress(displayData.originalData[nearestIndex], nearestIndex);
      }
    }
  };

  return (
    <Rect
      x={clickableStartX}
      y={0}
      width={clickableEndX - clickableStartX}
      height={chartHeight}
      fill="transparent"
      opacity={0}
      onPress={handlePress}
      onPressIn={handlePress}
    />
  );
};