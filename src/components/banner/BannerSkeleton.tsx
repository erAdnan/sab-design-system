import React, { FC, ReactNode } from "react";
import { View } from "react-native";
import { radiusS } from "../../assets/styles/constants/size";
import { useTheme } from "../../context/theme/themeContext";

interface BannerSkeletonProps {
  width: number;
  height: number;
  children?: ReactNode;
}

const BannerSkeleton: FC<BannerSkeletonProps> = ({
  width,
  height,
  children,
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        width: width,
        height: height,
        borderRadius: radiusS,
        backgroundColor: theme.stylesblockbg,
      }}
    >
      {children}
    </View>
  );
};

export default BannerSkeleton;
