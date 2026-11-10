import React, { FC, useMemo } from "react";
import {
  I18nManager,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import {
  fontMediumLarge,
  fontSmallMedium,
  fontXSmall,
  fontXXLarge,
  lineHeightXXLarge,
  radiusS,
  spacingS,
  spacingXS,
  spacingXXS,
} from "../../assets/styles/constants/size";
import { useTheme } from "../../context/theme/themeContext";
import i18n from "i18next";
import { LanguageCodes } from "../../localization/languages";
import { Text } from "../text/Text";
import { SarFont } from "../sarFont/SarFont";
import ChevronRight from "../icons/arrows/chevron/ChevronRight";
import ChevronLeft from "../icons/arrows/chevron/ChevronLeft";
import { BaseCardSkeleton } from "./BaseCardSkeleton";
import { useFluidWidth } from "../../assets/styles/utils/responsive";
interface CardCarouselProps {
  type: "platinum" | "premier" | "signature" | "solid";
  cardTitle: string;
  accountNumber: string;
  availableLimitLabel: string;
  availableLimit: string;
  handlePress?: () => void;
  overrideStyles?: any;
  loading?: boolean;
}

/**
 *
 * @property {string} type - card type, can be "platinum", "premier", "signature" or "solid"
 * @property {string} cardTitle - card title
 * @property {string} accountNumber - card account number
 * @property {string} availableLimitLabel - available limit label
 * @property {string} availableLimit - available limit
 * @property {() => void} handlePress - function to be called when card is pressed
 * @property {any} overrideStyles - override styles for the component
 * @property {boolean} loading - loading state for the component
 */
export const CardsCarousel: FC<CardCarouselProps> = ({
  type,
  cardTitle,
  accountNumber,
  availableLimitLabel,
  availableLimit,
  handlePress,
  overrideStyles,
  loading = false,
}) => {
  const { theme } = useTheme();
  const frame = useFluidWidth();
  const isRtl = I18nManager.isRTL;

  const styles = StyleSheet.create({
    container: {
      height: actuatedNormalize(124),
      ...frame.of(246),
      borderRadius: radiusS,
      padding: spacingS,
      backgroundColor: theme.primarycolorstatic,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      gap: spacingXS,
    },
    titleWrapper: {
      display: "flex",
      flexDirection: isRtl ? "row-reverse" : "row",
      gap: spacingXS,
      flex: 0,
    },
    titleWrapperplatinum: {
      justifyContent: "space-between",
    },
    titleWrapperpremier: {
      justifyContent: "space-between",
    },
    titleWrappersignature: {
      justifyContent: "space-between",
      marginRight: isRtl ? 0 : spacingS,
      marginLeft: isRtl ? spacingS : 0,
    },
    titleWrappersolid: {
      justifyContent: "flex-start",
    },
    balanceText: {
      display: "flex",
      flexDirection: "row",
      gap: spacingXXS,
    },
    limitInfoWrapper: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      width: "100%",
      alignItems: isRtl ? "flex-end" : "flex-start",
      paddingVertical: spacingXXS,
    },
    cardsBackground: {
      borderRadius: radiusS,
    },
    cardsBackgroundSolid: {
      backgroundColor: theme.secondarycolor10,
    },
    chevronWrapperRight: {
      position: "absolute",
      right: spacingS,
      top: actuatedNormalize(62 - 12),
    },
    chevronWrapperLeft: {
      position: "absolute",
      left: spacingS,
      top: actuatedNormalize(62 - 12),
    },
  });

  const background = useMemo(() => {
    switch (type) {
      case "platinum":
        return require("../../assets/images/cardsCarouselPlatinum.png");
      case "premier":
        return require("../../assets/images/cardsCarouselPremier.png");
      case "signature":
        return require("../../assets/images/cardsCarouselSignature.png");
      case "solid":
        return require("../../assets/images/cardsCarouselSolid.png");
    }
  }, [type]);

  const card = (
    <ImageBackground
      style={[styles.container, overrideStyles]}
      imageStyle={styles.cardsBackground}
      source={background}
    >
      {handlePress && (
        <View
          style={isRtl ? styles.chevronWrapperLeft : styles.chevronWrapperRight}
        >
          {isRtl ? (
            <ChevronLeft fill={theme.primarycolor4static} />
          ) : (
            <ChevronRight fill={theme.primarycolor4static} />
          )}
        </View>
      )}
      <View
        style={[
          styles.titleWrapper,
          styles[`titleWrapper${type}` as keyof typeof styles],
        ]}
      >
        <View style={{ width: actuatedNormalize(127) }}>
          <Text
            size={fontMediumLarge}
            variant="primarycolor4static"
            numberOfLines={2}
            overrideStyles={{
              paddingHorizontal: 0,
              paddingVertical: 0,
              flex: 1,
            }}
          >
            {cardTitle}
          </Text>
        </View>
        <View>
          <Text variant="primarycolor4static" size={fontXSmall}>
            {accountNumber}
          </Text>
        </View>
      </View>
      <View style={styles.limitInfoWrapper}>
        <Text variant="primarycolor4static" size={fontSmallMedium}>
          {availableLimitLabel}
        </Text>
        <View style={styles.balanceText}>
          <SarFont
            variant="primarycolor4static"
            size={fontXXLarge}
            lineHeight={lineHeightXXLarge}
          />
          <Text bold variant="primarycolor4static" size={fontXXLarge}>
            {availableLimit}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );

  return loading ? <BaseCardSkeleton /> : handlePress ? (
    <TouchableOpacity onPress={handlePress}>{card}</TouchableOpacity>
  ) : (
    card
  );
};
