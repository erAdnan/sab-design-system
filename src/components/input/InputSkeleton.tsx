import React, { FC } from "react";
import { View } from "react-native";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import { spacingXS } from "../../assets/styles/constants/size";

interface InputSkeletonProps {
  label: boolean;
}

const InputSkeleton: FC<InputSkeletonProps> = ({ label = true }) => {
  return (
    <View style={{ display: "flex", flexDirection: "column", gap: spacingXS }}>
      {label && (
        <SkeletonBox
          shape="line"
          size="small"
          overrideStyles={{ width: "50%" }}
        />
      )}
      <SkeletonBox
        shape="line"
        size="extralarge"
        overrideStyles={{ width: "100%" }}
      />
    </View>
  );
};

export default InputSkeleton;
