import React, { FC, useMemo } from "react";
import {  I18nManager, ImageBackground, ImageSourcePropType, StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import {
  fontLarge,
  fontMedium,
  fontMediumLarge,
  fontSmall,
  fontSmallMedium,
  lineHeightLarge,
  lineHeightMediumLarge,
  radiusL,
  spacingS,
  spacingXS,
  spacingXXXS,
} from "../../assets/styles/constants/size";
import { Text, TextProps } from "../text/Text";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { ChipsInfo, ChipsInfoProps } from "../chips/ChipsInfo";
import { useTranslation } from "react-i18next";
import fonts from "../../assets/styles/constants/fonts";
import { NewCurrency } from "../text/NewCurrency";
import { AccountsViewAllSkeletonNew } from "./skeletons/AccountsViewAllSkeletonNew";

type CardVariant =
  | 'portfolio account'
  | 'cash wallet'
  | 'hsbc global account'
  | 'family account'
  | 'islamic commodity account'
  | 'waffer account'
  | 'green deposit'
  | 'mudarabah'
  | 'current'
  | 'joint account'
  | 'safe deposit locker';

type BgColorFamily = 'neutral' | 'green' | 'grey' | 'purple' | 'pink' | 'amber';

// Each account variant maps to one of six background-gradient color families.
const VARIANT_COLOR: Record<CardVariant, BgColorFamily> = {
  'current': 'neutral',
  'portfolio account': 'neutral',
  'joint account': 'neutral',
  'mudarabah': 'green',
  'green deposit': 'green',
  'waffer account': 'green',
  'islamic commodity account': 'grey',
  'family account': 'purple',
  'hsbc global account': 'pink',
  'cash wallet': 'amber',
  'safe deposit locker': 'amber',
};

// Background artwork keyed by `${color}_${lang}_${type}_${theme}` — Arabic gradients
// are mirrored, carousel is a narrower crop, dark is a darker tint.
const ACCOUNT_BACKGROUNDS: Record<string, ImageSourcePropType> = {
  neutral_en_default_light: require("../../assets/images/accountBackgrounds/neutral_en_default_light.png"),
  neutral_en_carousel_light: require("../../assets/images/accountBackgrounds/neutral_en_carousel_light.png"),
  neutral_ar_default_light: require("../../assets/images/accountBackgrounds/neutral_ar_default_light.png"),
  neutral_ar_carousel_light: require("../../assets/images/accountBackgrounds/neutral_ar_carousel_light.png"),
  neutral_en_default_dark: require("../../assets/images/accountBackgrounds/neutral_en_default_dark.png"),
  neutral_en_carousel_dark: require("../../assets/images/accountBackgrounds/neutral_en_carousel_dark.png"),
  neutral_ar_default_dark: require("../../assets/images/accountBackgrounds/neutral_ar_default_dark.png"),
  neutral_ar_carousel_dark: require("../../assets/images/accountBackgrounds/neutral_ar_carousel_dark.png"),
  green_en_default_light: require("../../assets/images/accountBackgrounds/green_en_default_light.png"),
  green_en_carousel_light: require("../../assets/images/accountBackgrounds/green_en_carousel_light.png"),
  green_ar_default_light: require("../../assets/images/accountBackgrounds/green_ar_default_light.png"),
  green_ar_carousel_light: require("../../assets/images/accountBackgrounds/green_ar_carousel_light.png"),
  green_en_default_dark: require("../../assets/images/accountBackgrounds/green_en_default_dark.png"),
  green_en_carousel_dark: require("../../assets/images/accountBackgrounds/green_en_carousel_dark.png"),
  green_ar_default_dark: require("../../assets/images/accountBackgrounds/green_ar_default_dark.png"),
  green_ar_carousel_dark: require("../../assets/images/accountBackgrounds/green_ar_carousel_dark.png"),
  grey_en_default_light: require("../../assets/images/accountBackgrounds/grey_en_default_light.png"),
  grey_en_carousel_light: require("../../assets/images/accountBackgrounds/grey_en_carousel_light.png"),
  grey_ar_default_light: require("../../assets/images/accountBackgrounds/grey_ar_default_light.png"),
  grey_ar_carousel_light: require("../../assets/images/accountBackgrounds/grey_ar_carousel_light.png"),
  grey_en_default_dark: require("../../assets/images/accountBackgrounds/grey_en_default_dark.png"),
  grey_en_carousel_dark: require("../../assets/images/accountBackgrounds/grey_en_carousel_dark.png"),
  grey_ar_default_dark: require("../../assets/images/accountBackgrounds/grey_ar_default_dark.png"),
  grey_ar_carousel_dark: require("../../assets/images/accountBackgrounds/grey_ar_carousel_dark.png"),
  purple_en_default_light: require("../../assets/images/accountBackgrounds/purple_en_default_light.png"),
  purple_en_carousel_light: require("../../assets/images/accountBackgrounds/purple_en_carousel_light.png"),
  purple_ar_default_light: require("../../assets/images/accountBackgrounds/purple_ar_default_light.png"),
  purple_ar_carousel_light: require("../../assets/images/accountBackgrounds/purple_ar_carousel_light.png"),
  purple_en_default_dark: require("../../assets/images/accountBackgrounds/purple_en_default_dark.png"),
  purple_en_carousel_dark: require("../../assets/images/accountBackgrounds/purple_en_carousel_dark.png"),
  purple_ar_default_dark: require("../../assets/images/accountBackgrounds/purple_ar_default_dark.png"),
  purple_ar_carousel_dark: require("../../assets/images/accountBackgrounds/purple_ar_carousel_dark.png"),
  pink_en_default_light: require("../../assets/images/accountBackgrounds/pink_en_default_light.png"),
  pink_en_carousel_light: require("../../assets/images/accountBackgrounds/pink_en_carousel_light.png"),
  pink_ar_default_light: require("../../assets/images/accountBackgrounds/pink_ar_default_light.png"),
  pink_ar_carousel_light: require("../../assets/images/accountBackgrounds/pink_ar_carousel_light.png"),
  pink_en_default_dark: require("../../assets/images/accountBackgrounds/pink_en_default_dark.png"),
  pink_en_carousel_dark: require("../../assets/images/accountBackgrounds/pink_en_carousel_dark.png"),
  pink_ar_default_dark: require("../../assets/images/accountBackgrounds/pink_ar_default_dark.png"),
  pink_ar_carousel_dark: require("../../assets/images/accountBackgrounds/pink_ar_carousel_dark.png"),
  amber_en_default_light: require("../../assets/images/accountBackgrounds/amber_en_default_light.png"),
  amber_en_carousel_light: require("../../assets/images/accountBackgrounds/amber_en_carousel_light.png"),
  amber_ar_default_light: require("../../assets/images/accountBackgrounds/amber_ar_default_light.png"),
  amber_ar_carousel_light: require("../../assets/images/accountBackgrounds/amber_ar_carousel_light.png"),
  amber_en_default_dark: require("../../assets/images/accountBackgrounds/amber_en_default_dark.png"),
  amber_en_carousel_dark: require("../../assets/images/accountBackgrounds/amber_en_carousel_dark.png"),
  amber_ar_default_dark: require("../../assets/images/accountBackgrounds/amber_ar_default_dark.png"),
  amber_ar_carousel_dark: require("../../assets/images/accountBackgrounds/amber_ar_carousel_dark.png"),
};

function getCardConfig(variant: CardVariant, theme: any, accountType?: string | null, accountName?: string | null, t?: any) {
  switch (variant) {
    case 'portfolio account':
      return {
        bgColor: theme.tintneutralshade,
        accountType: null,
        accountName: t("accountViewAll.InvestmentPortfolio")
      };
    case 'cash wallet':
      return {
        bgColor: theme.tintambershade,
        accountType: t("accountViewType.CashWalletAccount"),
        accountName: t("accountViewAll.CashWalletAccount")
      };
    case 'hsbc global account':
      return {
        bgColor: theme.tintredshade,
        accountType: t("accountViewType.HSBCGlobalView"),
        accountName: t("accountViewAll.HSBCGlobalView")
      };
    case 'family account':
      return {
        bgColor: theme.strokepurpletint,
        accountType: t("accountViewType.FamilyAccount"),
        accountName: t("accountViewAll.FamilyAccount")
      };
    case 'islamic commodity account':
      return {
        bgColor: theme.stylesblockbg,
        accountType: t("accountViewType.IslamicCommodity"),
        accountName: t("accountViewAll.IslamicCommodity")
      };
    case 'waffer account':
      return {
        bgColor: theme.tintgreenshade,
        accountType: t("accountViewType.WafferAccount"),
        accountName: t("accountViewAll.WafferAccount")
      };
    case 'green deposit':
      return {
        bgColor: theme.tintgreenshade,
        accountType: t("accountViewType.GreenDeposit"),
        accountName: t("accountViewAll.GreenDeposit")
      };
    case 'mudarabah':
      return {
        bgColor: theme.tintgreenshade,
        accountType: t("accountViewType.MudarabahSavingsAccount"),
        accountName: t("accountViewAll.MudarabahSavingsAccount")
      };
    case 'current':
      return {
        bgColor: theme.tintneutralshade,
        accountType: t("accountViewType.CurrentAccount"),
        accountName: t("accountViewAll.CurrentAccount"),
      };
    case 'joint account':
      return {
        bgColor: theme.tintneutralshade,
        accountType: t("accountViewType.JointAccount"),
        accountName: t("accountViewAll.JointAccount"),
      };
    case 'safe deposit locker':
      return {
        bgColor: theme.orangetintshade,
        accountType: t("accountViewType.SafeDepositLocker"),
        accountName: t("accountViewAll.SafeDepositLocker"),
      };
    default:
      return {
        bgColor: theme.tintneutralshade,
        accountType: accountType,
        accountName: accountName,
      };
  }
}

interface AccountViewAllNewProps {
  type?: 'default' | 'carousel';
  variant?: CardVariant;
  accountName?: string;
  accountType?: string;
  accountNumber?: string;
  accountNumberShort?: string;
  showLabel?: string;
  balance: string;
  currency?: string;
  onIconPress?: () => void;
  showChipsInfo?: boolean;
  chipsInfoProps: ChipsInfoProps;
  overrideStyles?: any;
  loading?: boolean;
  labeText?: TextProps;
  verticalLine?:boolean;
  numberOfLines?: number;
  hiddenCurrency?: boolean;
}

export const AccountViewAllNew: FC<AccountViewAllNewProps> = ({
  type = 'default',
  variant = 'current',
  accountName = null,
  accountNumber,
  accountNumberShort,
  accountType,
  showLabel,
  balance,
  currency="SAR",
  onIconPress,
  showChipsInfo = false,
  chipsInfoProps,
  overrideStyles,
  loading = false,
  labeText,
  verticalLine=true,
  numberOfLines=2,
  hiddenCurrency,
}) => {
  const { t } = useTranslation();
  const { theme, isDarkTheme } = useTheme();
  const isCarousel = useMemo(() => type === 'carousel', [type]);
  // Developer can pass either accountNumber or accountNumberShort — show whichever is provided
  const displayAccountNumber = accountNumber || accountNumberShort;
  const cardConfig = useMemo(() => getCardConfig(variant, theme, accountType, accountName,t), [variant,accountType,accountName, theme, isDarkTheme, t]);
  const bgImage = useMemo(() => {
    const color = VARIANT_COLOR[variant] ?? 'neutral';
    const lang = I18nManager.isRTL ? 'ar' : 'en';
    const layout = isCarousel ? 'carousel' : 'default';
    const mode = isDarkTheme ? 'dark' : 'light';
    return ACCOUNT_BACKGROUNDS[`${color}_${lang}_${layout}_${mode}`];
  }, [variant, isCarousel, isDarkTheme]);
  const styles = StyleSheet.create({
    container: {
      width: isCarousel ? actuatedNormalize(306) : actuatedNormalize(343),
      maxWidth: "100%",
      height: actuatedNormalize(150),
      padding: spacingS,
      backgroundColor: "transparent",
      borderRadius: radiusL,
      overflow: "hidden",
      flexDirection: "column",
      justifyContent: "space-between",
      gap: showLabel? 0 : spacingS,
    },
    accountName: {
      lineHeight: lineHeightMediumLarge, 
      fontFamily:fonts.HSBC_Medium,
      textAlign: "left", 
      width:"100%",
      maxWidth: "100%",
      flexShrink: 1,
    },
    textClamp: {
      width: "100%",
      maxWidth: "100%",
      minWidth: 0,
      flexShrink: 1,
      overflow: "hidden",
    },
    accountInfo: {
      flexDirection: 'column', 
      alignItems: "flex-start", 
      justifyContent: "space-between",
      flex: 1,
      minWidth: 0,
      maxWidth: "100%",
      overflow: "hidden",
    },
    inlineContent: {
      flexDirection:  "row",
      alignItems: "center",
      gap: spacingXS,
      maxWidth: "100%",
      minWidth: 0,
      flexShrink: 1,
    },
    topContainer: {
      width: "100%",
      maxWidth: "100%",
      minWidth: 0,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start", 
      gap: spacingS,
    },
    bottomContainer:{
      flexDirection: "column",
      alignItems:"flex-start",
      display:"flex",
      width: "100%",
      maxWidth: "100%",
      minWidth: 0,
    },
    balanceWrapper: {
      flexDirection: "row",
      justifyContent:"space-between",
      alignItems:"center",
      display:"flex",
      width:"100%",
      maxWidth: "100%",
      minWidth: 0,
    },
    chipSlot: {
      flexGrow: 0,
      flexShrink: 0,
    },
  });

  const hideBalance = useMemo(() => (variant === 'green deposit' || variant === 'islamic commodity account') && showChipsInfo && chipsInfoProps && chipsInfoProps.state === "warning" ,
    [variant, showChipsInfo,chipsInfoProps]);
   
  
  const isNegative = useMemo(() => balance?.startsWith("-"), [balance]);

  const formattedBalance = useMemo(() => {
      if (!balance) return "";
      return balance.replace("-", "");
      }, [balance]);

  return loading ? (
    <AccountsViewAllSkeletonNew type={type} overrideStyles={overrideStyles} />
  ) : (
    <TouchableOpacity onPress={onIconPress}>
      <ImageBackground
        source={bgImage}
        resizeMode="cover"
        style={[styles.container, overrideStyles]}
        // imageStyle={{ borderRadius: radiusS }}
      >
        <View style={styles.topContainer}>
          <View style={styles.accountInfo}>
            <View style={styles.textClamp}>
              <Text bold size={fontMediumLarge} overrideStyles={styles.accountName} numberOfLines={numberOfLines} variant="primarytextcolor">
                {accountName || cardConfig.accountName}
              </Text>
            </View>
            <View style={styles.inlineContent}>
            {(displayAccountNumber) && !hideBalance && (
                <Text size={fontMedium} variant="primarytextcolor2" numberOfLines={1}>
                    {displayAccountNumber}
                    </Text>
                        )}
              
                <View style={[styles.inlineContent,{flexShrink:1, minWidth: 0}]}>
                  {verticalLine && !hideBalance && <Text size={fontSmallMedium} variant="primarytextcolor2">|</Text>}
                  <View style={styles.textClamp}>
                    <Text size={fontSmallMedium} numberOfLines={1} variant="primarytextcolor2" overrideStyles={{ maxWidth: "100%" }}>
                      {accountType || cardConfig.accountType}
                    </Text>
                  </View>
                </View>
              
            </View>
          </View>
          {showChipsInfo && (
            <View style={styles.chipSlot}>
              <ChipsInfo type="default" pill showIcon={false} label="Label" state="error" {...chipsInfoProps} />
            </View>
          )}
        </View>
          <View style={styles.bottomContainer}>
          {showLabel && <Text size={fontSmall} variant="primarytextcolor2" {...labeText}>
                    {showLabel} 
                  </Text>}
          <View style={styles.balanceWrapper}>
         {(balance && !hideBalance) && 
         <View style={[styles.inlineContent,{flexDirection: I18nManager.isRTL ? "row-reverse" :"row",flexShrink:1,gap:actuatedNormalize(4)}]}>
          {hiddenCurrency ? (
         <Text bold size={fontLarge} variant="primarytextcolor">
           * * * * *
          </Text>
          ) : (
            <View
             style={[styles.inlineContent,{ flexDirection: I18nManager.isRTL ? "row-reverse" : "row",gap:spacingXXXS }]}>
             <NewCurrency
             text={`${isNegative ? " - " : ""}${currency}${currency !== "SAR" ? " " : ""}${formattedBalance}`}
             size={fontLarge}
             textstyle={{lineHeight:lineHeightLarge, fontFamily:fonts.HSBC_Bold}}
             variant="primarytextcolor"
             />
            </View>
            )}
          </View>
          
          }
        </View>
          </View>

      </ImageBackground>
    </TouchableOpacity>
  );
};
