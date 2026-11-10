import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { TextFieldInput, TextFieldInputProps } from "./TextFieldInput";
import { I18nManager, StyleSheet, TextStyle, TouchableOpacity, View } from "react-native";
import { Text } from "../text/Text";
import { Size } from "../../assets/styles";
import { useTheme } from "../../context/theme/themeContext";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import {
  fontLarge,
  fontMedium,
  fontMediumLarge,
  fontSmall,
  lineHeightLarge,
  lineHeightMediumLarge,
  radiusS,
  spacing1XS,
  spacingXS,
} from "../../assets/styles/constants/size";
import { SarFont } from "../sarFont/SarFont";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import fonts from "../../assets/styles/constants/fonts";
import { TooltipComponent, TooltipProps } from "../tooltip/Tooltip";
import { NewCurrency } from "../text/NewCurrency";
import { AutomationProps, getAutomationProps, getNestedAutomationProps } from "../automationProps";

interface AmountInputProps extends AutomationProps {
  inputProps: TextFieldInputProps;
  currency?: string;
  secondcurrency?: string;
  label?: string;
  labelMandatory?: boolean;
  overrideStyles?: any;
  amountAddon?: "single" | "multiple";
  loading?: boolean;
  onCurrencyChange?: (selectedCurrency: string) => void;
  labelTooltip?: boolean;
  tooltipProps?: TooltipProps;
  helperText?:string;
  helperTextSecond?:string;
  error?: boolean;
  baseLineHeightIos?: number;
  textstyle?: TextStyle;
  currencyTextStyle?: any;
  disabled?: boolean;
}

/**
 * Props for the AmountInputText component.
 *
 * @property {TextFieldInputProps} inputProps - Props passed to the TextFieldInput component.
 * @property {string} [currency] - Primary currency code (default: "SAR").
 * @property {string} [secondcurrency] - Secondary currency code for multiple currency mode (default: "USD").
 * @property {string} [label] - Label displayed above the input field.
 * @property {boolean} [labelMandatory=false] - Whether to show a mandatory asterisk (*) next to the label.
 * @property {any} [overrideStyles] - Custom styles to override the default component styles.
 * @property {"single" | "multiple"} [amountAddon="single"] - Determines whether to show single or multiple currency selection.
 * @property {boolean} [loading=false] - Shows skeleton loaders when true.
 * @property {(selectedCurrency: string) => void} [onCurrencyChange] - Callback triggered when the selected currency changes.
 * @property {labelTooltip} [labelTooltip=false] - Whether to show a tooltip icon.
 * @property {TooltipProps} [tooltipProps={{text:"description"}}] - directely access the tooltipProps to use it as per requiemrent.
 * @property {boolean} [disabled=false] – Whether to show the mandatory currency background color when the disabled prop is set to true.
 */

export const AmountInputText: FC<AmountInputProps> = ({
  inputProps,
  currency,
  secondcurrency,
  label,
  labelMandatory = false,
  overrideStyles,
  loading = false,
  amountAddon = "single",
  onCurrencyChange,
  labelTooltip,
  tooltipProps,
  helperText,
  helperTextSecond,
  error,
  textstyle,
  baseLineHeightIos,
  currencyTextStyle,
  disabled,
  testID,
  accessibilityLabel,
}) => {
  const { theme } = useTheme();

  const isMultiple = amountAddon === "multiple";
  const primaryCurrency = currency || "SAR";
  const secondaryCurrency = secondcurrency || "USD";
  const [selectedCurrency, setSelectedCurrency] = useState(primaryCurrency);
   
   useEffect(() => {
    setSelectedCurrency(primaryCurrency);
  }, [primaryCurrency, secondcurrency]);

  const handleCurrencySelect = useCallback((curr: string) => {
    setSelectedCurrency(curr);
    if(onCurrencyChange && curr !== selectedCurrency){
      onCurrencyChange(curr);
    }
  }, [onCurrencyChange,selectedCurrency]);

  return (
    <View
      style={[styles.inputWrapper, overrideStyles]}
      {...getAutomationProps(testID, accessibilityLabel, label ?? currency ?? "amount-input")}
    >
      {label && (
         loading ? (
         <SkeletonBox
          shape="line"
          size="medium"
          overrideStyles={{
            width: actuatedNormalize(40),
          }}
        />
         ) :
        <View style={{ flexDirection: "row",...(labelTooltip && {gap:actuatedNormalize(4)}) }}>
          <Text
            size={fontMedium}
            variant={error ? "ragcolor3" :"primarytextcolor"}
            loading={loading}
            textWidth={actuatedNormalize(100)}
          >
            {label}
          </Text>

          {labelMandatory && (
            <Text size={fontMedium} variant="primarycolor3">
              {` *`}
            </Text>
          )}
          {labelTooltip && tooltipProps && (
                          <TooltipComponent
                            iconStyle={{
                              width: actuatedNormalize(16),
                              height: actuatedNormalize(16),
                            }}
                            tooltipStyle={{ marginTop: actuatedNormalize(2) }}
                            {...tooltipProps}
                          />
                        )}
        </View>
      )}
      <View style={styles.content}>
        {loading ? (
          <SkeletonBox
            shape="square"
            size="medium"
            overrideStyles={{
              height: actuatedNormalize(40),
              width: actuatedNormalize(40),
            }}
          />
        ) : isMultiple ? (
          // ✅ Multiple currency case
          <View style={{
            ...styles.multiCurrencyBlock,
            backgroundColor: theme.primarycolor,
          }}>
           {[primaryCurrency, secondaryCurrency].map((curr, index) => (
              <TouchableOpacity
                key={curr + index}
                activeOpacity={0.7}
                onPress={() => handleCurrencySelect(curr)}
                {...getNestedAutomationProps(
                  { testID, accessibilityLabel },
                  `currency-${curr.toLowerCase()}`,
                  curr
                )}
                style={{
                  backgroundColor:
                    selectedCurrency === curr
                      ? theme.primaryinvert
                      : theme.primarycolor,
                  paddingHorizontal: spacingXS,
                  borderRadius: radiusS,
                }}
              >
                <Text
                  variant={
                    selectedCurrency === curr
                      ? "primarycolor"
                      : "primarytextcolor4"
                  }
                  size={fontMediumLarge}
                  overrideStyles={{
                    textTransform: "uppercase",
                    lineHeight: lineHeightMediumLarge,
                    fontFamily: curr === "SAR" ? fonts.SAR_Font : fonts.HSBC,
                    textAlign: "center",
                  }}
                >
                  {curr}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )  : (
          <View
            style={{
              ...styles.currencyBlock,
              backgroundColor: disabled ? theme.primarycolor2_30 :theme.primarycolor,
            }}
          >
            {currency ? (
              <Text
                variant="primarytextcolor4"
                overrideStyles={{
                  textTransform: "uppercase",
                  fontFamily: currency === "SAR" ? fonts.SAR_Font : fonts.HSBC,
                  textAlign: "center",
                  lineHeight:lineHeightLarge,
                }}
                size={fontMediumLarge}
              >
                {currency}
              </Text>
            ) : (
              <SarFont
                size={fontLarge}
                lineHeight={lineHeightLarge}
                variant="primarytextcolor4"
              />
            )}
          </View>
        )}
        <View style={styles.inputContainer}>
          {loading ? (
            <SkeletonBox shape="line" size="extralarge" overrideStyles={{width: "100%", maxWidth: "100%", flexShrink: 1}} />
          ) : (
            <TextFieldInput {...inputProps} />
          )}
        </View>
      </View>
       <View
                    style={{
                      alignSelf: "flex-start",
                      alignItems: "flex-start",
                      marginTop: Size.spacingXS,
                    }}
                  >
                    {helperText && (
                      <NewCurrency
                        text={helperText}
                        variant={error ? "ragcolor3": "primarytextcolor2"}
                        size={fontSmall}
                        textstyle={[{ textAlign: "right" }, textstyle]}
                        currencyTextStyle={currencyTextStyle}
                        baseLineHeightIos={baseLineHeightIos}
                      />
                    )}
                    {helperTextSecond && (
                      <NewCurrency
                        text={helperTextSecond}
                        variant={error ? "ragcolor3":"primarytextcolor2"}
                        size={fontSmall}
                        textstyle={[{ textAlign: "right" }, textstyle]}
                        currencyTextStyle={currencyTextStyle}
                        baseLineHeightIos={baseLineHeightIos}
                      />
                    )}
                  </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    // gap: Size.spacingXS,
  },
  content: {
    display: "flex",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    alignItems: "flex-start",
    gap: Size.spacingXS,
    marginTop:Size.spacingXS,
  },
  inputContainer: {
    flexShrink: 1,
  },
  currencyBlock: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal: Size.spacingS,
    paddingVertical: actuatedNormalize(12),
    borderRadius: Size.radiusS,
  },
  multiCurrencyBlock: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    flexDirection:"row",
    padding: spacing1XS,
    borderRadius: radiusS,
    gap:actuatedNormalize(8)
  },
});
