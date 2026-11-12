import React, { FC } from "react";
import { useTheme } from "../../context/theme/themeContext";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import {
  fontLarge,
  fontMedium,
  fontMediumLarge,
  fontXXSmall,
  lineHeightMediumLarge,
  radiusS,
  spacingS,
  spacingXS,
  spacingXXS,
} from "../../assets/styles/constants/size";
import { Text } from "../text/Text";
import { useTranslation } from "react-i18next";
import ChevronRight from "../icons/arrows/chevron/ChevronRight";
import { SarFont } from "../sarFont/SarFont";
import BarChartSkeleton from "./BarChartSkeleton";

interface BarChartItemProps {
  label: string;
  percentage: number;
}

interface BarChartWidgetProps {
  headline: string;
  description?: string;
  amount?: string;
  barChartItems: BarChartItemProps[];
  onLinkPress?: () => void;
  linkText?: string;
  loading?: boolean;
}

/**
 * @property headline - Text for the headline
 * @property description - Text for the second line (e.g. when Weekly bar chart is used)
 * @property amount - Amount to be displayed for monthly bar charts or in any case where amount should be visible
 * @property barChartItems - Array of items that have label and percentage to represent activity by week, month etc.
 * @property onLinkPress - Optional callback for handling press event on the "View all" text
 */

export const BarChart: FC<BarChartWidgetProps> = ({
  headline,
  description,
  amount,
  barChartItems,
  onLinkPress,
  linkText,
  loading = false,
}) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const styles = StyleSheet.create({
    container: {
      width: actuatedNormalize(343), // Figma pf.myActivity 343
      borderRadius: radiusS,
      backgroundColor: theme.stylesblockbg,
      padding: spacingS,
      display: "flex",
      flexDirection: "column",
    },
    textContent: {
      display: "flex",
      flexDirection: "column",
    },
    headlineContent: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    linkText: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    amountWrapper: {
      marginVertical: actuatedNormalize(10),
      display: "flex",
      flexDirection: "row",
      gap: spacingXXS,
    },
    barChartContainer: {
      paddingHorizontal: spacingXS,
      paddingVertical: spacingS,
      display: "flex",
      alignItems: "flex-end",
      flexDirection: "row",
      width: "100%",
      gap: actuatedNormalize(10),
    },
    barChartItem: {
      borderTopColor: theme.secondarycolor10,
      borderTopWidth: actuatedNormalize(2),
      backgroundColor: theme.primarycolor4,
    },
    barChartItemContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      gap: spacingXXS,
      flex: 1,
      height: actuatedNormalize(100),
      paddingTop: spacingS,
    },
  });
  return loading ? (
    <BarChartSkeleton />
  ) : (
    <View style={styles.container}>
      <View style={styles.textContent}>
        <View style={styles.headlineContent}>
          <Text bold size={fontLarge} variant="primarytextcolor">
            {headline}
          </Text>
          <TouchableOpacity
            style={styles.linkText}
            onPress={() => onLinkPress && onLinkPress()}
          >
            <Text size={fontMedium}>{linkText || t("viewAll")}</Text>
            <ChevronRight fill={theme.primarytextcolor} />
          </TouchableOpacity>
        </View>
        {description && <Text size={fontMediumLarge}>{description}</Text>}
        {amount && (
          <View style={styles.amountWrapper}>
            <SarFont
              size={fontMediumLarge}
              lineHeight={lineHeightMediumLarge}
            />
            <Text size={fontMediumLarge}>{amount}</Text>
          </View>
        )}
      </View>

      <View style={styles.barChartContainer}>
        {barChartItems.map((item, index) => {
          return (
            <View style={styles.barChartItemContainer} key={index}>
              <View
                style={{
                  ...styles.barChartItem,
                  height: `${item.percentage}%`,
                }}
              ></View>
              <Text
                overrideStyles={{ marginHorizontal: "auto" }}
                size={fontXXSmall}
                variant="primarytextcolor2"
              >
                {item.label}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};
