import React, { useState } from 'react'
import { I18nManager, StyleSheet, View } from "react-native";
import { fontMedium, fontXSmall, fontXXSmall, lineHeightMedium, lineHeightXSmall, lineHeightXXSmall, radiusS, spacing1XS, spacingS, spacingXS } from "../../assets/styles/constants/size";
import { useTheme } from "../../context/theme/themeContext";
import ImageThumbnail, { ImageThumbnailProps } from "../imageThumbnail/ImageThumbnail";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { Text } from "../text/Text";
import fonts from "../../assets/styles/constants/fonts";
import HeartFilled from "../icons/filled/HeartFilled";
import Heart from "../icons/outline/Heart";
import { ChipsOffersProps, ChipsOffers } from "../chips/ChipsOffers";
import { SkeletonBox } from '../skeleton/SkeletonBox';

interface NewProductCardSmallProps {
  imgProps?: ImageThumbnailProps;
  label?: string;
  merchantName: string;
  discountLabel?: string;
  isFavorite?: boolean;
  showFavorite?: boolean;
  showChips?: boolean;
  chipsProps?: ChipsOffersProps;
  onFavoriteIconPress?: (isFilled: boolean) => void;
  loading?: boolean;
  containerStyles?: any;
  textContainerStyles?: any;
}

export const NewProductCardSmall: React.FC<NewProductCardSmallProps> = ({
  imgProps,
  label,
  merchantName,
  discountLabel,
  isFavorite = false,
  showFavorite,
  showChips = false,
  chipsProps,
  onFavoriteIconPress,
  loading = false,
  containerStyles,
  textContainerStyles,
}) => {
  const { theme } = useTheme();
  const isRTL = I18nManager.isRTL;

  const [favorite, setFavorite] = useState(isFavorite);
  
  const handleFavoritePress = () => {
    if (onFavoriteIconPress) {
      onFavoriteIconPress(!favorite)
    }
    setFavorite(!favorite)
  };
  
  const styles = StyleSheet.create({
    container: {
      borderRadius: radiusS,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      backgroundColor: theme.stylesblockbg,
      height: actuatedNormalize(143),
      width: actuatedNormalize(110)
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: discountLabel ?  'space-between' : !discountLabel && !label ? "flex-start" : !discountLabel && label && merchantName ? "flex-start" :  'center',
      paddingVertical: spacingXS,
      paddingHorizontal: spacing1XS,
      height: actuatedNormalize(78),
    },
    favoriteIconWrapper: {
      height: actuatedNormalize(24),
      width: actuatedNormalize(24),
      borderRadius: actuatedNormalize(48),
      backgroundColor: theme.primarycolor4static,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: spacingXS,
      right: spacingXS
    },
    chipsContainer: {
      position: 'absolute',
      top: 9,
      left: 0
    }
  })

  return (
    <View style={[styles.container, containerStyles]}>
       {
        loading ? (
           <SkeletonBox
                  shape="square"
                  size="medium"
                  overrideStyles={{
                    width: actuatedNormalize(110),
                    height: actuatedNormalize(64),
                    borderTopLeftRadius: radiusS,
                    borderTopRightRadius: radiusS,
                  }}
                />
        ) : (
          <ImageThumbnail
        url={imgProps?.url || require('../../assets/images/merchant_placeholder.png')}
        height={actuatedNormalize(64)}
        width={actuatedNormalize(110)}
        overrideImageStyles={{ borderTopLeftRadius: radiusS, borderTopRightRadius: radiusS,backgroundColor:theme.primarycolor2static  }}
        isAbsolutePath={imgProps?.isAbsolutePath ?? true}
      >
        {showChips && chipsProps && (
          <View style={styles.chipsContainer}>
            {/* @ts-ignore */}
            <ChipsOffers {...chipsProps} />
          </View>
        )}
        {showFavorite && (
          <View style={styles.favoriteIconWrapper} >
            {favorite ? <HeartFilled fill={theme.primarycolor3static} onPress={handleFavoritePress} /> : <Heart fill={theme.primarycolor3static} onPress={handleFavoritePress} />}
          </View>
        )}
      </ImageThumbnail>
        )
       }
      <View style={[styles.details, textContainerStyles]}>
        {label && <Text size={fontXXSmall} variant="primarytextcolor2"  overrideStyles={{ textAlign: "left", ...(isRTL ? { lineHeight: lineHeightXXSmall } : {}) }}>{label}</Text>}
        <Text overrideStyles={{ fontFamily: fonts.HSBC_Medium, textAlign: 'left', ...(isRTL ? { lineHeight: lineHeightMedium } : {}),}} numberOfLines={2} size={fontMedium}>{merchantName}</Text>
        {discountLabel && <Text size={fontXSmall} variant="ragcolor6" overrideStyles={{ textAlign: "left", ...(isRTL ? { lineHeight: lineHeightXSmall } : {}) }}>{discountLabel}</Text>}
      </View>
    </View>
  )
}
