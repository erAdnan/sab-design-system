import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useTheme } from "../../../../context/theme/themeContext";
import { useTranslation } from "react-i18next";
import { actuatedNormalize } from "../../../../assets/styles/utils/pixelScaling";
import {
  fontMedium,
  lineHeightMedium,
  radiusS,
  spacingXS,
  spacing1XS,
  spacingS,
  spacingXXS,
  sizeXL,
} from "../../../../assets/styles/constants/size";
import { Text } from "../../../text/Text";
import type { TimeFrame, LineChartAppliedFilter } from "../types/types";
import { Badge, BadgeSize, BadgeType } from "../../../badge/Badge";
import { ChipsFilter } from "../../../chips/ChipsFilter";
import { SkeletonBox } from "../../../skeleton/SkeletonBox";
import { CHART_CONSTANTS } from "../utils/constants";
import { useCenterActiveItem } from "../../common/useCenterActiveItem";
import FilterLight from "../../../../assets/svgs/light/sab360/filter.svg";
import FilterDark from "../../../../assets/svgs/dark/sab360/filter.svg";

export interface LineChartFiltersProps {
  activeTimeFrame: TimeFrame;
  onTimeFrameChange: (timeFrame: TimeFrame) => void;
  onFilterPress?: () => void;
  activeFilterCount?: number;
  appliedFilters?: LineChartAppliedFilter[];
  /** When true, show the "3 Months" option. Defaults to false (hidden). */
  showThreeMonthsOption?: boolean;
  /** When true, shows skeleton loaders while keeping scroll position. */
  isLoading?: boolean;
}

/**
 * LineChartFilters Component - Displays time frame filter buttons
 */
export const LineChartFilters = ({
  activeTimeFrame,
  onTimeFrameChange,
  onFilterPress,
  activeFilterCount = 0,
  appliedFilters = [],
  showThreeMonthsOption = false,
  isLoading = false,
}: LineChartFiltersProps) => {
  const { theme, isDarkTheme } = useTheme();
  const { t } = useTranslation();
  const {
    scrollRef,
    handleItemLayout,
    handleScrollLayout,
    handleContentSizeChange,
    handleScroll,
  } = useCenterActiveItem<TimeFrame>(activeTimeFrame);

  const timeFrames: Array<{ key: TimeFrame; label: string }> = [
     { key: "thisMonth", label: t("timeFrame.thisMonth") },
    { key: "lastMonth", label: t("timeFrame.lastMonth") },
    ...(showThreeMonthsOption
      ? [{ key: "3Months" as const, label: t("timeFrame.3Months") }]
      : []),
    { key: "6Months", label: t("timeFrame.6Months") },
    { key: "12Months", label: t("timeFrame.12Months") },
    { key: "currentYear", label: t("timeFrame.currentYear") },
    { key: "lastYear", label: t("timeFrame.lastYear") },
  ];

  // Use theme variables for active background
  const activeBg = isDarkTheme ? theme.stylesblockbg : theme.stylesblockbg;
  const inactiveBg = "transparent";

  const styles = StyleSheet.create({
    root: {
      gap: spacingS,
      overflow: "visible",
    },
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: spacingXXS,
      overflow: "visible",
    },
    scrollView: {
      flex: 1,
    },
    scrollViewContent: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacingXXS,
      paddingRight: spacingS,
    },
    filterIconWrapper: {
      position: "relative",
      width: actuatedNormalize(24),
      height: actuatedNormalize(24),
      overflow: "visible",
    },
    filterIconButton: {
      width: actuatedNormalize(24),
      height: actuatedNormalize(24),
      justifyContent: "center",
      alignItems: "center",
    },
    filterBadgeWrapper: {
      position: "absolute",
      // Sit above the top-right of the filter icon (Figma)
      right: actuatedNormalize(5),
      top: actuatedNormalize(1),
      zIndex: 1,
    },
    filterButton: {
      borderRadius: spacingXS,
      minWidth: sizeXL,
      paddingVertical: spacing1XS,
      paddingHorizontal: spacingS,
      justifyContent: "center",
      alignItems: "center",
      gap: spacingXXS,
    },
    filterButtonActive: {
      backgroundColor: activeBg,
    },
    filterButtonInactive: {
      backgroundColor: inactiveBg,
    },
    appliedFiltersRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      gap: spacingXS,
    },
  });

  const FilterIcon = isDarkTheme ? FilterDark : FilterLight;

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.filterIconWrapper}>
          {isLoading ? (
            <SkeletonBox
              shape="square"
              size="small"
              overrideStyles={{
                width: actuatedNormalize(CHART_CONSTANTS.SKELETON.FILTER_ICON_SIZE),
                height: actuatedNormalize(CHART_CONSTANTS.SKELETON.FILTER_ICON_SIZE),
              }}
            />
          ) : (
            <TouchableOpacity
              style={styles.filterIconButton}
              onPress={onFilterPress}
              activeOpacity={0.7}
            >
              <FilterIcon
                width={actuatedNormalize(24)}
                height={actuatedNormalize(24)}
              />
            </TouchableOpacity>
          )}
          {!isLoading && activeFilterCount > 0 && (
            <View style={styles.filterBadgeWrapper}>
              <Badge
                size={BadgeSize.xs}
                type={BadgeType.warning}
                number={activeFilterCount}
                containerStyle={{
                  width: actuatedNormalize(8),
                  height: actuatedNormalize(8),
                }}
              />
            </View>
          )}
        </View>
        <ScrollView
          ref={scrollRef}
          style={styles.scrollView}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
          onLayout={handleScrollLayout}
          onContentSizeChange={handleContentSizeChange}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {timeFrames.map((timeFrame) => {
            const isActive = !isLoading && activeTimeFrame === timeFrame.key;
            return (
              <TouchableOpacity
                key={timeFrame.key}
                style={[
                  styles.filterButton,
                  isActive ? styles.filterButtonActive : styles.filterButtonInactive,
                ]}
                onPress={() => onTimeFrameChange(timeFrame.key)}
                onLayout={(e) => handleItemLayout(timeFrame.key, e)}
                activeOpacity={0.7}
                disabled={isLoading}
              >
                {isLoading ? (
                  <SkeletonBox
                    shape="line"
                    size="small"
                    overrideStyles={{
                      width: actuatedNormalize(
                        CHART_CONSTANTS.SKELETON.FILTER_BUTTON_WIDTH
                      ),
                      height: actuatedNormalize(
                        CHART_CONSTANTS.SKELETON.FILTER_BUTTON_HEIGHT
                      ),
                      borderRadius: radiusS,
                    }}
                  />
                ) : (
                  <Text
                    size={fontMedium}
                    variant="primarytextcolor"
                    overrideStyles={{
                      lineHeight: lineHeightMedium,
                      textAlign: "center",
                    }}
                  >
                    {timeFrame.label}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {appliedFilters.length > 0 && (
        <View style={styles.appliedFiltersRow}>
          {appliedFilters.map((filter) => (
            <ChipsFilter
              key={filter.id}
              label={filter.label}
              onClosePress={filter.onRemove}
            />
          ))}
        </View>
      )}
    </View>
  );
};
