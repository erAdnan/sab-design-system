import React from "react";
import { View } from "react-native";
import { spacingS } from "../../assets/styles/constants/size";
import { SkeletonBox } from "../skeleton/SkeletonBox";

const AvatarSkeleton = () => {
  return (
    <View style={{ gap: spacingS }}>
      <SkeletonBox shape="circle" size="large" />
    </View>
  );
};

export default AvatarSkeleton;
