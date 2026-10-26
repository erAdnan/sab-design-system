import { useState, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { spacingM, spacingXXS } from "../../../assets/styles/constants/size";
import { LineChartInfo } from "./components/ChartInfo";
import { LineChartGraph, LineChartGraphProps } from "./components/LineChartGraph";
import { LineChartFilters } from "./components/Filters";
import { LineChartDataPoint, TimeFrame, LineChartVariant, LineChartAppliedFilter } from "./types/types";
import {
  filterDataByTimeFrame,
  formatPeriodLabel,
  calculateTotals,
  processMonthlyAggregatedData,
} from "./utils/dataProcessing";
import { isMultiMonthTimeFrame } from "./utils/timeFrameRange";
import { LineGraphSkeleton } from "./components/LineGraphSkeleton";


export interface LineChartWrapperProps {
 totalSpentLabel?: string;
 data?: LineChartDataPoint[];
 activeTimeFrame?: TimeFrame;
 variant?: LineChartVariant;
 xAxisLabels?: string[];
 onTimeFrameChange?: (timeFrame: TimeFrame) => void;
 graphProps?: Omit<LineChartGraphProps, "data">;
 isLoading?: boolean;
 onFilterPress?: () => void;
 activeFilterCount?: number;
 appliedFilters?: LineChartAppliedFilter[];
 showCategoryCredits?: boolean;
 showThreeMonthsOption?:boolean
}


/**
* LineChartWrapper Component
* @property totalSpentLabel - Label displayed above the total amount (e.g. "Total Spent")
* @property data - Line chart data points (value per period)
* @property activeTimeFrame - Currently selected time frame ("thisMonth" | "lastMonth" | "3Months" | "6Months")
* @property variant - Chart variant affecting styling ("primary" | etc.)
* @property xAxisLabels - Optional custom x-axis labels; when provided, used instead of derived labels
* @property onTimeFrameChange - Callback when the user changes the time frame filter
* @property graphProps - Optional props passed to the underlying LineChartGraph (excluding data)
* @property isLoading - When true, shows loading skeleton instead of chart
*/
const DEFAULT_TOTAL_SPENT_LABEL = "Total Spent";


export const LineChartWrapper = ({
 totalSpentLabel = DEFAULT_TOTAL_SPENT_LABEL,
 data = [],
 activeTimeFrame = "thisMonth",
 variant = "primary",
 xAxisLabels,
 onTimeFrameChange,
 graphProps,
 isLoading = false,
 onFilterPress,
 activeFilterCount = 0,
 appliedFilters = [],
 showCategoryCredits = false,
 showThreeMonthsOption=false
}: LineChartWrapperProps) => {
 const [selectedTimeFrame, setSelectedTimeFrame] = useState<TimeFrame>(activeTimeFrame);


 const filteredData = useMemo(() => {
   return filterDataByTimeFrame(data, selectedTimeFrame);
 }, [data, selectedTimeFrame]);


 const processedData = useMemo(() => {
  if (isMultiMonthTimeFrame(selectedTimeFrame)) {
    return processMonthlyAggregatedData(filteredData, selectedTimeFrame);
  }
  return filteredData;
}, [filteredData, selectedTimeFrame]);


const graphData = useMemo(() => {
  return xAxisLabels ? data : processedData;
}, [xAxisLabels, data, processedData]);


const { total, average, currency } = useMemo(() => {
  const dataForTotals = xAxisLabels ? graphData : processedData;
  const filteredForTotals = xAxisLabels ? graphData : filteredData;
  return calculateTotals(dataForTotals, selectedTimeFrame, filteredForTotals);
}, [processedData, selectedTimeFrame, filteredData, xAxisLabels, graphData]);


const periodLabel = useMemo(() => {
  return formatPeriodLabel(selectedTimeFrame);
}, [selectedTimeFrame]);




const handleTimeFrameChange = (timeFrame: TimeFrame) => {
  setSelectedTimeFrame(timeFrame);
  if (onTimeFrameChange) {
    onTimeFrameChange(timeFrame);
  }
};


const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: spacingM,
  },
  graphAndFiltersContainer: {
    gap: spacingXXS,
  },
  filtersSection: {
    marginTop: -spacingM,
    overflow: "visible",
  },
});


const showAverage =
   selectedTimeFrame !== "thisMonth" && selectedTimeFrame !== "lastMonth";

    return (
      <View style={styles.container}>
        {isLoading ? (
          <LineGraphSkeleton />
        ) : (
          <>
            <LineChartInfo
              totalSpentLabel={totalSpentLabel}
              periodLabel={periodLabel}
              totalAmount={`${currency}${total.toFixed(2)}`}
              averageAmount={`${currency}${average.toFixed(2)}`}
              showAverage={showAverage}
            />
            <View style={styles.graphAndFiltersContainer}>
              <LineChartGraph
                data={graphData}
                timeFrame={selectedTimeFrame}
                variant={variant}
                xAxisLabels={xAxisLabels}
                showCategoryCredits={showCategoryCredits}
                {...graphProps}
              />
              {!xAxisLabels && (
                <View style={styles.filtersSection}>
                  <LineChartFilters
                    onFilterPress={onFilterPress}
                    activeTimeFrame={selectedTimeFrame}
                    onTimeFrameChange={handleTimeFrameChange}
                    activeFilterCount={activeFilterCount}
                    appliedFilters={appliedFilters}
                    showThreeMonthsOption={showThreeMonthsOption}
                  />
                </View>
              )}
            </View>
          </>
        )}
      </View>
    );
};
