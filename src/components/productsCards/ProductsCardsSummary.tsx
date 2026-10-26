import { I18nManager, StyleSheet, View } from "react-native";
import React, { FC } from "react";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import {
  fontMedium,
  fontMediumLarge,
  fontSmallMedium,
  lineHeightMedium,
  lineHeightMediumLarge,
  radiusS,
  spacing1XS,
  spacingS,
  spacingXS,
  spacingXXS,
  spacingXXXS,
} from "../../assets/styles/constants/size";
import { useTheme } from "../../context/theme/themeContext";
import ImageThumbnail, {
  ImageThumbnailProps,
} from "../imageThumbnail/ImageThumbnail";
import { Text } from "../text/Text";
import {
  ProductsCardsAddonProps,
  ProductsCardsAddons,
} from "./addons/ProductsCardsAddons";
import { QuantityButtonGroup } from "../button/QuantityButtonGroup";
import { SarFont } from "../sarFont/SarFont";
import { Button, ButtonProps } from "../button/Button";
import { ListItemProps } from "../list/ListItem";
import { List } from "../list/List";
import { ProductsCardsSummarySkeleton } from "./ProductsCardsSummarySkeleton";
import { CurrencyText } from "../text/CurrencyText";
import fonts from "../../assets/styles/constants/fonts";

export interface ProductsCardsSummaryProps {
  label: string;
  text: string;
  textNumberOfLine?: number;
  imageThumbnailProps?: ImageThumbnailProps;
  addonProps?: ProductsCardsAddonProps;
  amount?: number;
  extraContentPrimary?: string;
  extraContentSecondary?: string;
  primaryActionButtonProps?: ButtonProps;
  secondaryActionButtonProps?: ButtonProps;
  list: ListItemProps[];
  overrideStyles?: any;
  imageBodyWrapperStyle?: any;
  loading?: boolean;
  showThumbnail?: boolean;
}

/**
 * ProductsCardsSummary component
 * @property {string} label - label of the category
 * @property {string} text - name of the product
 * @property {number} textNumberOfLines – Number of lines to display when you need the text to appear in multiple lines.
 * @property {ImageThumbnailProps} imageThumbnailProps - image thumbnail props, optional. Refer ImageThumbnail component
 * @property {ProductsCardsAddonProps} addonProps - addon props, optional. Refer ProductsCardsAddonProps component
 * @property {string} extraContentPrimary - extra content primary, optional
 * @property {string} extraContentSecondary - extra content secondary, optional
 * @property {ButtonProps} primaryActionButtonProps - primary action button props, optional. Refer Button component
 * @property {ButtonProps} secondaryActionButtonProps - secondary action button props, optional. Refer Button component
 * @property {ListItemProps[]} list - list of items, optional. Refer ListItemProps component
 * @property {any} overrideStyles - override styles, optional
 * @property {any} imageBodyWrapperStyle - override styles, optional for the if you want to give the style for image with text content wrapper
 * @property {boolean} showThumbnail - By default, the thumbnail image is shown. If you don’t want to display it, pass: showThumbnail={false}
 */
export const ProductsCardsSummary: FC<ProductsCardsSummaryProps> = ({
  label,
  text,
  textNumberOfLine=1,
  imageThumbnailProps,
  addonProps,
  amount,
  extraContentPrimary,
  extraContentSecondary,
  primaryActionButtonProps,
  secondaryActionButtonProps,
  list = [],
  overrideStyles,
  imageBodyWrapperStyle,
  loading = false,
  showThumbnail = true,
}) => {
  const { theme } = useTheme();

  const emptyCheck = addonProps?.type === "empty";
  const isRtl = I18nManager.isRTL;

  const styles = StyleSheet.create({
    container: {
      borderRadius: radiusS,
      backgroundColor: theme.stylesblockbg,
      paddingVertical: actuatedNormalize(12),
      width: "100%",
    },
    mainWrapper: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    labelWrapper: {
      paddingLeft: spacingS,
      paddingRight: spacing1XS,
      width: emptyCheck ? "90%" : "70%",
      alignItems: "flex-start",
      gap: spacingXXS,
    },
    actionsWrapperStart: {
      alignSelf: "flex-start",
    },
    actionsWrapperCenter: {
      alignSelf: "center",
    },
    amountContainer: {
      display: "flex",
      alignItems: "center",
      flexDirection: isRtl ? "row-reverse" : "row",
      gap: spacingXXXS,
    },
    adonContainerWrapper: {
      display: "flex",
      flexDirection: "column",
      gap: spacingXS,
    },
    deleteQuantityContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginLeft: actuatedNormalize(88),
      paddingVertical: 0,
      paddingLeft: spacingS,
      paddingTop: spacingXXS,
    },
    actionsContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      marginTop: spacingS,
      marginHorizontal: spacingS,
      gap: spacingXS,
    },
    actionsContainerButtonWrapper: {
      width: "50%",
    },
    imageBodyWrapper: {
      flexDirection: "row",
      alignItems: "center",
      flex: 5,
    },
  });

  return loading ? (
    <ProductsCardsSummarySkeleton
      primaryActionButton={Boolean(primaryActionButtonProps)}
      secondaryActionButton={Boolean(secondaryActionButtonProps)}
      listLength={list.length}
    />
  ) : (
    <View style={[styles.container, overrideStyles]}>
      <View style={[styles.mainWrapper]}>
        <View style={[styles.imageBodyWrapper, imageBodyWrapperStyle]}>
          {showThumbnail && (
            <ImageThumbnail
              width={actuatedNormalize(88)}
              height={actuatedNormalize(51)}
              {...imageThumbnailProps}
            />
          )}
          <View
            style={[
              styles.labelWrapper,
              !showThumbnail && !addonProps ? { flex: 1 } : {},
            ]}
          >
            <Text size={fontSmallMedium} variant="primarycolor2_100static">
              {label}
            </Text>
            <CurrencyText
              numberOfLines={textNumberOfLine}
              textstyle={{
                fontFamily: fonts.HSBC_Bold,
                lineHeight: lineHeightMediumLarge,
              }}
              currencyTextStyle={{ lineHeight: lineHeightMediumLarge }}
              text={text}
              size={fontMediumLarge}
              variant="primarycolor"
            />
          </View>
        </View>
        {addonProps && (
          <View
            style={[
              { flex: 1 },
              addonProps.type === "amount"
                ? styles.actionsWrapperCenter
                : styles.actionsWrapperStart,
            ]}
          >
            <ProductsCardsAddons {...addonProps} amount={amount} />
          </View>
        )}
      </View>
      {addonProps && (
        <View style={styles.deleteQuantityContainer}>
          {amount && addonProps.type !== "amount" && (
            <View style={styles.adonContainerWrapper}>
              <View style={styles.amountContainer}>
                <SarFont size={fontMedium} lineHeight={lineHeightMedium} />
                <Text bold size={fontMedium} overrideStyles={{lineHeight:lineHeightMedium }}>
                  {amount.toString()}
                </Text>
              </View>
              {extraContentPrimary && (
                <Text size={fontSmallMedium} variant="primarycolor2_100">
                  {extraContentPrimary}
                </Text>
              )}
              {extraContentSecondary && (
                <Text size={fontSmallMedium} variant="secondarycolor10">
                  {extraContentSecondary}
                </Text>
              )}
            </View>
          )}
      {!amount && addonProps.type === "empty" && (
                  <View style={styles.adonContainerWrapper}>
                    {extraContentPrimary && (
                      <Text size={fontSmallMedium} variant="primarycolor2_100">
                        {extraContentPrimary}
                      </Text>
                    )}
                  </View>
                )}
          {addonProps.quantity && (
            <QuantityButtonGroup
              value={addonProps.quantity}
              onButtonPress={(val: number) =>
                addonProps.onButtonPress && addonProps.onButtonPress(val)
              }
              overrideStyles={{ alignSelf: "flex-end" }}
              onAddPress={addonProps.onAddPress}
              onMinusPress={addonProps.onMinusPress}
              maxLimit={addonProps.maxLimit}
              withBorder={true}
            />
          )}
        </View>
      )}
      {list.length > 0 && (
        <View>
          <List items={list} />
        </View>
      )}
      {primaryActionButtonProps && (
        <View style={styles.actionsContainer}>
          {primaryActionButtonProps && (
            <View
              style={
                secondaryActionButtonProps
                  ? styles.actionsContainerButtonWrapper
                  : {}
              }
            >
              <Button
                variant="fill"
                color="secondary"
                size="small"
                {...primaryActionButtonProps}
                buttonText={{ ...primaryActionButtonProps.buttonText, variant: "primarywhitestatic" }}
                onButtonPress={primaryActionButtonProps.onButtonPress}
                overrideStyles={{
                  width: "100%",
                  backgroundColor: theme.primarycolorstatic,
                  borderColor: theme.primarycolorstatic,
                  // paddingVertical: spacingXS,
                  ...(!secondaryActionButtonProps ? { width: "100%" } : {}),
                }}
              />
            </View>
          )}
          {secondaryActionButtonProps && (
            <View style={styles.actionsContainerButtonWrapper}>
              <Button
                variant="outlined"
                size="small"
                {...secondaryActionButtonProps}
                buttonText={secondaryActionButtonProps.buttonText}
                onButtonPress={secondaryActionButtonProps.onButtonPress}
                overrideStyles={{ width: "100%",
                  //  paddingVertical: spacingXS
                   }}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};
