import React, { FC, ReactElement, useMemo } from "react";
import { useTheme } from "../../context/theme/themeContext";
import { Platform, StyleSheet, View } from "react-native";
import {
  fontSmall,
  heightL,
  lineHeightSmall,
  radiusS,
  radiusXS,
  spacing1XS,
  spacingS,
  spacingXS,
  spacingXXS,
  spacingXXXS,
  widthL,
} from "../../assets/styles/constants/size";
import { Checkbox, CheckboxProps } from "../checkbox/Checkbox";
import { Text, TextProps } from "../text/Text";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import InfoFrame from "../icons/status/InfoFrame";
import ImageThumbnail, { ImageThumbnailProps } from "../imageThumbnail/ImageThumbnail";
import { SkeletonBox } from "../skeleton/SkeletonBox";

const disclaimerLogoInnerSize = widthL - 2 * spacingXXXS;

export interface DisclaimerProps {
  text: string | ReactElement;
  textProps?: TextProps;
  type: "tooltip" | "checkbox" | "image";
  size?: "default" | "small";
  /** Leading element; overrides the icon/checkbox/image that `type` would render. */
  icon?: ReactElement;
  /** For type="checkbox": called when the user toggles; receives the new checked state. */
  onSelect?: (checked: boolean) => void;
  imgProps?: ImageThumbnailProps;
  overrideStyles?: any;
  loading?: boolean;
  isChecked?: boolean;
  checkboxProps?: CheckboxProps;
}

/**
 * 
 * @property text - String or ReactElement for the text content of the disclaimer (check stories for examples)
 * @property type - Determines what to show on the left side of the text, "tooltip" will show info icon and "checkbox" renders a selectable checkbox and "image" will display an image thumbnail
 * @property size - "small" renders the compact, hug-width, borderless variant (gray-invert background)
 * @property icon - Leading element that replaces whatever `type` would render (used by the small variant)
 * @property onSelect - Handler for checkbox; receives the new checked state (boolean)
 * @property imgProps - Props for image thumbnail (used only when type is "image")
 * @property overrideStyles - Optional Props use this props for passing the background color , padding ,margin
 */

export const Disclaimer: FC<DisclaimerProps> = ({
  text,
  textProps,
  type,
  size = "default",
  icon,
  onSelect,
  imgProps,
  overrideStyles,
  loading,
  isChecked,
  checkboxProps
}) => {
  const { theme } = useTheme();

  const withTooltip = useMemo(() => type === "tooltip", [type]);

  const isSmall = useMemo(() => size === "small", [size]);

  const styles = StyleSheet.create({
    container: {
      borderRadius: radiusS,
      paddingVertical: spacing1XS,
      paddingHorizontal: spacingS,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: spacingS,
      borderColor: theme.strokeneutraltint,
      borderWidth: Platform.OS ==="ios" ? actuatedNormalize(1)  :actuatedNormalize(2),
      backgroundColor: theme.tintneutral,
      width: "100%",
    },
    smallContainer: {
      paddingVertical: spacingXS,
      paddingHorizontal: spacingS,
      gap: spacingXXS,
      minHeight: actuatedNormalize(48),
      justifyContent: "center",
      borderWidth: 0,
      backgroundColor: theme.primarygrayinvert,
      width: undefined,
      alignSelf: "flex-start",
    },
    disclaimerLogoFrame: {
      width: widthL,
      height: heightL,
      borderRadius: radiusXS,
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      paddingHorizontal: spacingXXXS,
      paddingVertical: spacingXXXS,
    },
  });
  return loading ? (
    <View style={{ ...styles.container, borderColor: 'transparent', backgroundColor: theme.stylesblockbg }}>
      <SkeletonBox shape='square' size='small' />
      <SkeletonBox shape='line' size='small' overrideStyles={{ width: actuatedNormalize(240)}} />
    </View>
  ) : (
    <View style={[styles.container, isSmall && styles.smallContainer, overrideStyles]}>
      {icon}
      {!icon && type === "tooltip" && <InfoFrame color={theme.strokeneutraltint} />}
      {!icon && type === "checkbox" && <Checkbox handleCheck={onSelect} isChecked={isChecked} {...checkboxProps} />}
      {!icon && type === "image" && imgProps && (
        <View
          style={[
            styles.disclaimerLogoFrame,
              {
              borderWidth: 0.5,
              borderColor: theme.neutraltint,
              backgroundColor: theme.primarycolor4static,
            },
          ]}
        >
          <ImageThumbnail
            {...imgProps}
            width={disclaimerLogoInnerSize}
            height={disclaimerLogoInnerSize}
            overrideStyles={{
              borderWidth: 0,
              borderRadius: 0,
              ...imgProps.overrideStyles,
            }}
          />
        </View>
      )}
      {typeof text === "string" ? (
        <Text
          size={fontSmall}
          variant="primarytextcolor"
          overrideStyles={{
            maxWidth: actuatedNormalize(270),
            ...(isSmall && {
              lineHeight: lineHeightSmall,
              includeFontPadding: false,
              textAlignVertical: "center",
            }),
          }}
          {...textProps}
        >
          {text}
        </Text>
      ) : (
        text
      )}
    </View>
  );
};
