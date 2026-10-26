import { View, StyleSheet, Text as RNText } from "react-native";
import { useTheme } from "../../../../context/theme/themeContext";
import { useTranslation } from "react-i18next";
import { actuatedNormalize } from "../../../../assets/styles/utils/pixelScaling";
import {
  fontMedium,
  fontMediumLarge,
  fontXLG,
  lineHeightMedium,
  lineHeightMediumLarge,
  lineHeightXLG,
} from "../../../../assets/styles/constants/size";
import fonts from "../../../../assets/styles/constants/fonts";
import EclipseLight from "../../../../assets/svgs/light/sab360/eclipse.svg";
import EclipseDark from "../../../../assets/svgs/dark/sab360/eclipse.svg";
import { NewCurrency } from '../../../text/NewCurrency';

export interface LineChartInfoProps {
  totalSpentLabel: string; 
  periodLabel: string; 
  totalAmount: string; 
  averageAmount: string; 
  showAverage?: boolean;
}

/**
 * LineChartInfo Component - Displays the header information (Total Spent, period, amount, average)
 */
export const LineChartInfo = ({
  totalSpentLabel,
  periodLabel,
  totalAmount,
  averageAmount,
  showAverage = true,
}: LineChartInfoProps) => {
  const { theme, isDarkTheme } = useTheme();
  const { t } = useTranslation();
  const EclipseIcon = isDarkTheme ? EclipseDark : EclipseLight;
  
  // Use theme variables for background colors
  const averageBg = isDarkTheme ? theme.ragneutraltint : theme.tintneutral;

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: actuatedNormalize(8),
      alignSelf: "stretch",
    },
    labelRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: actuatedNormalize(8),
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
      gap: actuatedNormalize(4),
    },
    currencyText: {
      color: theme.primarytextcolor2, 
      fontFamily: fonts.HSBC,
      fontSize: fontMediumLarge, 
      fontStyle: "normal",
      lineHeight: lineHeightMediumLarge, 
    },
    amountText: {
      color: theme.primarytextcolor, 
      fontFamily: fonts.HSBC_Bold,
      fontSize: fontXLG, 
      fontStyle: "normal",
      lineHeight: lineHeightXLG, 
    },
    averageButton: {
      display: "flex",
      flexDirection: "row",
      paddingVertical: actuatedNormalize(8),
      paddingHorizontal: actuatedNormalize(16),
      justifyContent: "center",
      alignItems: "center",
      gap: actuatedNormalize(4),
      borderRadius: 8,
      backgroundColor: averageBg,
    },
    averageText: {
      color: theme.primarytextcolor, 
      fontFamily: fonts.HSBC,
      fontSize: fontMedium,
      fontStyle: "normal",
      lineHeight: lineHeightMedium, 
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <RNText style={styles.totalSpentText}>
          {totalSpentLabel}
        </RNText>
        <EclipseIcon 
          width={actuatedNormalize(4)} 
          height={actuatedNormalize(4)} 
        />
        <RNText style={styles.periodText}>
          {periodLabel}
        </RNText>
      </View>

      <View style={styles.amountRow}>
        <NewCurrency
          text={totalAmount}
          variant="primarytextcolor"  
          size={fontXLG}
          textstyle={{fontFamily: fonts.HSBC_Bold}}
        />
      </View>

      {showAverage && (
        <View style={styles.averageButton}>
          <NewCurrency
            text={`${t("lineChart.averageOf")} ${averageAmount}`}
            variant="primarytextcolor"
            size={fontMedium}
          />
        </View>
      )}
    </View>
  );
};

