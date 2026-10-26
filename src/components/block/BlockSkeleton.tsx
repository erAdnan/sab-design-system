import React, { FC } from "react";
import { View } from "react-native";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import { spacingXS } from "../../assets/styles/constants/size";

interface BlockSkeletonProps {
  width?: number;
  height?: number;
  isBeneficiary?: boolean;
}

const BlockSkeleton: FC<BlockSkeletonProps> = ({
  width,
  height,
  isBeneficiary = false,
}) => {
  return (
    <View>
      {isBeneficiary ? (
        <View style={{ gap: spacingXS }}>
          <SkeletonBox shape="circle" size="large" />
          <SkeletonBox shape="line" size="medium" overrideStyles={{ width }} />
          <SkeletonBox shape="line" size="small" overrideStyles={{ width }} />
        </View>
      ) : (
        <SkeletonBox
          shape="square"
          size="large"
          overrideStyles={{ height, width }}
        />
      )}
    </View>
  );
};

export default BlockSkeleton;
