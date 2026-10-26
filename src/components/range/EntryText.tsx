import React, { FC, memo, useCallback, useMemo, useState } from "react";
import { StyleProp, StyleSheet, TextInput, TextStyle, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import {
  fontMedium,
  fontMediumLarge,
  lineHeightMediumLarge,
  radiusS,
  spacingXS,
  spacingXXS,
} from "../../assets/styles/constants/size";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { Text } from "../text/Text";
import fonts from "../../assets/styles/constants/fonts";
import { SarFont } from "../sarFont/SarFont";

interface RangeEntryTextProps {
  minValue?: string;
  maxValue?: string;
  onMinValueChange?: (min: number) => void;
  onMaxValueChange?: (max: number) => void;
  error?: boolean;
  label?: string;
  minInputStyle?: StyleProp<TextStyle>;
  maxInputStyle?: StyleProp<TextStyle>;
  maxInput?: boolean;
  hideSymbol?: boolean;
}

/**
 * @property minValue - String to represent current min range in format "10.00"
 * @property maxValue - String to represent current max range in format "10.00"
 * @property onMinValueChange - Callback for handling change in the left input
 * @property onMaxValueChange - Callback for handling change in the right input
 * @property error - Boolean to add error border styling
 * @property label - String for showing the label above inputs (optional)
 * @property minInputStyle - Optional style override for the min TextInput (e.g. color)
 * @property maxInputStyle - Optional style override for the max TextInput (e.g. color)
 * @property maxInput - When true (default), the second input is always visible
 * @property hideSymbol - When true, the symbol is not shown
 */

const PLACEHOLDER = "00.00";
const DECIMAL_PLACES = 2;

const hasText = (value?: string) =>
  typeof value === "string" && value.trim().length > 0;

const sanitizeAmount = (value: string) => {
  const cleaned = value.replace(/[^0-9.]/g, "");
  const firstDot = cleaned.indexOf(".");
  if (firstDot === -1) {
    return cleaned;
  }
  const integerPart = cleaned.slice(0, firstDot).replace(/\./g, "");
  const decimalPart = cleaned
    .slice(firstDot + 1)
    .replace(/\./g, "")
    .slice(0, DECIMAL_PLACES);
  return `${integerPart}.${decimalPart}`;
};

const formatAmountOnBlur = (value: string) => {
  if (!hasText(value) || value === ".") {
    return "";
  }
  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) {
    return value;
  }
  return numericValue.toFixed(DECIMAL_PLACES);
};

/** Size the field to its visible text so SAR + value stay a centered unit. */
const getInputWidth = (value: string, filled: boolean) => {
  const text = filled ? value : PLACEHOLDER;
  const charFactor = filled ? 0.62 : 0.55;
  return Math.ceil(Math.max(text.length, 1) * fontMediumLarge * charFactor);
};

const staticStyles = StyleSheet.create({
  rangeEntryContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: spacingXS,
  },
  inputsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: spacingXS,
    marginBottom: actuatedNormalize(24),
    width: "100%",
  },
  rangeInput: {
    fontSize: fontMediumLarge,
    height: "100%",
    padding: 0,
    margin: 0,
    textAlign: "left",
  },
  inputContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacingXXS,
  },
});

export const RangeEntryText: FC<RangeEntryTextProps> = memo(({
  minValue,
  maxValue,
  onMinValueChange,
  onMaxValueChange,
  error,
  label,
  minInputStyle,
  maxInputStyle,
  maxInput = true,
  hideSymbol = false,
}) => {
  const showMin = minValue !== undefined;
  const [range, setRange] = useState([minValue ?? "", maxValue ?? ""]);
  const { theme } = useTheme();

  const emitValue = useCallback(
    (index: number, nextValue: string) => {
      const numericValue = Number(nextValue);
      if (nextValue === "" || nextValue === "." || Number.isNaN(numericValue)) {
        return;
      }
      if (index === 0) {
        onMinValueChange?.(numericValue);
      } else {
        onMaxValueChange?.(numericValue);
      }
    },
    [onMinValueChange, onMaxValueChange]
  );

  const handleValueChange = useCallback(
    (value: string, index: number) => {
      const sanitized = sanitizeAmount(value);
      setRange((prev) => {
        if (prev[index] === sanitized) {
          return prev;
        }
        const next = [...prev];
        next[index] = sanitized;
        return next;
      });
      emitValue(index, sanitized);
    },
    [emitValue]
  );

  const handleBlur = useCallback(
    (index: number) => {
      setRange((prev) => {
        const formatted = formatAmountOnBlur(prev[index]);
        if (formatted === prev[index]) {
          emitValue(index, formatted);
          return prev;
        }
        const next = [...prev];
        next[index] = formatted;
        emitValue(index, formatted);
        return next;
      });
    },
    [emitValue]
  );

  const handleMinChange = useCallback(
    (text: string) => handleValueChange(text, 0),
    [handleValueChange]
  );
  const handleMaxChange = useCallback(
    (text: string) => handleValueChange(text, 1),
    [handleValueChange]
  );
  const handleMinBlur = useCallback(() => handleBlur(0), [handleBlur]);
  const handleMaxBlur = useCallback(() => handleBlur(1), [handleBlur]);

  const minFilled = hasText(range[0]);
  const maxFilled = hasText(range[1]);
  const minColor = minFilled ? theme.primarycolor : theme.primClr;
  const maxColor = maxFilled ? theme.primarycolor : theme.primClr;
  const minInputColorStyle = useMemo(() => ({ color: minColor }), [minColor]);
  const maxInputColorStyle = useMemo(() => ({ color: maxColor }), [maxColor]);

  const rangeInputContainerStyle = useMemo(
    () => ({
      height: actuatedNormalize(44),
      width: actuatedNormalize(112),
      borderColor: error ? theme.strokecolor3tint : theme.primarycolor2,
      borderWidth: 1,
      borderRadius: radiusS,
      backgroundColor: theme.primarycolor4,
      flexDirection: "row" as const,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      paddingHorizontal: spacingXXS,
      flex: 1,
    }),
    [error, theme.strokecolor3tint, theme.primarycolor2, theme.primarycolor4]
  );

  const minInputStyleCombined = useMemo(
    () =>
      minFilled
        ? fonts.withTrueBoldWeight([
            staticStyles.rangeInput,
            {
              fontFamily: fonts.HSBC_Bold,
              width: getInputWidth(range[0], true),
            },
            minInputColorStyle,
            minInputStyle,
          ])
        : [
            staticStyles.rangeInput,
            {
              fontFamily: fonts.HSBC,
              width: getInputWidth(range[0], false),
            },
            minInputColorStyle,
            minInputStyle,
          ],
    [minFilled, range, minInputColorStyle, minInputStyle]
  );

  const maxInputStyleCombined = useMemo(
    () =>
      maxFilled
        ? fonts.withTrueBoldWeight([
            staticStyles.rangeInput,
            {
              fontFamily: fonts.HSBC_Bold,
              width: getInputWidth(range[1], true),
            },
            maxInputColorStyle,
            maxInputStyle,
          ])
        : [
            staticStyles.rangeInput,
            {
              fontFamily: fonts.HSBC,
              width: getInputWidth(range[1], false),
            },
            maxInputColorStyle,
            maxInputStyle,
          ],
    [maxFilled, range, maxInputColorStyle, maxInputStyle]
  );

  const renderInput = (
    index: 0 | 1,
    filled: boolean,
    color: string,
    inputStyle: StyleProp<TextStyle>,
    onChangeText: (text: string) => void,
    onBlur: () => void
  ) => (
    <View style={rangeInputContainerStyle}>
      <View style={staticStyles.inputContent}>
        {!hideSymbol && (
          <SarFont
            size={fontMediumLarge}
            lineHeight={lineHeightMediumLarge}
            variant={filled ? "primarycolor" : undefined}
            overrideStyles={{ color }}
          />
        )}
        <TextInput
          style={inputStyle}
          value={range[index]}
          onBlur={onBlur}
          onChangeText={onChangeText}
          keyboardType="numeric"
          inputMode="numeric"
          placeholder={PLACEHOLDER}
          placeholderTextColor={theme.primClr}
        />
      </View>
    </View>
  );

  return (
    <View style={staticStyles.rangeEntryContainer}>
      {label && <Text size={fontMedium}>{label}</Text>}
      <View style={staticStyles.inputsContainer}>
        {showMin &&
          renderInput(
            0,
            minFilled,
            minColor,
            minInputStyleCombined,
            handleMinChange,
            handleMinBlur
          )}
        {showMin && maxInput && (
          <Text variant="primarytextcolor" bold size={fontMediumLarge}>
            -
          </Text>
        )}
        {maxInput &&
          renderInput(
            1,
            maxFilled,
            maxColor,
            maxInputStyleCombined,
            handleMaxChange,
            handleMaxBlur
          )}
      </View>
    </View>
  );
});
