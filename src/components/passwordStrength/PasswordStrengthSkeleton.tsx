import React from "react";
import { View } from "react-native";
import { spacingXS } from "../../assets/styles/constants/size";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";

const PasswordStrengthSkeleton = () => {
  return (
    <View style={{ display: "flex", flexDirection: "column", gap: spacingXS }}>
      <SkeletonBox
        shape="line"
        size="small"
        overrideStyles={{ width: actuatedNormalize(80) }}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: spacingXS,
          width: "100%",
        }}
      >
        <SkeletonBox shape="line" size="small" overrideStyles={{ flex: 1 }} />
        <SkeletonBox shape="line" size="small" overrideStyles={{ flex: 1 }} />
        <SkeletonBox shape="line" size="small" overrideStyles={{ flex: 1 }} />
      </View>
    </View>
  );
};

export default PasswordStrengthSkeleton;
