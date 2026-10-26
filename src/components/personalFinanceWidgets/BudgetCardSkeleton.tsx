import React from "react";
import { StyleSheet, View } from "react-native";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import {
  radiusS,
  spacingM,
  spacingS,
} from "../../assets/styles/constants/size";
import { useTheme } from "../../context/theme/themeContext";

const BudgetCardSkeleton = () => {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.stylesblockbg,
      padding: spacingS,
      borderRadius: radiusS,
      gap: spacingM,
      flexDirection: "row",
      alignItems: "center",
    },
  });
  return (
    <View style={styles.container}>
      <View style={{ gap: spacingM }}>
        <View style={{ gap: spacingS }}>
          <SkeletonBox shape="line" size="medium" />
          <SkeletonBox shape="line" size="medium" />
        </View>
        <View style={{ gap: spacingS }}>
          <SkeletonBox shape="line" size="small" />
          <SkeletonBox shape="line" size="small" />
        </View>
      </View>
      <SkeletonBox shape="circle" size="large" />
    </View>
  );
};

export default BudgetCardSkeleton;
