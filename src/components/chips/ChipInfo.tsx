import React, { FC, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "../text/Text";
import { useTheme } from "../../context/theme/themeContext";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import {
  fontXXSmall,
  lineHeightXXSmall,
} from "../../assets/styles/constants/size";

export type ChipInfoVariant =
  | "success"
  | "warning"
  | "error"
  | "informative"
  | "neutral";

export interface ChipInfoProps {
  variant?: ChipInfoVariant;
  label?: string;
  overrideStyles?: object;
  overrideLabelStyles?: object;
}

const VARIANT_TEXT_COLOR: Record<ChipInfoVariant, string> = {
  success: "stylessecondarycolor6",
  warning: "secondarycolor9",
  error: "primarycolor3",
  informative: "ragneutral",
  neutral: "primarytextcolor2",
};

/**
 * Compact status chip with semantic color variants (no icon).
 */
export const ChipInfo: FC<ChipInfoProps> = ({
  variant = "neutral",
  label = "Label",
  overrideStyles,
  overrideLabelStyles,
}) => {
  const { theme } = useTheme();

  const variantStyles = useMemo(() => {
    switch (variant) {
      case "success":
        return {
          borderColor: theme.greentint,
          backgroundColor: theme.tintgreenshade,
        };
      case "warning":
        return {
          borderColor: theme.ambertint,
          backgroundColor: theme.tintambershade,
        };
      case "error":
        return {
          borderColor: theme.strokecolor3tint,
          backgroundColor: theme.tintredshade,
        };
      case "informative":
        return {
          borderColor: theme.neutraltint,
          backgroundColor: theme.tintneutralshade,
        };
      case "neutral":
        return {
          borderColor: theme.primarycolor2,
          backgroundColor: theme.extrasverycolor7,
        };
    }
  }, [variant, theme]);

  return (
    <View style={[styles.container, variantStyles, overrideStyles]}>
      <Text
        size={fontXXSmall}
        variant={VARIANT_TEXT_COLOR[variant]}
        overrideStyles={{
          lineHeight: lineHeightXXSmall,
          ...overrideLabelStyles,
        }}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    paddingVertical: actuatedNormalize(2),
    paddingHorizontal: actuatedNormalize(8),
    gap: actuatedNormalize(10),
    borderRadius: actuatedNormalize(100),
    borderWidth: 1,
  },
});
