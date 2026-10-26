import React from "react";
import { I18nManager } from "react-native";
import { G, Text as SvgText, Svg } from "react-native-svg";
import { useTheme } from "../../../../context/theme/themeContext";
import { CHART_CONSTANTS } from "./constants";
import fonts from "../../../../assets/styles/constants/fonts";
import { TimeFrame } from "../types/types";

interface XAxisDecoratorProps {
  labels: string[];
  activeMonthIndex?: number;
  contentInset: { top: number; bottom: number; left: number; right: number };
  chartHeight: number;
  chartWidth: number;
  dataIndices: number[];
  timeFrame?: TimeFrame;
  /** When true (e.g. custom xAxisLabels), do not apply horizontal inset so labels use full width */
  hasCustomLabels?: boolean;
  /** When true (e.g. Arabic), label order is reversed so first label is on the right */
  isRTL?: boolean;
  /** When set (e.g. when bottom line is hidden), move labels up by this many px */
  labelsUpBy?: number;
}

export const CustomXAxisDecorator = ({
  labels,
  activeMonthIndex,
  contentInset,
  chartHeight,
  chartWidth,
  dataIndices,
  timeFrame,
  hasCustomLabels,
  isRTL: isRTLProp,
  labelsUpBy = 0,
}: XAxisDecoratorProps) => {
  const { theme } = useTheme();
  const isRTL = isRTLProp ?? I18nManager.isRTL;

  const xAxisMargin = CHART_CONSTANTS.X_AXIS_MARGIN;
  const availableWidth = chartWidth - (xAxisMargin * 2);
  const chartAreaWidth = availableWidth - contentInset.left - contentInset.right;
  const dataLength = dataIndices.length;
  const labelY = chartHeight - (CHART_CONSTANTS.X_AXIS_LABEL_GAP ?? 12) - labelsUpBy;

  // Chart plot stays full width. Pull first/last x-axis labels inward so week
  // and multi-month (3/6/12 months, year) edge labels don’t clip.
  const useHorizontalInset = timeFrame !== undefined && !hasCustomLabels;
  const horizontalInset = useHorizontalInset
    ? (CHART_CONSTANTS.X_AXIS_LABEL_HORIZONTAL_INSET ?? 28)
    : 0;
  const labelAreaWidth = Math.max(0, chartAreaWidth - 2 * horizontalInset);
  // Center the label strip in the chart so left and right spacing are equal
  const labelAreaLeft = (chartWidth - labelAreaWidth) / 2;
  const labelAreaRight = labelAreaLeft + labelAreaWidth;

  const calculateXPosition = (index: number): number => {
    if (dataLength <= 1) {
      return labelAreaLeft + labelAreaWidth / 2;
    }
    const step = labelAreaWidth / (dataLength - 1);
    const xPos = labelAreaLeft + index * step;
    return Math.max(labelAreaLeft, Math.min(labelAreaRight, xPos));
  };

  // Labels are centered on their x position, so edge labels can spill half of
  // their width past the chart bounds and get clipped by the parent. Clamp the
  // center so the estimated text extent stays within [0, chartWidth].
  const AVG_CHAR_WIDTH_RATIO = 0.6;
  const clampToChartBounds = (xPos: number, label: string): number => {
    const halfTextWidth =
      (label.length * CHART_CONSTANTS.FONT_SIZE.X_AXIS * AVG_CHAR_WIDTH_RATIO) / 2;
    return Math.max(halfTextWidth, Math.min(chartWidth - halfTextWidth, xPos));
  };

  // In RTL, first label (index 0) goes on the right, last on the left – mirror position by index
  const getLabelXPosition = (index: number, label: string): number => {
    if (timeFrame === "lastYear" && dataLength > 2) {
      const nonEmptyIndices = dataIndices.filter((dataIndex) => labels[dataIndex]);
      const firstIdx = nonEmptyIndices[0];
      const lastIdx = nonEmptyIndices[nonEmptyIndices.length - 1];

      let xPos: number;
      if (index === firstIdx) {
        xPos = isRTL ? labelAreaRight : labelAreaLeft;
      } else if (index === lastIdx) {
        xPos = isRTL ? labelAreaLeft : labelAreaRight;
      } else {
        xPos = labelAreaLeft + labelAreaWidth / 2;
      }
      return clampToChartBounds(xPos, label);
    }

    const xPos = isRTL
      ? calculateXPosition(dataLength - 1 - index)
      : calculateXPosition(index);
    return clampToChartBounds(xPos, label);
  };

  return (
    <Svg
      style={{ 
        position: "absolute", 
        bottom: 0, 
        left: 0, 
        width: chartWidth, 
        height: chartHeight + CHART_CONSTANTS.X_AXIS_STYLE_HEIGHT 
      }}
      pointerEvents="none"
    >
      <G>
        {dataIndices.map((index: number) => {
          const label = labels[index];
          if (!label) return null;

          const xPos = getLabelXPosition(index, label);
          const isActive = activeMonthIndex !== undefined && index === activeMonthIndex;
          const labelColor = isActive ? theme.primarycolor : theme.primarytextcolor2;

          return (
            <G key={`x-axis-label-${index}`}>
              <SvgText
                x={xPos}
                y={labelY}
                fontSize={CHART_CONSTANTS.FONT_SIZE.X_AXIS}
                fill={labelColor}
                textAnchor="middle"
                fontFamily={isActive ? fonts.HSBC_Bold : fonts.HSBC}
              >
                {label}
              </SvgText>
            </G>
          );
        })}
      </G>
    </Svg>
  );
};
