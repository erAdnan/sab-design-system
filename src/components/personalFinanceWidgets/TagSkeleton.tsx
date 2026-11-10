import React from "react";
import { StyleSheet, View } from "react-native";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import {
  radiusS,
  spacingM,
  spacingS,
} from "../../assets/styles/constants/size";
import { useTheme } from "../../context/theme/themeContext";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { useFluidWidth } from "../../assets/styles/utils/responsive";

const TagSkeleton = () => {
  const { theme } = useTheme();
  const frame = useFluidWidth();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.stylesblockbg,
      padding: spacingS,
      borderRadius: radiusS,
      gap: spacingS,
      flexDirection: "row",
      alignItems: "center",
      ...frame.of(230),
      height: actuatedNormalize(64),
    },
  });
  return (
    <View style={styles.container}>
      <SkeletonBox shape="square" size="medium" />
      <View style={{ gap: spacingS }}>
        <SkeletonBox
          shape="line"
          size="small"
          overrideStyles={{ width: actuatedNormalize(140) }}
        />
        <SkeletonBox
          shape="line"
          size="small"
          overrideStyles={{ width: actuatedNormalize(140) }}
        />
      </View>
    </View>
  );
};

export default TagSkeleton;
