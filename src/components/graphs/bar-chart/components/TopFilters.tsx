import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../../../context/theme/themeContext";
import {
  fontMedium,
  lineHeightMedium,
  radiusS,
  spacingXS,
  spacingS,
} from "../../../../assets/styles/constants/size";
import { SegmentedButton } from "../../../button/SegmentedButton";
import { Text } from "../../../text/Text";
import ChevronLeft from "../../../icons/arrows/chevron/ChevronLeft";
import ChevronRight from "../../../icons/arrows/chevron/ChevronRight";
import type { BarChartTopGranularity } from "../types/types";
import { SkeletonBox } from "../../../skeleton/SkeletonBox";
import { actuatedNormalize } from "../../../../assets/styles/utils/pixelScaling";
import { BAR_CHART_SKELETON } from "../utils/constants";

export interface BarChartTopFiltersProps {
  granularity: BarChartTopGranularity;
  onGranularityChange: (g: BarChartTopGranularity) => void;
  periodLabel: string;
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious?: boolean;
  canGoNext?: boolean;
  /** When false, hide the Weekly/Monthly segmented control (e.g. for fixed weekly or monthly stories) */
  showGranularitySwitch?: boolean;
  /** When true, shows skeleton loaders for the top filters. */
  isLoading?: boolean;
}

/** Top filters: Weekly/Monthly segmented control (optional), date nav with arrows */
export const BarChartTopFilters = ({
  granularity,
  onGranularityChange,
  periodLabel,
  onPrevious,
  onNext,
  canGoPrevious = true,
  canGoNext = true,
  showGranularitySwitch = true,
  isLoading = false,
}: BarChartTopFiltersProps) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      gap: spacingXS,
    },
    navRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: spacingXS,
    },
    navButton: {
      padding: spacingS,
      width: 48,
      height: 48,
      alignItems: "center",
      justifyContent: "center",
    },
    navLabelWrap: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    loadingRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: spacingXS,
      paddingVertical: spacingXS,
    },
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        {showGranularitySwitch && (
          <View style={styles.loadingRow}>
            <SkeletonBox
              shape="line"
              size="small"
              overrideStyles={{
                width: actuatedNormalize(160), maxWidth: "100%", flexShrink: 1,
                height: actuatedNormalize(BAR_CHART_SKELETON.TOP_FILTER_NAV_HEIGHT),
                borderRadius: radiusS,
              }}
            />
          </View>
        )}
        <View style={styles.loadingRow}>
          <SkeletonBox
            shape="line"
            size="small"
            overrideStyles={{
              width: actuatedNormalize(80),
              height: actuatedNormalize(BAR_CHART_SKELETON.TOP_FILTER_NAV_HEIGHT),
              borderRadius: radiusS,
            }}
          />
          <SkeletonBox
            shape="line"
            size="small"
            overrideStyles={{
              width: actuatedNormalize(120),
              height: actuatedNormalize(BAR_CHART_SKELETON.TOP_FILTER_NAV_HEIGHT),
              borderRadius: radiusS,
            }}
          />
          <SkeletonBox
            shape="line"
            size="small"
            overrideStyles={{
              width: actuatedNormalize(80),
              height: actuatedNormalize(BAR_CHART_SKELETON.TOP_FILTER_NAV_HEIGHT),
              borderRadius: radiusS,
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {showGranularitySwitch && (
        <SegmentedButton
          count={2}
          activeTab={granularity === "weekly" ? 1 : 2}
          buttonOne={{
            buttonText: "Weekly",
            onButtonPress: () => onGranularityChange("weekly"),
          }}
          buttonTwo={{
            buttonText: "Monthly",
            onButtonPress: () => onGranularityChange("monthly"),
          }}
        />
      )}
      <View style={styles.navRow}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={onPrevious}
          disabled={!canGoPrevious}
          activeOpacity={0.7}
        >
          <ChevronLeft
            width={24}
            height={24}
            fill={theme.primarytextcolor}
            style={!canGoPrevious && { opacity: 0.4 }}
          />
        </TouchableOpacity>
        <View style={styles.navLabelWrap}>
          <Text
            variant="primarytextcolor"
            size={fontMedium}
            numberOfLines={1}
            overrideStyles={{ lineHeight: lineHeightMedium, textAlign: "center" }}
          >
            {periodLabel}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.navButton}
          onPress={onNext}
          disabled={!canGoNext}
          activeOpacity={0.7}
        >
          <ChevronRight
            width={24}
            height={24}
            fill={theme.primarytextcolor}
            style={!canGoNext && { opacity: 0.4 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
