import React, { FC, useMemo } from "react";
import i18n from "i18next";
import { LanguageCodes } from "../../localization/languages";
import { useTheme } from "../../context/theme/themeContext";
import { I18nManager, StyleSheet, View } from "react-native";
import { Text } from "../text/Text";
import {
  fontMedium,
  radiusS,
  spacingXS,
  spacingXXS,
} from "../../assets/styles/constants/size";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import PasswordStrengthSkeleton from "./PasswordStrengthSkeleton";

interface PasswordStrengthProps {
  label: string;
  strength: "normal" | "weak" | "strong";
  loading?: boolean;
}

/**
 * @property label - Text to be displayed above the indicator
 * @property strength - Determines the part of the indicator to be highlighted, default is "weak"
 */

export const PasswordStrength: FC<PasswordStrengthProps> = ({
  label,
  strength = "weak",
  loading = false,
}) => {
  const { theme } = useTheme();
  const isRtl = I18nManager.isRTL;

  const isWeak = useMemo(() => strength === "weak", [strength]);
  const isStrong = useMemo(() => strength === "strong", [strength]);

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: isRtl ? "flex-end" : "flex-start",
      gap: spacingXXS,
      width: "100%",
      alignItems: "flex-start",
    },
    strengthBars: {
      display: "flex",
      flexDirection: isRtl ? "row-reverse" : "row",
      gap: spacingXS,
    },
    strengthBar: {
      height: actuatedNormalize(4),
      borderRadius: radiusS,
      flex: 1,
    },
  });
  return loading ? (
    <PasswordStrengthSkeleton />
  ) : (
    <View style={styles.container}>
      <Text size={fontMedium}>{label}</Text>
      <View style={styles.strengthBars}>
        <View
          style={{
            ...styles.strengthBar,
            backgroundColor: theme.ragcolor3,
          }}
        ></View>
        <View
          style={{
            ...styles.strengthBar,
            backgroundColor: isWeak ? theme.stylescolor7 : theme.ragamber,
          }}
        ></View>
        <View
          style={{
            ...styles.strengthBar,
            backgroundColor: isStrong
              ? theme.secondarycolor10
              : theme.stylescolor7,
          }}
        ></View>
      </View>
    </View>
  );
};
