import { View, StyleSheet, Text as RNText } from "react-native";
import { useTheme } from "../../../../context/theme/themeContext";
import {
  fontMedium,
  fontMediumLarge,
  fontXLG,
  lineHeightMedium,
  lineHeightMediumLarge,
  spacingXS,
  spacingXXS,
} from "../../../../assets/styles/constants/size";
import fonts from "../../../../assets/styles/constants/fonts";
import EclipseLight from "../../../../assets/svgs/light/sab360/eclipse.svg";
import EclipseDark from "../../../../assets/svgs/dark/sab360/eclipse.svg";
import { NewCurrency } from "../../../text/NewCurrency";

export interface CircleChartInfoProps {
  totalSpentLabel: string;
  periodLabel: string;
  totalAmount: string;
}

/**
 * CircleChartInfo - Displays Total Spent, period, and amount (no average)
 */
export const CircleChartInfo = ({
  totalSpentLabel,
  periodLabel,
  totalAmount,
}: CircleChartInfoProps) => {
  const { theme, isDarkTheme } = useTheme();
  const EclipseIcon = isDarkTheme ? EclipseDark : EclipseLight;

  const styles = StyleSheet.create({
    container: {
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
    totalSpentText: {
      color: theme.primarytextcolor,
      fontFamily: fonts.HSBC,
      fontSize: fontMedium,
      fontStyle: "normal",
      lineHeight: lineHeightMedium,
    },
    periodText: {
      color: theme.primarytextcolor2,
      fontFamily: fonts.HSBC,
      fontSize: fontMediumLarge,
      fontStyle: "normal",
      lineHeight: lineHeightMediumLarge,
    },
    amountRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacingXXS,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <RNText style={styles.totalSpentText}>{totalSpentLabel}</RNText>
        <EclipseIcon
          width={spacingXXS}
          height={spacingXXS}
        />
        <RNText style={styles.periodText}>{periodLabel}</RNText>
      </View>

      <View style={styles.amountRow}>
        <NewCurrency
          text={totalAmount}
          variant="primarytextcolor"
          size={fontXLG}
          textstyle={{ fontFamily: fonts.HSBC_Bold }}
        />
      </View>
    </View>
  );
};
