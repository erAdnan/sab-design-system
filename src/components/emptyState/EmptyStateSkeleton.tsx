import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Size } from "../../assets/styles";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import { spacingS } from "../../assets/styles/constants/size";

interface EmptyStateSkeletonProps {
  showButton?: boolean;
}

export const EmptyStateSkeleton: FC<EmptyStateSkeletonProps> = ({
  showButton = false,
}) => {
  return (
    <View style={styles.container}>
      <SkeletonBox shape="circle" size="large" />
      <View style={{ gap: spacingS }}>
        <SkeletonBox shape="line" size="medium" />
        <SkeletonBox shape="line" size="small" />
        <SkeletonBox shape="line" size="small" />
      </View>

      {showButton && <SkeletonBox shape="line" size="extralarge" />}
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    padding: Size.spacingXL,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: Size.spacingM,
    alignSelf: "stretch",
  },
});
