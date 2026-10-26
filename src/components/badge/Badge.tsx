import {
  StyleSheet,
  View,
  Text as TextWrapper,
  StyleProp,
  ViewStyle,
} from "react-native";
import { FC, useMemo } from "react";
import { Size } from "../../assets/styles";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { useTheme } from "../../context/theme/themeContext";
import { badgeSizeMapping, heightM } from "../../assets/styles/constants/size";
import { BadgeSkeleton } from "./BadgeSkeleton";

import fonts from "../../assets/styles/constants/fonts";
export enum BadgeSize {
  xs = "xs",
  small = "small",
  large = "large",
}

export enum BadgeType {
  primary = "primary",
  success = "success",
  warning = "warning",
  neutral = "neutral",
  reverse = "reverse",
}

export interface BadgeProps {
  size?: BadgeSize;
  type?: BadgeType;
  number?: number;
  /** Caps the displayed value, e.g. maxCount={9} renders "9+" for anything above 9 */
  maxCount?: number;
  containerStyle?: StyleProp<ViewStyle>;
  loading?: boolean;
}

/**
 * Badge component to display a circle with a number
 * @property size - Sets the height and width of the component. Default is "small" (Accepts "xs", "small", "large")
 * @property type - Sets the color of the badge. Default is "primary" (Accepts "primary", "success", "warning", "neutral", "reverse")
 * @property number - Number to display inside Badge
 * @property maxCount - Caps the displayed value, e.g. 9 renders "9+" for anything above 9
 * @property containerStyle - Additional styles to apply to the container if needed
 */
export const Badge: FC<BadgeProps> = ({
  size = "small",
  type = BadgeType.primary,
  number,
  maxCount,
  containerStyle,
  loading = false,
}) => {
  const { theme } = useTheme();

  const color = useMemo(() => {
    switch (type) {
      case BadgeType.primary:
        return theme.primarycolor3static;
      case BadgeType.warning:
        return theme.infocolorwawrning;
      case BadgeType.success:
        return theme.secondarycolor10;
      case BadgeType.neutral:
        return theme.primarycolor2_20static;
      case BadgeType.reverse:
        return theme.primarycolor4static;
      default:
        return theme.primarycolor3static;
    }
  }, [type]);

  const textColor = useMemo(() => {
    switch (type) {
      case BadgeType.primary:
        return theme.primarycolor4static;
      case BadgeType.warning:
        return theme.primarycolorstatic;
      case BadgeType.success:
        return theme.primarycolor4static;
      case BadgeType.neutral:
        return theme.primarycolorstatic;
      case BadgeType.reverse:
        return theme.primarycolor3static;
    }
  }, [type]);

  return (
    <View>
      {loading ? (
        <BadgeSkeleton />
      ) : (
        <View
          style={[
            {
              ...styles.numberIconNoColor,
              ...styles[size as BadgeSize],
              backgroundColor: color,
              borderColor: color,
            },
            containerStyle,
          ]}
        >
          <TextWrapper
            style={fonts.withTrueBoldWeight({
              color: textColor,
              fontSize: badgeSizeMapping[size as BadgeSize] / 2,
            })}
          >
            {maxCount !== undefined && number !== undefined && number > maxCount
              ? `${maxCount}+`
              : number}
          </TextWrapper>
        </View>
      )}
    </View>
  );
};

/*
 * Styles to use for Badge component
 */
const styles = StyleSheet.create({
  large: {
    height: Size.badgeSizeMapping.large,
    width: Size.badgeSizeMapping.large,
  },
  xs: {
    height: Size.badgeSizeMapping.xs,
    width: Size.badgeSizeMapping.xs,
  },
  small: {
    height: Size.badgeSizeMapping.small,
    width: Size.badgeSizeMapping.small,
  },
  numberIconNoColor: {
    borderWidth: 1,
    borderRadius: actuatedNormalize(50),
    height: heightM,
    width: actuatedNormalize(25),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
