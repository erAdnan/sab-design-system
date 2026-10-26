import React, { ReactElement, useMemo } from "react";
import { I18nManager, StyleSheet, Text, View, ViewStyle } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import { Button } from "../button/Button";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import fonts from "../../assets/styles/constants/fonts";
import {
  fontLarge,
  fontMediumLarge,
  fontWeightBold,
  fontWeightMedium,
  fontWeightRegular,
  fontXLG,
  fontXXLarge,
  fontXXLG2,
  lineHeightLarge,
  lineHeightMediumLarge,
  lineHeightXLG,
  lineHeightXXLarge,
  lineHeightXXLG,
} from "../../assets/styles/constants/size";

import { Badge, BadgeProps, BadgeSize, BadgeType } from "../badge/Badge";
import { TooltipComponent, TooltipProps } from "../tooltip/Tooltip";
import { NewCurrency } from "./NewCurrency";

export interface TextDividerProps {
  type?: "Promotional" | "Page Title" | "In Page" | "BottomSheet";
  headline?: string;
  text?: string;
  subTitle?: boolean;
  link?: boolean;
  linkButtonSize?: "small" | "large";
  linkButtonLink?: string;
  linkButtonLeft?: boolean;
  linkButtonRight?: boolean;
  onLinkPress?: () => void;
  mainWrapper?: ViewStyle;
  headlineStyle?: any;
  descriptionStyle?: any;
  badge?: boolean;
  badgeProps?: BadgeProps;
  tooltip?: boolean;
  tooltipProps?: TooltipProps;
  containerStyle?: any;
  isSarCheck?: boolean;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
}

export const TextDivider: React.FC<TextDividerProps> = ({
  type = "In Page",
  headline,
  text,
  subTitle = false,
  link = false,
  linkButtonSize = "small",
  linkButtonLink = "",
  linkButtonLeft = false,
  linkButtonRight = false,
  onLinkPress,
  mainWrapper,
  headlineStyle,
  descriptionStyle,
  badge = false,
  badgeProps,
  tooltip = false,
  tooltipProps,
  containerStyle,
  isSarCheck,
  leftIcon,
  rightIcon,
}) => {
  const { theme } = useTheme();

  // Map type to font sizes & line heights
  const typeStyles = useMemo(() => {
    const baseHeadline = { fontFamily: fonts.HSBC_Bold , color: theme.primarycolor,textAlign: "left",...(I18nManager.isRTL && { paddingBottom: actuatedNormalize(3) }) };
    const baseDescription = { fontFamily: fonts.HSBC, fontWeight: fontWeightRegular, color: theme.primarycolor,textAlign: "left",...(I18nManager.isRTL && { paddingBottom: actuatedNormalize(3) }) };

    const map = {
      Promotional: {
        headline: { ...baseHeadline, fontSize: fontXXLG2, lineHeight: lineHeightXXLG },
        description: { ...baseDescription, fontSize: fontLarge, lineHeight: lineHeightLarge },
      },
      "Page Title": {
        headline: { ...baseHeadline, fontSize: fontXLG, lineHeight: lineHeightXLG },
        description: { ...baseDescription, fontSize: fontLarge, lineHeight: lineHeightLarge },
      },
      BottomSheet: {
        headline: { ...baseHeadline, fontSize: fontXXLarge, lineHeight: lineHeightXXLarge },
        description: { ...baseDescription, fontSize: fontMediumLarge, lineHeight: lineHeightMediumLarge },
      },
      "In Page": {
        headline: { ...baseHeadline,fontFamily: fonts.HSBC_Medium, fontSize: fontLarge, lineHeight: lineHeightLarge },
        description: { ...baseDescription, fontSize: fontMediumLarge, lineHeight: lineHeightMediumLarge },
      },
    };

    return map[type] || map["In Page"];
  }, [type, theme]);

  return (
    <View style={[styles.mainWrapper, mainWrapper]}>
      {/* Headline Row */}
      <View style={[styles.rowContainer, { justifyContent: badge || tooltip ? "flex-start" : "space-between" },containerStyle]}>
       {headline && <Text style={fonts.withTrueBoldWeight([typeStyles.headline, headlineStyle])}>{headline}</Text>}

        {badge && <Badge type={badgeProps?.type || BadgeType.primary} size={BadgeSize.large} {...badgeProps} />}
        {tooltip && <TooltipComponent text={tooltipProps?.text || ""} {...tooltipProps} />}

        {type === "In Page" && link && onLinkPress && (
          <Button
            buttonText={{ children: linkButtonLink }}
            variant="link"
            size={linkButtonSize}
            linkIconLeft={linkButtonLeft}
            linkIconRight={linkButtonRight}
            leftIcon={leftIcon}
            rightIcon={rightIcon}
            onButtonPress={onLinkPress}
            overrideStyles={{ paddingHorizontal:0,minWidth: 0 }}
          />
        )}
      </View>

      {/* Description / Subtitle */}
      {subTitle && (isSarCheck ? <NewCurrency  size={fontMediumLarge} text={text || ""} variant="primarycolor"/> :<Text style={fonts.withTrueBoldWeight([typeStyles.description, descriptionStyle])}>{text}</Text>)}
    </View>
  );
};

// Common Styles
const styles = StyleSheet.create({
  mainWrapper: {
    gap: actuatedNormalize(4),
    flexDirection: "column",
    alignItems: "flex-start",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
});
