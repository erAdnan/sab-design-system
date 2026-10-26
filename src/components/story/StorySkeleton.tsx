import React from "react";
import { View } from "react-native";
import { spacingXS } from "../../assets/styles/constants/size";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";

const StorySkeleton = () => {
  return (
    <View
      style={{ gap: spacingXS, alignItems: "center", alignSelf: "flex-start" }}
    >
      <SkeletonBox shape="circle" size="large" />
      <SkeletonBox
        shape="line"
        size="small"
        overrideStyles={{ width: actuatedNormalize(64) }}
      />
    </View>
  );
};

export default StorySkeleton;
