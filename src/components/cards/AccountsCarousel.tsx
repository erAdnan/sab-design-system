import React, { FC, useMemo } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import {
  fontMediumLarge,
  fontSmallMedium,
  fontXSmall,
  fontXXLarge,
  lineHeightXXLarge,
  radiusS,
  spacingS,
  spacingXS,
} from "../../assets/styles/constants/size";
import { Text } from "../text/Text";
import { SarFont } from "../sarFont/SarFont";
import ChevronRight from "../icons/arrows/chevron/ChevronRight";
import { BaseCardSkeleton } from "./BaseCardSkeleton";

interface AccountsCarouselCardProps {
  accountName: string;
  accountNumber: string;
  balanceLabel: string;
  balance: string;
  onChevronPress?: () => void;
  overrideStyles?: any;
  loading?: boolean;
}

/**
 * @property accountName - Text for the first line (Current Account in Figma)
 * @property accountNumber - Text to be displayed next to the account name
 * @property balanceLabel - Text to be used for balance label (Balance in Figma)
 * @property balance - Text that represents card balance. SAR symbol will be added in front of it
 * @property onChevronPress - Optional callback to handle chevron icon press
 * @property overrideStyles - Optional override styles for the component
 * @property loading - Optional loading state for the component to show skeleton
 */

export const AccountsCarousel: FC<AccountsCarouselCardProps> = ({
  accountName,
  accountNumber,
  balanceLabel,
  balance,
  onChevronPress,
  overrideStyles,
  loading = false,
}) => {
  const { theme } = useTheme();

  const background = useMemo(() => {
    return require("../../assets/images/accountsCarousel.png");
  }, []);

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      gap: spacingS,
      padding: spacingS,
      alignItems: "center",
      backgroundColor: theme.stylesblockbg,
      alignSelf: "flex-start",
      borderRadius: radiusS,
    },
    inlineContent: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: spacingXS,
    },
    accountDetails: {
      display: "flex",
      flexDirection: "column",
      gap: spacingS,
    },
    balanceWrapper: {
      display: "flex",
      flexDirection: "column",
      gap: spacingXS,
    },
    cardsBackground: {
      borderRadius: radiusS,
    },
  });

  return loading ? (
    <BaseCardSkeleton />
  ) : (
    <ImageBackground
      style={[styles.container, overrideStyles]}
      imageStyle={styles.cardsBackground}
      source={background}
    >
      <View style={styles.accountDetails}>
        <View style={styles.inlineContent}>
          <Text size={fontMediumLarge}>{accountName}</Text>
          <Text size={fontXSmall} variant="primarytextcolor2">
            {accountNumber}
          </Text>
        </View>
        <View style={styles.balanceWrapper}>
          <Text size={fontSmallMedium} overrideStyles={{ flex: 1 }}>
            {balanceLabel}
          </Text>
          <View style={styles.inlineContent}>
            <SarFont size={fontXXLarge} lineHeight={lineHeightXXLarge} />
            <Text bold size={fontXXLarge}>
              {balance}
            </Text>
          </View>
        </View>
      </View>
      <View>
        <ChevronRight
          fill={theme.primarytextcolor}
          onPress={() => onChevronPress}
        />
      </View>
    </ImageBackground>
  );
};
