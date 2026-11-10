import { FC, ReactElement, useMemo } from "react";
import { I18nManager, StyleSheet, TouchableOpacity, View } from "react-native";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { Text } from "../text/Text";
import {
  fontLarge,
  fontMedium,
  fontMediumLarge,
  fontSmallMedium,
  fontXLarge,
  heightL,
  radiusS,
  radiusXS,
  spacingM,
  spacingS,
  widthL,
} from "../../assets/styles/constants/size";
import { useTheme } from "../../context/theme/themeContext";
import React from "react";
import GraphPattern from "../patterns/GraphPattern";
import ImageThumbnail, {
  ImageThumbnailProps,
} from "../imageThumbnail/ImageThumbnail";
import { ChipsInfoProps } from "../chips/ChipsInfo";
import { LanguageCodes } from "../../localization/languages";
import i18n from "i18next";
import { WidgetSkeleton } from "./WidgetSkeleton";
import fonts from "../../assets/styles/constants/fonts";

export interface WidgetProps {
  title: string;
  description: string;
  extraContent?: string;
  onWidgetPress?: () => void;
  type?: "image" | "graph" | "icons" | "iconwithimage";
  size?: "small" | "medium" | "large";
  color?:
    | "complimentary"
    | "rag-neutral"
    | "secondary-purple"
    | "secondary-cold-green"
    | "secondary-orange"
    | "secondary-blue-green";
  icon?: ReactElement;
  imageThumbnailProps?: ImageThumbnailProps;
  chipsProps?: ChipsInfoProps;
  customBgColor?: string;
  overrideStyles?: any;
  loading?: boolean;
}

/**
 * Widget component
 * @property {string} title - The title of the widget
 * @property {string} description - The description of the widget
 * @property {string} extraContent - The extra content of the widget, only visible in large size
 * @property {() => void} onWidgetPress - The on widget press function
 * @property {string} type - The type of the widget, can be "image", "graph" or "icons" , "iconwithimage" only for foryou
 * @property {string} size - The size of the widget, can be "small", "medium" or "large"
 * @property {string} color - The color of the widget, can be "complimentary", "rag-neutral", "secondary-purple", "secondary-cold-green", "secondary-orange" or "secondary-blue-green"
 * @property {ReactElement} icon - The icon of the widget
 * @property {ImageThumbnailProps} imageThumbnailProps - The image thumbnail props of the widget
 * @property {ChipsInfoProps} chipsProps - The chips props of the widget
 * @property {any} overrideStyles - The override styles of the widget
 * @property {string} customBgColor – Fetch this value from the API and pass it to set the background color.
 */
export const Widget: FC<WidgetProps> = ({
  title,
  description,
  extraContent,
  onWidgetPress = () => {},
  type = "icons",
  size = "small",
  color = "complimentary",
  icon,
  imageThumbnailProps,
  chipsProps,
  customBgColor,
  overrideStyles,
  loading = false,
}) => {
  const { theme } = useTheme();
  const isRtl = I18nManager.isRTL;

  const isImage = useMemo(
    () => type === "image" || type === "iconwithimage",
    [type]
  );
  const isGraph = useMemo(() => type === "graph", [type]);
  const isIcons = useMemo(
    () => type === "icons" || type === "iconwithimage",
    [type]
  );

  const isSmall = useMemo(() => size === "small", [size]);
  const isMedium = useMemo(() => size === "medium", [size]);
  const isLarge = useMemo(() => size === "large", [size]);

  // const titleSize = useMemo(() => (isSmall ? fontMediumLarge : fontMediumLarge), [size]);
  // const descriptionSize = useMemo(
  //   () => (isSmall ? fontSmallMedium : fontMediumLarge),
  //   [size]
  // );

  const dynamicIcon = useMemo(
    () =>
      icon
        ? React.cloneElement(icon, {
            width: widthL,
            height: heightL,
            fill: theme.primarycolor4static,
          })
        : null,
    [icon]
  );

  const hasColorWithIcon = useMemo(
    () => Boolean(color && icon),
    [color, icon]
  );

  const chipState = chipsProps?.state ?? "neutral";
  const chipThemeByState = {
    neutral: {
      backgroundColor: theme.styleslightgray,
      borderColor: theme.primarytextcolor_2,
    },
    success: {
      backgroundColor: theme.tintstaticgreen,
      borderColor: theme.greentint,
    },
    error: {
      backgroundColor: theme.tintstaticred,
      borderColor: theme.strokecolor3tint,
    },
    warning: {
      backgroundColor: theme.tintstaticOrange,
      borderColor: theme.ambertint,
    },
    info: {
      backgroundColor: theme.tintstaticneutral,
      borderColor: theme.strokeneutraltint,
    },
  }[chipState];
  const chipLabelVariant =
    chipState === "neutral" ? "primarytextcolor" : "primarycolorstatic";


  const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      justifyContent: isImage && isIcons || hasColorWithIcon ? "space-between" : "flex-end",
      alignItems: "flex-start",
      borderRadius: radiusS,
      ...(isLarge ? { gap: spacingS } : {}), 
    },
    iconWrapper: {
      paddingHorizontal: spacingS,
    },
    textWrapper: {
      paddingHorizontal: spacingS,
      alignItems: "flex-start",
      // marginBottom: isGraph && isLarge ? actuatedNormalize(60) : 0,
    },
    imageWrapper: {
      backgroundColor: "transparent",
    },
    chipsContainer: {
      position: "absolute",
      top: spacingM,
      alignSelf: "flex-start",
      paddingVertical: actuatedNormalize(2),
      paddingHorizontal: actuatedNormalize(8),
    },
    chipsContainerRight: {
      right: 0,
      borderTopLeftRadius: radiusXS,
      borderBottomLeftRadius: radiusXS,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      borderTopWidth: 1,
      borderLeftWidth: 1,
      borderBottomWidth: 1,
      borderRightWidth: 0,
    },
    chipsContainerLeft: {
      right: 0,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      borderTopLeftRadius: radiusXS,
      borderBottomLeftRadius: radiusXS,
      borderTopWidth: 1,
      borderLeftWidth: 1,
      borderBottomWidth: 1,
      borderRightWidth: 0,
    },
  });

  const widgetSize = StyleSheet.create({
    small: {
      width: "100%",
      maxWidth: "100%",
      minWidth: 0,
      alignSelf: "stretch",
      height: actuatedNormalize(160),
      paddingVertical: spacingS,
    },
    medium: {
      width: "100%",
      maxWidth: "100%",
      minWidth: 0,
      alignSelf: "stretch",
      height: actuatedNormalize(232),
      paddingVertical: spacingM,
    },
    large: {
      width: "100%",
      maxWidth: "100%",
      minWidth: 0,
      alignSelf: "stretch",
      height: actuatedNormalize(406),
      paddingVertical: spacingM,
    },
  });

  const widgetColor = StyleSheet.create({
    complimentary: {
      backgroundColor: theme.complimentaryprimarycolor3_3,
    },
    "rag-neutral": {
      backgroundColor: theme.ragneutral,
    },
    "secondary-purple": {
      backgroundColor: theme.secondarycolor12,
    },
    "secondary-cold-green": {
      backgroundColor: theme.secondarycolor13,
    },
    "secondary-orange": {
      backgroundColor: theme.secondarycolor9,
    },
    "secondary-blue-green": {
      backgroundColor: theme.secondarycolor10,
    },
  });

  const card = (
    <TouchableOpacity
      onPress={onWidgetPress}
      style={[
        styles.container,
        widgetSize[size],
        isImage ? styles.imageWrapper : customBgColor ? { backgroundColor: customBgColor } : widgetColor[color],
        overrideStyles,
      ]}
    >
      {chipsProps && !isSmall && (
        <View
          style={[
            styles.chipsContainer,
            isRtl ? styles.chipsContainerLeft : styles.chipsContainerRight,
            {
              backgroundColor: chipThemeByState.backgroundColor,
              borderColor: chipThemeByState.borderColor,
            },
          ]}
        >
          <Text
            size={fontMedium}
            variant={chipLabelVariant}
          >
            {chipsProps.label ?? ""}
          </Text>
        </View>
      )}
      {isIcons && dynamicIcon && (
        <View style={styles.iconWrapper}>{dynamicIcon}</View>
      )}
      {isGraph && <GraphPattern />}
      <View style={styles.textWrapper}>
        <Text
          size={fontMediumLarge}
          variant={isImage || isGraph ? "primarycolor4static" : "primarycolorstatic"}
          overrideStyles={{
            textAlign: isLarge ? "center" : "left",
            fontFamily: fonts.HSBC_Medium,
          }}
        >
          {title}
        </Text>
        <Text
          size={fontSmallMedium}
          variant={isImage || isGraph  ? "primarycolor4static" : "primarycolor2_100static"}
          overrideStyles={{ textAlign: "left" }}
        >
          {description}
        </Text>
        {extraContent && isLarge && (
          <Text
            size={fontSmallMedium}
            variant={isImage || isGraph ? "primarycolor4static" : "primarycolor2_100static"}
            overrideStyles={{
              textAlign: isLarge ? "center" : "left",
            }}
          >
            {extraContent}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const imageCard = isImage ? (
    <ImageThumbnail
      width={actuatedNormalize(164)}
      height={isLarge ? actuatedNormalize(406) : actuatedNormalize(232)}
      overrideImageStyles={{ borderRadius: radiusS }}
      {...imageThumbnailProps}
    >
      {card}
    </ImageThumbnail>
  ) : null;

  return loading ? (
    <WidgetSkeleton size={size} extraContent={Boolean(extraContent)} />
  ) : isImage ? (
    imageCard
  ) : (
    card
  );
};
