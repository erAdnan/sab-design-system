import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import {
  radiusS,
  spacingS,
  spacingXS,
} from "../../assets/styles/constants/size";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";

export interface ExchangeRateIndicatorSkeletonProps {
  overrideStyles?: any;
}

export const ExchangeRateIndicatorSkeleton: FC<ExchangeRateIndicatorSkeletonProps> = ({
  overrideStyles,
}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      minHeight: actuatedNormalize(68),
      borderRadius: radiusS,
      paddingTop: spacingXS,
      paddingHorizontal: spacingS,
      gap: spacingXS,
      backgroundColor: theme.stylesblockbg,
      overflow: "hidden",
    },
  });

  return (
    <View style={[styles.container, overrideStyles]}>
      <SkeletonBox shape="line" size="small" overrideStyles={{ width: "90%" }} />
      <SkeletonBox shape="line" size="small" overrideStyles={{ width: "60%" }} />
    </View>
  );
};
