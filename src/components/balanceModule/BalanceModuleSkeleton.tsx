import React from "react";
import { View } from "react-native";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import { spacingM } from "../../assets/styles/constants/size";

export const BalanceModuleSkeleton = () => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: spacingM,
      }}
    >
      <SkeletonBox shape="circle" size="large" />
      <SkeletonBox shape="line" size="extralarge" />
      <SkeletonBox shape="line" size="small" />
      <SkeletonBox shape="line" size="medium" />
    </View>
  );
};
