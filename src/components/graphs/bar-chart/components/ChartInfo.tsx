import { View, StyleSheet } from "react-native";
import { useTheme } from "../../../../context/theme/themeContext";
import {
  fontMedium,
  fontMediumLarge,
  fontSmallMedium,
  fontXLG,
  fontXXLG2,
  lineHeightMedium,
  lineHeightMediumLarge,
  lineHeightSmallMedium,
  lineHeightXXLG,
  spacingXXXS,
  spacingXS,
  spacingXXS,
} from "../../../../assets/styles/constants/size";
import fonts from "../../../../assets/styles/constants/fonts";
import EclipseLight from "../../../../assets/svgs/light/sab360/eclipse.svg";
import EclipseDark from "../../../../assets/svgs/dark/sab360/eclipse.svg";
import { NewCurrency } from "../../../text/NewCurrency";
import { Text } from "../../../text/Text";
import type { BarChartAmountSuffix } from "../types/types";

export interface BarChartInfoProps {
  totalSpentLabel: string;
  periodLabel: string;
  showPeriodLabel?: boolean;
  totalAmount: string;
  amountSuffix: BarChartAmountSuffix;
  currency?: string;
}

/**
 * BarChartInfo - Displays Total Spent, period, and amount. Amount uses either SAR font (currency) or plain number + " Kg".
 */
export const BarChartInfo = ({
  totalSpentLabel,
  periodLabel,
  showPeriodLabel = true,
  totalAmount,
  amountSuffix,
  currency = "SAR",
}: BarChartInfoProps) => {
  const { isDarkTheme } = useTheme();
  const EclipseIcon = isDarkTheme ? EclipseDark : EclipseLight;

  const isNegativeAmount = totalAmount?.trimStart().startsWith("-") ?? false;
  const formattedAmount = totalAmount?.trimStart().replace(/^[+-]\s*/, "") ?? "";
  const isSar = currency.toLocaleLowerCase() === "sar";
  const currencyAmountText = `${isNegativeAmount ? "- " : ""}${currency}${
    isSar ? "" : " "
  }${formattedAmount}`;

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
    amountRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacingXXXS,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text
          variant="primarytextcolor"
          size={fontMedium}
          overrideStyles={{ lineHeight: lineHeightMedium }}
        >
          {totalSpentLabel}
        </Text>
        {showPeriodLabel && (
          <>
            <EclipseIcon width={spacingXXS} height={spacingXXS} />
            <Text
              variant="primarytextcolor2"
              size={fontMediumLarge}
              overrideStyles={{ lineHeight: lineHeightMediumLarge }}
            >
              {periodLabel}
            </Text>
          </>
        )}
      </View>

      <View style={styles.amountRow}>
        {amountSuffix === "currency" ? (
          <NewCurrency
            text={currencyAmountText}
            variant="primarytextcolor"
            size={fontXLG}
            textstyle={{ fontFamily: fonts.HSBC_Bold }}
          />
        ) : (
          <>
            <Text
              variant="primarytextcolor"
              size={fontXXLG2}
              bold
              overrideStyles={{ lineHeight: lineHeightXXLG }}
            >
              {isNegativeAmount ? `- ${formattedAmount}` : formattedAmount}
            </Text>
            <Text
              variant="primarytextcolor"
              size={fontSmallMedium}
              overrideStyles={{ lineHeight: lineHeightSmallMedium }}
            >
              Kg
            </Text>
          </>
        )}
      </View>
    </View>
  );
};
