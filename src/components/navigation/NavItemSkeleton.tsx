import React from "react";
import { View } from "react-native";
import { spacingXS } from "../../assets/styles/constants/size";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";

const NavItemSkeleton = () => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        gap: spacingXS,
        alignItems: "center",
      }}
    >
      <SkeletonBox shape="square" size="medium" />
      <SkeletonBox
        shape="line"
        size="small"
        overrideStyles={{ width: actuatedNormalize(58) }}
      />
    </View>
  );
};

export default NavItemSkeleton;
