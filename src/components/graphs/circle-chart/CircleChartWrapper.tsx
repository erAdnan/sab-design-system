import { useState, useMemo, type ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import {
  spacingM,
  spacingXS,
  spacingXXS,
} from "../../../assets/styles/constants/size";
import { useTheme } from "../../../context/theme/themeContext";
import { CircleChartInfo } from "./components/ChartInfo";
import { DonutGraph } from "./components/DonutGraph";
import { CircleChartFilters } from "./components/Filters";
import { CircleChartSegment, CircleChartVariant, TimeFrame } from "./types/types";
import { formatPeriodLabel } from "./utils/formatPeriod";
import { CIRCLE_CHART_SKELETON } from "./utils/constants";
import { SkeletonBox } from "../../skeleton/SkeletonBox";
import { actuatedNormalize } from "../../../assets/styles/utils/pixelScaling";

const DEFAULT_TOTAL_SPENT_LABEL = "Total Spent";
const DEFAULT_CURRENCY = "SAR";

/** Data keyed by time frame; when set, chart shows data for the selected filter. */
export type DataByTimeFrame = Partial<Record<TimeFrame, CircleChartSegment[]>>;

export interface CircleChartWrapperProps {
  totalSpentLabel?: string;
  /** Single dataset (used when dataByTimeFrame is not provided). */
  data?: CircleChartSegment[];
  /** Data per time frame; when provided, chart and total update when the user changes the filter. */
  dataByTimeFrame?: DataByTimeFrame;
  activeTimeFrame?: TimeFrame;
  variant?: CircleChartVariant;
  /** Currency code (e.g. "SAR") for display; use SAR so NewCurrency applies SarFont. Do not pass symbols. */
  currency?: string;
  onTimeFrameChange?: (timeFrame: TimeFrame) => void;
  size?: number;
  /** Donut ring thickness in px. */
  strokeWidth?: number;
  /** Custom icon in the center; receives icon size (px) and icon color (hex). Use the color for fill to match the default icon. */
  renderCenterIcon?: (iconSize: number, iconColor: string) => ReactNode;
  /** Background color for the inner circle behind the center icon. */
  iconBgColor?: string;
  isLoading?: boolean;
}

/**
 * CircleChartWrapper Component
 * @property totalSpentLabel - Label displayed above the total amount (e.g. "Total Spent")
 * @property data - Single dataset when dataByTimeFrame is not provided
 * @property dataByTimeFrame - Data per time frame; chart and total update when the user changes the filter
 * @property activeTimeFrame - Currently selected time frame ("thisMonth" | "lastMonth" | "3Months" | "6Months" | "12Months" | "currentYear" | "lastYear")
 * @property variant - Chart variant affecting styling
 * @property currency - Currency code (e.g. "SAR") for display; use SAR so NewCurrency applies SarFont
 * @property onTimeFrameChange - Callback when the user changes the time frame filter
 * @property size - Chart size in pixels (default: 250)
 * @property strokeWidth - Donut ring thickness in pixels
 * @property renderCenterIcon - Custom icon in the center; receives icon size (px) and icon color (hex)
 * @property iconBgColor - Background color for the inner circle behind the center icon
 * @property isLoading - When true, shows loading skeleton instead of chart
 */
export const CircleChartWrapper = ({
  totalSpentLabel = DEFAULT_TOTAL_SPENT_LABEL,
  data = [],
  dataByTimeFrame,
  activeTimeFrame = "lastMonth",
  currency = DEFAULT_CURRENCY,
  onTimeFrameChange,
  size = 250,
  strokeWidth,
  renderCenterIcon,
  iconBgColor,
  isLoading = false,
}: CircleChartWrapperProps) => {
  const { theme } = useTheme();
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<TimeFrame>(activeTimeFrame);

  const currentData = useMemo(() => {
    if (dataByTimeFrame) {
      return dataByTimeFrame[selectedTimeFrame] ?? data ?? [];
    }
    return data ?? [];
  }, [dataByTimeFrame, selectedTimeFrame, data]);

  const total = useMemo(() => {
    if (!currentData.length) return 0;
    return currentData.reduce((sum, s) => sum + s.value, 0);
  }, [currentData]);

  const periodLabel = useMemo(
    () => formatPeriodLabel(selectedTimeFrame),
    [selectedTimeFrame]
  );

  const handleTimeFrameChange = (timeFrame: TimeFrame) => {
    setSelectedTimeFrame(timeFrame);
    onTimeFrameChange?.(timeFrame);
  };

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      paddingHorizontal: 0,
      paddingVertical: spacingM,
      gap: spacingM,
    },
    chartContainer: {
      alignSelf: "center",
      width: size,
      height: size,
    },
  });

  const InfoSkeleton = () => (
    <View style={skeletonStyles.infoContainer}>
      <View style={skeletonStyles.labelRow}>
        <SkeletonBox
          shape="line"
          size="small"
          overrideStyles={{ width: actuatedNormalize(CIRCLE_CHART_SKELETON.LABEL_WIDTH) }}
        />
        <SkeletonBox
          shape="square"
          size="small"
          overrideStyles={{
            width: spacingXXS,
            height: spacingXXS,
          }}
        />
        <SkeletonBox
          shape="line"
          size="small"
          overrideStyles={{ width: actuatedNormalize(CIRCLE_CHART_SKELETON.PERIOD_WIDTH) }}
        />
      </View>
      <View style={skeletonStyles.amountRow}>
        <SkeletonBox
          shape="line"
          size="medium"
          overrideStyles={{ width: actuatedNormalize(CIRCLE_CHART_SKELETON.CURRENCY_WIDTH) }}
        />
        <SkeletonBox
          shape="line"
          size="extralarge"
          overrideStyles={{ width: actuatedNormalize(CIRCLE_CHART_SKELETON.AMOUNT_WIDTH) }}
        />
      </View>
    </View>
  );

  const skeletonStyles = StyleSheet.create({
    infoContainer: {
      display: "flex",
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
  });

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <DonutGraph
          segments={currentData}
          size={size}
          strokeWidth={strokeWidth}
          renderCenterIcon={renderCenterIcon}
          iconBgColor={iconBgColor}
          emptyRingColor={theme.stylesblockbg}
          isLoading={isLoading}
        />
      </View>
      {isLoading ? (
        <InfoSkeleton />
      ) : (
        <CircleChartInfo
          totalSpentLabel={totalSpentLabel}
          periodLabel={periodLabel}
          totalAmount={`${currency}${total.toFixed(2)}`}
        />
      )}
      <CircleChartFilters
        activeTimeFrame={selectedTimeFrame}
        onTimeFrameChange={handleTimeFrameChange}
        isLoading={isLoading}
      />
    </View>
  );
};
