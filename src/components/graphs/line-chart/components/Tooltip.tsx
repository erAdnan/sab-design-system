import React, { FC } from "react";
import { G, Path, Text as SvgText } from "react-native-svg";
import { actuatedNormalize } from "../../../../assets/styles/utils/pixelScaling";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../../context/theme/themeContext";
import { CHART_CONSTANTS } from "../utils/constants";
import { fontWeightNormal } from "../../../../assets/styles/constants/size";
import fonts from "../../../../assets/styles/constants/fonts";
import {
  formatCurrencyForDisplay,
  formatTooltipAmountParts,
  formatTooltipDate,
  type TooltipAmountParts,
} from "../utils/tooltipFormatting";

/** Approx advance widths so currency + amount can sit side-by-side (no TSpan — RN SVG stacks those). */
const estimateHsbcWidth = (text: string, fontSize: number) =>
  text.length * fontSize * 0.56;

const estimateCurrencyWidth = (currencyLabel: string, fontSize: number) => {
  if (currencyLabel.toUpperCase() === "SAR") {
    // SAR_Font collapses "SAR" into one riyal glyph
    return fontSize * 0.95;
  }
  return estimateHsbcWidth(currencyLabel, fontSize);
};

const estimateAmountLineWidth = (parts: TooltipAmountParts, fontSize: number) => {
  const prefixWidth = estimateHsbcWidth(parts.prefix, fontSize);
  const currencyWidth = estimateCurrencyWidth(parts.currencyLabel, fontSize);
  const gap = fontSize * 0.28;
  const amountWidth = estimateHsbcWidth(parts.amountLabel, fontSize);
  return prefixWidth + currencyWidth + gap + amountWidth;
};

/**
 * Renders currency glyph + amount as two SvgText nodes (start-anchored).
 * Avoids TSpan fontFamily switches, which overlap on react-native-svg.
 */
const TooltipAmountText = ({
  centerX,
  y,
  fontSize,
  fill,
  parts,
}: {
  centerX: number;
  y: number;
  fontSize: number;
  fill: string;
  parts: TooltipAmountParts;
}) => {
  const currencyFontFamily = formatCurrencyForDisplay(parts.currencyLabel)
    .fontFamily;
  const prefixWidth = estimateHsbcWidth(parts.prefix, fontSize);
  const currencyWidth = estimateCurrencyWidth(parts.currencyLabel, fontSize);
  const gap = fontSize * 0.28;
  const totalWidth = estimateAmountLineWidth(parts, fontSize);
  const startX = centerX - totalWidth / 2;
  const amountX = startX + prefixWidth + currencyWidth + gap;

  return (
    <>
      {parts.prefix ? (
        <SvgText
          x={startX}
          y={y}
          fontSize={fontSize}
          fill={fill}
          textAnchor="start"
          fontFamily={fonts.HSBC}
          dy={`${CHART_CONSTANTS.TOOLTIP.TEXT_VERTICAL_ALIGN}em`}
        >
          {parts.prefix}
        </SvgText>
      ) : null}
      <SvgText
        x={startX + prefixWidth}
        y={y}
        fontSize={fontSize}
        fill={fill}
        textAnchor="start"
        fontFamily={currencyFontFamily}
        dy={`${CHART_CONSTANTS.TOOLTIP.TEXT_VERTICAL_ALIGN}em`}
      >
        {parts.currencyLabel}
      </SvgText>
      <SvgText
        x={amountX}
        y={y}
        fontSize={fontSize}
        fill={fill}
        textAnchor="start"
        fontFamily={fonts.HSBC}
        fontWeight={fontWeightNormal}
        dy={`${CHART_CONSTANTS.TOOLTIP.TEXT_VERTICAL_ALIGN}em`}
      >
        {parts.amountLabel}
      </SvgText>
    </>
  );
};

export interface LineChartTooltipProps {
  x: number;
  y: number;
  currency: string;
  amount: number;
  date: string;
  creditAmount?: number;
  showCategoryCredits?: boolean;
  isTopHalf: boolean;
  /** When true (RTL), counter-flip tooltip content so numbers read correctly (not mirrored) */
  isRTL?: boolean;
  /** Full chart width. Used to keep only the tooltip overlay inside the visible chart. */
  chartWidth?: number;
}

const createTopArrowPath = (arrowCenter: number) => {
  const x = (offset: number) => (arrowCenter + offset).toFixed(4);

  return `M75.1084 49.6222H3.61311C1.89379 49.6222 0.5 48.2284 0.5 46.5091V16.0032C0.5 13.2418 2.73858 11.0032 5.50001 11.0032H${x(-8.3708)}C${x(-7.6563)} 11.0032 ${x(-6.996)} 10.622 ${x(-6.6387)} 10.0032L${x(-1.7294)} 1.50003C${x(-0.9621)} 0.171019 ${x(0.9543)} 0.165635 ${x(1.729)} 1.49031L${x(6.7137)} 10.0129C${x(7.0724)} 10.6263 ${x(7.7296)} 11.0032 ${x(8.4401)} 11.0032H75.1084C77.8698 11.0032 80.1084 13.2418 80.1084 16.0032V44.6222C80.1084 47.3836 77.8698 49.6222 75.1084 49.6222Z`;
};

const createBottomArrowPath = (arrowCenter: number) => {
  const x = (offset: number) => (arrowCenter + offset).toFixed(4);

  return `M5.49999 0.499971L76.9953 0.499977C78.7146 0.499977 80.1084 1.89376 80.1084 3.61308L80.1084 34.119C80.1084 36.8804 77.8698 39.119 75.1084 39.119L${x(8.3652)} 39.119C${x(7.6506)} 39.119 ${x(6.9904)} 39.5002 ${x(6.6331)} 40.119L${x(1.7238)} 48.6222C${x(0.9565)} 49.9512 ${x(-0.9599)} 49.9566 ${x(-1.7347)} 48.6319L${x(-6.7193)} 40.1092C${x(-7.078)} 39.4959 ${x(-7.7352)} 39.119 ${x(-8.4457)} 39.119L5.5 39.119C2.73858 39.119 0.499999 36.8804 0.5 34.119L0.500002 5.49997C0.500002 2.73855 2.73857 0.49997 5.49999 0.499971Z`;
};

/**
 * LineChartTooltip Component - Renders tooltip above or below the dot
 */
export const LineChartTooltip: FC<LineChartTooltipProps> = ({
  x,
  y,
  currency,
  amount,
  date,
  creditAmount = 0,
  showCategoryCredits = false,
  isTopHalf,
  isRTL,
  chartWidth,
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const amountParts = formatTooltipAmountParts(currency, amount);
  const creditParts = formatTooltipAmountParts(currency, creditAmount, {
    prefix: "+",
  });
  const dateText = formatTooltipDate(date, t);
  const amountFontSize = actuatedNormalize(
    CHART_CONSTANTS.FONT_SIZE.TOOLTIP_AMOUNT
  );
  const dateFontSize = actuatedNormalize(CHART_CONSTANTS.FONT_SIZE.TOOLTIP_DATE);

  const amountLineWidth = estimateAmountLineWidth(amountParts, amountFontSize);
  const secondaryLineWidth = showCategoryCredits
    ? estimateAmountLineWidth(creditParts, dateFontSize)
    : estimateHsbcWidth(dateText, dateFontSize);
  const contentWidth = Math.max(amountLineWidth, secondaryLineWidth);
  const horizontalPadding = actuatedNormalize(12);
  const tooltipWidth = Math.max(
    actuatedNormalize(CHART_CONSTANTS.TOOLTIP.WIDTH),
    contentWidth + horizontalPadding * 2
  );
  const tooltipHeight = actuatedNormalize(CHART_CONSTANTS.TOOLTIP.HEIGHT);

  const centeredTooltipX = x - tooltipWidth / 2;
  const maxTooltipX = Math.max(0, (chartWidth ?? tooltipWidth) - tooltipWidth);
  const tooltipX = chartWidth
    ? Math.max(0, Math.min(centeredTooltipX, maxTooltipX))
    : centeredTooltipX;
  const scaleX = tooltipWidth / CHART_CONSTANTS.TOOLTIP.ORIGINAL_WIDTH;
  const anchorWithinTooltip = x - tooltipX;
  const visualAnchorWithinTooltip = isRTL
    ? tooltipWidth - anchorWithinTooltip
    : anchorWithinTooltip;
  const arrowCenter = Math.max(
    CHART_CONSTANTS.TOOLTIP.ARROW_EDGE_INSET,
    Math.min(
      visualAnchorWithinTooltip / scaleX,
      CHART_CONSTANTS.TOOLTIP.ORIGINAL_WIDTH -
        CHART_CONSTANTS.TOOLTIP.ARROW_EDGE_INSET
    )
  );
  const tooltipPath = isTopHalf
    ? createTopArrowPath(arrowCenter)
    : createBottomArrowPath(arrowCenter);
  let tooltipY: number;

  if (isTopHalf) {
    tooltipY =
      y +
      CHART_CONSTANTS.TOOLTIP.VERTICAL_SPACING +
      actuatedNormalize(CHART_CONSTANTS.TOOLTIP.VERTICAL_OFFSET);
  } else {
    tooltipY =
      y -
      CHART_CONSTANTS.TOOLTIP.VERTICAL_SPACING -
      tooltipHeight -
      actuatedNormalize(CHART_CONSTANTS.TOOLTIP.VERTICAL_OFFSET);
  }

  const amountTextY = isTopHalf
    ? actuatedNormalize(CHART_CONSTANTS.TOOLTIP.AMOUNT_TEXT_Y_TOP)
    : actuatedNormalize(CHART_CONSTANTS.TOOLTIP.AMOUNT_TEXT_Y_BOTTOM);

  const dateTextY =
    amountTextY + actuatedNormalize(CHART_CONSTANTS.TOOLTIP.DATE_TEXT_OFFSET);

  const secondaryLineColor = showCategoryCredits
    ? theme.secondarycolor10
    : theme.primarycolorstatic;

  // In RTL the chart has scaleX:-1, so tooltip content is mirrored. Counter-flip around tooltip center so numbers read correctly.
  const centerX = tooltipWidth / 2;
  const centerY = tooltipHeight / 2;
  const counterFlipTransform = isRTL
    ? `translate(${centerX}, ${centerY}) scale(-1, 1) translate(${-centerX}, ${-centerY})`
    : undefined;

  const content = (
    <>
      <G
        transform={`scale(${tooltipWidth / CHART_CONSTANTS.TOOLTIP.ORIGINAL_WIDTH}, ${tooltipHeight / CHART_CONSTANTS.TOOLTIP.ORIGINAL_HEIGHT})`}
      >
        <Path
          d={tooltipPath}
          fill={theme.primarycolor4static || "#FFFFFF"}
          stroke={theme.strokeBorderColor || "#D7D8D6"}
          strokeWidth={
            CHART_CONSTANTS.TOOLTIP.STROKE_WIDTH_DIVISOR /
            (tooltipWidth / CHART_CONSTANTS.TOOLTIP.ORIGINAL_WIDTH)
          }
          strokeOpacity={1}
        />
      </G>
      <TooltipAmountText
        centerX={tooltipWidth / 2}
        y={amountTextY}
        fontSize={amountFontSize}
        fill={theme.primarycolorstatic}
        parts={amountParts}
      />
      {showCategoryCredits ? (
        <TooltipAmountText
          centerX={tooltipWidth / 2}
          y={dateTextY}
          fontSize={dateFontSize}
          fill={secondaryLineColor}
          parts={creditParts}
        />
      ) : (
        <SvgText
          x={tooltipWidth / 2}
          y={dateTextY}
          fontSize={dateFontSize}
          fill={secondaryLineColor}
          textAnchor="middle"
          fontWeight={fontWeightNormal}
          fontFamily={fonts.HSBC}
          dy={`${CHART_CONSTANTS.TOOLTIP.TEXT_VERTICAL_ALIGN}em`}
        >
          {dateText}
        </SvgText>
      )}
    </>
  );

  return (
    <G transform={`translate(${tooltipX}, ${tooltipY})`}>
      {counterFlipTransform ? (
        <G transform={counterFlipTransform}>{content}</G>
      ) : (
        content
      )}
    </G>
  );
};
