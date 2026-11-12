import { StyleSheet, View } from "react-native";
import React, { FC } from "react";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import {
  radiusS,
  spacingS,
  spacingXS,
  spacingXXS,
} from "../../assets/styles/constants/size";
import { useTheme } from "../../context/theme/themeContext";
import { SkeletonBox } from "../skeleton/SkeletonBox";

export interface NewProductCardSkeletonProps {
    imageStyles?: any;
    textStyles?: any;
    overrideStyles?: any;
}

export const NewProductCardSkeleton: FC<NewProductCardSkeletonProps> = ({imageStyles, textStyles, overrideStyles}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      height: actuatedNormalize(143),
      width: actuatedNormalize(109),
      backgroundColor: theme.stylesblockbg,
      borderRadius: radiusS,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "space-between",
    },
  });
  return (
    <View style={[styles.container, overrideStyles]}>
      <SkeletonBox
        shape="square"
        size="medium"
        overrideStyles={{
          width: "100%",
          height: actuatedNormalize(64),
          borderRadius: radiusS,
          ...imageStyles
        }}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: spacingXS,   
          paddingVertical: spacingS,
          paddingHorizontal: spacingXXS,
          width: "100%",
        }}
      >
        <SkeletonBox
          shape="line"
          size="medium"
          overrideStyles={{...textStyles }}
        />
      </View>
    </View>
  );
};
