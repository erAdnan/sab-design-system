import {
  Text as TextWrapper,
  StyleSheet,
  View,
  I18nManager,
  StyleProp,
  TextStyle,
} from "react-native";
import React, { FC, ReactElement } from "react";
import { fontMediumLarge, fontWeightBold, spacing1XS, spacingXS, spacingXXS } from "../../assets/styles/constants/size";
import { useTheme } from "../../context/theme/themeContext";
import { BulletPoint, BulletPointProps } from "../list/BulletPoint";
import Copy from "../icons/functionals/Copy";
import Edit from "../icons/functionals/Edit";

import { Divider } from "../divider/Divider";
import fonts from "../../assets/styles/constants/fonts";
import TextSkeleton from "./TextSkeleton";
import { Size } from "../../assets/styles";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { readingEdgeAlign, withReadingTextAlign } from "../../localization/rtlStyle";

export interface TextProps {
  size?: number | undefined;
  iconLeft?: ReactElement;
  iconRight?: ReactElement;
  variant?: string;
  children: string | React.ReactNode;
  editable?: boolean;
  copyable?: boolean;
  bulletPointProps?: BulletPointProps;
  showBulletPoint?: boolean;
  showDivider?: boolean;
  bold?: boolean;
  /** When true, uses Medium font (weight 500) - e.g. for accordion titles */
  medium?: boolean;
  numberOfLines?: number;
  /**
   * Stretch to the parent width and wrap. Use inside a row when a sibling
   * (such as an accordion chevron) must keep its position.
   */
  fill?: boolean;
  overrideStyles?: any;
  loading?: boolean;
  textWidth?: number;
  loadingStateStyles?: any;
  loadingNumOfLines?: number;
  mandatory?: boolean;
}

/**
 * Text Component
 * @property size - The font size to be used
 * @property iconLeft - Icon element to be displayed on the left side of the text
 * @property iconRight - Icon element to be displayed on the right side of the text
 * @property editable - Adds edit icon
 * @propery copyable - Adds copy icon
 * @property showBulletPoints - Determines if bullet points will be displayed
 * @property bulletPointProps - Determines type and variant of bullet points
 * @property variant - Determines the font color
 * @property children - The text content (string)
 * @property showDivider - Adds a text divider at the bottom of the text
 * @property bold - Determines if the text will be bold
 * @property numberOfLines - Determines the number of lines the text will display
 * @property overrideStyles - Custom styles to be applied to the text
 * @property mandatory - use this props to show red star for mandatory field
 */

export const Text: FC<TextProps> = ({
  size = fontMediumLarge,
  variant = "primarytextcolor",
  iconLeft,
  iconRight,
  bulletPointProps,
  showBulletPoint = false,
  showDivider = false,
  editable,
  copyable,
  children = "",
  bold = false,
  medium = false,
  numberOfLines,
  fill = false,
  overrideStyles,
  loading = false,
  textWidth,
  loadingStateStyles,
  loadingNumOfLines,
  mandatory = false,
}) => {
  const { theme } = useTheme();
  const isRtl = I18nManager.isRTL;

  const variantColor = (theme as any)[variant];

  const finalJoinedYaRegex =/ي(?=\s|$)/;
  const hasFinalJoinedYa = (text?: string) => {
  if (!text || !I18nManager.isRTL) return false;
  return finalJoinedYaRegex.test(text);
  };
  const needsFix = hasFinalJoinedYa(
  typeof children === "string" ? children : ""
  );

  const overrideList: StyleProp<TextStyle>[] = overrideStyles
    ? Array.isArray(overrideStyles)
      ? overrideStyles
      : [overrideStyles]
    : [];
  const flatOverride = (StyleSheet.flatten(overrideList) || {}) as TextStyle;
  // `flex: 1` on the native Text sets flexBasis 0. On device the wrapper then
  // measures as empty and the glyphs disappear (web keeps the inline text).
  // Grow the wrapper instead, and let the text fill that width so it wraps.
  const wantsFlex = flatOverride.flex != null || flatOverride.flexGrow != null;
  const textOverrides = wantsFlex
    ? overrideList.map((style) => {
        if (style == null || typeof style !== "object" || Array.isArray(style)) {
          return style;
        }
        const { flex: _flex, flexGrow: _flexGrow, flexBasis: _flexBasis, ...rest } =
          style as TextStyle;
        return rest;
      })
    : overrideList;
  const flexWrapper = wantsFlex
    ? {
        flexGrow: typeof flatOverride.flex === "number" ? flatOverride.flex : (flatOverride.flexGrow ?? 1),
        flexShrink: flatOverride.flexShrink ?? 1,
        minWidth: 0,
      }
    : null;

  return loading ? (
    <TextSkeleton
      numOfLines={loadingNumOfLines}
      width={textWidth}
      lineHeight={size}
      overrideStyles={loadingStateStyles}
    />
  ) : (
    <View
      // Always allow the wrapper to shrink inside row parents (RN-web defaults flexShrink to 0,
      // which makes long copy size to max-content and overflow its container instead of wrapping).
      style={[styles.shrinkable, fill ? styles.fill : null, flexWrapper]}
    >
      <View
        style={[
          !isRtl ? styles.textContainer : styles.rtlText,
          showBulletPoint && bulletPointProps ? styles.bulletContainer : null,
          styles.shrinkable,
          fill ? styles.fill : null,
          flexWrapper,
          wantsFlex ? styles.flexText : null,
        ]}
      >
        {showBulletPoint && bulletPointProps && (
          <View>
            <BulletPoint
              type={bulletPointProps.type}
              variant={bulletPointProps.variant}
            />
          </View>
        )}
        {iconLeft && !showBulletPoint && <View>{iconLeft}</View>}
        <TextWrapper
          numberOfLines={numberOfLines}
          ellipsizeMode="tail"
          style={fonts.withTrueBoldWeight([
            {
              fontSize: size,
              color: variantColor,
              fontFamily: bold
                ? fonts.HSBC_Bold
                : medium
                  ? fonts.HSBC_Medium
                  : fonts.HSBC,
              // ...(bold && { fontWeight: fontWeightBold }),
              // paddingBottom: needsFix ? actuatedNormalize(3) : 0,
              writingDirection: isRtl ? "rtl" : "ltr",
              textAlign: readingEdgeAlign(isRtl),
              flexShrink: 1,
              minWidth: 0,
              maxWidth: "100%",
              ...(fill || wantsFlex ? { width: "100%" as const } : null),
            },
            ...textOverrides.map((style) => withReadingTextAlign(style, isRtl)),
          ])}
        >
          {children}
          {mandatory && (
            <TextWrapper style={{ color: theme.primarytextcolor3 }}>
              {" "}
              *
            </TextWrapper>
          )}
        </TextWrapper>
        {iconRight && <View>{iconRight}</View>}
        {copyable && (
          <View>
            <Copy />
          </View>
        )}
        {editable && (
          <View>
            <Edit />
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
  shrinkable: {
    maxWidth: "100%",
    minWidth: 0,
    flexShrink: 1,
  },
  fill: {
    alignSelf: "stretch",
    width: "100%",
    minWidth: 0,
    flexGrow: 1,
    flexShrink: 1,
  },
  flexText: {
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 0,
    maxWidth: "100%",
  },
  // Figma text.text with bullet: 12px gap between bullet and text, 4px horizontal padding.
  bulletContainer: {
    gap: spacing1XS,
    paddingHorizontal: spacingXXS,
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: spacingXS,
  },
  rtlText: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: Size.spacingXS,
  },
});