import React, { FC, useMemo } from "react";
import { I18nManager, StyleSheet, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import { radiusS, spacingXXS } from "../../assets/styles/constants/size";
import { LanguageCodes } from "../../localization/languages";
import i18n from "i18next";
import { SkeletonBox } from "../skeleton/SkeletonBox";

interface ProgressIndicatorProps {
  progress: number;
  containerColor?: string;
  progressColor?: string;
  loading?: boolean;
}

/**
 * @property {number} progress - Percentage of the indicator to be filled
 * @property {string} containerColor - To override container background color - optional
 * @property {string} progressColor - To override the filled portion background color - optional
 * @property {boolean} loading - To show loading state - optional
 */

export const ProgressIndicator: FC<ProgressIndicatorProps> = ({
  progress,
  containerColor,
  progressColor,
  loading = false,
}) => {
  const { theme } = useTheme();

  const validProgress = useMemo(() => {
    if (isNaN(progress)) return 100;
    if (progress < 0) return 0;
    if (progress > 100) return 100;
    return progress;
  }, [progress]);

  const  emptyProgressColor = useMemo(() => {
    if (isNaN(progress)) return theme.primarycolor2_50;
    return progressColor || theme.primarycolor3static;
  }, [progress]);

  const trackColor = containerColor || theme.stylescolor7;
  const fillColor = emptyProgressColor || theme.primarycolor3static;

  const styles = StyleSheet.create({
    progressBarContainer: {
      backgroundColor: trackColor,
      height: spacingXXS,
      display: "flex",
      flexDirection: "row",
      borderRadius: radiusS,
      width: "100%",
      alignSelf: "stretch",
      overflow: "hidden",
    },
    progress: {
      width: `${validProgress}%`,
      backgroundColor: fillColor,
      height: spacingXXS,
      borderRadius: radiusS,
    },
  });
  return loading ? (
    <SkeletonBox shape="line" size="small" overrideStyles={{ width: "100%" }} />
  ) : (
    <View style={styles.progressBarContainer}>
      <View style={styles.progress} />
    </View>
  );
};