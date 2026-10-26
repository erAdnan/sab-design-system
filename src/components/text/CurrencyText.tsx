import { FC } from "react";
import { StyleSheet, TextStyle, Text as RNText, Platform } from "react-native";
import fonts from "../../assets/styles/constants/fonts";
import {
  fontSmall,
  lineHeightXSmall,
} from "../../assets/styles/constants/size";
import TextSkeleton from "./TextSkeleton";
import { useTheme } from "../../context/theme/themeContext";

export interface CurrencyTextProps {
  text: string;
  variant?: string;
  size?: number;
  numberOfLines?: number;
  textstyle?: TextStyle;
  currencyTextStyle?: any;
  loading?: boolean;
  baseLineHeightIos? : number
}

const SAR_CHECK_REGEX = /(\s*\bSAR\b\s*)/g;

export const CurrencyText: FC<CurrencyTextProps> = ({
  text,
  size = fontSmall,
  numberOfLines,
  variant = "primarytextcolor",
  textstyle,
  currencyTextStyle,
  loading = false,
  baseLineHeightIos=1.4,
}) => {
  const { theme } = useTheme();
  const isArabicText = (text: string) => /[\u0600-\u06FF]/.test(text);

  const isArabic = isArabicText(text);
  const baseLineHeight = lineHeightXSmall;
  const adjustedLineHeight = isArabic
    ? Platform.OS === "ios"
      ? baseLineHeight * baseLineHeightIos
      : baseLineHeight * 1.6
    : baseLineHeight;

  const variantColor = (theme as any)[variant];
  return loading ? (
    <TextSkeleton lineHeight={size} />
  ) : (
    <RNText
      numberOfLines={numberOfLines}
      style={fonts.withTrueBoldWeight([
        styles.text,
        { color: variantColor, fontSize: size, lineHeight: adjustedLineHeight },
        textstyle,
      ])}
    >
      {text.split(SAR_CHECK_REGEX).map((part, index) => {
        const trimmedPart = part.trim(); // Remove spaces for accurate comparison
        return trimmedPart === "SAR" ? (
          <RNText
            key={index}
            style={fonts.withTrueBoldWeight([
              styles.currencyText,
              currencyTextStyle,
              {
                color: variantColor,
                fontSize: size,
                lineHeight: adjustedLineHeight,
              },
            ])}
          >
            {trimmedPart}
          </RNText>
        ) : (
          <RNText
            key={index}
            style={fonts.withTrueBoldWeight([
              styles.text,
              textstyle,
              { color: variantColor, fontSize: size },
            ])}
          >
            {part}
          </RNText>
        );
      })}
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: fonts.HSBC,
    fontSize: fontSmall,
  },
  currencyText: {
    fontFamily: fonts.SAR_Font,
    fontSize: fontSmall,
  },
});
