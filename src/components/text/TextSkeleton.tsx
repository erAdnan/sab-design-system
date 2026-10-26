import React, { FC } from "react";
import { View } from "react-native";
import { heightL, spacingXS } from "../../assets/styles/constants/size";
import { SkeletonBox } from "../skeleton/SkeletonBox";

interface TextSkeletonProps {
  numOfLines?: number;
  lineHeight?: number;
  width?: number;
  overrideStyles?: any;
}

const TextSkeleton: FC<TextSkeletonProps> = ({
  numOfLines = 1,
  lineHeight,
  width,
  overrideStyles,
}) => {
  return (
    <View style={{ gap: spacingXS, ...overrideStyles }}>
      {Array.from(Array(numOfLines)).map((line, index) => {
        return (
          <SkeletonBox
            key={index}
            shape="line"
            size="small"
            overrideStyles={{ width, height: lineHeight }}
          />
        );
      })}
    </View>
  );
};

export default TextSkeleton;
