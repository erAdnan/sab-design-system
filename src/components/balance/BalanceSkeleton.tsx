import React, { FC } from "react";
import { View } from "react-native";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import { spacingS, spacingXS } from "../../assets/styles/constants/size";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";

interface BalanceSkeletonProps {
  withStatus?: boolean;
}

export const BalanceSkeleton: FC<BalanceSkeletonProps> = ({ withStatus }) => {
  return (
    <View
      style={{
        gap: spacingXS,
        alignItems: "flex-end",
        alignSelf: "flex-start",
      }}
    >
      <SkeletonBox
        shape="line"
        size="medium"
        overrideStyles={{ width: actuatedNormalize(100) }}
      />
      <SkeletonBox
        shape="line"
        size="medium"
        overrideStyles={{ width: actuatedNormalize(80) }}
      />
      {withStatus && (
        <SkeletonBox
          shape="line"
          size="small"
          overrideStyles={{ width: actuatedNormalize(60) }}
        />
      )}
    </View>
  );
};
