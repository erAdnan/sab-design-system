import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import {
  radiusL,
  spacingS,
  spacingXS,
} from "../../assets/styles/constants/size";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { SkeletonBox } from "../skeleton/SkeletonBox";

/** List-row skeleton shared by CardsViewAll on the account and card hubs. */
export const CardsViewAllSkeleton: React.FC = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.stylesblockbg }]}>
      <View style={styles.lines}>
        <SkeletonBox
          shape="line"
          size="small"
          overrideStyles={styles.lineLong}
        />
        <SkeletonBox
          shape="line"
          size="small"
          overrideStyles={styles.lineLong}
        />
      </View>
      <SkeletonBox shape="line" size="small" overrideStyles={styles.thumb} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    minHeight: actuatedNormalize(72),
    padding: spacingS,
    borderRadius: radiusL,
    flexDirection: "row",
    alignItems: "center",
    gap: spacingS,
  },
  lines: {
    flex: 1,
    gap: spacingXS,
  },
  lineLong: {
    width: "100%",
    height: actuatedNormalize(8),
  },
  thumb: {
    width: actuatedNormalize(140),
    height: actuatedNormalize(20),
    borderRadius: actuatedNormalize(14),
  },
});
