import React, { ReactElement, useMemo } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { BlurView } from "@react-native-community/blur";
import { useTheme } from "../../context/theme/themeContext";
import {
  fontMedium,
  fontXSmall,
  lineHeightMedium,
  lineHeightXSmall,
  radiusL,
  spacingS,
  spacingXS,
} from "../../assets/styles/constants/size";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { Text } from "../text/Text";
import fonts from "../../assets/styles/constants/fonts";
import ChevronEffectUp from "../icons/arrows/chevron/ChevronEffectUp";

interface FloatingButtonProps {
  text?: string;
  icon?: ReactElement;
  onButtonPress?: () => void;
  variant?: "redAccent" | "grayAccent";
}

const BLUR_AMOUNT = 4;

export const FloatingButton: React.FC<FloatingButtonProps> = ({
  text,
  icon,
  onButtonPress,
  variant = "redAccent",
}) => {
  const { theme, isDarkTheme } = useTheme();
  const useBlur = Platform.OS === "ios" || Platform.OS === "android";

  const redStyles = StyleSheet.create({
    container: {
      backgroundColor: theme.primarycolor3static,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: spacingXS,
      height: actuatedNormalize(48),
      shadowColor: theme.primarycolor2_20static,
      shadowOffset: { width: 0, height: actuatedNormalize(4) },
      shadowOpacity: 1,
      shadowRadius: actuatedNormalize(4),
      elevation: 4,
    },
    textButton: {
      paddingHorizontal: spacingS,
      paddingVertical: spacingXS,
      borderRadius: radiusL,
      alignSelf: "flex-start",
      // Figma floating.button (Text + Icon): min-width 128, max-width 343
      minWidth: actuatedNormalize(128),
      maxWidth: actuatedNormalize(343),
    },
    iconButton: {
      width: actuatedNormalize(48),
      borderRadius: actuatedNormalize(48),
    },
  });

  const redIcon = useMemo(
    () =>
      icon
        ? React.cloneElement(icon, {
            fill: theme.primarycolor4static,
            width: actuatedNormalize(24),
            height: actuatedNormalize(24),
          } as never)
        : null,
    [icon, theme]
  );

  if (variant === "grayAccent") {
    const labelVariant = isDarkTheme ? "primarycolor4static" : "primarytextcolor";
    const iconSize = actuatedNormalize(24);

    const leading =
      icon != null ? (
        React.cloneElement(icon, {
          width: (icon.props as { width?: number }).width ?? iconSize,
          height: (icon.props as { height?: number }).height ?? iconSize,
        } as never)
      ) : text ? (
        <ChevronEffectUp width={iconSize} height={iconSize} />
      ) : null;

    return (
      <TouchableOpacity
        activeOpacity={0.88}
        onPress={onButtonPress}
        style={{ alignSelf: "flex-start" }}
        accessibilityRole="button"
        accessibilityLabel={text ?? "Button"}
      >
        <View
          style={{
            borderRadius: radiusL,
            overflow: "hidden",
            position: "relative",
            alignSelf: "flex-start",
          }}
        >
          <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
            {useBlur ? (
              <BlurView
                style={StyleSheet.absoluteFill}
                blurType={isDarkTheme ? "dark" : "light"}
                blurAmount={BLUR_AMOUNT}
                reducedTransparencyFallbackColor={
                  isDarkTheme ? "rgba(45, 45, 45, 0.92)" : "rgba(251, 250, 250, 0.92)"
                }
              />
            ) : (
              <View
                style={[
                  StyleSheet.absoluteFill,
                  {
                    backgroundColor: isDarkTheme
                      ? "rgba(55, 55, 55, 0.92)"
                      : "rgba(230, 230, 230, 0.95)",
                  },
                ]}
              />
            )}
            <View
              style={[StyleSheet.absoluteFill, { backgroundColor: "rgba(251, 250, 250, 0.62)" }]}
            />
            <View
              style={[StyleSheet.absoluteFill, { backgroundColor: "rgba(170, 169, 169, 0.11)" }]}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: spacingXS,
              paddingVertical: spacingXS,
              paddingHorizontal: spacingS,
              zIndex: 1,
            }}
          >
            {leading}
            {text ? (
              <Text
                medium
                size={fontXSmall}
                variant={labelVariant}
                overrideStyles={{
                  lineHeight: lineHeightXSmall,
                  textAlign: "center",
                }}
              >
                {text}
              </Text>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={
        text ? [redStyles.container, redStyles.textButton] : [redStyles.container, redStyles.iconButton]
      }
      onPress={onButtonPress}
      accessibilityRole="button"
      accessibilityLabel={text ?? "Button"}
    >
      {redIcon}
      {text && (
        <Text size={fontMedium} variant="primarycolor4static" overrideStyles={{ fontFamily: fonts.HSBC_Medium, lineHeight: lineHeightMedium }}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};
