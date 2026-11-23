import React, { FC } from "react";
import { ChipsInfo, ChipsInfoProps } from "../chips/ChipsInfo";
import { I18nManager, ImageBackground, StyleSheet, View } from "react-native";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import {
  fontLarge,
  fontMedium,
  fontXLarge,
  lineHeightLarge,
  lineHeightXLarge,
  radiusL,
  radiusS,
  spacingS,
  spacingXS,
  spacingXXS,
} from "../../assets/styles/constants/size";
import { useTheme } from "../../context/theme/themeContext";
import { Title } from "../text/Title";
import i18n from "i18next";
import { LanguageCodes } from "../../localization/languages";
import { Text } from "../text/Text";
import { SarFont } from "../sarFont/SarFont";
import { TooltipComponent } from "../tooltip/Tooltip";
import { ProgressIndicator } from "../progressIndicator/ProgressIndicator";
import { SkeletonBox } from "../skeleton/SkeletonBox";

interface CardsPreviewModuleProps {
  type: "account" | "cards" | "finance" | "portfolio";
  showChipsInfo?: boolean;
  chipsInfoProps: ChipsInfoProps;
  cardTitle: string;
  accountName?: string;
  accountNumber?: string;
  balanceLabel?: string;
  balance?: string;
  tooltipText?: string;
  availableLimitLabel?: string;
  availableLimit?: string;
  creditLimitLabel?: string;
  creditLimit?: string;
  creditLimitPercentage: number;
  loading?: boolean;
}

/**
 * @property type - Options for different card types (default is "account")
 * @property showChipsInfo - Boolean to show/hide chips info component in thetop right corner
 * @property chipsInfoProps - use ChipsInfoProps to configure label and chip state
 * @property cardTitle - Text for the first line on the top of the card (title)
 * @property accountName - Text for the first line in the middle of the card (account name or card description, depending on the card type)
 * @property accountNumber - String that represents account number or card number
 * @property balanceLabel - Text to use as label for the balance ("Balance" is used in Figma)
 * @property balance - String that represents the amount of the balance (example: "34,500.00")
 * @property tooltipText - Text to use inside the tooltip when card type is "finance" or "portfolio"
 * @property availableLimitLabel - Text to use as label for the available limit ("Available limit" is used in Figma)
 * @property availableLimit - String that represents the amount of the available limit (example: "34,500.00")
 * @property creditLimitLabel - Text to use as label for the credit limit ("Credit limit 95%" is used in Figma)
 * @property creditLimitPerecentage - Number that represents percentage to be used in progress bar
 * @property loading - Boolean to show/hide loading state
 */

export const PreviewModule: FC<CardsPreviewModuleProps> = ({
  type = "account",
  showChipsInfo = true,
  chipsInfoProps,
  cardTitle,
  accountName,
  accountNumber,
  balanceLabel,
  balance,
  tooltipText = "",
  availableLimitLabel,
  availableLimit,
  creditLimitLabel,
  creditLimit,
  creditLimitPercentage = 0,
  loading = false,
}) => {
  const { theme } = useTheme();
  const isRtl = I18nManager.isRTL;

  const styles = StyleSheet.create({
    container: {
      height: actuatedNormalize(178),
      width: actuatedNormalize(343), // Figma accounts.view / cards: fixed 343 design width
      borderRadius: radiusL,
      padding: spacingS,
    },
    account: {
      backgroundColor: theme.complimentaryprimarycolor3_3,
      display: "flex",
      flexDirection: "column",
      gap: spacingXS,
    },
    cards: {
      backgroundColor: theme.primarycolorstatic,
      display: "flex",
      flexDirection: "column",
      gap: spacingXS,
    },
    finance: {
      backgroundColor: theme.secondarycolor10,
      gap: spacingXS,
      display: "flex",
      flexDirection: "column",
    },
    portfolio: {
      backgroundColor: theme.ragneutral,
      gap: spacingXS,
      display: "flex",
      flexDirection: "column",
    },
    titleWrapper: {
      display: "flex",
      flexDirection: isRtl ? "row-reverse" : "row",
      justifyContent: "space-between",
      gap: spacingXS,
      flex: type === "cards" ? 0 : 1,
    },
    accountInfoBlock: {
      flex: 1,
      borderBottomColor: theme.stylesbgshades,
      borderBottomWidth: 1,
      display: "flex",
      flexDirection: "column",
      gap: spacingXXS,
      alignItems: isRtl ? "flex-end" : "flex-start",
    },
    accountInfoInline: {
      flex: 1,
      borderBottomColor: theme.stylesbgshades,
      borderBottomWidth: 1,
      display: "flex",
      flexDirection: isRtl ? "row-reverse" : "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    balanceWrapper: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: spacingXXS,
      alignItems: isRtl ? "flex-end" : "flex-start",
      justifyContent: "flex-end",
    },
    balanceText: {
      display: "flex",
      flexDirection: "row",
      gap: spacingXXS,
    },
    limitInfoWrapper: {
      display: "flex",
      flexDirection: isRtl ? "row-reverse" : "row",
      justifyContent: "space-between",
      width: "100%",
      alignItems: "center",
      paddingVertical: spacingXXS,
    },
    cardsInfoBlock: {
      display: "flex",
      flexDirection: "column",
      gap: spacingXXS,
      alignItems: isRtl ? "flex-end" : "flex-start",
    },
    cardsBackground: {
      width: actuatedNormalize(343),
      height: actuatedNormalize(178),
    },
  });
  return loading ? (
    <View
      style={{
        height: actuatedNormalize(178),
        width: actuatedNormalize(343),
        backgroundColor: theme.stylesblockbg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: spacingS,
        padding: spacingS,
        borderRadius: radiusS,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: isRtl ? "row-reverse" : "row",
          gap: spacingS,
          justifyContent: "space-between",
        }}
      >
        <SkeletonBox
          shape="line"
          size="small"
          overrideStyles={{ width: "70%" }}
        />
        <SkeletonBox
          shape="line"
          size="small"
          overrideStyles={{ width: "20%" }}
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: spacingS,
          justifyContent: "center",
          alignItems: isRtl ? "flex-end" : "flex-start",
        }}
      >
        <SkeletonBox
          shape="line"
          size="extralarge"
          overrideStyles={{ width: "100%" }}
        />
        <SkeletonBox
          shape="line"
          size="extralarge"
          overrideStyles={{ width: "50%" }}
        />
      </View>
    </View>
  ) : (
    <ImageBackground
      style={[styles.container, styles[type]]}
      imageStyle={styles.cardsBackground}
      source={
        type === "cards"
          ? require("../../assets/images/cardBackground.png")
          : ""
      }
    >
      <View style={styles.titleWrapper}>
        <View style={{ flex: 1 }}>
          <Title
            size={fontLarge}
            variant="primarycolor4static"
            numberOfLines={1}
            overrideStyles={{
              paddingHorizontal: 0,
              paddingVertical: 0,
              alignSelf: "flex-start",
            }}
          >
            {cardTitle}
          </Title>
        </View>
        {showChipsInfo && (
          <View>
            <ChipsInfo type="default" {...chipsInfoProps} />
          </View>
        )}
      </View>
      <View
        style={
          type === "account"
            ? styles.accountInfoBlock
            : type === "cards"
              ? styles.cardsInfoBlock
              : styles.accountInfoInline
        }
      >
        <Text
          variant="primarycolor4static"
          size={fontMedium}
          numberOfLines={1}
          overrideStyles={{ overflow: "hidden" }}
        >
          {type === "account" || type === "cards"
            ? accountName || ""
            : `${isRtl ? accountNumber : accountName} | ${isRtl ? accountName : accountNumber
            }`}
        </Text>
        {type === "account" || type === "cards" ? (
          <Text variant="primarycolor4static" size={fontMedium}>
            {accountNumber || ""}
          </Text>
        ) : (
          <TooltipComponent
            text={tooltipText}
            iconColor={theme.primarycolor4static}
          />
        )}
      </View>
      {type === "cards" ? (
        <>
          <View style={styles.limitInfoWrapper}>
            <Text variant="primarycolor4static" size={fontMedium}>
              {availableLimitLabel || ""}
            </Text>
            <View style={styles.balanceText}>
              <SarFont
                variant="primarycolor4static"
                size={fontLarge}
                lineHeight={lineHeightLarge}
              />
              <Text bold variant="primarycolor4static" size={fontLarge}>
                {availableLimit || ""}
              </Text>
            </View>
          </View>
          <ProgressIndicator
            progress={creditLimitPercentage}
            containerColor={theme.primarycolor2_100}
            progressColor={theme.primarycolor4static}
          />
          <View style={styles.limitInfoWrapper}>
            <Text variant="primarycolor4static" size={fontMedium}>
              {creditLimitLabel || ""}
            </Text>
            <View style={styles.balanceText}>
              <SarFont
                variant="primarycolor4static"
                size={fontLarge}
                lineHeight={lineHeightLarge}
              />
              <Text bold variant="primarycolor4static" size={fontLarge}>
                {creditLimit || ""}
              </Text>
            </View>
          </View>
        </>
      ) : (
        <View style={styles.balanceWrapper}>
          <Text variant="primarycolor4static" size={fontMedium}>
            {balanceLabel || ""}
          </Text>
          <View style={styles.balanceText}>
            <SarFont
              variant="primarycolor4static"
              size={fontXLarge}
              lineHeight={lineHeightXLarge}
            />
            <Text bold variant="primarycolor4static" size={fontXLarge}>
              {balance || ""}
            </Text>
          </View>
        </View>
      )}
    </ImageBackground>
  );
};
