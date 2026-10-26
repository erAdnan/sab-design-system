import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "../text/Text";
import { Rag, RagIconType } from "../rag/Rag";
import { Size } from "../../assets/styles";
import { useTheme } from "../../context/theme/themeContext";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import {
  fontMedium,
  fontMediumLarge,
  fontXSmall,
  fontXXSmall,
  lineHeightXXSmall,
  spacingXXS,
} from "../../assets/styles/constants/size";
import { SkeletonBox } from "../skeleton/SkeletonBox";

export interface ChipsInfoProps {
  state?: "neutral" | "success" | "error" | "warning" | "info";
  size?: "small" | "large";
  type?: "default" | "textWithIcon";
  pill?: boolean;
  colorFill?: string;
  label?: string;
  showIcon?: boolean;
  overrideLabelStyles?: any;
  overrideStyles?: any;
  loading?: boolean;
}

/**
 * @property state - Determines the background color and icon to be displayed (default is "neutral")
 * @property size - Use "large" to increase the padding and font in default variant (default is "small")
 * @property type - Changes the chips info variant (default - with background and border, textWithIcon - no background, only icon with label)
 * @property pill - For type="default": fully rounded chip with a 1px border and the smaller XXSmall label in the state's RAG color
 * @property colorFill - use this props to change the icon color.
 * @property label - Text to be displayed inside chips
 * @property showIcon - Boolean to show/hide icon when type is default
 * @property overrideLabelStyles - Styles to be applied on the chip label if color, font size etc. needs to be adjusted for some specific use cases
 * @property overrideStyles - Override styles for the chips container
 * @property loading - Loading state of the chips
 */

export const ChipsInfo: FC<ChipsInfoProps> = ({
  state = "neutral",
  size = "small",
  type = "default",
  pill = false,
  colorFill,
  label = "",
  showIcon = false,
  overrideLabelStyles,
  overrideStyles,
  loading = false,
}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: Size.spacingXXS,
      alignSelf: "flex-start",
    },
    default: {
      borderRadius: Size.radiusXS,
      borderWidth: 0.5,
    },
    pill: {
      borderRadius: actuatedNormalize(100),
      borderWidth: 1,
    },
    small: {
      paddingVertical: actuatedNormalize(2),
      paddingHorizontal: actuatedNormalize(8),
    },
    large: {
      paddingVertical: actuatedNormalize(8),
      paddingHorizontal: actuatedNormalize(8),
    },
    textWithIcon: {},
    neutral: {
      borderColor: theme.primarytextcolor_2,
      backgroundColor: theme.styleslightgray,
    },
    success: {
      borderColor: theme.greentint,
      backgroundColor: theme.tintstaticgreen,
    },
    error: {
      borderColor: theme.strokecolor3tint,
      backgroundColor: theme.tintstaticred,
    },
    warning: {
      borderColor: theme.ambertint,
      backgroundColor: theme.tintstaticOrange,
    },
    info: {
      borderColor: theme.strokeneutraltint,
      backgroundColor: theme.tintstaticneutral,
    },
  });

  const getFontSize = () => {
    if (type === "default") {
      if (pill) return fontXXSmall;
      if (size === "small") {
        return fontMedium;
      }
      if (size === "large") return fontMediumLarge;
    }
    if (type === "textWithIcon") {
      return fontXSmall;
    }
  };

  return loading ? (
    <View>
      {type === "textWithIcon" ? (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: spacingXXS,
          }}
        >
          <SkeletonBox shape="circle" size="small" />
          <SkeletonBox
            shape="line"
            size="small"
            overrideStyles={{ width: actuatedNormalize(40) }}
          />
          <SkeletonBox
            shape="line"
            size="small"
            overrideStyles={{ width: actuatedNormalize(40) }}
          />
        </View>
      ) : (
        <SkeletonBox
          shape="square"
          size="small"
          overrideStyles={{ width: actuatedNormalize(80) }}
        />
      )}
    </View>
  ) : (
    <View
      style={[
        styles.container,
        styles[type],
        type === "default" && { ...styles[state], ...styles[size] },
        type === "default" && pill && styles.pill,
        overrideStyles,
      ]}
    >
      {(showIcon || type === "textWithIcon") && state !== "neutral" && (
        <Rag
          type={RagIconType[state]}
          size={type === "textWithIcon" ? "small" : size}
          colorFill={colorFill}
        />
      )}
      <Text
        size={getFontSize()}
        variant={pill && type === "default" && state === "success" ? "ragcolor6" : state === "neutral" ? "primarytextcolor" : type === "default" ? "primarycolorstatic": "primarytextcolor"}
        overrideStyles={[pill && { lineHeight: lineHeightXXSmall }, overrideLabelStyles]}
      >
        {label}
      </Text>
    </View>
  );
};
