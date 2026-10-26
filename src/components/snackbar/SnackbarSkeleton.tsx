import React, { FC } from "react";
import { useTheme } from "../../context/theme/themeContext";
import { StyleSheet, View } from "react-native";
import {
  radiusS,
  spacingXS,
  spacingXXS,
} from "../../assets/styles/constants/size";
import { SkeletonBox } from "../skeleton/SkeletonBox";

interface SnackbarSkeletonProps {
  isToast?: boolean;
}

const SnackbarSkeleton: FC<SnackbarSkeletonProps> = ({ isToast = false }) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      borderRadius: radiusS,
      backgroundColor: theme.stylesblockbg,
      padding: spacingXS,
      display: "flex",
      flexDirection: "row",
      gap: spacingXS,
      alignItems: "center",
    },
    lines: {
      display: "flex",
      flexDirection: "column",
      gap: spacingXXS,
    },
  });
  return (
    <View style={styles.container}>
      <SkeletonBox shape="circle" size="small" />
      <View style={styles.lines}>
        {isToast && <SkeletonBox shape="line" size="medium" />}
        <SkeletonBox shape="line" size="small" />
        <SkeletonBox shape="line" size="small" />
      </View>
      <SkeletonBox shape="circle" size="small" />
    </View>
  );
};

export default SnackbarSkeleton;
