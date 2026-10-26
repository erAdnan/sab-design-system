import React, { FC, useMemo } from "react";
import { I18nManager, StyleSheet, View } from "react-native";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import {
  fontMediumLarge,
  fontSmallMedium,
  fontXLarge,
  fontXXSmall,
  lineHeightSmallMedium,
  spacingXXS,
} from "../../assets/styles/constants/size";
import { ChipsInfoProps } from "../chips/ChipsInfo";
import { Text } from "../text/Text";
import { BalanceSkeleton } from "./BalanceSkeleton";
import { NewCurrency } from "../text/NewCurrency";
import fonts from "../../assets/styles/constants/fonts";
import { NewChipsInfo } from "../chips/NewChipsInfo";

export interface BalanceProps {
  firstValue: number;
  firstValueSize?: number;
  secondValue?: number | string | null;
  showStatus?: boolean;
  statusProps?: ChipsInfoProps;
  currency?: "sar" | string;
  secondCurrency?: "sar" | string;
  hidden?: boolean;
  label?: string;
  subLabel?: string;
  loading?: boolean;
  vatValue?: string;
  balanceWrapper?: any;
  balanceTextWrapper?: any;
  titleLineHeight?: number;
  balanceVariant?: string;
  mediumFont?: boolean;
}
/**
 * @property firstValue: Value to be displayed on the first line
 * @property secondValue: Value to be displayed on the second line
 * @property showStatus: Boolean to show/hide status text and icon (Chips info - text with icon variant)
 * @property statusProps: Accepts all props for ChipsInfo component (state, label)
 * @property currency: Currency to be displayed (default is SAR)
 * @property secondCurrency: Currency to be used for second value
 * @property hidden: Boolean to hide last few digits
 * @property label: Optional text to be displayed above firstValue
 * @property subLabel: Optional text to be displayed  for transation cancellation screen show request date
 * @property vatValue: Optional text to be displayed   for Free + VAT
 * @property balanceWrapper - Style override for the outer wrapper of the balance component
 * @property balanceTextWrapper - Style override for the first value row and second valye row
 * @property balanceVariant - use this prop to change the color of the Balance & currency for the Theme
 */
export const Balance: FC<BalanceProps> = ({
  firstValue,
  firstValueSize = fontMediumLarge,
  secondValue = null,
  showStatus,
  statusProps,
  currency = "sar",
  secondCurrency = "sar",
  hidden,
  label,
  subLabel,
  loading = false,
  vatValue = "",
  balanceWrapper,
  balanceTextWrapper,
  titleLineHeight,
  balanceVariant,
  mediumFont = false,
}) => {
  const isNegativeFirstValue = useMemo(() => firstValue < 0, [firstValue]);

  const isNegativeSecondString = useMemo(() => {
  return typeof secondValue === "string" && secondValue.trim().startsWith("-");
}, [secondValue]);
  
  const isNegativeSecondValue = useMemo(() => {
    if (typeof secondValue === "number") {
      return secondValue < 0;
    }
    if (typeof secondValue === "string") {
    return isNegativeSecondString;
  }
  return false;
  }, [secondValue, isNegativeSecondString]);

const normalizedSecondString = useMemo(() => {
  if (typeof secondValue === "string") {
    return secondValue.replace("-", "").trim();
  }
  return secondValue;
}, [secondValue]);

  const formattedFirstValue = useMemo(
    () =>
      Math.abs(firstValue).toLocaleString("en-US", {
        minimumFractionDigits: 2,
      }),
    [firstValue]
  );
  const formattedSecondValue = useMemo(() => {
    if (typeof secondValue === "number") {
      return Math.abs(secondValue).toLocaleString("en-US", {
        minimumFractionDigits: 2,
      });
    } else if (typeof secondValue === "string") {
      return normalizedSecondString;
    }
    return null;
  }, [secondValue,normalizedSecondString]);

  const isSar = useMemo(
    () => currency.toLocaleLowerCase() === "sar",
    [currency]
  );
  const isSarSecond = useMemo(
    () => secondCurrency.toLocaleLowerCase() === "sar",
    [secondCurrency]
  );

  return loading ? (
    <BalanceSkeleton withStatus={showStatus} />
  ) : (
    <View style={[styles.balanceWrapper,balanceWrapper]}>
      {label && (
        <Text size={fontXXSmall} variant="primarytextcolor2">
          {label}
        </Text>
      )}
      <View
        style={[
          styles.balance,
          { flexDirection: I18nManager.isRTL ? "row-reverse" : "row" },
          balanceTextWrapper,
        ]}
      >
        <NewCurrency
          text={
            hidden
              ? "* * * * *"
              : `${isNegativeFirstValue ? "- " : ""}${
                  isSar ? "SAR" : currency.toUpperCase() + " "
                }${formattedFirstValue}`
          }
          size={hidden ? fontXLarge : firstValueSize}
          variant={balanceVariant}
          textstyle={{
            paddingVertical: 0,
            paddingHorizontal: 0,
            lineHeight: titleLineHeight,
            fontFamily: mediumFont ? fonts.HSBC_Medium : fonts.HSBC_Bold,
          }}
        />
      </View>
      {formattedSecondValue !== null && (
        <View
          style={[
            styles.balance,
            { flexDirection: I18nManager.isRTL ? "row-reverse" : "row" },
            balanceTextWrapper,
          ]}
        >
          <NewCurrency
            text={`${isNegativeSecondValue ? "- " : ""}${
              isSarSecond ? "SAR" : secondCurrency.toUpperCase() + " "
            }${formattedSecondValue}`}
            size={fontSmallMedium}
            variant="primarytextcolor2"
            textstyle={{
              paddingVertical: 0,
              paddingHorizontal: 0,
              lineHeight: lineHeightSmallMedium,
            }}
          />
        </View>
      )}

      {vatValue && (
        <View style={[styles.balance, { gap: 0 }]}>
          <Text
            size={fontSmallMedium}
            variant="primarytextcolor2"
            overrideStyles={{ paddingVertical: 0, paddingHorizontal: 0 }}
          >
            {`${vatValue}`}
          </Text>
        </View>
      )}
      {subLabel && (
        <View style={[styles.balance, { gap: 0 }]}>
          <Text
            size={fontSmallMedium}
            variant="primarytextcolor2"
            overrideStyles={{ paddingVertical: 0, paddingHorizontal: 0 }}
          >
            {`${subLabel}`}
          </Text>
        </View>
      )}
      {showStatus && statusProps && (
        <View style={styles.balance}>
          <NewChipsInfo type="textWithIcon" {...statusProps} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  balanceWrapper: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "flex-start",
    alignItems: "flex-end",
    gap: spacingXXS,
    paddingTop: actuatedNormalize(5),
  },
  balance: {
    display: "flex",
    flexDirection: "row",
    textAlign: "right",
    gap: spacingXXS,
  },
});
