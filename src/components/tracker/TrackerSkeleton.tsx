import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import { spacingS, spacingXS } from "../../assets/styles/constants/size";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";

interface TrackerSkeletonProps {
  content?: boolean;
}

const TrackerSkeleton: FC<TrackerSkeletonProps> = ({ content = false }) => {
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", gap: spacingXS }}>
        <SkeletonBox shape="circle" size="small" />
        <View style={{ gap: spacingS, alignItems: "center" }}>
          <SkeletonBox
            shape="line"
            size="small"
            overrideStyles={{ width: actuatedNormalize(130) }}
          />
          <SkeletonBox
            shape="line"
            size="small"
            overrideStyles={{ width: actuatedNormalize(130) }}
          />
        </View>
      </View>
      {content && (
        <View style={{ gap: spacingS }}>
          <SkeletonBox
            shape="line"
            size="small"
            overrideStyles={{ width: actuatedNormalize(130) }}
          />
          <SkeletonBox
            shape="line"
            size="small"
            overrideStyles={{ width: actuatedNormalize(130) }}
          />
        </View>
      )}
    </View>
  );
};

export default TrackerSkeleton;
