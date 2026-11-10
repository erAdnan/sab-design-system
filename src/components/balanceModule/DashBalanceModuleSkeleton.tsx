import React from "react";
import { View } from "react-native";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import {
  radiusS,
  spacingXS,
} from "../../assets/styles/constants/size";
import { useTheme } from "../../context/theme/themeContext";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { useFluidWidth } from "../../assets/styles/utils/responsive";

export const DashBalanceModuleSkeleton = () => {
  const { theme } = useTheme();
  const frame = useFluidWidth();
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: theme.stylesblockbg,
        borderRadius: radiusS,
        ...frame.of(343),
        height: actuatedNormalize(183),
        paddingVertical: actuatedNormalize(12),
      }}
    >
      <View style={{ alignItems: "center", gap: spacingXS }}>
        <View
          style={{ flexDirection: "row", alignItems: "center", gap: spacingXS }}
        >
          <SkeletonBox
            shape="line"
            size="small"
            overrideStyles={{ width: actuatedNormalize(94) }}
          />
          <SkeletonBox shape="square" size="medium" />
        </View>
        <SkeletonBox
          shape="line"
          size="medium"
          overrideStyles={{ width: "100%", maxWidth: "100%", flexShrink: 1 }}
        />
      </View>

      <View style={{ alignItems: "center", flexDirection: "row" }}>
        <View
          style={{ gap: actuatedNormalize(4), width: actuatedNormalize(70) }}
        >
          <SkeletonBox
            shape="square"
            size="medium"
            overrideStyles={{
              width: actuatedNormalize(48),
              height: actuatedNormalize(48),
            }}
          />
          <SkeletonBox
            shape="line"
            size="small"
            overrideStyles={{ width: actuatedNormalize(45) }}
          />
        </View>
        <View
          style={{ gap: actuatedNormalize(4), width: actuatedNormalize(70) }}
        >
          <SkeletonBox
            shape="square"
            size="medium"
            overrideStyles={{
              width: actuatedNormalize(48),
              height: actuatedNormalize(48),
            }}
          />
          <SkeletonBox
            shape="line"
            size="small"
            overrideStyles={{ width: actuatedNormalize(45) }}
          />
        </View>
        <View
          style={{ gap: actuatedNormalize(4), width: actuatedNormalize(70) }}
        >
          <SkeletonBox
            shape="square"
            size="medium"
            overrideStyles={{
              width: actuatedNormalize(48),
              height: actuatedNormalize(48),
            }}
          />
          <SkeletonBox
            shape="line"
            size="small"
            overrideStyles={{ width: actuatedNormalize(45) }}
          />
        </View>
        <View style={{ gap: actuatedNormalize(4) }}>
          <SkeletonBox
            shape="square"
            size="medium"
            overrideStyles={{
              width: actuatedNormalize(48),
              height: actuatedNormalize(48),
            }}
          />
          <SkeletonBox
            shape="line"
            size="small"
            overrideStyles={{ width: actuatedNormalize(45) }}
          />
        </View>
      </View>
    </View>
  );
};
