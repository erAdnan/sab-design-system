import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import { radiusS, spacingS } from "../../assets/styles/constants/size";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";

const BarChartSkeleton = () => {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.stylesblockbg,
      padding: spacingS,
      gap: spacingS,
      borderRadius: radiusS,
    },
  });
  return (
    <View style={styles.container}>
      <SkeletonBox shape="line" size="medium" />
      <SkeletonBox shape="line" size="small" />
      <SkeletonBox
        shape="line"
        size="small"
        overrideStyles={{ width: "100%", height: actuatedNormalize(100) }}
      />
    </View>
  );
};

export default BarChartSkeleton;
