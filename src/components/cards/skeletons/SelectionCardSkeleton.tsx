import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { radiusS, spacingXS } from "../../../assets/styles/constants/size";
import { actuatedNormalize } from "../../../assets/styles/utils/pixelScaling";
import { SkeletonBox } from "../../skeleton/SkeletonBox";

const PADDING_TOP = actuatedNormalize(6);
const PADDING_BOTTOM = actuatedNormalize(16);
const CARD_WIDTH = actuatedNormalize(100);
const IMAGE_HEIGHT = actuatedNormalize(80);

export const SelectionCardSkeleton: FC = () => {
  return (
    <View style={[styles.container, { width: CARD_WIDTH }]}>
      <View style={[styles.imageContainer, { width: CARD_WIDTH, height: IMAGE_HEIGHT }]}>
        <SkeletonBox
          shape="square"
          size="large"
          overrideStyles={[styles.imageSkeleton, { width: CARD_WIDTH, height: IMAGE_HEIGHT }]}
        />
      </View>
      <SkeletonBox
        shape="line"
        size="small"
        overrideStyles={styles.titleSkeleton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    paddingTop: PADDING_TOP,
    paddingBottom: PADDING_BOTTOM,
    paddingHorizontal: 0,
    justifyContent: "center",
    borderRadius: radiusS,
    gap: spacingXS,
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: radiusS,
    overflow: "hidden",
  },
  imageSkeleton: {
    borderRadius: radiusS,
  },
  titleSkeleton: {
    width: CARD_WIDTH,
    height: actuatedNormalize(11),
    alignSelf: "center",
  },
});
