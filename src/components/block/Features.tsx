import React, {FC} from "react";
import {I18nManager, StyleSheet, TouchableOpacity, View} from "react-native";
import {useTheme} from "../../context/theme/themeContext";
import {
  fontMediumLarge,
  fontSmall,
  fontWeightRegular,
  fontXSmall,
  fontXXSmall,
  lineHeightSmall,
  lineHeightXSmall,
  lineHeightXLarge,
  lineHeightXXSmall,
  radiusS,
  spacingS,
  spacingXS,
} from "../../assets/styles/constants/size";
import fonts from "../../assets/styles/constants/fonts";
import {Text} from "../text/Text";
import {actuatedNormalize} from "../../assets/styles/utils/pixelScaling";
import {SkeletonBox} from "../skeleton/SkeletonBox";
import ImageThumbnail, {ImageThumbnailProps} from "../imageThumbnail/ImageThumbnail";
import Insight from "../icons/outline/Insight";

interface BlockFeaturesProps {
  topText: string;
  title: string;
  extraContent?: string;
  imgProps?: ImageThumbnailProps;
  variant?: "default" | "insights";
  onPress?: () => void;
  overrideStyles?: any;
  loading?: boolean;
}

/**
 * @property {string} topText - Text to be displayed on the first line (top text)
 * @property {string} title - Text to be displayed on the second line (title text)
 * @property {string} extraContent - Text to be displayed on the bottom line (smaller text)
 * @property {ImageThumbnailProps} imgProps - The properties of the image
 * @property {"default" | "insights"} variant - "insights" tints the top text and shows the insight icon instead of an image
 * @property {() => void} onPress - Option callback for the component press event
 * @property {any} overrideStyles - Override styles for the component
 * @property {boolean} loading - boolean for showing the skeleton
 **/

export const Features: FC < BlockFeaturesProps > = ({
  topText,
  title,
  extraContent = "",
  imgProps,
  variant = "default",
  onPress,
  overrideStyles,
  loading = false
}) => {
  const {theme} = useTheme();
  const isInsights = variant === "insights";

  const containerHeight = actuatedNormalize(106);

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      width: "100%",
      height: containerHeight,
      borderRadius: radiusS,
      padding: spacingS,
      gap: spacingS,
      backgroundColor: theme.stylesblockbg
    },
    details: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap:actuatedNormalize(3),
    },
    topText: {
      fontWeight: fontWeightRegular,
    },
    title: {
      fontWeight: fontWeightRegular,
    },
    extraContent: {
      fontWeight: fontWeightRegular,
      textAlign: "left",
       ...(I18nManager.isRTL && { paddingBottom: actuatedNormalize(3) }),
    },
    image: {
      borderRadius: radiusS,
      overflow: "hidden"
    },
    iconWrapper: {
      width: actuatedNormalize(32),
      height: actuatedNormalize(32),
      borderRadius: actuatedNormalize(4),
      backgroundColor: theme.whiteinvert,
      alignItems: "center",
      justifyContent: "center",
    }
  });

  return loading
    ? (<View style={{
        width: "100%",
        height: containerHeight,
        backgroundColor: theme.stylesblockbg,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: spacingS,
        gap: spacingS,
        borderRadius: radiusS
      }}>
     
        <SkeletonBox shape="line" size="small" overrideStyles={{
            width: "70%"
        }} />
         <SkeletonBox shape="line" size="large" overrideStyles={{
            width: "70%"
          }}/>
        <SkeletonBox shape="line" size="small" overrideStyles={{
            width: "70%"
          }}/>
       
    </View>)
    : (<TouchableOpacity onPress={() => onPress && onPress()}>
      <View style={[styles.container, overrideStyles]}>
        <View style={styles.details}>
          <Text
            size={isInsights ? fontXSmall : fontXXSmall}
            overrideStyles={{
              ...styles.topText,
              ...(isInsights && {
                color: theme.secondaryButtonAccentContentDefault,
                fontFamily: fonts.HSBC_Medium,
                lineHeight: lineHeightXSmall,
              }),
            }}
            variant="primarytextcolor"
          >
            {topText}
          </Text>

          <Text size={fontMediumLarge} overrideStyles={styles.title} variant="primarytextcolor">
            {title}
          </Text>

          <Text
            size={fontSmall}
            overrideStyles={{
              ...styles.extraContent,
              ...(isInsights && {
                color: theme.primarytextcolor2,
                fontFamily: fonts.HSBC,
                lineHeight: lineHeightSmall,
              }),
            }}
            variant="primarycolor2_100"
          >
            {extraContent}
          </Text>
        </View>

        {isInsights ? (
          <View style={styles.iconWrapper}>
            <Insight
              width={actuatedNormalize(21)}
              height={actuatedNormalize(21)}
              fill={theme.secondaryButtonAccentContentDefault}
            />
          </View>
        ) : (
          imgProps && <ImageThumbnail overrideStyles={styles.image} {...imgProps} height={actuatedNormalize(74)} width={actuatedNormalize(74)}/>
        )}
      </View>
    </TouchableOpacity>);
};
