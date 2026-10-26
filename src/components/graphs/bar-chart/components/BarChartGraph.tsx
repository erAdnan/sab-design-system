import React, { useMemo, useState } from "react";
import { View, StyleSheet, LayoutChangeEvent, ViewStyle, StyleProp } from "react-native";
import { LinearGradient } from "react-native-linear-gradient";
import Svg, { Line } from "react-native-svg";
import { actuatedNormalize } from "../../../../assets/styles/utils/pixelScaling";
import {
  fontSmall,
  fontXSmall,
  radiusXS,
  spacingXS,
  spacingM,
  spacingS,
  spacingXXS,
  spacingXXXS,
  spacingL,
} from "../../../../assets/styles/constants/size";
import { Text } from "../../../text/Text";
import { NewCurrency } from "../../../text/NewCurrency";
import type { BarChartDataPoint, BarChartAmountSuffix } from "../types/types";
import {
  BAR_CHART_COLOR,
  BAR_CHART_DEFAULT_HEIGHT,
  BAR_WIDTH,
  BAR_CHART_Y_AXIS_WIDTH,
  BAR_CHART_Y_TICKS,
  BAR_CHART_BAR_TO_LABEL_GAP,
  BAR_CHART_GRID_LINE_COLOR,
  BAR_CHART_GRID_LINE_WIDTH,
  BAR_CHART_NO_DATA_MESSAGE,
  BAR_CHART_NO_DATA_BAR_COLOR,
  BAR_CHART_NO_DATA_GRADIENT_COLORS,
  BAR_CHART_NO_DATA_BAR_HEIGHT,
  BAR_CHART_Y_TICK_SPACING,
  BAR_CHART_Y_BASELINE_OFFSET,
  BAR_CHART_Y_AXIS_LABEL_INSET_LEFT,
  BAR_CHART_WEEKLY_GAP_Y_AXIS_TO_BARS,
  BAR_CHART_MONTHLY_SLOT_MIN_WIDTH,
  BAR_CHART_MIN_BAR_HEIGHT,
} from "../utils/constants";
import { clampStyleNumber, getTickBottom, computeBarScale } from "../utils/chartUtils";

/**
 * A dotted horizontal reference line drawn under each y-axis amount label.
 * Rendered with SVG because React Native does not paint a `dotted`
 * `borderTopWidth` (single-side, sub-pixel) reliably across platforms.
 */
const DottedGridLine = ({
  style,
  thickness,
  color,
}: {
  style: StyleProp<ViewStyle>;
  thickness: number;
  color: string;
}) => {
  const [width, setWidth] = useState(0);
  const onLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    if (w !== width) setWidth(w);
  };
  return (
    <View style={style} onLayout={onLayout}>
      {width > 0 && (
        <Svg width={width} height={thickness}>
          <Line
            x1={0}
            y1={thickness / 2}
            x2={width}
            y2={thickness / 2}
            stroke={color}
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeDasharray={`${thickness},${thickness * 3}`}
          />
        </Svg>
      )}
    </View>
  );
};

export interface BarChartGraphProps {
  data: BarChartDataPoint[];
  barColor?: string;
  height?: number;
  width?: number;
  amountSuffix?: BarChartAmountSuffix;
  currency?: string;
  yAxisTicks?: number[];
}

export const BarChartGraph = ({
  data,
  barColor = BAR_CHART_COLOR,
  height = BAR_CHART_DEFAULT_HEIGHT,
  amountSuffix = "currency",
  currency = "SAR",
  yAxisTicks,
}: BarChartGraphProps) => {
  const yBaselineOffset = actuatedNormalize(BAR_CHART_Y_BASELINE_OFFSET);
  const yTickSpacing = actuatedNormalize(BAR_CHART_Y_TICK_SPACING);
  const barAreaHeight = yBaselineOffset + yTickSpacing;
  const noDataBarHeight = actuatedNormalize(BAR_CHART_NO_DATA_BAR_HEIGHT);
  // Keep the dotted-line stroke at least 1 device px so the dots always paint.
  const gridLineThickness = Math.max(1, actuatedNormalize(BAR_CHART_GRID_LINE_WIDTH));

  const ticks = yAxisTicks ?? BAR_CHART_Y_TICKS;
  const defaultCeiling = ticks.length ? Math.max(...ticks) : 10000;
  const hasNoData = data.length === 0;

  const { ceiling, barHeights, visibleTicks, firstTick } = useMemo(
    () =>
      computeBarScale(
        data,
        ticks,
        defaultCeiling,
        barAreaHeight,
        yBaselineOffset,
        noDataBarHeight,
        BAR_CHART_MIN_BAR_HEIGHT
      ),
    [data, barAreaHeight, noDataBarHeight, ticks, defaultCeiling, yBaselineOffset]
  );

  // Keep the y-axis value labels pinned to the same corner across every period —
  // a fixed inset ensures they don't shift when the bar count changes.
  const yAxisLabelInsetLeft = BAR_CHART_Y_AXIS_LABEL_INSET_LEFT;
  // Dense views (> 7 bars: 12 Months / Current Year / Last Year) use half-width
  // bars so all columns and their labels fit. Weekly day bars stay at BAR_WIDTH (24px).
  const shouldCenterBars = data.length > 7;
  // Every view distributes the bars evenly across the available width: each bar
  // sits centered in an equal-width flex slot, so the spacing between bars adapts
  // automatically to however many bars are shown.
  const barColumnWidth = actuatedNormalize(
    shouldCenterBars ? BAR_WIDTH / 2 : BAR_WIDTH
  );
  const slotMinWidth = shouldCenterBars ? barColumnWidth : BAR_CHART_MONTHLY_SLOT_MIN_WIDTH;
  // Tight right-hand gap so the bars fill the width; the y-axis labels provide
  // the left-hand gap.
  const sideSpacerWidth = spacingXS;
  // Pull the plot area left (out from under the y-axis label column) so the bars
  // start from the beginning of the chart for every period. The weekly month
  // views (This Month / Last Month — the only 4-5 bar periods) start slightly
  // further forward so the first week isn't crowded against the y-axis labels.
  const isWeeklyMonthView = data.length === 4 || data.length === 5;
  const plotMarginLeft =
    BAR_CHART_WEEKLY_GAP_Y_AXIS_TO_BARS -
    BAR_CHART_Y_AXIS_WIDTH -
    spacingM +
    (isWeeklyMonthView ? spacingM : 0);
  // Keep the labels row starting at the same x as the bars row.
  const labelsLeftSpacerWidth =
    yAxisLabelInsetLeft + BAR_CHART_Y_AXIS_WIDTH + plotMarginLeft;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          width: "100%",
          // Stretch full width so right-side padding matches left. A fixed
          // maxWidth + flex-start left empty space only on the right on wider
          // Android screens (iPhone ~375 never hit the 400 cap).
          alignSelf: "stretch",
          marginTop: spacingM,
          overflow: "hidden",
          paddingVertical: spacingS,
        },
        row: {
          flexDirection: "row",
          alignItems: "stretch",
          height: barAreaHeight,
        },
        yAxis: {
          width: BAR_CHART_Y_AXIS_WIDTH,
          height: barAreaHeight,
          marginLeft: clampStyleNumber(yAxisLabelInsetLeft, 0),
        },
        // Overlay drawn after bars/grid so amount labels sit above chart blocks.
        yAxisOverlay: {
          position: "absolute",
          left: clampStyleNumber(yAxisLabelInsetLeft, 0),
          top: 0,
          width: BAR_CHART_Y_AXIS_WIDTH,
          height: barAreaHeight,
          zIndex: 2,
        },
        yAxisInner: {
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: barAreaHeight,
        },
        yTickWrap: {
          position: "absolute",
          left: 0,
          paddingBottom: spacingXXS,
        },
        chartArea: {
          flex: 1,
          minWidth: 0,
          overflow: "visible",
          marginLeft: plotMarginLeft,
          zIndex: 0,
        },
        chartAreaSpacer: {
          width: sideSpacerWidth,
          minWidth: sideSpacerWidth,
          flexShrink: 0,
        },
        chartWrap: {
          flex: 1,
          flexDirection: "row",
          alignItems: "flex-end",
        },
        barSlot: {
          flex: 1,
          minWidth: slotMinWidth,
          alignItems: "center",
          justifyContent: "flex-end",
        },
        barColumn: {
          width: barColumnWidth,
          flexDirection: "column",
          alignItems: "flex-start",
          flexShrink: 0,
        },
        barFill: {
          width: "100%",
          borderRadius: radiusXS,
        },
        labelsRowWrapper: {
          flexDirection: "row",
          marginTop: actuatedNormalize(BAR_CHART_BAR_TO_LABEL_GAP),
        },
        labelsRow: {
          flex: 1,
          flexDirection: "row",
          alignItems: "flex-start",
        },
        labelsRowSpacer: {
          width: sideSpacerWidth,
          minWidth: sideSpacerWidth,
          flexShrink: 0,
        },
        chartWrapContainer: {
          position: "relative",
          height: barAreaHeight,
          overflow: "visible",
        },
        // Dotted reference line under each y-axis label. Rendered as a fixed
        // overlay in the chart row (not tied to the bar group) so the line width
        // stays consistent regardless of how many bars are shown. A 32px inset on
        // each side gives the symmetric gap shown in the design.
        gridLine: {
          position: "absolute",
          left: spacingM,
          right: spacingL,
          height: gridLineThickness,
          justifyContent: "center",
          // Above bars; below y-axis labels so amount text stays readable.
          zIndex: 1,
        },
        labelSlot: {
          flex: 1,
          minWidth: slotMinWidth,
          alignItems: "center",
          justifyContent: "center",
        },
        noDataMessage: {
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
        },
      }),
    [barAreaHeight, shouldCenterBars, yAxisLabelInsetLeft, data.length, slotMinWidth, barColumnWidth, sideSpacerWidth, gridLineThickness, plotMarginLeft]
  );

  const tickBottom = (tickValue: number) =>
    getTickBottom(tickValue, {
      firstTick,
      ceiling,
      barAreaHeight,
      yBaselineOffset,
    });

  const renderYAxis = () => (
    <View style={styles.yAxisOverlay} pointerEvents="none">
      <View style={styles.yAxisInner}>
        {visibleTicks.map((tick) => (
          <View
            key={tick}
            style={[styles.yTickWrap, { bottom: tickBottom(tick) }]}
          >
            {amountSuffix === "kg" ? (
              <Text
                variant="primarytextcolor2"
                size={fontXSmall}
                numberOfLines={1}
                overrideStyles={{ textAlign: "left" }}
              >
                {tick.toLocaleString()} kg
              </Text>
            ) : (
              <NewCurrency
                text={`${currency}${tick.toLocaleString()}`}
                variant="primarytextcolor2"
                size={fontXSmall}
                numberOfLines={1}
                textstyle={{ textAlign: "left" }}
              />
            )}
          </View>
        ))}
      </View>
    </View>
  );

  const renderGridLines = () =>
    visibleTicks.map((tick) => (
      <DottedGridLine
        key={tick}
        style={[styles.gridLine, { bottom: tickBottom(tick) }]}
        thickness={gridLineThickness}
        color={BAR_CHART_GRID_LINE_COLOR}
      />
    ));

  const renderChartContent = () => {
    if (hasNoData) {
      return (
        <View style={styles.chartWrapContainer}>
          <View style={styles.noDataMessage}>
            <Text variant="primarytextcolor2" size={fontSmall}>
              {BAR_CHART_NO_DATA_MESSAGE}
            </Text>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.chartWrapContainer}>
        <View style={styles.chartWrap}>
          {data.map((d, i) => {
            const barHeight = clampStyleNumber(barHeights[i] ?? 0, 2);
            const isNoData = d.value <= 0;
            return (
              <View key={i} style={styles.barSlot}>
                <View style={styles.barColumn}>
                  <View style={{ flex: 1, minHeight: 0 }} />
                  {isNoData ? (
                    <LinearGradient
                      colors={[...BAR_CHART_NO_DATA_GRADIENT_COLORS]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0, y: 1 }}
                      style={[styles.barFill, { height: barHeight }]}
                    />
                  ) : (
                    <View
                      style={[
                        styles.barFill,
                        { height: barHeight, backgroundColor: barColor },
                      ]}
                    />
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* Spacer preserves the y-axis column width; labels overlay after bars. */}
        <View style={styles.yAxis} pointerEvents="none" />
        <View style={styles.chartArea}>{renderChartContent()}</View>
        <View style={styles.chartAreaSpacer} />
        {/* Grid lines then y-axis labels so both sit above the bars (like the divider). */}
        {renderGridLines()}
        {renderYAxis()}
      </View>
      {data.length > 0 && (
        <View style={styles.labelsRowWrapper}>
          <View style={{ width: labelsLeftSpacerWidth }} />
          <View style={styles.labelsRow}>
            {data.map((d, i) => (
              <View key={i} style={styles.labelSlot}>
                <Text
                  variant={d.isActive ? "primarytextcolor" : "primarytextcolor2"}
                  size={fontSmall}
                  bold={d.isActive}
                  numberOfLines={1}
                  overrideStyles={{ textAlign: "center" }}
                >
                  {d.label}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.labelsRowSpacer} />
        </View>
      )}
    </View>
  );
};