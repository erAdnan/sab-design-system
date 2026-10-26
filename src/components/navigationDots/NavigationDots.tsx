import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { useTheme } from "../../context/theme/themeContext";
import { SkeletonBox } from "../skeleton/SkeletonBox";
interface NavigationDotsProps {
  numberOfDots: number;
  activeDotIndex: number;
  loading?: boolean;
  isLite?: boolean;
}

/**
 * @property numberOfDots: Number of dots to be displayed
 * @property activeDotIndex: Index of the active dot
 */
export const NavigationDots: FC<NavigationDotsProps> = ({
  numberOfDots,
  activeDotIndex,
  loading = false,
  isLite = false,
}) => {
  const { theme } = useTheme();
  const MAX_VISIBLE_DOTS = 5;

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: actuatedNormalize(10),
    },
    dot: {
      width: actuatedNormalize(6),
      height: actuatedNormalize(6),
      borderRadius: actuatedNormalize(50),
      backgroundColor: isLite ? theme.primarycolor4static : theme.primarygrayinvert,
    },
    smallDot: {
      width: actuatedNormalize(4),
      height: actuatedNormalize(4),
    },
    activeDot: {
      backgroundColor: theme.primarycolor3static,
    },
  });

  let startIndex = 0;

  if (numberOfDots > MAX_VISIBLE_DOTS) {
    if (activeDotIndex <= 3) {
      startIndex = 0;
    } else if (activeDotIndex >= numberOfDots - 2) {
      startIndex = numberOfDots - MAX_VISIBLE_DOTS;
    } else {
      startIndex = activeDotIndex - 3;
    }
  }

  const visibleDots = Array.from({
    length: Math.min(MAX_VISIBLE_DOTS, numberOfDots),
  }).map((_, i) => startIndex + i);


  return (
    <View style={[styles.container]}>
      {/* {Array.from({ length: numberOfDots }).map((_, index) => {
        const isActive = activeDotIndex - 1 === index;
        const isSmall =
          (index === 0 || index === numberOfDots - 1) && numberOfDots >= 5; */}
           {visibleDots.map((dotIndex, index) => {
        const isActive = dotIndex + 1 === activeDotIndex;

        /**
         * First & last dots become small
         * when there are hidden items outside
         */
        const isSmall =
          (index === 0 && startIndex > 0) ||
          (index === visibleDots.length - 1 &&
            startIndex + MAX_VISIBLE_DOTS < numberOfDots);

        return loading ? (
          <SkeletonBox
          key={dotIndex}
            shape="circle"
            size="small"
            overrideStyles={{
              height: actuatedNormalize(6),
              width: actuatedNormalize(6),
            }}
          />
        ) : (
           <View
            key={dotIndex}
            style={[
              styles.dot,
              isActive && styles.activeDot,
              isSmall && !isActive && styles.smallDot,
            ]}
          />
        );
      })}
    </View>
  );
};
