import React, { FC, useMemo } from "react";
import { I18nManager, StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import {
  fontMedium,
  fontMediumLarge,
  fontSmall,
  fontSmallMedium,
  radiusS,
  spacingS,
  spacingXS,
  spacingXXS,
} from "../../assets/styles/constants/size";
import { Text } from "../text/Text";
import { Title, TitleProps } from "../text/Title";
import { ChipsInfo } from "../chips/ChipsInfo";
import ChevronDown from "../icons/arrows/chevron/ChevronDown";
import ChevronRight from "../icons/arrows/chevron/ChevronRight";
import { Checkbox } from "../checkbox/Checkbox";
import { RadioButton } from "../radio/Radio";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import ImageThumbnail, { ImageThumbnailProps } from "../imageThumbnail/ImageThumbnail";
import ChevronLeft from "../icons/arrows/chevron/ChevronLeft";
import fonts from "../../assets/styles/constants/fonts";
import { NewCurrency } from "../text/NewCurrency";
import { useFluidWidth } from "../../assets/styles/utils/responsive";

interface BlockAccountProps {
  headline: string;
  headlineTextProps?: TitleProps,
  text?: string;
  extraContent?: string;
  balance?: string;
  balanceType?: "balance" | "chipInfoStatus";
  chipInfoStatusLabel?: string;
  isActive?: boolean;
  showAction?: boolean;
  actionType: "dropdown" | "link" | "selection" | "radioButton";
  onActionPress?: (
    value?: string | boolean | number,
    selected?: boolean
  ) => void;
  selectedValue?: any;
  actionIconRotation?: `${number}deg`;
  loading?: boolean;
  accountId?: any;
  overrideTextWrapper?: any;
  type: 'account' | 'card' | 'currency';
  cardImageProps?: ImageThumbnailProps;
  currency?: string;
  onBlockPress?: () => void;
}

/**
 * @property headline - Text displayed on the first line (bold)
 * @property text - Text displayed on the second line (e.g. account number)
 * @property extraContent - Small text displayed on the third line
 * @property balance - Text to represent the balance (sar symbol will be added automatically, only pass the balance as string)
 * @property balanceType - Can be balance or chip info
 * @property chipInfoStatusLabelt - Label for chips info component when balance type is "chipsInfoStatus"
 * @property isActive - When false, chips info state will be error and styles for disabled text will be applied
 * @property showAction - Boolean to show/hide action next to balance or chip info
 * @property actionType - Changes the type of action to be displayed (default is "dropdown")
 * @property onActionPress - Optional callback for handling action event (press for icons and check/uncheck for radio and checkbox)
 * @property selectedValue - Optional value for the block account that can be passed when using checkbox and radio button to get the item that is selected, can be of any type
 * @property actionIconRotation - Changes position of action icon (chenvron)
 * @property loading - boolean for showing the skeleton
 * @property overrideTextWrapper - use this  override style  for the text part left side content wrapper
 * @property type - Selects the variant, default is account
 * @property cardImageProps - Controls the image for card when type is card or currency with flag  image
 * @property currency - use this props to change the currency by default its(SAR)
 * @property onBlockPress - Optional callback triggered when the entire component is pressed.
 **/

export const Account: FC<BlockAccountProps> = ({
  headline,
  text,
  extraContent,
  balanceType = "balance",
  chipInfoStatusLabel,
  isActive = true,
  showAction = true,
  actionType = "dropdown",
  balance,
  onActionPress,
  selectedValue = "",
  actionIconRotation = "0deg",
  loading = false,
  overrideTextWrapper,
  accountId,
  headlineTextProps,
  type = 'account',
  cardImageProps,
  currency = "SAR",
  onBlockPress
}) => {
  const { theme } = useTheme();
  const frame = useFluidWidth();
  const isRtl = I18nManager.isRTL;
  const isNegativeBalance = balance?.trimStart().startsWith("-") ?? false;
  const formattedBalance = balance?.trimStart().replace(/^[+-]\s*/, "");
  const isSar = useMemo(() => currency.toLocaleLowerCase() === "sar",[currency]);
  const displayAmount = `${isNegativeBalance ? "- " : ""}${currency}${isSar ? "" : " "}${formattedBalance ?? ""}`;

  const getActionType = () => {
    switch (actionType) {
      case "dropdown":
        return (
          <ChevronDown
            onPress={() => onActionPress && onActionPress()}
            fill={theme.primarytextcolor}
            transform={[
              {
                rotate: actionIconRotation,
              },
            ]}
          />
        );
      case "link":
        return (
          isRtl ? (
            <ChevronLeft
              onPress={() => onActionPress && onActionPress()}
              fill={theme.primarytextcolor}
            />) : (
            <ChevronRight
              onPress={() => onActionPress && onActionPress()}
              fill={theme.primarytextcolor}
          />)
        );
      case "selection":
        return (
          <Checkbox
            handleCheck={(isSelected: boolean) =>
              onActionPress && onActionPress(selectedValue, isSelected)
            }
          />
        );
      case "radioButton":
        return (
          <RadioButton
            handleCheck={(value: boolean | string | number) =>
              onActionPress && onActionPress(value)
            }
            checked={selectedValue}
            value={accountId}
          />
        );
    }
  };

  const showCard = useMemo(() => type === 'card', [type]);
  const showCurrencyFlag = useMemo(() => type === 'currency', [type]);

  return loading ? (
    <View
      style={{
        ...frame.of(343),
        height: extraContent ? actuatedNormalize(80) : actuatedNormalize(60),
        backgroundColor: theme.stylesblockbg,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: spacingS,
        gap: spacingS,
        borderRadius: radiusS,
      }}
    >
      <View
        style={{
          flexDirection: "column",
          gap: spacingXS,
          justifyContent: "center",
          width: "60%",
        }}
      >
        <SkeletonBox
          shape="line"
          size="small"
          overrideStyles={{ width: "100%" }}
        />
        <SkeletonBox
          shape="line"
          size="small"
          overrideStyles={{ width: "100%" }}
        />
      </View>
      <View style={{ width: "40%" }}>
        <SkeletonBox
          shape="line"
          size="medium"
          overrideStyles={{ width: "100%" }}
        />
      </View>
      </View>
  ) : (
    <TouchableOpacity
      style={{
        ...styles.blockWrapper,
        ...frame.of(343),
        backgroundColor: theme.stylesblockbg,
      }}
      onPress={onBlockPress}
      >
      <View style={styles.leftContent}>
          {showCard && cardImageProps && <ImageThumbnail width={actuatedNormalize(44)} height={actuatedNormalize(28)} isAbsolutePath={cardImageProps.isAbsolutePath} url={cardImageProps.url} />}
          {showCurrencyFlag && (
            cardImageProps?.url ?
              <ImageThumbnail width={actuatedNormalize(24)} height={actuatedNormalize(24)} overrideStyles={{ borderRadius: actuatedNormalize(24)}} isAbsolutePath={cardImageProps.isAbsolutePath} url={cardImageProps.url} localSvg={cardImageProps.localSvg} />
              : <View style={{ height: actuatedNormalize(24), width: actuatedNormalize(24), borderRadius: actuatedNormalize(24), backgroundColor: theme.primarycolor2}}></View>)}
        <View style={[styles.textWrapper, overrideTextWrapper]}>
            <Title
            size={fontMedium}
            overrideStyles={{ paddingHorizontal: 0, paddingVertical: 0,textAlign: "left", fontFamily: fonts.HSBC_Medium }}
            variant={isActive ? "primarytextcolor" : "primarycolor2_60"}
            {...headlineTextProps}
          >
            {headline}
          </Title>
        { text?.length ? <Text
            size={fontSmallMedium}
            variant={isActive ? "primarytextcolor2" : "primarycolor2_60"}
            overrideStyles={{ textAlign: "left" }}
          >
            {text}
          </Text> : <></>}
          {extraContent?.length ? (
            <Text
              size={fontSmall}
              variant="primarytextcolor2"
              overrideStyles={{ textAlign: "left"}}
            >
              {extraContent}
            </Text>
          ) : <></>}
        </View>
      </View>
      <View style={styles.detailsWrapper}>
        {balance && balanceType === "balance" && (
          <View style={styles.balance}>
            <NewCurrency
              text={displayAmount}
              size={fontMediumLarge}
              textstyle={{ fontFamily: fonts.HSBC_Bold }}
              variant={isActive ? "primarytextcolor" : "primarycolor2_60"}
            />
          </View>
        )}
        {chipInfoStatusLabel && balanceType === "chipInfoStatus" && (
          <View style={styles.balance}>
            <ChipsInfo
              state={isActive ? "success" : "error"}
              label={chipInfoStatusLabel}
            />
          </View>
        )}
        {showAction && <View>{getActionType()}</View>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  blockWrapper: {
    borderRadius: radiusS,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacingS,
  },
  detailsWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: spacingXS,
  },
  textWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
    gap: actuatedNormalize(3),
  },
  balance: {
    display: "flex",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    alignItems: "center",
    gap: spacingXXS,
  },
  leftContent: {
    display: 'flex',
    flexDirection: 'row',
    gap: spacingXS,
    alignItems: 'center',
    flex: 1,
  }
});
