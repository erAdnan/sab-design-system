import React, { FC, ReactElement, useMemo } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import {
  fontMediumLarge,
  fontSmall,
  fontSmallMedium,
  fontWeightMedium,
  lineHeightMediumLarge,
  lineHeightSmall,
  lineHeightSmallMedium,
  spacingS,
  spacingXXS,
} from "../../assets/styles/constants/size";
import { Text, TextProps } from "../text/Text";
import { NewCurrency, NewCurrencyProps } from "../text/NewCurrency";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import fonts from "../../assets/styles/constants/fonts";

export interface TransactionListItemProps {
  icon: ReactElement;
  label: string;
  secondaryLabel?: string;
  amount: string;
  currency?: string;
  secondaryAmount?: string;
  secondaryCurrency?: string;
  onItemPress?: () => void;
  showDivider?: boolean;
  iconWrapper?: any;
  labelProps?: TextProps;
  secondaryLabelProps?: TextProps;
  primaryAmountProps?: NewCurrencyProps;
  secondaryAmountProps?: NewCurrencyProps;
  containerStyle?: any;
}

const formatAmountWithCurrency = (
  amount: string,
  currency: string = "SAR"
): string => {
  const trimmed = amount.trim();
  const isNegative = trimmed.startsWith("-");
  const absoluteAmount = isNegative
    ? trimmed.replace(/^-\s*/, "").trim()
    : trimmed;
  const currencyCode = currency.toUpperCase();
  const amountWithCurrency = `${currencyCode}${currencyCode === "SAR" ? "" : " "}${absoluteAmount}`;
  return isNegative ? `- ${amountWithCurrency}` : amountWithCurrency;
};

/**
 * Compact transaction row: icon, label + amount, optional secondary label + amount.
 * No actions or extra metadata — for transaction lists only.
 */
export const TransactionListItem: FC<TransactionListItemProps> = ({
  icon,
  label,
  secondaryLabel,
  amount,
  currency = "SAR",
  secondaryAmount,
  secondaryCurrency = "SAR",
  onItemPress,
  showDivider = false,
  iconWrapper,
  labelProps,
  secondaryLabelProps,
  primaryAmountProps,
  secondaryAmountProps,
  containerStyle,
}) => {
  const { theme } = useTheme();
  const hasSecondaryRow = Boolean(secondaryLabel || secondaryAmount);

  const formattedAmount = useMemo(
    () => formatAmountWithCurrency(amount, currency),
    [amount, currency]
  );

  const formattedSecondaryAmount = useMemo(
    () =>
      secondaryAmount
        ? formatAmountWithCurrency(secondaryAmount, secondaryCurrency)
        : null,
    [secondaryAmount, secondaryCurrency]
  );

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacingS,
      paddingVertical: showDivider ? spacingS : 0,
      width: "100%",
      borderBottomWidth: showDivider ? 1 : 0,
      borderBottomColor: theme.primarycolor2_20,
    },
    iconWrapper: {
      height: actuatedNormalize(48),
      width: actuatedNormalize(48),
      borderRadius: actuatedNormalize(100),
      backgroundColor: theme.inverttransparent,
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      flex: 1,
      flexDirection: "row",
      alignItems: "flex-start",
      minWidth: 0,
    },
    labelsColumn: {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
      minWidth: 0,
      marginRight: spacingXXS,
      gap: spacingXXS,
      alignItems: "stretch",
    },
    amountColumn: {
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: "auto",
      alignItems: "flex-end",
      gap: spacingXXS,
    },
    amountRow: {
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "flex-end",
    },
    labelSpacer: {
      minHeight: lineHeightSmallMedium,
    },
  });

  const Wrapper: React.ElementType = onItemPress ? TouchableOpacity : View;

  return (
    <Wrapper onPress={onItemPress} style={[styles.container, containerStyle]}>
      <View style={[styles.iconWrapper, iconWrapper]}>{icon}</View>
      <View style={styles.content}>
        <View style={styles.labelsColumn}>
          <Text
            medium
            size={fontMediumLarge}
            variant="primarytextcolor"
            numberOfLines={1}
            overrideStyles={{
              lineHeight: lineHeightMediumLarge,
              overflow: "hidden",
              textAlign: "left",
              width: "100%",
            }}
            {...labelProps}
          >
            {label}
          </Text>
          {hasSecondaryRow &&
            (secondaryLabel ? (
              <Text
                size={fontSmallMedium}
                variant="primarytextcolor2"
                numberOfLines={1}
                overrideStyles={{
                  lineHeight: lineHeightSmallMedium,
                  overflow: "hidden",
                  textAlign: "left",
                  width: "100%",
                }}
                {...secondaryLabelProps}
              >
                {secondaryLabel}
              </Text>
            ) : (
              <View style={styles.labelSpacer} />
            ))}
        </View>
        <View style={styles.amountColumn}>
          <View style={styles.amountRow}>
            <NewCurrency
              text={formattedAmount}
              size={fontMediumLarge}
              variant="primarytextcolor"
              numberOfLines={1}
              textstyle={{
                fontWeight: fontWeightMedium,
                lineHeight: lineHeightMediumLarge,
                fontFamily: fonts.HSBC_Medium,
                overflow: "hidden",
                textAlign: "right",
              }}
              currencyTextStyle={{
                lineHeight: lineHeightMediumLarge,
              }}
              {...primaryAmountProps}
            />
          </View>
          {hasSecondaryRow && (
            <View style={styles.amountRow}>
              {formattedSecondaryAmount ? (
                <NewCurrency
                  text={formattedSecondaryAmount}
                  size={fontSmall}
                  variant="primarytextcolor2"
                  numberOfLines={1}
                  textstyle={{
                    lineHeight: lineHeightSmall,
                    overflow: "hidden",
                    textAlign: "right",
                  }}
                  currencyTextStyle={{
                    lineHeight: lineHeightSmall,
                  }}
                  {...secondaryAmountProps}
                />
              ) : (
                <View style={{ minHeight: lineHeightSmall }} />
              )}
            </View>
          )}
        </View>
      </View>
    </Wrapper>
  );
};
