import React, { FC, useMemo } from "react";
import { useTheme } from "../../context/theme/themeContext";
import { StyleSheet, View } from "react-native";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import {
  fontMediumLarge,
  fontSmall,
  fontSmallMedium,
  fontXLarge,
  fontXSmall,
  lineHeightMediumLarge,
  lineHeightXLarge,
  lineHeightXSmall,
  radiusS,
  spacingS,
  spacingXXS,
  spacingXXXS,
} from "../../assets/styles/constants/size";
import { Text } from "../text/Text";
import { PieGraph } from "../pieGraph/PieGraph";
import { SarFont } from "../sarFont/SarFont";
import { lightTheme } from "../../assets/styles/theme/light";
import Success from "../icons/status/Success";
import Warning from "../icons/status/Warning";
import { useTranslation } from "react-i18next";
import BudgetCardSkeleton from "./BudgetCardSkeleton";

interface BudgetCardProps {
  pieGraphLabel: string;
  amountRemaining: number;
  amountTotal: number;
  pieGraphPercentage: number;
  mainText: string;
  boldText: string;
  dailyAllowanceText: string;
  dailyAllowanceAmount: string;
  dailyAllowancePeriodLabel: string;
  description?: string;
  status: "onTrack" | "beCareful" | "overspent";
  statusText?: string;
  loading?: boolean;
}

/**
 * @property pieGraphLabel: Text for the first line of the pie graph content ("Left to spend")
 * @property amountRemaining: Number for the remaining amount (e.g. 10000)
 * @property amountTotal: Number for the total amount (e.g. 60000)
 * @property pieGraphPercentage: Number for the percentage to be filled in the pie graph. When 100 is passed, overspent styles will apply.
 * @property mainText: Text for the first line of the content on the left
 * @property description: Text for the second line of the content on the left (optional)
 * @property boldText: first section of the text on the left ("Budget");
 * @property dailyAllowanceText: Label used for daily allowance;
 * @property dailyAllowanceAmount: amount per period;
 * @property dailyAllowancePeriodLabel: label for period name (day, week, month etc.);
 * @property status: Option for status displayed under daily allowance section
 */

export const BudgetCard: FC<BudgetCardProps> = ({
  pieGraphLabel,
  amountRemaining,
  amountTotal,
  pieGraphPercentage,
  mainText,
  boldText = "Budget",
  dailyAllowanceText = "Daily Allowance",
  dailyAllowanceAmount,
  dailyAllowancePeriodLabel = "day",
  description,
  status,
  statusText,
  loading = false,
}) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const isFullySpent = useMemo(
    () => pieGraphPercentage >= 100,
    [pieGraphPercentage]
  );

  const getStatus = () => {
    switch (status) {
      case "onTrack":
        return (
          <View style={styles.inlineTextWrapper}>
            <Success />
            <Text size={fontSmallMedium} variant="secondarycolor10">
              {statusText || t("budgetCardStatus.onTrack")}
            </Text>
          </View>
        );
      case "beCareful":
        return (
          <View style={styles.inlineTextWrapper}>
            <Warning fill={theme.ragneutral} />
            <Text size={fontSmallMedium} variant="ragneutral">
              {statusText || t("budgetCardStatus.beCareful")}
            </Text>
          </View>
        );
      case "overspent":
        return (
          <View style={styles.inlineTextWrapper}>
            <Warning fill={theme.primarycolor3static} />
            <Text size={fontSmallMedium} variant="primarycolor3static">
              {statusText || t("budgetCardStatus.overspent")}
            </Text>
          </View>
        );
    }
  };

  const styles = StyleSheet.create({
    container: {
      width: actuatedNormalize(344),
      borderRadius: radiusS,
      backgroundColor: theme.stylesblockbg,
      padding: spacingS,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    detailsContainer: {
      display: "flex",
      flexDirection: "column",
      gap: spacingS,
      height: actuatedNormalize(140),
    },
    textContent: {
      display: "flex",
      flexDirection: "column",
      alignContent: "center",
      justifyContent: "center",
      gap: spacingXXS,
    },
    inlineTextWrapper: {
      display: "flex",
      flexDirection: "row",
      gap: spacingXXS,
      alignItems: "center",
    },
    amountWrapper: {
      justifyContent: "center",
    },
    inlineTextEllipse: {
      height: actuatedNormalize(2),
      width: actuatedNormalize(2),
      borderRadius: actuatedNormalize(2),
      backgroundColor: theme.primarycolor
    }
  });
  return loading ? (
    <BudgetCardSkeleton />
  ) : (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
          <View style={styles.textContent}>
            <View style={styles.inlineTextWrapper}>
              <Text size={fontMediumLarge} bold>{boldText}</Text>
              <View style={styles.inlineTextEllipse}></View>
              <Text size={fontMediumLarge} variant="primarytextcolor2">{mainText}</Text>
            </View>
         
          <Text size={fontSmall} variant="primarytextcolor2">
            {description || ""}
          </Text>
          </View>
          <View style={styles.textContent}>
            <Text size={fontSmallMedium} variant="primarytextcolor2">{dailyAllowanceText}</Text>
            <View style={{ ...styles.inlineTextWrapper, gap: spacingXXXS }}>
              <SarFont size={fontXLarge} lineHeight={lineHeightXLarge} />
              <Text size={fontXLarge} bold>{dailyAllowanceAmount}</Text>
              <Text size={fontXLarge}>/</Text>
              <Text size={fontXLarge}>{dailyAllowancePeriodLabel}</Text>
            </View>
          </View>
        
        {getStatus()}
      </View>
      <PieGraph
        size="large"
        percentage={pieGraphPercentage}
        strokeColor={
          isFullySpent ? theme.ragcolor3tint : lightTheme.ragcolor6tint
        }
        strokeFillColor={isFullySpent ? theme.ragcolor3 : lightTheme.ragcolor6}
        content={
          <View style={styles.textContent}>
            <Text variant={isFullySpent ? "ragcolor3" : "secondarycolor10"}>
              {pieGraphLabel}
            </Text>
            <View style={[styles.inlineTextWrapper, styles.amountWrapper]}>
              <SarFont
                size={fontMediumLarge}
                lineHeight={lineHeightMediumLarge}
              />
              <Text bold size={fontMediumLarge}>
                {amountRemaining.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </Text>
            </View>
            <View style={[styles.inlineTextWrapper, styles.amountWrapper]}>
              <Text size={fontXSmall} variant="primarytextcolor2">
                {t("of")}
              </Text>
              <SarFont
                size={fontXSmall}
                lineHeight={lineHeightXSmall}
                variant="primarytextcolor2"
              />
              <Text size={fontXSmall} variant="primarytextcolor2">
                {amountTotal.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </Text>
            </View>
          </View>
        }
      />
    </View>
  );
};
