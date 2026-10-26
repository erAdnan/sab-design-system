import React, { FC } from "react";
import {  I18nManager, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import {
  fontLarge,
  fontSmallMedium,
  fontWeightMedium,
  fontWeightRegular,
  lineHeightLarge,
  lineHeightSmallMedium,
  radiusL,
  radiusS,
  spacingS,
  spacingXS,
} from "../../assets/styles/constants/size";
import { Text } from "../text/Text";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import ImageThumbnail, {
  ImageThumbnailProps,
} from "../imageThumbnail/ImageThumbnail";
import { Button } from "../button/Button";
import fonts from "../../assets/styles/constants/fonts";

interface PromotionalBannerProps {
  title: string;
  body?: string;
  imgProps?: ImageThumbnailProps;
  linkButtonText: string;
  onLinkButtonPress?: () => void;
  onPress?: () => void;
  bgImageUrl?: string;
  solidBackground?: boolean;
  overrideStyles?: any;
  loading?: boolean;
}

/**
 * @property {string} title - Text to be displayed on the first line (title text)
 * @property {string} body - Text to be displayed on the second line (smaller text)
 * @property {ImageThumbnailProps} imgProps - The properties of the image
 * @property {string} linkButtonText - Text for link button
 * @property {() => void} onLinkButtonPress - Optonal callback for link button press
 * @property {() => void} onPress - Option callback for the component press event
 * @property {any} overrideStyles - Override styles for the component
 * @property {boolean} loading - boolean for showing the skeleton
 **/

export const PromotionalBanner: FC<PromotionalBannerProps> = ({
  title,
  body = "",
  imgProps,
  onPress,
  linkButtonText,
  onLinkButtonPress,
  bgImageUrl,
  solidBackground = false,
  overrideStyles,
  loading = false,
}) => {
  const { theme } = useTheme();

  const containerHeight = actuatedNormalize(106);

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      width: actuatedNormalize(343),
      borderRadius: radiusL,
      padding: spacingS,
      // gap: spacingS,
      backgroundColor: theme.stylesblockbg,
    },
    details: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center",
    },
    title: {
      lineHeight: lineHeightLarge,
      fontFamily:fonts.HSBC_Medium
    },
    body: {
      lineHeight: lineHeightSmallMedium,
    },
    image: {
      borderRadius: radiusL,
      overflow: "hidden",
    },
  });

  const bannerContent = (
    <>
      <View style={styles.details}>
        <Text
          size={fontLarge}
          overrideStyles={styles.title}
          variant="primarycolor"
        >
          {title}
        </Text>

        <Text
          size={fontSmallMedium}
          overrideStyles={styles.body}
          variant="primarycolor"
        >
          {body}
        </Text>
        {linkButtonText && (
          <Button
            variant="link"
            size="small"
            onButtonPress={() => onLinkButtonPress && onLinkButtonPress()}
            buttonText={{ children: linkButtonText,overrideStyles:{
              lineHeight:lineHeightSmallMedium,
            } }}
            linkIconRight
            overrideStyles={{
              paddingHorizontal: 0,
              paddingVertical: 0,
              gap:0,
            }}
          />
        )}
      </View>

      <View
        style={{
          width: actuatedNormalize(130),
          height: actuatedNormalize(81),
          justifyContent: "center",
          alignItems: "center",
        }}
      >
          
        <ImageThumbnail
          width={actuatedNormalize(100)}
          height={actuatedNormalize(54)}
          {...imgProps}
        />
      </View>
    </>
  );

  return loading ? (
    <View
      style={{
        width: "100%",
        height: containerHeight,
        backgroundColor: theme.stylesblockbg,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: spacingS,
        gap: spacingS,
        borderRadius: radiusL,
      }}
    >
      <View
        style={{
          flexDirection: "column",
          gap: spacingXS,
          flex: 1,
          height: "100%",
          justifyContent: "center",
        }}
      >
        <SkeletonBox
          shape="line"
          size="small"
          overrideStyles={{
            width: "20%",
          }}
        />
        <SkeletonBox
          shape="line"
          size="small"
          overrideStyles={{
            width: "40%",
          }}
        />
        <View></View>
      </View>

      <View>
        <SkeletonBox shape="square" size="large" />
      </View>
    </View>
  ) : (
    <TouchableOpacity onPress={() => onPress && onPress()}>
      {solidBackground ? (
        <View style={[styles.container, overrideStyles]}>{bannerContent}</View>
      ) : (
        <ImageThumbnail
          width={actuatedNormalize(343)}
          // height={actuatedNormalize(109)}
          url={bgImageUrl || require('../../assets/images/promotional_banner_pattern.png')}
          overrideStyles={[styles.container, overrideStyles]}
          isAbsolutePath
        >
          {bannerContent}
        </ImageThumbnail>
      )}
    </TouchableOpacity>
  );
};
