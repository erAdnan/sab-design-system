import React, { FC } from "react";
import { I18nManager, StyleSheet, View } from "react-native";
import i18n from "i18next";
import { useTheme } from "../../context/theme/themeContext";
import { Text } from "../text/Text";
import {
  fontMedium,
  lineHeightMedium,
  radiusS,
  spacingS,
  spacingXS,
} from "../../assets/styles/constants/size";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { ExchangeRateIndicatorSkeleton } from "./ExchangeRateIndicatorSkeleton";

const stripHeight = actuatedNormalize(4);

export interface ExchangeRateIndicatorProps {
  /** Message to show; defaults to the localized exchange-rate refresh notice */
  text?: string;
  progress?: number;
  loading?: boolean;
  overrideStyles?: any;
}

/**
 * @property text - Message to show, defaults to the localized exchange-rate refresh notice
 * @property progress - Progress of the bottom strip from 0 to 1
 * @property loading - Boolean for showing the skeleton
 * @property overrideStyles - Optional styles to override the container styles
 */

export const ExchangeRateIndicator: FC<ExchangeRateIndicatorProps> = ({
  text,
  progress,
  loading = false,
  overrideStyles,
}) => {
  const { theme } = useTheme();
  const isRtl = I18nManager.isRTL;
  const clampedProgress =
    progress === undefined
      ? undefined
      : Math.min(1, Math.max(0, progress));

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      minHeight: actuatedNormalize(68),
      borderRadius: radiusS,
      paddingTop: spacingXS,
      paddingBottom: spacingXS + stripHeight,
      justifyContent: "center",
      backgroundColor: theme.tintambershade,
      overflow: "hidden",
    },
    text: {
      paddingHorizontal: spacingS,
      lineHeight: lineHeightMedium,
      textAlign: isRtl ? "right" : "left",
      writingDirection: isRtl ? "rtl" : "ltr",
    },
    strip: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      height: stripHeight,
      borderRadius: radiusS,
      backgroundColor: theme.styleslightgray,
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      borderRadius: radiusS,
      backgroundColor: theme.ragamber,
      alignSelf: isRtl ? "flex-end" : "flex-start",
    },
  });

  return loading ? (
    <ExchangeRateIndicatorSkeleton overrideStyles={overrideStyles} />
  ) : (
    <View style={[styles.container, overrideStyles]}>
      <Text
        size={fontMedium}
        variant="primarytextcolor"
        overrideStyles={styles.text}
      >
        {text ?? i18n.t("exchangeRateIndicator")}
      </Text>
      <View style={styles.strip}>
        {clampedProgress !== undefined && (
          <View
            style={[styles.progressFill, { width: `${clampedProgress * 100}%` }]}
          />
        )}
      </View>
    </View>
  );
};

export default ExchangeRateIndicator;