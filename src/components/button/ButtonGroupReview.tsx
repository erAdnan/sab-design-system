import { FC, ReactElement } from "react";
import { I18nManager, StyleSheet, View } from "react-native";
import { ButtonGroup, ButtonGroupProps } from "./ButtonGroup";
import { Text } from "../text/Text";
import { Divider } from "../divider/Divider";
import { Title } from "../text/Title";
import {
  fontLarge,
  fontMedium,
  fontSmall,
  fontWeightMedium,
  fontXLarge,
  fontXXLarge,
  lineHeightXLarge,
  lineHeightXXLarge,
  spacingS,
  spacingXXS,
  spacingXXXS,
} from "../../assets/styles/constants/size";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import i18n from "i18next";
import { SarFont } from "../sarFont/SarFont";
import { useTheme } from "../../context/theme/themeContext";
import { CurrencyText } from "../text/CurrencyText";
import fonts from "../../assets/styles/constants/fonts";
import { QuantityButtonGroup, QuickActionButtonProps } from "./QuantityButtonGroup";
import { ButtonGroupReviewQuantityAddon, ButtonGroupReviewQuantityAddonProps } from "./ButtonGroupReviewQuantityAddon";
import { darkTheme } from "../../assets/styles/theme/dark";
import { Disclaimer } from "../disclaimer/Disclaimer";

interface ButtonGroupReviewProps {
  amount: number | string;
  description: string;
  subTitle?: string;
  buttonGroup: ButtonGroupProps;
  overrideStyles?: any;
  amountLabel?: string;
  showDivider?: boolean;
  currency?: string;
  loading?: boolean;
  withQuantity?: boolean;
  quantityButtonProps?: ButtonGroupReviewQuantityAddonProps;
  footNote?: string;
  lightVariant?: boolean;
  showDisclaimer?: boolean;
  disclaimerText?: string | ReactElement;
}

/**
 * Button Group Review Component
 * @property amount: Total amount to be displayed
 * @property amountLabel: Text for amount label, if not passed, "Total Amount" will be used
 * @property description: Description to be displayed
 * @property subTitle: Optional extra Text to be displayed
 * @property buttonGroup: ButtonGroup component props
 * @property overrideStyles: Applies new styling settings that will override the default ones
 * @property currency: default will be SAR pass other Currency use this props Example currency ="USD"
 * @property loading - boolean for showing the skeleton
 * @property footNote - use this props to show "Incl. VAT"
 */
export const ButtonGroupReview: FC<ButtonGroupReviewProps> = ({
  amount,
  description,
  subTitle,
  buttonGroup,
  overrideStyles,
  amountLabel,
  showDivider=false,
  currency="SAR",
  loading = false,
  withQuantity,
  quantityButtonProps,
  footNote,
  lightVariant = false,
  showDisclaimer = false,
  disclaimerText,

}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      // Holds the entire component
      backgroundColor: loading ? "transparent" : (lightVariant? theme.stylesbackground2 : theme.primarybackground),
    },
    detailsContainer: {
      marginBottom: actuatedNormalize(30),
    },
    amountContainer: {
      paddingBottom: footNote ?0 : actuatedNormalize(12),
      flexDirection: "row",
      justifyContent: "space-between",
      display: "flex",
      alignItems: footNote ? "flex-start" :"center",
    },
    amountWrapper: {
      flexDirection: I18nManager.isRTL ? "row-reverse" :"row",
      gap:spacingXXS,
      ...(I18nManager.isRTL && { alignItems: "center" }), // only for Arabic/RTL
    },
    amountText: {
      paddingHorizontal: 0,
      paddingVertical: 0,
      lineHeight: lightVariant ? lineHeightXLarge : lineHeightXXLarge,
    },
    descriptionText: {
     paddingTop: spacingS,
     fontFamily:fonts.HSBC_Medium
    },
    subTitleText: {
      paddingTop: spacingXXS,
     },
  });

  return (
    <View style={[styles.container, overrideStyles]}>
      <View style={styles.detailsContainer}>
       <View style={styles.amountContainer}>
  {(withQuantity && quantityButtonProps) ? (
            <ButtonGroupReviewQuantityAddon
              textColor={lightVariant ? "primarytextcolor" : "primarycolor4static"}
              mainColor={lightVariant ? theme.primarytextcolor : theme.primarycolor4static}
              bgColor={lightVariant ? theme.stylesblockbg : darkTheme.primarycolor2}
              {...quantityButtonProps}
            />
  ) : (
    <Text
      size={fontLarge}
      variant={lightVariant ? "primarytextcolor" : "primarycolor4static"}
      loading={loading}
      bold={lightVariant}
      textWidth={actuatedNormalize(80)}
      overrideStyles={{ ...(I18nManager.isRTL && { paddingBottom: actuatedNormalize(3) }), fontFamily: lightVariant ? fonts.HSBC_Bold : fonts.HSBC_Medium }}
    >
      {amountLabel || i18n.t("TotalAmount")}
    </Text>
  )}

  <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
    
    {/* ROW 1 → Currency + Amount */}
    <View style={styles.amountWrapper}>
      {!loading && (
        currency !== "SAR" ? (
          <Text bold size={lightVariant ? fontXLarge : fontXXLarge} variant={lightVariant ? "primarytextcolor" : "primarycolor4static"}>
            {currency}
          </Text>
        ) : (
          <SarFont
           size={lightVariant ? fontXLarge : fontXXLarge}
            lineHeight={lightVariant ? lineHeightXLarge : lineHeightXXLarge}
            variant={lightVariant ? "primarytextcolor" : "primarycolor4static"}
            overrideStyles={{ marginHorizontal: spacingXXXS }}
          />
        )
      )}

      <Title
        size={lightVariant ? fontXLarge : fontXXLarge}
        overrideStyles={styles.amountText}
        bold={lightVariant}
        variant={lightVariant ? "primarytextcolor" : "primarycolor4static"}
        loading={loading}
        textWidth={actuatedNormalize(80)}
      >
        {amount?.toString()}
      </Title>
    </View>

    {/* ROW 2 → textNote (NEW) */}
    {footNote && !loading && (
      <Text
        size={fontSmall}
        variant={lightVariant ? "primarytextcolor" : "primarycolor4static"}
        overrideStyles={{paddingHorizontal: 0,}}
      >
        {footNote}
      </Text>
    )}
  </View>
        </View>
        {showDisclaimer && !loading && disclaimerText && (
          <View style={{ marginBottom: actuatedNormalize(12) }}>
            <Disclaimer type="tooltip" text={disclaimerText} />
            
          </View>
        )}
        
  
        {!showDivider && <Divider overrideStyles={{backgroundColor: lightVariant ? theme.stylesblockbg : theme.primarycolor2_40}} />}
       {description && <View style={{ alignSelf: "flex-start" }}>
          <CurrencyText
            loading={loading}
            text={description}
            textstyle={styles.descriptionText}
            currencyTextStyle={styles.descriptionText}
            variant={lightVariant ? "primarytextcolor" : "primarycolor4static"}
            size={fontMedium}
          />
        </View>}
        {subTitle && <View style={{ alignSelf: "flex-start" }}>
          <CurrencyText
            loading={loading}
            textstyle={styles.subTitleText}
            currencyTextStyle={styles.subTitleText}
            text={subTitle}
            variant={lightVariant ? "primarytextcolor" : "primarycolor4static"}
            size={fontMedium}
          />
        </View>}
      </View>
      <ButtonGroup {...buttonGroup} loading={loading} checkBorder secondaryBtnBorderColor={lightVariant ? theme.primarycolor : theme.primarycolor4static} />
    </View>
  );
};
