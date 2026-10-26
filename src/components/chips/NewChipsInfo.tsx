import React, { FC } from "react";
import { StyleSheet, View, ViewStyle, TextStyle } from "react-native";
import { Text } from "../text/Text";
import { useTheme } from "../../context/theme/themeContext";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import {
  fontXXSmall,
  lineHeightXXSmall,
} from "../../assets/styles/constants/size";
import { SkeletonBox } from "../skeleton/SkeletonBox";

export type NewChipsInfoState =
  | "neutral"
  | "success"
  | "error"
  | "warning"
  | "info";

export interface NewChipsInfoProps {
  state?: NewChipsInfoState;
  label?: string;
  overrideStyles?: ViewStyle;
  overrideLabelStyles?: TextStyle;
  loading?: boolean;
}

const STATE_TEXT_COLOR: Record<NewChipsInfoState, string> = {
  success: "ragcolor6",
  error: "primarycolor3static",
  info: "ragneutral",
  warning: "secondarycolor9",
  neutral: "primClr",
};

/**
 * Compact pill chip for status labels.
 * @property state - Semantic color (neutral, success, error, warning, info)
 * @property label - Text shown inside the chip
 * @property overrideStyles - Extra styles for the container
 * @property overrideLabelStyles - Extra styles for the label
 * @property loading - Shows a skeleton instead of the chip
 */
export const NewChipsInfo: FC<NewChipsInfoProps> = ({
  state = "neutral",
  label = "Label",
  overrideStyles,
  overrideLabelStyles,
  loading = false,
}) => {
  const { theme } = useTheme();

  const stateColors = {
    success: {
      backgroundColor: theme.tintstaticgreen,
      borderColor: theme.greentint,
    },
    error: {
      backgroundColor: theme.tintstaticred,
      borderColor: theme.redtint,
    },
    info: {
      backgroundColor: theme.tintstaticneutral,
      borderColor: theme.strokeneutraltint,
    },
    warning: {
      backgroundColor: theme.tintstaticOrange,
      borderColor: theme.ambertint,
    },
    neutral: {
      backgroundColor: theme.styleslightgray,
      borderColor: theme.primarytextcolor_2,
    },
  }[state];

  if (loading) {
    return (
      <SkeletonBox
        shape="square"
        size="small"
        overrideStyles={{
          width: actuatedNormalize(48),
          height: actuatedNormalize(18),
          borderRadius: actuatedNormalize(100),
        }}
      />
    );
  }

  return (
    <View style={[styles.container, stateColors, overrideStyles]}>
      <Text
        size={fontXXSmall}
        variant={STATE_TEXT_COLOR[state]}
        overrideStyles={[styles.label, overrideLabelStyles]}
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
  label: {
    lineHeight: lineHeightXXSmall,
    includeFontPadding: false,
  },
});
