import React, { FC } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { useTheme } from "../../context/theme/themeContext";
import {
  spacingXXS,
  spacingXS,
  spacingS,
  fontSmallMedium,
  fontSmall,
  radiusS,
} from "../../assets/styles/constants/size";
import { Text } from "../text/Text";
import LogoNoText from "../icons/sab360/LogoNoText";

interface CardsCarouselUpdatedProps {
  cardName: string;
  accountNumber: string;
}

/**
 *
 * @property {string} cardName - Text for card name
 * @property {string} accountNumber - Text for account number
 */

const CardsCarouselUpdated: FC<CardsCarouselUpdatedProps> = ({
  cardName,
  accountNumber,
}) => {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    container: {
      width: actuatedNormalize(184),
    },
    cardContent: {
      paddingHorizontal: spacingXS,
      paddingVertical: spacingS,
    },
    top: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      borderTopRightRadius: radiusS,
      borderTopLeftRadius: radiusS,
      height: actuatedNormalize(48),
    },
    bottom: {
      backgroundColor: theme.stylesblockbg,
      borderBottomLeftRadius: radiusS,
      borderBottomRightRadius: radiusS,
      borderWidth: actuatedNormalize(2),
      borderColor: theme.stylesblockbg,
    },
  });
  return (
    <ImageBackground
      source={require("../../assets/images/cardBackground.png")}
      style={styles.container}
    >
      <View style={[styles.cardContent, styles.top]}>
        <Text size={fontSmallMedium} variant="primarycolor4static">
          {cardName}
        </Text>
        <LogoNoText
          width={actuatedNormalize(24)}
          height={actuatedNormalize(24)}
        />
      </View>
      <View style={[styles.cardContent, styles.bottom]}>
        <Text size={fontSmall}>{accountNumber}</Text>
      </View>
    </ImageBackground>
  );
};

export default CardsCarouselUpdated;
