import React, { FC } from "react";
import { SkeletonBox } from "../skeleton/SkeletonBox";

interface ButtonSkeletonProps {
  height?: number;
  width?: number | string;
  overrideStyles?: any;
}
/**
 * @property height - Determines height of button, use when you need to override default size
 * @property width - Determines width of button, use when you need to override default size
 * @property overrideStyles - Overrides all styles
 */
export const ButtonSkeleton: FC<ButtonSkeletonProps> = ({
  height,
  width,
  overrideStyles,
}) => {
  return (
    <SkeletonBox
      shape="square"
      size="medium"
      overrideStyles={{ height, width, ...overrideStyles }}
    />
  );
};
