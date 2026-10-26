import React, { FC } from "react";
import { useTheme } from "../../context/theme/themeContext";
import { StyleSheet, View } from "react-native";
import {
  fontMediumLarge,
  fontSmallMedium,
  fontXSmall,
  lineHeightMediumLarge,
  radiusS,
  spacingS,
  spacingXS,
  spacingXXS,
} from "../../assets/styles/constants/size";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { Text } from "../text/Text";
import { SarFont } from "../sarFont/SarFont";

interface FinanceLoansCarouselProps {
  cardLabel: string;
  availableLimitLabel: string;
  amount: string;
}

/**
 *
 * @property {string} cardLabel - Text for the main label
 * @property {string} availableLimitLabel - Text for the available limit / amount label
 * @property {string} amount - Text for available limit / amount, sar symbol will be added automatically
 */

const FinanceLoansCarousel: FC<FinanceLoansCarouselProps> = ({
  cardLabel,
  availableLimitLabel,
  amount,
}) => {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      borderRadius: radiusS,
      width: actuatedNormalize(315),
    },
    cardContent: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: spacingXXS,
      paddingHorizontal: spacingXS,
      paddingVertical: spacingS,
    },
    top: {
      backgroundColor: theme.complimentaryprimarycolor3_3,
      borderTopRightRadius: radiusS,
      borderTopLeftRadius: radiusS,
    },
    bottom: {
      backgroundColor: theme.stylesblockbg,
      borderBottomLeftRadius: radiusS,
      borderBottomRightRadius: radiusS,
    },
    amountWrapper: {
      display: "flex",
      flexDirection: "row",
      gap: spacingXXS,
    },
  });
  return (
    <View style={styles.container}>
      <View style={[styles.cardContent, styles.top]}>
        <Text size={fontSmallMedium} variant="primarycolor4static">
          {cardLabel}
        </Text>
      </View>
      <View style={[styles.cardContent, styles.bottom]}>
        <Text size={fontXSmall} variant="primarytextcolor2">
          {availableLimitLabel}
        </Text>
        <View style={styles.amountWrapper}>
          <SarFont size={fontMediumLarge} lineHeight={lineHeightMediumLarge} />
          <Text size={fontMediumLarge} bold>
            {amount}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default FinanceLoansCarousel;
