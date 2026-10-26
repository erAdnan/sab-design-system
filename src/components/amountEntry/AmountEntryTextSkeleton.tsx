import React from "react";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";

export const AmountEntryTextSkeleton = () => {
  return (
    <SkeletonBox
      size="large"
      shape="square"
      overrideStyles={{ width: actuatedNormalize(100) }}
    />
  );
};
