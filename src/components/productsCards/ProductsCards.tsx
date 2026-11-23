import { I18nManager, StyleSheet, Touchable, TouchableHighlight, TouchableNativeFeedback, TouchableNativeFeedbackComponent, TouchableOpacity, TouchableWithoutFeedback, TouchableWithoutFeedbackComponent, View, ViewBase } from "react-native";
import React, { FC, ReactElement, useState } from "react";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import {
  fontMedium,
  fontSmall,
  fontSmallMedium,
  heightL,
  radiusS,
  spacingS,
  spacingXS,
  spacingXXS,
  widthL,
} from "../../assets/styles/constants/size";
import { useTheme } from "../../context/theme/themeContext";
import ImageThumbnail, { ImageThumbnailProps } from "../imageThumbnail/ImageThumbnail";
import { Title } from "../text/Title";
import { ChipsInfo, ChipsInfoProps } from "../chips/ChipsInfo";
import { LanguageCodes } from "../../localization/languages";
import i18n from "i18next";
import ProductsCardsSkeleton from "./ProductsCardsSkeleton";
import { ChipsOffers, ChipsOffersProps } from "../chips/ChipsOffers";
import { Text } from "../text/Text";
import Heart from "../icons/outline/Heart";
import HeartFilled from "../icons/filled/HeartFilled";
import Redeem from "../icons/outline/Redeem";

export interface ProductsCardsProps {
  type: "product-page" | "carousel";
  text: string;
  category?: string;
  chipsProps?: ChipsInfoProps;
  chipsOffersProps?: ChipsOffersProps;
  showChipsOffers?: boolean;
  icon?: ReactElement;
  imageProps?: ImageThumbnailProps;
  loading?: boolean;
  isFavorite?: boolean;
  showFavorite?: boolean;
  onFavoriteIconPress?: (isFilled: boolean) => void;
  showRedeemIcon?: boolean;
  containerStyles?: any;
  textContainerStyles?: any;
}

/**
 * ProductsCards component
 * @property {string} type - type of the card, can be 'product-page' or 'carousel'
 * @property {string} text - text of the card
 * @property {ChipsInfoProps} chipsProps - chips info props, optional. Refer ChipsInfo component
 * @property {ImageThumbnailProps} imageProps - Use this prop to directly pass the image thumbnail properties, including the image URL.
 * @property {boolean} icon - React element, optional
 */
export const ProductsCards: FC<ProductsCardsProps> = ({
  type,
  text,
  chipsProps,
  showChipsOffers=true,
  chipsOffersProps,
  icon,
  loading = false,
  imageProps,
  category,
  isFavorite = false,
  showFavorite,
  onFavoriteIconPress,
  showRedeemIcon,
  containerStyles,
  textContainerStyles,
}) => {
  const { theme } = useTheme();
  const isRtl = I18nManager.isRTL;
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
      backgroundColor: theme.stylesblockbg,
    },
    // Figma Products card: Medium 163.5×163, Carousel 138×135.
    productPageContainer: {
      width: actuatedNormalize(163.5),
      height: actuatedNormalize(163),
    },
    productPageImageThumbnail: {
      width: actuatedNormalize(163.5),
      height: actuatedNormalize(95),
      borderRadius: radiusS,
    },
    productsPageTextContainer: {
      paddingHorizontal: spacingXS,
      display: "flex",
      flexDirection: "column",
      gap: spacingXXS,
      justifyContent: "center",
      height: actuatedNormalize(68),
    },
    carouselContainer: {
      width: actuatedNormalize(138),
      height: actuatedNormalize(135),
    },
    carouselImageThumbnail: {
      width: actuatedNormalize(138),
      height: actuatedNormalize(80),
      borderRadius: radiusS,
    },
    carouselTextContainer: {
      paddingHorizontal: spacingXXS,
      paddingVertical: spacingXS,
      height: actuatedNormalize(55),
      alignSelf: "flex-start",
      display: "flex",
      justifyContent: "center",
    },
    chipsContainer: {
      position: "absolute",
      top: spacingXS,
    },
    imageThumbnail: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    chipsContainerRight: {
      right: 0,
    },
    chipsContainerLeft: {
      left: 0,
    },
    chipsLeft: {
      borderLeftWidth: 0,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
    chipsRight: {
      borderRightWidth: 0,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    chipsOffersContainer: {
      position: 'absolute',
      bottom: type === 'carousel' ? actuatedNormalize(53) : actuatedNormalize(63),
      left: spacingXXS
    },
    favoriteIconWrapper: {
      height: actuatedNormalize(24),
      width: actuatedNormalize(24),
      borderRadius: actuatedNormalize(48),
      backgroundColor: theme.stylesblockbg,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: spacingXS,
      right: spacingXS
    },
    chipsOffersContainerTop: {
      position: 'absolute',
      top: spacingXS,
      right: 0
    },
    redeemOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#03013633',
      opacity: 0.8,
      borderTopLeftRadius: radiusS,
      borderTopRightRadius: radiusS,
    },
    redeemIconContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  const dynamicIcon = icon
    ? React.cloneElement(icon, {
        height: heightL,
        width: widthL,
        fill: theme.primarycolor4static,
      })
    : null;

  return loading ? (
    <ProductsCardsSkeleton isSmall={type === "carousel"} />
  ) : (
    <View
      style={[
        type === "product-page"
          ? styles.productPageContainer
          : styles.carouselContainer,
        styles.container,
        containerStyles
      ]}
    >
      <View
        style={
          type === "product-page"
            ? styles.productPageImageThumbnail
            : styles.carouselImageThumbnail
        }
      >
        <ImageThumbnail
          width={
            type === "product-page"
              ? actuatedNormalize(163.5)
              : actuatedNormalize(138)
          }
          height={
            type === "product-page"
              ? actuatedNormalize(95)
              : actuatedNormalize(80)
          }
          overrideStyles={styles.imageThumbnail}
          overrideImageStyles={{
            borderTopLeftRadius: radiusS,
            borderTopRightRadius: radiusS, 
            backgroundColor: "#D7D8D6",
          }}
           {...imageProps}
          >
            {showRedeemIcon && (
              <>
                <View style={styles.redeemOverlay} />
                <View style={styles.redeemIconContainer}>
                  <Redeem
                    width={actuatedNormalize(36)}
                    height={actuatedNormalize(32)}
                    fill={theme.primarywhite}
                  />
                </View>
              </>
            )}
            {showFavorite && (
              <View style={styles.favoriteIconWrapper} >
                {favorite ? <HeartFilled fill={theme.primarycolor3} onPress={handleFavoritePress}/> : <Heart fill={theme.primarycolor3} onPress={handleFavoritePress}/>}
              </View>
          )}
          {chipsProps && (
            <View
              style={[
                styles.chipsContainer,
                isRtl ? styles.chipsContainerLeft : styles.chipsContainerRight,
              ]}
            >
              <ChipsInfo
                {...chipsProps}
                overrideStyles={isRtl ? styles.chipsLeft : styles.chipsRight}
              />
            </View>
            )}
            {/* NEED TO BE CONFIRMED WITH THE DESIGN TEAM */}
            {/* {showChipsOffers && chipsOffersProps && type === "carousel" && !chipsProps && !showFavorite && <View style={styles.chipsOffersContainerTop}>
              <ChipsOffers {...chipsOffersProps} overrideStyles={{ backgroundColor: theme.styleshdscrollbgshades }} type={isRtl ? 'right' : 'left'} />
        </View>} */}
          {dynamicIcon && <View>{dynamicIcon}</View>}
        </ImageThumbnail>
        </View>
        {showChipsOffers && chipsOffersProps &&  <View style={styles.chipsOffersContainer}>
          <ChipsOffers {...chipsOffersProps} overrideStyles={{ backgroundColor: theme.stylesblockbg}}/>
        </View>}
        <View style={[type === "product-page"? styles.productsPageTextContainer : styles.carouselTextContainer, textContainerStyles]}>
          <Text size={fontMedium} bold>{text}</Text>
          {category && <Text size={fontSmall} variant="primarytextcolor2">{category}</Text>}
      </View>
    </View>
  );
};
