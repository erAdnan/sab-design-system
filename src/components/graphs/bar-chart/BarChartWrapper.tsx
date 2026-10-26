import { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { spacingM, spacingXS, spacingXXS, radiusS } from "../../../assets/styles/constants/size";
import { actuatedNormalize } from "../../../assets/styles/utils/pixelScaling";
import { SkeletonBox } from "../../skeleton/SkeletonBox";
import { BarChartInfo } from "./components/ChartInfo";
import { BarChartGraph } from "./components/BarChartGraph";
import { BarChartBottomFilters } from "./components/BottomFilters";
import { BarChartTopFilters } from "./components/TopFilters";
import { BAR_CHART_SKELETON } from "./utils/constants";
import { ensureFixedBarSlots } from "./utils/chartUtils";
import type {
  BarChartDataPoint,
  BarChartFilterVariant,
  BarChartAmountSuffix,
  BarChartTopGranularity,
  BarChartBottomTimeFrame,
} from "./types/types";

const DEFAULT_TOTAL_LABEL = "Total Spent";

export interface BarChartWrapperProps {
  totalLabel?: string;
  totalSpentLabel?: string;
  periodLabel: string;
  totalAmount: number | string;
  currency?: string;
  amountSuffix: BarChartAmountSuffix;
  data: BarChartDataPoint[];
  yAxisTicks?: number[];
  barColor?: string;
  filterVariant: BarChartFilterVariant;
  activeBottomTimeFrame?: BarChartBottomTimeFrame;
  onBottomTimeFrameChange?: (tf: BarChartBottomTimeFrame) => void;
  showOneMonthOption?: boolean;
  showLastMonthOption?: boolean;
  showThreeMonthsOption?: boolean;
  showSixMonthsOption?: boolean;
  showTwelveMonthsOption?: boolean;
  showCurrentYearOption?: boolean;
  showLastYearOption?: boolean;
  topGranularity?: BarChartTopGranularity;
  onTopGranularityChange?: (g: BarChartTopGranularity) => void;
  onPreviousPeriod?: () => void;
  onNextPeriod?: () => void;
  canGoPrevious?: boolean;
  canGoNext?: boolean;
  showTopGranularitySwitch?: boolean;
  isLoading?: boolean;
}

/**
 * BarChartWrapper Component
 * @property totalLabel - Full label for the total (e.g. "Total Spent", "Total CO₂e"). Fully customizable.
 * @property totalSpentLabel - Deprecated. Use totalLabel. Kept for backward compatibility.
 * @property periodLabel - Period label (e.g. "May 2025", "29 June 25 - 5 July 25")
 * @property totalAmount - Total amount as number or pre-formatted string; if number, formatted to 2 decimals
 * @property currency - Currency when amountSuffix is "currency" (e.g. "SAR")
 * @property amountSuffix - Show amount with SAR font or " Kg" suffix ("currency" | "kg")
 * @property data - Bar data: label, value, isActive (for highlighted label). Sum of values can drive total.
 * @property yAxisTicks - Optional Y-axis tick values (e.g. [100, 1000]). Defaults to [1000, 10000].
 * @property barColor - Optional fill color for the bars. Defaults to the green BAR_CHART_COLOR.
 * @property filterVariant - "top" (Weekly/Monthly + date nav) or "bottom" (This Month / Last Month / 3 Months)
 * @property activeBottomTimeFrame - When filterVariant is "bottom": active selection
 * @property onBottomTimeFrameChange - Callback when bottom time frame filter changes
 * @property showOneMonthOption - When filterVariant is "bottom": if true, show the 1 Month option; default true
 * @property showLastMonthOption - When filterVariant is "bottom": if true, show the "Last Month" option; default true
 * @property showThreeMonthsOption - When filterVariant is "bottom": if true, show the "3 Months" option; default false
 * @property showSixMonthsOption - When filterVariant is "bottom": if true, show the "6 Months" option; default true
 * @property showTwelveMonthsOption - When filterVariant is "bottom": if true, show the "12 Months" option; default true
 * @property showCurrentYearOption - When filterVariant is "bottom": if true, show the "Current Year" option; default true
 * @property showLastYearOption - When filterVariant is "bottom": if true, show the "Last Year" option; default true
 * @property topGranularity - When filterVariant is "top": "weekly" or "monthly"
 * @property onTopGranularityChange - Callback when top granularity (Weekly/Monthly) changes
 * @property onPreviousPeriod - Callback when previous period arrow is pressed (top filters)
 * @property onNextPeriod - Callback when next period arrow is pressed (top filters)
 * @property canGoPrevious - Whether previous period arrow is enabled (top filters)
 * @property canGoNext - Whether next period arrow is enabled (top filters)
 * @property showTopGranularitySwitch - When filterVariant is "top": if true, show Weekly/Monthly toggle; default false
 * @property isLoading - When true, shows loading skeleton instead of chart
 */
export const BarChartWrapper = ({
  totalLabel,
  totalSpentLabel,
  periodLabel,
  totalAmount,
  currency = "SAR",
  amountSuffix,
  data,
  yAxisTicks,
  barColor,
  filterVariant,
  activeBottomTimeFrame = "thisMonth",
  onBottomTimeFrameChange,
  showOneMonthOption = true,
  showLastMonthOption = true,
  showThreeMonthsOption = false,
  showSixMonthsOption = true,
  showTwelveMonthsOption = true,
  showCurrentYearOption = true,
  showLastYearOption = true,
  topGranularity = "weekly",
  onTopGranularityChange,
  onPreviousPeriod,
  onNextPeriod,
  canGoPrevious = true,
  canGoNext = true,
  showTopGranularitySwitch = false,
  isLoading = false,
}: BarChartWrapperProps) => {
  const amountStr = typeof totalAmount === "number" ? totalAmount.toFixed(2) : totalAmount;
  const effectiveTotalLabel =
    totalLabel ?? totalSpentLabel ?? DEFAULT_TOTAL_LABEL;

  // Bottom filters always render a fixed slot count per time frame so sparse
  // API data cannot collapse the chart layout (e.g. This Month → 4 weeks).
  const chartData = useMemo(() => {
    if (filterVariant !== "bottom") return data ?? [];
    return ensureFixedBarSlots(data ?? [], activeBottomTimeFrame);
  }, [data, filterVariant, activeBottomTimeFrame]);

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      paddingLeft: 0,
      paddingRight: 0,
      paddingVertical: spacingM,
      gap: spacingXS,
      alignItems: "stretch",
    },
    chartAndFiltersBlock: {
      width: "100%",
      alignSelf: "stretch",
      alignItems: "stretch",
      gap: spacingM,
    },
  });

  const skeletonStyles = StyleSheet.create({
    infoContainer: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: spacingXS,
      alignSelf: "stretch",
    },
    labelRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacingXS,
    },
    amountRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacingXXS,
    },
    chartContainer: {
      width: "100%",
      alignSelf: "stretch",
    },
  });

  const InfoSkeleton = () => (
    <View style={skeletonStyles.infoContainer}>
      <View style={skeletonStyles.labelRow}>
        <SkeletonBox
          shape="line"
          size="small"
          overrideStyles={{ width: actuatedNormalize(BAR_CHART_SKELETON.LABEL_WIDTH) }}
        />
        <SkeletonBox
          shape="square"
          size="small"
          overrideStyles={{ width: spacingXXS, height: spacingXXS }}
        />
        <SkeletonBox
          shape="line"
          size="small"
          overrideStyles={{ width: actuatedNormalize(BAR_CHART_SKELETON.PERIOD_WIDTH) }}
        />
      </View>
      <View style={skeletonStyles.amountRow}>
        <SkeletonBox
          shape="line"
          size="extralarge"
          overrideStyles={{ width: actuatedNormalize(BAR_CHART_SKELETON.AMOUNT_WIDTH) }}
        />
      </View>
    </View>
  );

  const ChartSkeleton = () => (
    <View style={skeletonStyles.chartContainer}>
      <SkeletonBox
        shape="square"
        size="extralarge"
        overrideStyles={{
          width: "80%",
          height: actuatedNormalize(BAR_CHART_SKELETON.CHART_HEIGHT),
          borderRadius: radiusS,
          marginHorizontal: "auto",
        }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {filterVariant === "top" && (
        <BarChartTopFilters
          granularity={topGranularity}
          onGranularityChange={onTopGranularityChange ?? (() => {})}
          periodLabel={periodLabel}
          onPrevious={onPreviousPeriod ?? (() => {})}
          onNext={onNextPeriod ?? (() => {})}
          canGoPrevious={canGoPrevious}
          canGoNext={canGoNext}
          showGranularitySwitch={showTopGranularitySwitch}
          isLoading={isLoading}
        />
      )}

      {isLoading ? (
        <InfoSkeleton />
      ) : (
        <BarChartInfo
          totalSpentLabel={effectiveTotalLabel}
          periodLabel={periodLabel}
          showPeriodLabel={filterVariant !== "top"}
          totalAmount={amountStr}
          amountSuffix={amountSuffix}
          currency={currency}
        />
      )}

      <View style={styles.chartAndFiltersBlock}>
        {isLoading ? (
          <ChartSkeleton />
        ) : (
          <BarChartGraph
            data={chartData}
            amountSuffix={amountSuffix}
            currency={currency}
            yAxisTicks={yAxisTicks}
            barColor={barColor}
          />
        )}

        {filterVariant === "bottom" && (
          <BarChartBottomFilters
            activeTimeFrame={activeBottomTimeFrame}
            onTimeFrameChange={onBottomTimeFrameChange ?? (() => {})}
            showOneMonthOption={showOneMonthOption}
            showLastMonthOption={showLastMonthOption}
            showThreeMonthsOption={showThreeMonthsOption}
            showSixMonthsOption={showSixMonthsOption}
            showTwelveMonthsOption={showTwelveMonthsOption}
            showCurrentYearOption={showCurrentYearOption}
            showLastYearOption={showLastYearOption}
            isLoading={isLoading}
          />
        )}
      </View>
    </View>
  );
};
