import { Text as TextWrapper, StyleSheet, View, I18nManager } from "react-native";
import React, { FC, ReactElement } from "react";
import { Size } from "../../assets/styles";
import { useTheme } from "../../context/theme/themeContext";
import { TextProps, Text } from "./Text";
import i18n from "i18next";
import { LanguageCodes } from "../../localization/languages";
import { globalStyles } from "../../assets/styles/globalStyles";
import fonts from "../../assets/styles/constants/fonts";
import { Divider } from "../divider/Divider";
import { fontWeightBold, fontXLG } from "../../assets/styles/constants/size";
import TextSkeleton from "./TextSkeleton";

export interface TitleProps extends TextProps {
  action?: ReactElement;
  subtitle?: string;
  subtitleSize?: number | undefined;
  subtitleVariant?: string;
  numberOfLines?: number;
  loading?: boolean;
  loadingStateStyles?: any;
  textWidth?: number;
  loadingNumOfLines?: number;
  mediumFont?: boolean;
}

/**
 * Title Component
 * @property action - The content displayed on the right side of the title container (can be any element)
 * @property subtitle - The text to be displaye under the title
 * @property subtitleSize - The font size of the subtitle
 * @property subtitleVariant - Determines the font color of the subtitle
 * @property numberofLines - Optional number to crop text to specific number of lines
 */

export const Title: FC<TitleProps> = ({
  action,
  subtitle = "",
  subtitleSize = fontXLG,
  subtitleVariant = "primarytextcolor",
  size = fontXLG,
  variant = "primarytextcolor",
  iconLeft,
  iconRight,
  children = "",
  overrideStyles,
  showDivider,
  numberOfLines,
  loading = false,
  loadingStateStyles,
  textWidth,
  loadingNumOfLines,
  mediumFont = false,
}) => {
  const { theme } = useTheme();
  const isRtl = I18nManager.isRTL;

  return loading ? (
    <TextSkeleton
      overrideStyles={loadingStateStyles}
      lineHeight={size}
      width={textWidth}
      numOfLines={loadingNumOfLines}
    />
  ) : (
    <View>
      <View style={{ ...styles.container, ...overrideStyles }}>
        <View style={styles.textContainer}>
          <View style={!isRtl ? styles.title : globalStyles.rtlTitle}>
            {iconLeft && <View>{iconLeft}</View>}
            {children && (
              <TextWrapper
                numberOfLines={numberOfLines}
                style={fonts.withTrueBoldWeight([
                  {
                    
                    fontSize: size,
                    color: theme[variant],
                    fontFamily: mediumFont ? fonts.HSBC_Medium : fonts.HSBC_Bold,
                    // fontWeight:fontWeightBold,
                    writingDirection: isRtl ? "rtl" : "ltr",
                  },
                  ...(overrideStyles
                    ? Array.isArray(overrideStyles)
                      ? overrideStyles
                      : [overrideStyles]
                    : []),
                ])
              }
              >
                {children}
              </TextWrapper>
            )}
            {iconRight && <View>{iconRight}</View>}
          </View>
          {action && <View>{action}</View>}
        </View>
        {subtitle && (
          <View>
            <Text
              size={subtitleSize}
              variant={subtitleVariant}
              overrideStyles={overrideStyles}
            >
              {subtitle || ""}
            </Text>
          </View>
        )}
      </View>
      {showDivider && <Divider />}
    </View>
  );
};

/*
 * Styles to use for Text component
 */

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: Size.spacingXXS,
    paddingVertical: Size.spacingM,
    paddingHorizontal: Size.spacingS,
  },
  title: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    gap: Size.spacingXS,
  },
  textContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
