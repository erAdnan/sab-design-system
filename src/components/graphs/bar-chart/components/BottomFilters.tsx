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
import type { BarChartBottomTimeFrame } from "../types/types";
import { BAR_CHART_SKELETON } from "../utils/constants";
import { SkeletonBox } from "../../../skeleton/SkeletonBox";
import { actuatedNormalize } from "../../../../assets/styles/utils/pixelScaling";
import { useCenterActiveItem } from "../../common/useCenterActiveItem";

export interface BarChartBottomFiltersProps {
  activeTimeFrame: BarChartBottomTimeFrame;
  onTimeFrameChange: (timeFrame: BarChartBottomTimeFrame) => void;
  /** When true, show the 1 Month ("This Month") option. Defaults to true. */
  showOneMonthOption?: boolean;
  /** When true, show the "Last Month" option. Defaults to true. */
  showLastMonthOption?: boolean;
  /** When true, show the "3 Months" option. Defaults to false (hidden). */
  showThreeMonthsOption?: boolean;
  /** When true, show the "6 Months" option. Defaults to true. */
  showSixMonthsOption?: boolean;
  /** When true, show the "12 Months" option. Defaults to true. */
  showTwelveMonthsOption?: boolean;
  /** When true, show the "Current Year" option. Defaults to true. */
  showCurrentYearOption?: boolean;
  /** When true, show the "Last Year" option. Defaults to true. */
  showLastYearOption?: boolean;
  /** When true, shows skeleton loaders while keeping scroll position. */
  isLoading?: boolean;
}

/** Bottom filters: optional 1 Month / Last Month / 3 Months / 6 Months / 12 Months / year chips */
export const BarChartBottomFilters = ({
  activeTimeFrame,
  onTimeFrameChange,
  showOneMonthOption = true,
  showLastMonthOption = true,
  showThreeMonthsOption = false,
  showSixMonthsOption = true,
  showTwelveMonthsOption = true,
  showCurrentYearOption = true,
  showLastYearOption = true,
  isLoading = false,
}: BarChartBottomFiltersProps) => {
  const { theme, isDarkTheme } = useTheme();
  const { t } = useTranslation();
  const {
    scrollRef,
    handleItemLayout,
    handleScrollLayout,
    handleContentSizeChange,
    handleScroll,
  } = useCenterActiveItem<BarChartBottomTimeFrame>(activeTimeFrame);

  const timeFrames: Array<{ key: BarChartBottomTimeFrame; label: string }> = [
    ...(showOneMonthOption
      ? [{ key: "thisMonth" as const, label: t("timeFrame.thisMonth") }]
      : []),
    ...(showLastMonthOption
      ? [{ key: "lastMonth" as const, label: t("timeFrame.lastMonth") }]
      : []),
    ...(showThreeMonthsOption
      ? [{ key: "3Months" as const, label: t("timeFrame.3Months") }]
      : []),
    ...(showSixMonthsOption
      ? [{ key: "6Months" as const, label: t("timeFrame.6Months") }]
      : []),
    ...(showTwelveMonthsOption
      ? [{ key: "12Months" as const, label: t("timeFrame.12Months") }]
      : []),
    ...(showCurrentYearOption
      ? [{ key: "currentYear" as const, label: t("timeFrame.currentYear") }]
      : []),
    ...(showLastYearOption
      ? [{ key: "lastYear" as const, label: t("timeFrame.lastYear") }]
      : []),
  ];

  const activeBg = isDarkTheme ? theme.primarycolor4 : theme.stylesblockbg;

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: spacingXXS,
    },
    scrollView: {
      width: "100%",
    },
    scrollContent: {
      flexGrow: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
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
        style={styles.scrollView}
        keyboardShouldPersistTaps="handled"
        onLayout={handleScrollLayout}
        onContentSizeChange={handleContentSizeChange}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {timeFrames.map((tf) => {
          const isActive = !isLoading && activeTimeFrame === tf.key;
          return (
            <TouchableOpacity
              key={tf.key}
              style={[
                styles.filterButton,
                isActive ? styles.filterButtonActive : styles.filterButtonInactive,
              ]}
              onPress={() => onTimeFrameChange(tf.key)}
              onLayout={(e) => handleItemLayout(tf.key, e)}
              activeOpacity={0.7}
              disabled={isLoading}
            >
              {isLoading ? (
                <SkeletonBox
                  shape="line"
                  size="small"
                  overrideStyles={{
                    width: actuatedNormalize(BAR_CHART_SKELETON.FILTER_BUTTON_WIDTH),
                    height: actuatedNormalize(BAR_CHART_SKELETON.FILTER_BUTTON_HEIGHT),
                    borderRadius: radiusS,
                  }}
                />
              ) : (
                <Text
                  size={fontMedium}
                  variant="primarytextcolor"
                  overrideStyles={{ lineHeight: lineHeightMedium, textAlign: "center" }}
                >
                  {tf.label}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
