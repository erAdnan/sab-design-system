import React, { FC, ReactElement, useMemo } from "react";
import {  I18nManager, StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import {
  fontMedium,
  fontMediumLarge,
  fontSmall,
  fontWeightMedium,
  fontXLarge,
  fontXXLarge,
  heightXl,
  lineHeightMediumLarge,
  lineHeightXLarge,
  lineHeightXXLarge,
  radiusS,
  spacingS,
  spacingXS,
  spacingXXXS,
  widthXl,
} from "../../assets/styles/constants/size";
import { Text, TextProps } from "../text/Text";
import { SarFont } from "../sarFont/SarFont";
import { BaseCardSkeleton } from "./BaseCardSkeleton";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import Graph from "../icons/banking/Graph";
import MyAccounts from "../icons/banking/MyAccounts";
import Leaf from "../icons/banking/Leaf";
import Payments from "../icons/banking/Payments";
import BankVault from "../icons/banking/BankVault";
import Family from "../icons/banking/Family";
import Growth from "../icons/banking/Growth";
import Investments from "../icons/banking/Investments";
import HsbcGlobal from "../icons/banking/HsbcGlobal";
import { ChipsInfo, ChipsInfoProps } from "../chips/ChipsInfo";
import { AccountsViewAllSkeleton } from "./skeletons/AccountsViewAllSkeleton";
import { useTranslation } from "react-i18next";
import fonts from "../../assets/styles/constants/fonts";
import DualUser from "../icons/outline/DualUser";
import ShieldLock from "../icons/outline/ShieldLock";
import { NewCurrency } from "../text/NewCurrency";

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

  function getCardConfig(variant: CardVariant, theme: any, isDarkTheme: boolean, accountType?: string | null, accountName?: string | null, t?: any) {
    const iconFill = (lightColor: string) =>
      isDarkTheme ? "#FFFFFF" : lightColor;
    const green = theme.PFMragGreen;
  
  switch (variant) {
    case 'portfolio account':
      return {
        icon: <Investments fill={iconFill(theme.ragneutral)}></Investments>,
        bgColor: theme.tintneutralshade,
        accountType: null,
        accountName: t("accountViewAll.InvestmentPortfolio")
      };
    case 'cash wallet':
      return {
        icon: <Payments fill={iconFill(theme.ragamber)}></Payments>,
        bgColor: theme.tintambershade,
        accountType: t("accountViewType.CashWalletAccount"),
        accountName: t("accountViewAll.CashWalletAccount")
      };
    case 'hsbc global account':
      return {
        icon: <HsbcGlobal fill={iconFill(theme.ragcolor3)}></HsbcGlobal>,
        bgColor: theme.tintredshade,
        accountType: t("accountViewType.HSBCGlobalView"),
        accountName: t("accountViewAll.HSBCGlobalView")
      };
    case 'family account':
      return {
        icon: <Family fill={iconFill(theme.secondarycolor12)}></Family>,
        bgColor: theme.strokepurpletint,
        accountType: t("accountViewType.FamilyAccount"),
        accountName: t("accountViewAll.FamilyAccount")
      };
    case 'islamic commodity account':
      return {
        icon: <BankVault fill={iconFill(theme.primarycolor2_100)}></BankVault>,
        bgColor: theme.stylesblockbg,
        accountType: t("accountViewType.IslamicCommodity"),
        accountName: t("accountViewAll.IslamicCommodity")
      };
    case 'waffer account':
      return {
        icon: <Growth fill={iconFill(green)}></Growth>,
        bgColor: theme.tintgreenshade,
        accountType: t("accountViewType.WafferAccount"),
        accountName: t("accountViewAll.WafferAccount")
      };
    case 'green deposit':
      return {
        icon: <Leaf fill={iconFill(green)}></Leaf>,
        bgColor: theme.tintgreenshade,
        accountType: t("accountViewType.GreenDeposit"),
        accountName: t("accountViewAll.GreenDeposit")
      };
    case 'mudarabah':
      return {
        icon: <Graph fill={iconFill(green)}></Graph>,
        bgColor: theme.tintgreenshade,
        accountType: t("accountViewType.MudarabahSavingsAccount"),
        accountName: t("accountViewAll.MudarabahSavingsAccount")
      };
    case 'current':
      return {
        icon: <MyAccounts fill={iconFill(theme.ragneutral)}></MyAccounts>,
        bgColor: theme.tintneutralshade,
        accountType: t("accountViewType.CurrentAccount"),
        accountName: t("accountViewAll.CurrentAccount"),
      };
    case 'joint account':
      return {
        icon: <DualUser fill={iconFill(theme.ragneutral)} />,
        bgColor: theme.tintneutralshade,
        accountType: t("accountViewType.JointAccount"),
        accountName: t("accountViewAll.JointAccount"),
      };
    case 'safe deposit locker':
      return {
        icon: <ShieldLock fill={iconFill("#DB8334")} />,
        bgColor: theme.orangetintshade,
        accountType: t("accountViewType.SafeDepositLocker"),
        accountName: t("accountViewAll.SafeDepositLocker"),
      };
    default:
      return {
        icon: <MyAccounts fill={iconFill(theme.ragneutral)}></MyAccounts>,
        bgColor: theme.tintneutralshade,
        accountType: accountType,
        accountName: accountName,
      };
  }
}

interface AccountViewAllProps {
  type?: 'default' | 'carousel';
  variant?: CardVariant;
  accountName?: string;
  accountType?: string;
  accountNumber: string;
  accountNumberShort: string;
  showLabel?: string;
  balance: string;
  currency?: string;
  icon?: ReactElement,
  onIconPress?: () => void;
  showChipsInfo?: boolean;
  chipsInfoProps: ChipsInfoProps;
  overrideStyles?: any;
  loading?: boolean;
  labeText?: TextProps;
  verticalLine?:boolean;
  numberOfLines?: number;
  hiddenCurrency?: boolean;
  iconContainerStyle?: any;
  //TODO this should be removed when everything is migrated to the new journey
  showChipsInfoAtTop?: boolean;
}

export const AccountViewAll: FC<AccountViewAllProps> = ({
  type = 'default',
  variant = 'current',
  accountName = null,
  accountNumber,
  accountNumberShort,
  accountType,
  showLabel,
  balance,
  currency="SAR",
  icon,
  onIconPress,
  showChipsInfo = false,
  chipsInfoProps,
  overrideStyles,
  loading = false,
  labeText,
  verticalLine=true,
  numberOfLines=2,
  hiddenCurrency,
  iconContainerStyle,
  showChipsInfoAtTop = false,
}) => {
  const { t } = useTranslation();
  const { theme, isDarkTheme } = useTheme();
  const isCarousel = useMemo(() => type === 'carousel', [type]);
  const cardConfig = useMemo(() => getCardConfig(variant, theme, isDarkTheme, accountType, accountName,t), [variant,accountType,accountName, theme, isDarkTheme, t]);
  const styles = StyleSheet.create({
    container: {
      width: isCarousel ? actuatedNormalize(217) : actuatedNormalize(343),
      padding: spacingS,
      backgroundColor: cardConfig.bgColor,
      borderRadius: radiusS,
      flexDirection: "column",
      justifyContent: "space-between",
      gap: showLabel? 0 : spacingS,
    },
    accountName: {
      lineHeight: lineHeightMediumLarge, 
      fontFamily:fonts.HSBC_Medium,
      textAlign: "left", 
      width:"100%",
    },
    accountInfo: {
      flexDirection: 'column', 
      alignItems: "flex-start", 
      justifyContent: "space-between",
      flex: 1
    },
    inlineContent: {
      flexDirection:  "row",
      alignItems: "center",
      gap: spacingXS,      
    },
    topContainer: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start", 
      gap: spacingS
    },
    iconContainer: {
      backgroundColor: theme.primarycolor4,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: actuatedNormalize(100),
      height: heightXl,
      width: widthXl, 
    },
    bottomContainer:{
      flexDirection: "column",
      alignItems:"flex-start",
      display:"flex",
    },
    balanceWrapper: {
      flexDirection: "row",
      justifyContent:"space-between",
      alignItems:"center",
      display:"flex",
      width:"100%",
    },
  });

  const hideBalance = useMemo(() => (variant === 'green deposit' || variant === 'islamic commodity account') && showChipsInfo && chipsInfoProps && chipsInfoProps.state === "warning" ,
    [variant, showChipsInfo,chipsInfoProps]);

  const fontSize = isCarousel
      ? fontMediumLarge
      : fontXLarge;
  const fontLineHeight = isCarousel
      ? lineHeightMediumLarge
      : lineHeightXLarge;    
  
  const isNegative = useMemo(() => balance?.startsWith("-"), [balance]);

  const formattedBalance = useMemo(() => {
      if (!balance) return "";
      return balance.replace("-", "");
      }, [balance]);

  return loading ? (
    <AccountsViewAllSkeleton type={type} />
  ) : (
    <TouchableOpacity onPress={onIconPress}>
      <View style={[styles.container, overrideStyles]}>
        <View style={styles.topContainer}>
          <View style={styles.accountInfo}>
            <Text bold size={fontMediumLarge} overrideStyles={styles.accountName} numberOfLines={numberOfLines} variant="primarytextcolor">
              {accountName || cardConfig.accountName} 
            </Text>
            <View style={styles.inlineContent}>
            {(accountNumber || accountNumberShort) && !hideBalance && (
                <Text size={fontMediumLarge} variant="primarytextcolor2">
                    {isCarousel ? accountNumberShort : accountNumber}
                    </Text>
                        )}
              {(!isCarousel && (accountType || cardConfig.accountType)) && 
                <View style={[styles.inlineContent,{flexShrink:1}]}>
                  {verticalLine && !hideBalance && <Text size={fontMediumLarge} variant="primarytextcolor2">|</Text>}
                  <Text size={fontMediumLarge} numberOfLines={numberOfLines} variant="primarytextcolor2">
                    {accountType || cardConfig.accountType} 
                  </Text>
                </View>
              }
            </View>
          </View>
          {showChipsInfoAtTop ? (
            <View style={[styles.iconContainer, iconContainerStyle]}>
              {icon || cardConfig.icon}
            </View>
          ) : (
            showChipsInfo && chipsInfoProps && (
              <View>
                <ChipsInfo
                  type="default"
                  pill
                  label="Label"
                  state="error"
                  {...chipsInfoProps}
                />
              </View>
            )
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
         <Text bold size={fontSize} variant="primarytextcolor">
           * * * * *
          </Text>
          ) : (
            <View
             style={[styles.inlineContent,{ flexDirection: I18nManager.isRTL ? "row-reverse" : "row",gap:spacingXXXS }]}>
             <NewCurrency
             text={`${isNegative ? " - " : ""}${currency}${currency !== "SAR" ? " " : ""}${formattedBalance}`}
             size={fontSize}
             textstyle={{lineHeight:fontLineHeight, fontFamily:fonts.HSBC_Bold}}
             variant="primarytextcolor"
             />
            </View>
            )}
          </View>
          
          }
          {showChipsInfoAtTop && chipsInfoProps && (
                    <View>
                      <ChipsInfo type="default" pill label="Label" state="error"  {...chipsInfoProps} />
                    </View>
                  )}
        </View>
          </View>

          </View>
    </TouchableOpacity>
  );
};