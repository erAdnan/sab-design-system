import React, { useMemo, useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  PanResponder,
  I18nManager,
  LayoutChangeEvent,
} from "react-native";
// @ts-ignore - react-native-svg-charts doesn't have type definitions
import { AreaChart, XAxis } from "react-native-svg-charts";
import { Line, Svg, Defs, LinearGradient, Stop, Rect } from "react-native-svg";
// @ts-ignore - d3-shape doesn't have type definitions
import { curveLinear, curveMonotoneX } from "d3-shape";
import { useTheme } from "../../../../context/theme/themeContext";
import { actuatedNormalize } from "../../../../assets/styles/utils/pixelScaling";
import { LineChartDataPoint, TimeFrame, LineChartVariant } from "../types/types";
import { useLineChartAnimation } from "../utils/animation";
import { processChartData, createEmptyChartData } from "../utils/dateCalculations";
import {
  CustomLine,
  CustomGradient,
  InteractiveDecorator,
  GradientConfig,
} from "../utils/chartDecorators";
import { CustomXAxisDecorator } from "../utils/xAxisDecorator";
import { CHART_CONSTANTS, getContentInset } from "../utils/constants";

export interface LineChartGraphProps {
  data: LineChartDataPoint[];
  timeFrame?: TimeFrame;
  variant?: LineChartVariant;
  xAxisLabels?: string[];
  width?: number;
  height?: number;
  showShadow?: boolean;
  bezier?: boolean;
  onDataPointPress?: (dataPoint: LineChartDataPoint, index: number) => void;
  /** When true, the horizontal baseline at the bottom of the chart is hidden (e.g. for PFM) */
  hideBottomLine?: boolean;
  /** When true, the x-axis labels (Week 1, Week 2, …) are hidden */
  hideXAxisLabels?: boolean;
  showCategoryCredits?: boolean;
  /**
   * Empty-state only: gap between the grey zero-line and the x-axis baseline.
   * Defaults to CHART_CONSTANTS.EMPTY_CHART_BOTTOM_LINE_GAP (4 for Landing/PFM).
   */
  emptyChartBottomLineGap?: number;
  /**
   * Optional override for the active line (and gradient start) colour, e.g. to
   * tint the chart by transaction category. Falls back to the variant colour.
   */
  lineColor?: string;
 }
 export const LineChartGraph = ({
  data,
  timeFrame = "thisMonth",
  variant = "primary",
  xAxisLabels,
  width,
  height = CHART_CONSTANTS.DEFAULT_HEIGHT,
  showShadow = true,
  bezier = true,
  onDataPointPress,
  hideBottomLine = false,
  hideXAxisLabels = false,
  showCategoryCredits = false,
  emptyChartBottomLineGap = CHART_CONSTANTS.EMPTY_CHART_BOTTOM_LINE_GAP,
  lineColor,
 }: LineChartGraphProps) => {
  const { theme, isDarkTheme } = useTheme();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [pathLength, setPathLength] = useState<number>(0);
  const [measuredWidth, setMeasuredWidth] = useState(0);

  useEffect(() => {
    setSelectedIndex(null);
  }, [data, timeFrame]);

  const { strokeDashoffset, showGradient } = useLineChartAnimation(pathLength, [data, timeFrame]);

  const screenWidth = Dimensions.get("window").width;
  const fallbackWidth = screenWidth - actuatedNormalize(CHART_CONSTANTS.DEFAULT_MARGIN);
  const requestedWidth = width ?? (measuredWidth > 0 ? measuredWidth : fallbackWidth);
  // Never exceed the actual container width, otherwise the right edge of the
  // chart (incl. the last x-axis label) is clipped by the parent view.
  const chartWidth =
    measuredWidth > 0 ? Math.min(requestedWidth, measuredWidth) : requestedWidth;
  const chartHeight = actuatedNormalize(height);

  const onContainerLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    if (w > 0 && w !== measuredWidth) setMeasuredWidth(w);
  };

  const variantConfig = CHART_CONSTANTS.VARIANTS[variant];
  const inactiveLineColor = isDarkTheme
    ? CHART_CONSTANTS.INACTIVE_LINE_COLOR.DARK
    : CHART_CONSTANTS.INACTIVE_LINE_COLOR.LIGHT;

  const labelColor = theme.primarytextcolor2 || theme.primarytextcolor;

  const chartData = useMemo(() => {
    return processChartData(data || [], timeFrame, {
      customXAxisLabels: xAxisLabels,
    });
  }, [data, timeFrame, xAxisLabels]);
  // processChartData only applies custom labels when their count matches the
  // data length; otherwise it falls back to timeframe labels, which need the
  // horizontal inset in the axis decorator to keep proper edge spacing.
  const usesCustomLabels =
    !!xAxisLabels && !!data && data.length > 0 && xAxisLabels.length === data.length;

  const contentInset = useMemo(() => {
    const inset = getContentInset();
    if (!hideXAxisLabels) return inset;
    return {
      ...inset,
      bottom: CHART_CONSTANTS.CONTENT_INSET.BOTTOM,
    };
  }, [hideXAxisLabels]);

  // Use smooth curve interpolation for natural-looking curves
  // curveMonotoneX creates smooth curves without overshooting, perfect for time-series data
  const curve = bezier ? curveMonotoneX : curveLinear;

  const displayData = useMemo(() => {
    if (!data || data.length === 0) {
      return createEmptyChartData();
    }
    return {
      ...chartData,
      values: chartData.values.map((val) => Math.max(0, val)),
    };
  }, [data, chartData]);

  const isEmptyChart =
    !data ||
    data.length === 0 ||
    displayData.values.every((value) => value === 0);

  const chartContentInset = useMemo(
    () => ({
      ...contentInset,
      bottom:
        contentInset.bottom +
        (isEmptyChart
          ? emptyChartBottomLineGap
          : CHART_CONSTANTS.CHART_BOTTOM_LINE_GAP),
    }),
    [contentInset, isEmptyChart, emptyChartBottomLineGap]
  );

  // Empty state: same grey in light + dark (`primarycolor2_100static` = #767676)
  const emptyChartLineColor = theme.primarycolor2_100static;
  const activeLineColor = isEmptyChart
    ? emptyChartLineColor
    : lineColor || variantConfig.LINE_COLOR;
  const gradientConfig: GradientConfig = {
    startColor: lineColor || variantConfig.GRADIENT.START_COLOR,
    startOpacity: variantConfig.GRADIENT.START_OPACITY,
    endColor: variantConfig.GRADIENT.END_COLOR,
    endOpacity: variantConfig.GRADIENT.END_OPACITY,
  };
  const bottomLineY = chartHeight - contentInset.bottom;
  /** Y of the flat zero-line in empty state (above the x-axis baseline by emptyChartBottomLineGap) */
  const emptyLineY = chartHeight - chartContentInset.bottom;
  const emptyShadeHeight = Math.max(0, bottomLineY - emptyLineY);
  // Empty state: lighter grey baseline; with data: solid ragneutral
  const bottomLineColor = isEmptyChart
    ? emptyChartLineColor
    : theme.ragneutral;
  const bottomLineOpacity = isEmptyChart ? 0.1 : 1;
  const isRTL = I18nManager.isRTL;

  // Map touch x (relative to chart) to data index for tooltip on interaction / slide
  // In RTL the chart is mirrored, so touch on the right = first data point
  const getIndexFromTouchX = useCallback(
    (touchX: number) => {
      const n = displayData.originalData?.length ?? displayData.values?.length ?? 0;
      if (n <= 1) return 0;
      const chartLeft = contentInset.left;
      const chartRight = chartWidth - contentInset.right;
      const chartWidthInner = chartRight - chartLeft;
      const x = isRTL ? chartWidth - touchX : touchX;
      const index = ((x - chartLeft) / chartWidthInner) * (n - 1);
      return Math.max(0, Math.min(n - 1, Math.round(index)));
    },
    [displayData.originalData?.length, displayData.values?.length, contentInset, chartWidth, isRTL]
  );

  // The full chart width is touchable, including the first and last data points
  const getTouchInClickableArea = useCallback(
    (touchX: number): { inArea: boolean; index: number } => {
      const n = displayData.originalData?.length ?? displayData.values?.length ?? 0;
      if (n <= 1) return { inArea: true, index: 0 };
      const index = getIndexFromTouchX(touchX);
      return { inArea: true, index };
    },
    [getIndexFromTouchX, displayData.originalData?.length, displayData.values?.length]
  );

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (evt) => {
          const touchX = evt.nativeEvent.locationX ?? 0;
          const { inArea, index } = getTouchInClickableArea(touchX);
          if (inArea) {
            setSelectedIndex(index);
            if (onDataPointPress && displayData.originalData?.[index]) {
              onDataPointPress(displayData.originalData[index], index);
            }
          } else {
            setSelectedIndex(null);
          }
        },
        onPanResponderMove: (evt) => {
          const touchX = evt.nativeEvent.locationX ?? 0;
          const { inArea, index } = getTouchInClickableArea(touchX);
          setSelectedIndex(inArea ? index : null);
        },
        onPanResponderRelease: () => {
          setSelectedIndex(null);
        },
        onPanResponderTerminate: () => {
          setSelectedIndex(null);
        },
      }),
    [getTouchInClickableArea, onDataPointPress, displayData.originalData]
  );

  return (
    <View style={styles.container} onLayout={onContainerLayout}>
      <View
        style={{ height: chartHeight, width: chartWidth }}
        {...panResponder.panHandlers}
      >
        <View
          style={{ height: chartHeight, width: chartWidth, backgroundColor: "transparent", overflow: "visible" }}
          pointerEvents="none"
        >
        <View
          style={{
            width: chartWidth,
            height: chartHeight,
            ...(isRTL && { transform: [{ scaleX: -1 }] }),
          }}
        >
        <AreaChart
          style={{ flex: 1, zIndex: 999 }}
          data={displayData.values}
          svg={{
            // Zero values have no area height — empty shade is drawn separately below
            fill:
              !isEmptyChart && showShadow && showGradient
                ? "url(#areaGradient)"
                : "none",
          }}
          contentInset={chartContentInset}
          curve={curve}
          yMin={0}
        >
          <CustomGradient
            showGradient={!isEmptyChart && showGradient}
            gradient={gradientConfig}
          />
          <CustomLine
            activeLineColor={activeLineColor}
            pathLength={pathLength}
            strokeDashoffset={strokeDashoffset}
            chartWidth={chartWidth}
            setPathLength={setPathLength}
          />
          <InteractiveDecorator
            selectedIndex={isEmptyChart ? null : selectedIndex}
            displayData={displayData}
            chartHeight={chartHeight}
            bottomLineY={bottomLineY}
            contentInset={chartContentInset}
            isDarkTheme={isDarkTheme}
            activeLineColor={activeLineColor}
            inactiveLineColor={inactiveLineColor}
            isRTL={isRTL}
            showCategoryCredits={showCategoryCredits}
            chartWidth={chartWidth}
          />
        </AreaChart>
        </View>

        {(isEmptyChart || !hideBottomLine) && (
        <Svg
          style={{ position: "absolute", top: 0, left: 0, width: chartWidth, height: chartHeight }}
          pointerEvents="none"
        >
          {isEmptyChart && emptyShadeHeight > 0 && (
            <>
              <Defs>
                <LinearGradient
                  id="emptyStateShade"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <Stop
                    offset="0%"
                    stopColor={emptyChartLineColor}
                    stopOpacity={
                      isDarkTheme
                        ? CHART_CONSTANTS.EMPTY_CHART_SHADE_OPACITY.DARK
                        : CHART_CONSTANTS.EMPTY_CHART_SHADE_OPACITY.LIGHT
                    }
                  />
                  <Stop
                    offset="100%"
                    stopColor={emptyChartLineColor}
                    stopOpacity={0}
                  />
                </LinearGradient>
              </Defs>
              <Rect
                x={contentInset.left}
                y={emptyLineY}
                width={Math.max(
                  0,
                  chartWidth - contentInset.left - contentInset.right
                )}
                height={emptyShadeHeight}
                fill="url(#emptyStateShade)"
              />
              {/* Redraw empty line above shade so stroke isn’t covered by the fill */}
              <Line
                x1={contentInset.left}
                y1={emptyLineY}
                x2={chartWidth - contentInset.right}
                y2={emptyLineY}
                stroke={emptyChartLineColor}
                strokeWidth={CHART_CONSTANTS.LINE.STROKE_WIDTH}
                strokeLinecap="round"
              />
            </>
          )}
          {!hideBottomLine && (
            <Line
              x1={contentInset.left}
              y1={bottomLineY}
              x2={chartWidth - contentInset.right}
              y2={bottomLineY}
              stroke={bottomLineColor}
              strokeWidth={CHART_CONSTANTS.LINE.BOTTOM_STROKE_WIDTH}
              strokeOpacity={bottomLineOpacity}
            />
          )}
        </Svg>
        )}

        {!hideXAxisLabels && (
          <>
            <XAxis
              style={{
                marginHorizontal: CHART_CONSTANTS.X_AXIS_MARGIN,
                height: CHART_CONSTANTS.X_AXIS_STYLE_HEIGHT,
              }}
              data={displayData.indices}
              formatLabel={() => ""}
              contentInset={contentInset}
              svg={{
                fontSize: CHART_CONSTANTS.FONT_SIZE.X_AXIS,
                fill: labelColor,
              }}
            />
            <CustomXAxisDecorator
              labels={displayData.labels}
              activeMonthIndex={displayData.activeMonthIndex}
              contentInset={contentInset}
              chartHeight={chartHeight}
              chartWidth={chartWidth}
              dataIndices={displayData.indices}
              timeFrame={timeFrame}
              hasCustomLabels={usesCustomLabels}
              isRTL={isRTL}
              labelsUpBy={hideBottomLine ? 6 : 0}
            />
          </>
        )}
        </View>
      </View>
    </View>
  );
 };

 const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    overflow: "visible",
  },
 });

