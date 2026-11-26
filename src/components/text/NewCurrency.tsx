import { FC } from "react";
import { StyleSheet, TextStyle, Text as RNText, Platform, I18nManager } from "react-native";
import fonts from "../../assets/styles/constants/fonts";
import {
  fontSmall,
} from "../../assets/styles/constants/size";
import TextSkeleton from "./TextSkeleton";
import { useTheme } from "../../context/theme/themeContext";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { withReadingTextAlign } from "../../localization/rtlStyle";

export interface NewCurrencyProps {
  text: string;
  variant?: string;
  size?: number;
  numberOfLines?: number;
  textstyle?: TextStyle;
  currencyTextStyle?: any;
  loading?: boolean;
}

const SAR_CHECK_REGEX = /(\s*SAR(?![A-Za-z])\s*)/gi;

export const NewCurrency: FC<NewCurrencyProps> = ({
  text,
  size = fontSmall,
  numberOfLines,
  variant = "primarytextcolor",
  textstyle,
  currencyTextStyle,
  loading = false,
}) => {
  const { theme } = useTheme();
  

  const variantColor = (theme as any)[variant];
  return loading ? (
    <TextSkeleton lineHeight={size} />
  ) : (
    <RNText
      numberOfLines={numberOfLines}
      style={fonts.withTrueBoldWeight([
        styles.text,
        { color: variantColor, fontSize: size },
        withReadingTextAlign(textstyle),
      ])}
    >
      {text.split(SAR_CHECK_REGEX).map((part, index) => {
        const trimmedPart = part.trim().toUpperCase(); // Remove spaces for accurate comparison
        return trimmedPart === "SAR" ? (
          <RNText
            key={index}
            style={fonts.withTrueBoldWeight([
              styles.currencyText,
              {
                color: variantColor,
                fontSize: size,
              },
              currencyTextStyle,
            ])}
          >
            {trimmedPart}
          </RNText>
        ) : (
          <RNText
            key={index}
            style={fonts.withTrueBoldWeight([
              styles.text,
              { color: variantColor, fontSize: size },
              withReadingTextAlign(textstyle),
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
