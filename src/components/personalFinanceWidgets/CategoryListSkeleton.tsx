import React from "react";
import { View } from "react-native";
import { spacingS } from "../../assets/styles/constants/size";
import { SkeletonBox } from "../skeleton/SkeletonBox";

const CategoryListSkeleton = () => {
  return (
    <View style={{ gap: spacingS }}>
      <View
        style={{ gap: spacingS, flexDirection: "row", alignItems: "center" }}
      >
        <SkeletonBox shape="circle" size="large" />
        <SkeletonBox shape="line" size="medium" />
      </View>
      <SkeletonBox
        shape="line"
        size="small"
        overrideStyles={{ width: "100%" }}
      />
    </View>
  );
};

export default CategoryListSkeleton;
