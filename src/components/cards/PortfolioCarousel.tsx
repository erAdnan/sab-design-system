import React, { FC, useMemo } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import {
  fontSmallMedium,
  fontXSmall,
  fontXXLarge,
  lineHeightXXLarge,
  radiusS,
  spacingS,
  spacingXS,
  spacingXXXS,
} from "../../assets/styles/constants/size";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { Text } from "../text/Text";
import { SarFont } from "../sarFont/SarFont";
import ChevronRight from "../icons/arrows/chevron/ChevronRight";
import { BaseCardSkeleton } from "./BaseCardSkeleton";
import { useFluidWidth } from "../../assets/styles/utils/responsive";

interface PortfolioCarouselCardProps {
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
 * @property loading - Optional loading state for the component
 */

export const PortfolioCarousel: FC<PortfolioCarouselCardProps> = ({
  accountName,
  accountNumber,
  balanceLabel,
  balance,
  onChevronPress,
  overrideStyles,
  loading = false,
}) => {
  const { theme, isDarkTheme } = useTheme();
  const frame = useFluidWidth();

  const background = useMemo(() => {
    return isDarkTheme
      ? require("../../assets/images/portfolioCarouselDark.png")
      : require("../../assets/images/portfolioCarouselLight.png");
  }, [isDarkTheme]);

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      ...frame.of(313),
      height: actuatedNormalize(123),
      padding: spacingS,
      alignItems: "center",
      backgroundColor: theme.ragneutral,
      borderRadius: radiusS,
    },
    inlineContent: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: spacingXS,
    },
    acccountTitle: {
      justifyContent: "space-between",
      gap: 0,
    },
    accountDetails: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      flex: 1,
      height: "100%",
    },
    balanceWrapper: {
      display: "flex",
      flexDirection: "column",
      gap: spacingXXXS,
    },
    cardsBackground: {
      borderRadius: radiusS,
    },
  });

  return loading ? (
    <BaseCardSkeleton width={frame.span} height={actuatedNormalize(123)} />
  ) : (
    <ImageBackground
      style={[styles.container, overrideStyles]}
      imageStyle={styles.cardsBackground}
      source={background}
    >
      <View style={styles.accountDetails}>
        <View style={[styles.inlineContent, styles.acccountTitle]}>
          <Text size={fontSmallMedium} variant="primarycolor4static">
            {accountName}
          </Text>
          <Text size={fontXSmall} variant="primarycolor4static">
            {accountNumber}
          </Text>
        </View>
        <View style={styles.balanceWrapper}>
          <Text
            size={fontSmallMedium}
            variant="primarycolor4static"
            overrideStyles={{ flex: 1 }}
          >
            {balanceLabel}
          </Text>
          <View style={styles.inlineContent}>
            <SarFont
              size={fontXXLarge}
              lineHeight={lineHeightXXLarge}
              variant="primarycolor4static"
            />
            <Text bold size={fontXXLarge} variant="primarycolor4static">
              {balance}
            </Text>
          </View>
        </View>
      </View>
      <View>
        <ChevronRight
          fill={theme.primarycolor4static}
          onPress={() => onChevronPress && onChevronPress()}
        />
      </View>
    </ImageBackground>
  );
};
