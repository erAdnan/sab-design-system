import React, { FC, useMemo } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import {
  fontMediumLarge,
  fontSmallMedium,
  fontXSmall,
  fontXXLarge,
  lineHeightMediumLarge,
  lineHeightXXLarge,
  radiusS,
  spacingS,
  spacingXXS,
} from "../../assets/styles/constants/size";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { Text } from "../text/Text";
import { SarFont } from "../sarFont/SarFont";
import ChevronRight from "../icons/arrows/chevron/ChevronRight";
import { BaseCardSkeleton } from "./BaseCardSkeleton";
import { useFluidWidth } from "../../assets/styles/utils/responsive";

interface FinanceCarouselCardProps {
  totalAmountLabel: string;
  totalAmount: string;
  remainingAmountLabel: string;
  remainingAmount: string;
  nextInstallmentLabel: string;
  nextInstallmentAmount: string;
  onChevronPress?: () => void;
  overrideStyles?: any;
  loading?: boolean;
}

/**
 * @property totalAmountLabel - Text for the total amount label
 * @property totalAmount - Text that represents total amount. SAR symbol will be added in front of it
 * @property remainingAmountLabel - Text to be used for remaining amount label
 * @property remainingAmount - text that represents remaining amount. SAR symbol will be added in front of it
 * @property nextInstallmentLabel - Text to be used for next installment label
 * @property nextInstallmentAmount - Text that represents next installment amount. SAR symbol will be added in front of it
 * @property onChevronPress - Optional callback to handle chevron icon press
 * @property overrideStyles - Optional override styles for the component
 * @property loading - Optional loading state for the component
 */

export const FinanceCarousel: FC<FinanceCarouselCardProps> = ({
  totalAmountLabel,
  totalAmount,
  remainingAmountLabel,
  remainingAmount,
  nextInstallmentLabel,
  nextInstallmentAmount,
  onChevronPress,
  overrideStyles,
  loading = false,
}) => {
  const { theme } = useTheme();
  const frame = useFluidWidth();

  const background = useMemo(() => {
    return require("../../assets/images/financeCarousel.png");
  }, []);

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      ...frame.of(313),
      height: actuatedNormalize(132),
      padding: spacingS,
      alignItems: "center",
      backgroundColor: theme.secondarycolor13,
      borderRadius: radiusS,
    },
    inlineContent: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: spacingXXS,
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
      gap: spacingXXS,
    },
    balanceDetails: {
      display: "flex",
      flexDirection: "row",
      gap: spacingS,
    },
    cardsBackground: {
      borderRadius: radiusS,
    },
  });

  return loading ? (
    <BaseCardSkeleton width={frame.span} height={actuatedNormalize(132)} />
  ) : (
    <ImageBackground
      style={[styles.container, overrideStyles]}
      imageStyle={styles.cardsBackground}
      source={background}
    >
      <View style={styles.accountDetails}>
        <View style={styles.balanceWrapper}>
          <Text
            variant="primarycolor4static"
            size={fontSmallMedium}
            overrideStyles={{ flex: 1 }}
          >
            {totalAmountLabel}
          </Text>
          <View style={styles.inlineContent}>
            <SarFont
              size={fontXXLarge}
              lineHeight={lineHeightXXLarge}
              variant="primarycolor4static"
            />
            <Text bold size={fontXXLarge} variant="primarycolor4static">
              {totalAmount}
            </Text>
          </View>
        </View>
        <View style={styles.balanceDetails}>
          <View style={styles.balanceWrapper}>
            <Text variant="primarycolor4static" size={fontXSmall}>
              {remainingAmountLabel}
            </Text>
            <View style={styles.inlineContent}>
              <SarFont
                size={fontMediumLarge}
                lineHeight={lineHeightMediumLarge}
                variant="primarycolor4static"
              />
              <Text size={fontMediumLarge} variant="primarycolor4static">
                {remainingAmount}
              </Text>
            </View>
          </View>
          <View style={styles.balanceWrapper}>
            <Text variant="primarycolor4static" size={fontXSmall}>
              {nextInstallmentLabel}
            </Text>
            <View style={styles.inlineContent}>
              <SarFont
                size={fontMediumLarge}
                lineHeight={lineHeightMediumLarge}
                variant="primarycolor4static"
              />
              <Text size={fontMediumLarge} variant="primarycolor4static">
                {nextInstallmentAmount}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View>
        <ChevronRight
          fill={theme.primarycolor4static}
          onPress={() => onChevronPress}
        />
      </View>
    </ImageBackground>
  );
};
