import React, { FC, useMemo } from "react";
import { I18nManager, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  fontLarge,
  fontWeightMedium,
  fontXXLarge,
  lineHeightLarge,
  lineHeightXXLarge,
  radiusL,
  radiusXL,
  spacingM,
  spacingS,
  spacingXS,
  spacingXXS,
} from "../../assets/styles/constants/size";
import { Text } from "../text/Text";
import ImageThumbnail, { ImageThumbnailProps } from "../imageThumbnail/ImageThumbnail";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import BannerSkeleton from "./BannerSkeleton";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import { Button } from "../button/Button";
import fonts from "../../assets/styles/constants/fonts";

// Figma marketing.banner: Size=big 343×284 (radius 24), Size=small 343×143 (radius 16).
const BIG_HEIGHT = 284;
const SMALL_HEIGHT = 143;

export interface MarketingBannerProps {
  title: string;
  description: string;
  size: "big" | "small";
  onBannerPress?: () => void;
  imageThumbnailProps?: ImageThumbnailProps;
  overrideStyles?: any;
  loading?: boolean;
  overrideHeight?: number;
  linkButtonText: string;
  onLinkButtonPress?: () => void;
  underline?: boolean;
  linkIconRight?: boolean;
}

/**
 * Marketing Banner component
 * @property title - The title of the banner
 * @property description - The description of the banner
 * @property size - The size of the banner, either big or small
 * @property onBannerPress - Function to be called when the banner is pressed
 * @property imageThumbnailProps - The image thumbnail props of the widget
 * @property overrideStyles - Custom styles to be applied to the banner
 * @property linkButtonText - Text for link button
 * @property onLinkButtonPress - Optonal callback for link button press
 * @property linkIconRight - Optional props use this to show icon right link button 
 * @property underline - Optional props to show underline in the link button
 **/
export const MarketingBanner: FC<MarketingBannerProps> = ({
  title,
  description,
  size = "big",
  imageThumbnailProps,
  onBannerPress,
  overrideStyles,
  loading = false,
  overrideHeight,
  linkButtonText="Apply Now",
  onLinkButtonPress,
  linkIconRight,
  underline,
}) => {
  const isBig = useMemo(() => size === "big", [size]);

  return loading ? (
    <BannerSkeleton
      width={actuatedNormalize(343)}
      height={isBig ? actuatedNormalize(BIG_HEIGHT) : actuatedNormalize(SMALL_HEIGHT)}>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: spacingS,
          paddingVertical: spacingM,
          paddingHorizontal: spacingS,
          alignItems: "flex-start",
          justifyContent: "flex-end",
          height: "100%",
        }}
      >
        <SkeletonBox shape="line" size="large" />
        <View style={{ display: "flex", flexDirection: "column", gap: spacingXS }}>
          <SkeletonBox shape="line" size="small" />
          <SkeletonBox shape="line" size="small" />
        </View>
      </View>
    </BannerSkeleton>
  ) : (
    <TouchableOpacity
      style={overrideStyles}
      onPress={() => onBannerPress && onBannerPress()}
      disabled={!onBannerPress}
    >
      <ImageThumbnail
        width={actuatedNormalize(343)}
        height={overrideHeight || (isBig ? actuatedNormalize(BIG_HEIGHT) : actuatedNormalize(SMALL_HEIGHT))}
        overrideImageStyles={{ borderRadius: isBig ? radiusXL : radiusL }}
        {...imageThumbnailProps}
      >
        <View style={isBig ? styles.textContent : styles.textContentSmall}>
          <Text
            size={fontXXLarge}
            medium={true}
            variant="primarycolor4static"
            overrideStyles={{ lineHeight:lineHeightXXLarge }}
          >
            {title}
          </Text>
          <Text
            size={fontLarge}
            variant="primarycolor4static"
            overrideStyles={{ width: actuatedNormalize(296),lineHeight: lineHeightLarge }}
          >
            {description}
          </Text>
           {linkButtonText && onLinkButtonPress && (
                       <Button
                         variant="link"
                         size="small"
                         onButtonPress={() => onLinkButtonPress && onLinkButtonPress()}
                         buttonText={{ children: linkButtonText,variant:"primarycolor4static" }}
                         linkIconRight={linkIconRight}
                         overrideStyles={{
                           height:"auto",
                           paddingHorizontal: 0,
                           paddingVertical: 0,
                         }}
                         underline={underline}
                       />
                     )}
        </View>
      </ImageThumbnail>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Figma Size=big: text block anchored to the bottom (pb 24, px 16, gap 4).
  textContent: {
    paddingHorizontal: spacingS,
    position: "absolute",
    bottom: spacingM,
    gap: spacingXXS,
  },
  // Figma Size=small: text block vertically centered (px 16, gap 4).
  textContentSmall: {
    paddingHorizontal: spacingS,
    position: "absolute",
    top: 0,
    bottom: 0,
    justifyContent: "center",
    gap: spacingXXS,
  },
});
