import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import {
  radiusL,
  spacingS,
  spacingXS,
} from "../../assets/styles/constants/size";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { SkeletonBox } from "../skeleton/SkeletonBox";

/** Hub carousel card from Accounts / Cards lazy-loading frames: 150 tall, 16 padding, 16 radius. */
const CARD_WIDTH = actuatedNormalize(306);
const CARD_HEIGHT = actuatedNormalize(150);

type CardCarouselSkeletonProps = {
  overrideStyles?: StyleProp<ViewStyle>;
};

export const CardCarouselSkeleton: React.FC<CardCarouselSkeletonProps> = ({
  overrideStyles,
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.stylesblockbg },
        overrideStyles,
      ]}
    >
      <View style={styles.content}>
        <View style={styles.topGroup}>
          <View style={styles.topRow}>
            <SkeletonBox
              shape="line"
              size="small"
              overrideStyles={styles.longLine}
            />
            <SkeletonBox
              shape="line"
              size="small"
              overrideStyles={styles.pill}
            />
          </View>
          <SkeletonBox
            shape="line"
            size="small"
            overrideStyles={styles.midLine}
          />
        </View>
        <SkeletonBox
          shape="line"
          size="small"
          overrideStyles={styles.bottomLine}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    minWidth: CARD_WIDTH,
    padding: spacingS,
    borderRadius: radiusL,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  content: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
  },
  topGroup: {
    width: "100%",
    gap: spacingXS,
  },
  topRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  longLine: {
    width: actuatedNormalize(180),
    height: actuatedNormalize(8),
  },
  midLine: {
    width: actuatedNormalize(160),
    height: actuatedNormalize(8),
  },
  bottomLine: {
    width: actuatedNormalize(180),
    height: actuatedNormalize(8),
  },
  pill: {
    width: actuatedNormalize(40),
    height: actuatedNormalize(16),
    borderRadius: actuatedNormalize(8),
  },
});
