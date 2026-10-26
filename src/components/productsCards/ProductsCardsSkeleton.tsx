import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { radiusS, spacingL } from "../../assets/styles/constants/size";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { useTheme } from "../../context/theme/themeContext";
import { SkeletonBox } from "../skeleton/SkeletonBox";

interface ProductsCardsSkeletonProps {
  isSmall?: boolean;
}

const ProductsCardsSkeleton: FC<ProductsCardsSkeletonProps> = ({
  isSmall = false,
}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      borderRadius: radiusS,
      backgroundColor: theme.stylesblockbg,
      justifyContent: "flex-end",
      alignItems: "center",
    },
    large: {
      width: actuatedNormalize(164),
      height: actuatedNormalize(164),
    },

    small: {
      width: actuatedNormalize(137),
      height: actuatedNormalize(135),
    },
  });
  return (
    <View style={[isSmall ? styles.small : styles.large, styles.container]}>
      <SkeletonBox
        shape="line"
        size="medium"
        overrideStyles={{ width: "80%", marginBottom: spacingL }}
      />
    </View>
  );
};

export default ProductsCardsSkeleton;
