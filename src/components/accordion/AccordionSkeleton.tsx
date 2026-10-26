import React from "react";
import { SkeletonBox } from "../skeleton/SkeletonBox";

export const AccordionSkeleton = () => {
  return (
    <SkeletonBox
      shape="line"
      size="extralarge"
      overrideStyles={{ width: "100%" }}
    />
  );
};
