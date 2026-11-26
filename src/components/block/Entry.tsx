import React, { FC, ReactElement } from "react";
import { I18nManager, StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import {
  fontMediumLarge,
  fontSmall,
  lineHeightMediumLarge,
  lineHeightSmall,
  radiusL,
  spacing1XS,
  spacingS,
  spacingXS,
  widthM,
} from "../../assets/styles/constants/size";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { Text } from "../text/Text";
import fonts from "../../assets/styles/constants/fonts";
import ChevronRight from "../icons/arrows/chevron/ChevronRight";
import ChevronLeft from "../icons/arrows/chevron/ChevronLeft";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import { AutomationProps, getAutomationProps } from "../automationProps";
import { NewCurrency } from "../text/NewCurrency";

export interface BlockEntryProps extends AutomationProps {
  title: string;
  subtitle?: string;
  /** 24x24 leading icon; Figma ships a placeholder, the screen supplies the real one */
  icon?: ReactElement;
  /** "row" is the full-width entry, "tile" is the half-width stacked one */
  variant?: "row" | "tile";
  onPress?: () => void;
  loading?: boolean;
  overrideStyles?: any;
  chevronIcon?: ReactElement;
}

/**
 * @property title - Main line of the entry
 * @property subtitle - Optional second line
 * @property icon - 24x24 leading icon, supplied by the screen (Figma uses a placeholder)
 * @property variant - "row" for the full-width entry, "tile" for the half-width stacked one
 * @property onPress - Callback for pressing the entry
 * @property loading - Boolean for showing the skeleton
 * @property overrideStyles - Optional styles to override the container styles
 */

export const Entry: FC<BlockEntryProps> = ({
  title,
  subtitle,
  icon,
  variant = "row",
  onPress,
  loading = false,
  overrideStyles,
  accessibilityLabel,
  testID,
  chevronIcon,
}) => {
  const { theme } = useTheme();
  const isRtl = I18nManager.isRTL;
  const isTile = variant === "tile";

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.stylesblockbg,
      borderRadius: radiusL,
      gap: spacingS,
    },
    // Figma block.entry: Type=List 343×60, Type=Tile 167.5×156 (two tiles = 343 with an 8 gap).
    row: {
      width: actuatedNormalize(343),
      minHeight: actuatedNormalize(60),
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: spacing1XS,
      paddingHorizontal: spacingS,
    },
    tile: {
      width: actuatedNormalize(167.5),
      minHeight: actuatedNormalize(156),
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "space-between",
      paddingVertical: spacingXS,
      paddingHorizontal: spacing1XS,
    },
    textContent: {
      flexDirection: "column",
      alignItems: "flex-start",
      flexShrink: 1,
      ...(isTile ? { width: "100%" } : { flex: 1 }),
    },
    title: {
      fontFamily: fonts.HSBC_Medium,
      lineHeight: lineHeightMediumLarge,
      textAlign:  "left",
    },
    subtitle: {
      lineHeight: lineHeightSmall,
      textAlign:  "left",
    },
    chevron: {
      ...(isTile && { alignSelf: "flex-end" }),
    },
    iconContainer: {
      width: actuatedNormalize(32),
      height: actuatedNormalize(32),
      alignItems: "center",
      justifyContent: "center",
    },
  });

  const chevronColor = isTile ? theme.primarycolor : theme.primarycolor2_100static;

  const chevron = isRtl ? (
    <ChevronLeft width={widthM} height={widthM} fill={chevronColor} />
  ) : (
    <ChevronRight width={widthM} height={widthM} fill={chevronColor} />
  );

  return loading ? (
    <View style={[styles.container, isTile ? styles.tile : styles.row, overrideStyles]}>
      <SkeletonBox shape="circle" size="small" />
      <SkeletonBox shape="line" size="medium" overrideStyles={{ width: "60%" }} />
    </View>
  ) : (
    <TouchableOpacity
      style={[styles.container, isTile ? styles.tile : styles.row, overrideStyles]}
      onPress={() => onPress && onPress()}
      disabled={!onPress}
      {...getAutomationProps(testID, accessibilityLabel, title)}
    >
      {!isTile && (icon ? <View style={styles.iconContainer}>{icon}</View> : null)}
      <View style={styles.textContent}>
      {isTile && (icon ? <View style={styles.iconContainer}>{icon}</View> : null)}
        <Text size={fontMediumLarge} variant="primarytextcolor" overrideStyles={StyleSheet.flatten([styles.title, { marginTop: isTile ? spacingXS : 0 }])}>
          {title}
        </Text>
        {subtitle && (
          <NewCurrency size={fontSmall} variant="primarytextcolor2" textstyle={styles.subtitle} text={subtitle} />
        )}
      </View>
      <View style={styles.chevron}>{chevronIcon ?? chevron}</View>
    </TouchableOpacity>
  );
};

export default Entry;
