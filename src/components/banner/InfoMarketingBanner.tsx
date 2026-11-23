import React, { ReactElement } from 'react'
import ImageThumbnail, { ImageThumbnailProps } from "../imageThumbnail/ImageThumbnail"
import { ChipsOffers, ChipsOffersProps } from "../chips/ChipsOffers";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { StyleSheet, View } from "react-native";
import { Text } from "../text/Text";
import { BlurView } from "@react-native-community/blur";
import { fontLarge, fontSmall, radiusL, spacingM, spacingS, spacingXS } from "../../assets/styles/constants/size";
import { useTheme } from "../../context/theme/themeContext";
import MarketingBannerIconSample from "../icons/other/MarketingBannerIconSample";
import { lightTheme } from "../../assets/styles/theme/light";
import fonts from "../../assets/styles/constants/fonts";
import BannerSkeleton from './BannerSkeleton';
import { SkeletonBox } from '../skeleton/SkeletonBox';

interface InfoMarketingBannerProps {
  imageProps: ImageThumbnailProps;
  headline: string;
  description: string;
  chips?: ChipsOffersProps[];
  size: 'medium' | 'large';
  headline2?: string;
  headline2Icon?: ReactElement;
  loading?: boolean;
}

export const InfoMarketingBanner: React.FC<InfoMarketingBannerProps> = ({
  imageProps,
  headline,
  description,
  chips,
  size = 'medium',
  headline2,
  headline2Icon,
  loading = false,
}) => {
  const { theme } = useTheme();
  const hasChips = Boolean(chips?.length);
  const footerHeight = actuatedNormalize(
    size === "medium" && !hasChips ? 80 : 126
  );
  const bannerHeight = actuatedNormalize(size === "medium" ? 281 : 460);

  const styles = StyleSheet.create({
    headerCover: {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      borderTopLeftRadius: radiusL,
      borderTopRightRadius: radiusL,
      height: actuatedNormalize(56),
      width: actuatedNormalize(343),
      backgroundColor: 'rgba(29, 29, 29, 0.45)',
      overflow: 'hidden'
    },
    footerCover: {
      position: 'absolute',
      right: 0,
      left: 0,
      bottom: 0,
      borderBottomLeftRadius: radiusL,
      borderBottomRightRadius: radiusL,
      height: footerHeight,
      width: actuatedNormalize(343),
      backgroundColor: 'rgba(29, 29, 29, 0.45)',
      overflow: 'hidden'
          
    },
    blurContainerTop: {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      display: "flex",
      flexDirection: 'row',
      gap: spacingS,
      alignItems: "center",
      justifyContent: 'flex-start',
      padding: spacingS,
      height: actuatedNormalize(56),
      width: actuatedNormalize(343),
      borderBottomLeftRadius: radiusL,
      borderBottomRightRadius: radiusL,
      overflow: 'hidden'
    },
    blurContainerBottom: {
      position: 'absolute',
      right: 0,
      left: 0,
      bottom: 0,
      display: "flex",
      alignItems: "flex-start",
      justifyContent: hasChips ? "flex-end" : "flex-start",
      gap: actuatedNormalize(10),
      padding: spacingS,
      height: footerHeight,
      width: actuatedNormalize(343),
      borderBottomLeftRadius: radiusL,
      borderBottomRightRadius: radiusL,
      overflow: 'hidden'
    },
    chipsContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      gap: spacingS
    }
  })
  if(loading) {
    return (
      <BannerSkeleton
      width={actuatedNormalize(343)}
      height={bannerHeight}>
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
        <View style={{ display: "flex", flexDirection: "row", gap: spacingXS }}>
          <SkeletonBox shape="line" size="large" overrideStyles={{width:actuatedNormalize(53)}} />
          <SkeletonBox shape="line" size="large" overrideStyles={{width:actuatedNormalize(53)}}  />
        </View>
      </View>
    </BannerSkeleton>
    )
    }
    
  return (
    <ImageThumbnail
       {...imageProps}
      url={imageProps.url}
      width={actuatedNormalize(343)}
      height={bannerHeight}
      overrideImageStyles={[
        { borderRadius: radiusL },
        imageProps.overrideImageStyles,
      ]}
      overrideStyles={[
        { borderRadius: radiusL, overflow: "hidden" },
        imageProps.overrideStyles,
      ]}
    >
      {headline2 && (
        <View style={styles.headerCover}>
          <View
            style={styles.blurContainerTop}
            // blurAmount={1}
            // overlayColor=""
          >
            {headline2Icon || <MarketingBannerIconSample />}
            <Text variant="primarycolor4static" size={fontLarge} overrideStyles={{ fontFamily: fonts.HSBC_Medium}}>{headline2}</Text>
          </View>
        </View>
      )}
      <View style={styles.footerCover}>
        <View
          style={styles.blurContainerBottom}
          // blurAmount={1}
          // overlayColor=""
        >
          <Text variant="primarycolor4static" size={fontLarge} overrideStyles={{ fontFamily: fonts.HSBC_Medium}}>{headline}</Text>
          <Text variant="primarycolor4static" size={fontSmall} overrideStyles={{ textAlign: 'left'}}>{description}</Text>
          {chips?.length && (
            <View style={styles.chipsContainer}>
              {chips.map((chip, index) => (
                <ChipsOffers
                  overrideLabelStyles={{ color: theme.primarycolor4static }}
                  overrideStyles={{ backgroundColor: lightTheme.stylesbgshades }}
                  iconColor={theme.primarycolor4static}
                  {...chip}
                  key={index}
                />))}
            </View>
          )}
        </View>
     </View>
     
    </ImageThumbnail>
  )
}
