import React, { FC } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { fontMedium, radiusL, spacingS, spacingXS } from "../../assets/styles/constants/size";
import { Text } from "../text/Text";
import Add from "../icons/functionals/Add";
import { SkeletonBox } from "../skeleton/SkeletonBox";

interface BlockApplyProps {
  label?: string;
  onBlockPress: () => void;
  loading?: boolean;
  overrideStyles?: any;
}

/**
 * @property label - Optional string if text needs to be changed, default is "New"
 * @property onBlockPress - Optional callback for press event on the block
 * @property loading - boolean for showing the skeleton
 * @property overrideStyles - Optional styles to override the default styles of the component.
 */

export const Apply: FC<BlockApplyProps> = ({
  label = "New",
  onBlockPress,
  loading = false,
  overrideStyles,
}) => {
  const { theme } = useTheme();

  return loading ? (
    <View
      style={{
        width: actuatedNormalize(118),
        height: actuatedNormalize(100),
        backgroundColor: theme.stylesblockbg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: spacingS,
        gap: spacingXS,
        borderRadius: radiusL,
      }}>
      <SkeletonBox shape="circle" size="small" />
      <SkeletonBox shape="line" size="medium" overrideStyles={{ width: "80%" }} />
    </View>
  ) : (
    <TouchableOpacity
      style={[{
        ...styles.blockWrapper,
        backgroundColor: theme.stylesblockbglight,
      },overrideStyles]}
      onPress={() => onBlockPress && onBlockPress()}
    >
      <Add fill={theme.primarycolor3} />
      <Text size={fontMedium}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  blockWrapper: {
    width: actuatedNormalize(118),
    height: actuatedNormalize(100),
    borderRadius: radiusL,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: spacingXS,
  },
});
