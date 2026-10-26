import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import {
  radiusS,
  spacingM,
  spacingS,
  widthL,
} from "../../assets/styles/constants/size";
import { useTheme } from "../../context/theme/themeContext";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";

interface CategoryCardSkeletonProps {
  isSmall?: boolean;
}

const CategoryCardSkeleton: FC<CategoryCardSkeletonProps> = ({
  isSmall = false,
}) => {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.stylesblockbg,
      padding: spacingS,
      gap: spacingM,
      alignItems: "flex-start",
      width: isSmall ? actuatedNormalize(164) : "100%",
      borderRadius: radiusS,
    },
  });
  return (
    <View style={styles.container}>
      <View style={{ gap: spacingS, flexDirection: "row" }}>
        <SkeletonBox shape="circle" size="large" />
        {!isSmall && (
          <View style={{ gap: spacingS }}>
            <SkeletonBox shape="line" size="small" />
            <SkeletonBox shape="line" size="small" />
          </View>
        )}
      </View>
      <View style={{ gap: spacingS }}>
        <SkeletonBox
          shape="line"
          size="small"
          overrideStyles={
            isSmall && {
              width: actuatedNormalize(140),
            }
          }
        />
        <SkeletonBox
          shape="line"
          size="small"
          overrideStyles={
            isSmall && {
              width: actuatedNormalize(140),
            }
          }
        />
        {isSmall && (
          <SkeletonBox
            shape="line"
            size="small"
            overrideStyles={
              isSmall && {
                width: actuatedNormalize(140),
              }
            }
          />
        )}
      </View>
    </View>
  );
};

export default CategoryCardSkeleton;
