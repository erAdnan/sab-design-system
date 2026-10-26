import { FC, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import {
  radiusS,
  spacingM,
  spacingS,
  spacingXS,
} from "../../assets/styles/constants/size";
import { useTheme } from "../../context/theme/themeContext";
import React from "react";
import { SkeletonBox } from "../skeleton/SkeletonBox";

export interface WidgetSkeletonProps {
  extraContent?: boolean;
  size?: "small" | "medium" | "large";
}

export const WidgetSkeleton: FC<WidgetSkeletonProps> = ({
  extraContent = false,
  size = "small",
}) => {
  const { theme } = useTheme();

  const isMedium = useMemo(() => size === "medium", [size]);
  const isLarge = useMemo(() => size === "large", [size]);

  const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: isLarge ? "center" : "flex-end",
      borderRadius: radiusS,
      backgroundColor: theme.stylesblockbg,
    },
    textWrapper: {
      paddingHorizontal: spacingS,
      gap: spacingS,
      alignItems: isLarge ? "center" : "flex-end",
      marginBottom: isLarge ? actuatedNormalize(60) : 0,
    },
  });

  const widgetSize = StyleSheet.create({
    small: {
      width: actuatedNormalize(164),
      height: actuatedNormalize(160),
      paddingVertical: spacingS,
    },
    medium: {
      width: actuatedNormalize(164),
      height: actuatedNormalize(232),
      paddingVertical: spacingM,
    },
    large: {
      width: actuatedNormalize(164),
      height: actuatedNormalize(406),
      paddingVertical: spacingM,
    },
  });

  const boxWidth = actuatedNormalize(widgetSize[size].width - actuatedNormalize(40));

  return (
    <View style={[styles.container, widgetSize[size]]}>
      <View style={styles.textWrapper}>
        <View style={{ gap: spacingXS }}>
          <SkeletonBox
            shape="line"
            size="large"
            overrideStyles={{
              width: boxWidth,
            }}
          />
          {(isMedium || isLarge) && (
            <SkeletonBox
              shape="line"
              size="large"
              overrideStyles={{
                width: boxWidth,
              }}
            />
          )}
        </View>
        <View style={{ gap: spacingXS }}>
          <SkeletonBox
            shape="line"
            size="medium"
            overrideStyles={{
              width: boxWidth,
            }}
          />
          <SkeletonBox
            shape="line"
            size="medium"
            overrideStyles={{
              width: boxWidth,
            }}
          />
        </View>

        {extraContent && isLarge && (
          <View style={{ gap: spacingXS }}>
            <SkeletonBox
              shape="line"
              size="small"
              overrideStyles={{
                width: boxWidth,
              }}
            />
            <SkeletonBox
              shape="line"
              size="small"
              overrideStyles={{
                width: boxWidth,
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};
