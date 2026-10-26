import React, { useMemo } from "react";
import { useTheme } from "../../../context/theme/themeContext";
import { StyleSheet, View, ViewStyle } from "react-native";
import { radiusS, spacingS, spacingXS } from "../../../assets/styles/constants/size";
import { actuatedNormalize } from "../../../assets/styles/utils/pixelScaling";
import { SkeletonBox } from "../../skeleton/SkeletonBox";

interface AccountsViewAllSkeletonNewProps {
  type?: "carousel" | "default";
  overrideStyles?: ViewStyle;
}

export const AccountsViewAllSkeletonNew: React.FC<
  AccountsViewAllSkeletonNewProps
> = ({ type = "default", overrideStyles }) => {
  const { theme } = useTheme();
  const isCarousel = type === "carousel";

  const styles = StyleSheet.create({
    common: {
      padding: spacingS,
      borderRadius: radiusS,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      backgroundColor: theme.stylesblockbg,
      // Match AccountViewAllNew default card size
      height: actuatedNormalize(150),
      width: isCarousel ? actuatedNormalize(306) : actuatedNormalize(343),
    },
    parallelLines: {
      display: "flex",
      flexDirection: "column",
      gap: spacingXS,
    },
    inlineContent: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });

  const lineWidth = useMemo(
    () => actuatedNormalize(isCarousel ? 180 : 255),
    [isCarousel]
  );

  return (
    <View style={[styles.common, overrideStyles]}>
      <View style={styles.inlineContent}>
        <View style={styles.parallelLines}>
          <SkeletonBox
            shape="line"
            size="small"
            overrideStyles={{ width: lineWidth }}
          />
          <SkeletonBox
            shape="line"
            size="small"
            overrideStyles={{ width: lineWidth }}
          />
        </View>
        <SkeletonBox shape="circle" size="large" />
      </View>
      <View>
        <View style={styles.parallelLines}>
          <SkeletonBox
            shape="line"
            size="medium"
            overrideStyles={{ width: actuatedNormalize(106) }}
          />
        </View>
      </View>
    </View>
  );
};
