import { I18nManager, StyleSheet, View } from "react-native";
import React, { FC, ReactElement } from "react";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import {
  fontMedium,
  fontSmall,
  fontSmallMedium,
  fontXSmall,
  fontXXSmall,
  heightL,
  radiusS,
  spacing1XS,
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
import { PieGraph } from "../pieGraph/PieGraph";

export interface LearningProductCardProps {
  subheading: string;
  title: string;
  bodyText: string;
  percentage: number;
  percentageText: string;
  imageProps: ImageThumbnailProps;
  loading?: boolean;
}

/**
 * ProductsCards component
 * @property {string} type - type of the card, can be 'product-page' or 'carousel'
 * @property {string} text - text of the card
 * @property {ChipsInfoProps} chipsProps - chips info props, optional. Refer ChipsInfo component
 * @property {ImageThumbnailProps} imageProps - Use this prop to directly pass the image thumbnail properties, including the image URL.
 * @property {boolean} icon - React element, optional
 */
export const LearningProductCard: FC<LearningProductCardProps> = ({
  subheading,
  title,
  bodyText,
  percentage,
  percentageText,
  imageProps,
  loading = false
}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      borderRadius: radiusS,
      backgroundColor: theme.stylesblockbg,
      width: actuatedNormalize(343),
      overflow: "hidden",
    },
    textContainer: {
      alignItems: "flex-start",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      flex: 1
    },
    title: {
      marginTop: spacingXXS,
    },
    bodyText: {
      marginTop: spacingXS,
      width: actuatedNormalize(210),
      textAlign: "left",
    },
    imageThumbnail: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderTopLeftRadius: radiusS,
      borderTopRightRadius: radiusS,
      overflow: "hidden",
    },
    bottomContent: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: spacingS,
      paddingVertical: spacing1XS,
    }
  });


  return loading ? (
    <ProductsCardsSkeleton isSmall={false} />
  ) : (
    <View
      style={styles.container}
    >
      <ImageThumbnail
        {...imageProps}
        width={actuatedNormalize(343)}
        height={actuatedNormalize(95)}
        overrideStyles={styles.imageThumbnail}
        overrideImageStyles={{
          borderTopLeftRadius: radiusS,
          borderTopRightRadius: radiusS,
        }}
      />
       
      <View style={styles.bottomContent}>
        <View style={styles.textContainer}>
          <Text size={fontXSmall} variant="secondarycolor10">{subheading}</Text>
          <Text size={fontMedium} bold overrideStyles={styles.title}>{title}</Text>
          <Text size={fontSmall} overrideStyles={styles.bodyText} variant="primarytextcolor2">{bodyText}</Text>
        </View>
        <View style={{ alignSelf: "center" }}>
            <PieGraph percentage={percentage} strokeColor={theme.whiteinvert} strokeFillColor={theme.strokepurple} content={
              <View style={{ width: "90%"}}>
                <Text size={fontXXSmall} bold>{percentageText}</Text>
              </View>
               
              }
            />
        </View> 
      </View>
    </View>
  );
};