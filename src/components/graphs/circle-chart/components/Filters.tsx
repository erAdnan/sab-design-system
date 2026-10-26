import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useTheme } from "../../../../context/theme/themeContext";
import { useTranslation } from "react-i18next";
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
import type { TimeFrame } from "../types/types";
import { CIRCLE_CHART_SKELETON } from "../utils/constants";
import { SkeletonBox } from "../../../skeleton/SkeletonBox";
import { actuatedNormalize } from "../../../../assets/styles/utils/pixelScaling";
import { useCenterActiveItem } from "../../common/useCenterActiveItem";

export interface CircleChartFiltersProps {
  activeTimeFrame: TimeFrame;
  onTimeFrameChange: (timeFrame: TimeFrame) => void;
  /** When true, shows skeleton loaders while keeping scroll position. */
  isLoading?: boolean;
}

/**
 * CircleChartFilters - Scrollable time frame filters
 */
export const CircleChartFilters = ({
  activeTimeFrame,
  onTimeFrameChange,
  isLoading = false,
}: CircleChartFiltersProps) => {
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
    { key: "3Months", label: t("timeFrame.3Months") },
    { key: "6Months", label:t("timeFrame.6Months") },
    { key: "12Months", label: t("timeFrame.12Months") },
    { key: "currentYear", label: t("timeFrame.currentYear")},
    { key: "lastYear", label:t("timeFrame.lastYear")},
  ];

  const activeBg = isDarkTheme ? theme.primarycolor4 : theme.stylesblockbg;

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      gap: spacingXXS,
      overflow: "visible",
    },
    scrollContent: {
      flexGrow: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: spacingXXS,
      paddingHorizontal: spacingS,
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
      backgroundColor: "transparent",
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
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
                    width: actuatedNormalize(CIRCLE_CHART_SKELETON.FILTER_BUTTON_WIDTH),
                    height: actuatedNormalize(CIRCLE_CHART_SKELETON.FILTER_BUTTON_HEIGHT),
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
  );
};
