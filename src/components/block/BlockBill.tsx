import React, { FC, ReactElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { I18nManager, Pressable, StyleSheet, TextInput, View } from "react-native";
import { SvgProps } from "react-native-svg";
import { useTheme } from "../../context/theme/themeContext";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import {
  fontMediumLarge,
  fontSmall,
  fontSmallMedium,
  fontXSmall,
  lineHeightMediumLarge,
  lineHeightSmall,
  lineHeightSmallMedium,
  lineHeightXSmall,
  radiusS,
  spacing1XS,
  spacingS,
  spacingXS,
  spacingXXS,
} from "../../assets/styles/constants/size";
import fonts from "../../assets/styles/constants/fonts";
import { Text } from "../text/Text";
import { NewCurrency } from "../text/NewCurrency";
import { ChipInfo, ChipInfoProps } from "../chips/ChipInfo";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import { SarFont } from "../sarFont/SarFont";

const secondaryTextStyles = {
  size: fontSmallMedium,
  variant: "primarytextcolor2" as const,
  lineHeight: lineHeightSmallMedium,
};

const captionTextStyles = {
  size: fontXSmall,
  lineHeight: lineHeightXSmall,
};

const DOUBLE_TAP_DELAY_MS = 350;

const parseAmountNumber = (value: string): number => {
  const cleaned = value.replace(/[^0-9.]/g, "");
  const parsed = parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
};

const stripCurrencyPrefix = (value: string): string =>
  value.replace(/SAR\s*/gi, "").trim();

export interface BlockBillProps {
  logo?: ReactElement<SvgProps>;
  mainText: string;
  secondaryText: string;
  /** Optional line below secondaryText, same Subhead styles */
  additionalContent?: string;
  dueDateText: string;
  /** Original bill amount, e.g. "SAR 990.00" */
  amount: string;
  chipInfoProps?: ChipInfoProps;
  loading?: boolean;
  overrideStyles?: object;
  /** Whether this bill row is selected */
  selected?: boolean;
  /** When false, selection only shows border — amount stays static */
  editable?: boolean;
  /** Current value shown in the amount input when selected */
  editableAmount?: string;
  onAmountChange?: (value: string) => void;
  /** Minimum payable amount for validation */
  minAmount?: number;
  /** Shown below input when selected & editable (unless error) */
  informationMessage?: string;
  /** Shown when entered amount is below minAmount */
  errorMessage?: string;
  /** Whether the amount input is focused for editing */
  inputActive?: boolean;
  onInputActiveChange?: (active: boolean) => void;
  currency?: string;
  onPress?: () => void;
  onDoublePress?: () => void;
}

export const BlockBill: FC<BlockBillProps> = ({
  logo,
  mainText,
  secondaryText,
  additionalContent,
  dueDateText,
  amount,
  chipInfoProps,
  loading = false,
  overrideStyles,
  selected = false,
  editable = true,
  editableAmount,
  onAmountChange,
  minAmount,
  informationMessage,
  errorMessage = "Amount is below minimum allowed",
  inputActive: inputActiveProp,
  onInputActiveChange,
  currency = "SAR",
  onPress,
  onDoublePress,
}) => {
  const { theme } = useTheme();
  const isRtl = I18nManager.isRTL;
  const lastPressRef = useRef(0);
  const amountInputRef = useRef<TextInput>(null);
  const [internalInputActive, setInternalInputActive] = useState(false);
  const originalAmountValue = useMemo(() => stripCurrencyPrefix(amount), [amount]);
  const [internalAmount, setInternalAmount] = useState(originalAmountValue);

  const inputActive = inputActiveProp ?? internalInputActive;
  const setInputActive = useCallback(
    (active: boolean) => {
      if (inputActiveProp === undefined) {
        setInternalInputActive(active);
      }
      onInputActiveChange?.(active);
    },
    [inputActiveProp, onInputActiveChange]
  );

  useEffect(() => {
    if (editableAmount === undefined) {
      setInternalAmount(originalAmountValue);
    }
  }, [originalAmountValue, editableAmount]);

  const displayAmountValue = editableAmount ?? internalAmount;

  const hasAmountError = useMemo(() => {
    if (minAmount === undefined || !selected || !editable) return false;
    const entered = parseAmountNumber(displayAmountValue);
    return entered > 0 && entered < minAmount;
  }, [minAmount, selected, editable, displayAmountValue]);

  const showAmountInput =
    selected && editable && (inputActive || hasAmountError);

  const displayAmountText = useMemo(() => {
    if (!selected || !editable) return amount;
    return `${currency} ${displayAmountValue}`;
  }, [selected, editable, amount, currency, displayAmountValue]);

  const handleCardPress = useCallback(() => {
    const now = Date.now();
    if (now - lastPressRef.current < DOUBLE_TAP_DELAY_MS) {
      lastPressRef.current = 0;
      onDoublePress?.();
      setInputActive(false);
      return;
    }
    lastPressRef.current = now;
    setTimeout(() => {
      if (lastPressRef.current === now) {
        onPress?.();
        lastPressRef.current = 0;
        if (!selected) {
          setInputActive(false);
        }
      }
    }, DOUBLE_TAP_DELAY_MS);
  }, [onPress, onDoublePress, selected, setInputActive]);

  const handleInputAreaPress = useCallback(() => {
    setInputActive(true);
  }, [setInputActive]);

  const handleAmountChange = useCallback(
    (text: string) => {
      const sanitized = text.replace(/[^0-9.]/g, "");
      if (editableAmount === undefined) {
        setInternalAmount(sanitized);
      }
      onAmountChange?.(sanitized);
    },
    [onAmountChange, editableAmount]
  );

  useEffect(() => {
    if (inputActive) {
      amountInputRef.current?.focus();
    }
  }, [inputActive]);

  const styles = StyleSheet.create({
    container: {
      width: actuatedNormalize(344),
      paddingVertical: spacing1XS,
      paddingHorizontal: spacingS,
      flexDirection: "row",
      alignItems: "flex-start",
      borderRadius: radiusS,
      backgroundColor: theme.stylesblockbg,
      borderWidth: selected ? 1 : 0,
      borderColor: selected ? theme.strokecolor3tint : "transparent",
    },
    logo: {
      width: actuatedNormalize(48),
      height: actuatedNormalize(48),
      paddingHorizontal: spacing1XS,
      justifyContent: "center",
      alignItems: "center",
      flexShrink: 0,
      borderRadius: actuatedNormalize(75),
      backgroundColor: theme.primarycolor4static,
      overflow: "hidden",
    },
    content: {
      flex: 1,
      minWidth: 0,
      marginLeft: spacingS,
      gap: spacingXXS,
      alignItems: "flex-start",
    },
    titleRow: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      gap: spacingS,
    },
    mainTextWrapper: {
      flex: 1,
      minWidth: 0,
      alignItems: "flex-start",
    },
    amountSection: {
      width: "100%",
      gap: spacingXXS,
      alignItems: "flex-start",
    },
    amountInputRow: {
      width: "100%",
      flexDirection: isRtl ? "row-reverse" : "row",
      alignItems: "center",
      gap: spacingXS,
      paddingHorizontal: spacingXS,
      paddingVertical: actuatedNormalize(10),
      borderRadius: radiusS,
      borderWidth: 1,
      backgroundColor: theme.primarycolor4static,
    },
    amountInput: {
      flex: 1,
      minWidth: 0,
      padding: 0,
      margin: 0,
      fontSize: fontMediumLarge,
      lineHeight: lineHeightMediumLarge,
      fontFamily: fonts.HSBC_Medium,
      color: theme.primarytextcolor,
      textAlign: isRtl ? "right" : "left",
    },
  });

  const renderStaticAmount = (text: string, onPressAmount?: () => void) => {
    const amountDisplay = (
      <NewCurrency
        text={text}
        size={fontMediumLarge}
        variant="primarytextcolor"
        textstyle={{
          fontFamily: fonts.HSBC_Medium,
          lineHeight: lineHeightMediumLarge,
          textAlign: "left",
        }}
      />
    );

    if (onPressAmount) {
      return <Pressable onPress={onPressAmount}>{amountDisplay}</Pressable>;
    }

    return amountDisplay;
  };

  const renderAmountSection = () => {
    if (showAmountInput) {
      return (
        <View style={styles.amountSection}>
          <Pressable onPress={handleInputAreaPress}>
            <View
              style={[
                styles.amountInputRow,
                {
                  borderColor: hasAmountError
                    ? theme.strokecolor3tint
                    : theme.primarygray,
                },
              ]}
            >
              {currency === "SAR" ? (
                <SarFont
                  size={fontMediumLarge}
                  variant="primarytextcolor"
                  lineHeight={lineHeightMediumLarge}
                />
              ) : (
                <Text
                  size={fontMediumLarge}
                  variant="primarytextcolor"
                  medium
                  overrideStyles={{ lineHeight: lineHeightMediumLarge }}
                >
                  {currency}
                </Text>
              )}
              <TextInput
                ref={amountInputRef}
                style={fonts.withTrueBoldWeight(styles.amountInput)}
                value={displayAmountValue}
                onChangeText={handleAmountChange}
                keyboardType="decimal-pad"
                inputMode="decimal"
                editable={inputActive}
                placeholder={originalAmountValue}
                placeholderTextColor={theme.primarycolor2_60}
                onBlur={() => {
                  if (!hasAmountError) {
                    setInputActive(false);
                  }
                }}
                underlineColorAndroid="transparent"
              />
            </View>
          </Pressable>

          {hasAmountError ? (
            <Text
              size={captionTextStyles.size}
              variant="ragcolor3"
              overrideStyles={{
                lineHeight: captionTextStyles.lineHeight,
                textAlign: "left",
              }}
            >
              {errorMessage}
            </Text>
          ) : inputActive && informationMessage ? (
            <Text
              size={captionTextStyles.size}
              variant="primarytextcolor2"
              overrideStyles={{
                lineHeight: captionTextStyles.lineHeight,
                textAlign: "left",
              }}
            >
              {informationMessage}
            </Text>
          ) : null}
        </View>
      );
    }

    if (selected && editable) {
      return renderStaticAmount(displayAmountText, handleInputAreaPress);
    }

    return renderStaticAmount(amount);
  };

  if (loading) {
    return (
      <View style={[styles.container, overrideStyles]}>
        <SkeletonBox
          shape="circle"
          size="medium"
          overrideStyles={{
            width: actuatedNormalize(48),
            height: actuatedNormalize(48),
          }}
        />
        <View style={[styles.content, { marginLeft: spacingS }]}>
          <SkeletonBox
            shape="line"
            size="small"
            overrideStyles={{ width: "100%", height: actuatedNormalize(16) }}
          />
          <SkeletonBox
            shape="line"
            size="small"
            overrideStyles={{ width: "80%", height: actuatedNormalize(14) }}
          />
          <SkeletonBox
            shape="line"
            size="small"
            overrideStyles={{ width: "60%", height: actuatedNormalize(12) }}
          />
          <SkeletonBox
            shape="line"
            size="small"
            overrideStyles={{ width: "40%", height: actuatedNormalize(18) }}
          />
        </View>
      </View>
    );
  }

  const cardContent = (
    <View style={[styles.container, overrideStyles]}>
      {logo && (
        <View style={styles.logo}>
          {React.cloneElement(logo, {
            width: actuatedNormalize(24),
            height: actuatedNormalize(24),
            preserveAspectRatio: "xMidYMid meet",
          })}
        </View>
      )}

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <View style={styles.mainTextWrapper}>
            <Text
              medium
              size={fontMediumLarge}
              variant="primarytextcolor"
              numberOfLines={1}
              overrideStyles={{
                lineHeight: lineHeightMediumLarge,
                textAlign: "left",
                width: "100%",
              }}
            >
              {mainText}
            </Text>
          </View>
          {chipInfoProps && <ChipInfo {...chipInfoProps} />}
        </View>

        <Text
          size={secondaryTextStyles.size}
          variant={secondaryTextStyles.variant}
          numberOfLines={1}
          overrideStyles={{
            lineHeight: secondaryTextStyles.lineHeight,
            textAlign: "left",
          }}
        >
          {secondaryText}
        </Text>

        {additionalContent ? (
          <Text
            size={secondaryTextStyles.size}
            variant={secondaryTextStyles.variant}
            numberOfLines={1}
            overrideStyles={{
              lineHeight: secondaryTextStyles.lineHeight,
              textAlign: "left",
            }}
          >
            {additionalContent}
          </Text>
        ) : null}

        <Text
          size={fontSmall}
          variant="primarytextcolor2"
          numberOfLines={1}
          overrideStyles={{
            lineHeight: lineHeightSmall,
            textAlign: "left",
          }}
        >
          {dueDateText}
        </Text>

        {renderAmountSection()}
      </View>
    </View>
  );

  if (onPress || onDoublePress) {
    return <Pressable onPress={handleCardPress}>{cardContent}</Pressable>;
  }

  return cardContent;
};
