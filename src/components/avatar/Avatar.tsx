import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import React, { FC, ReactElement, useMemo } from "react";
import { useTheme } from "../../context/theme/themeContext";
import { Text } from "../text/Text";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import {
  fontMediumLarge,
  fontXLarge,
  heightM,
  heightL,
  heightXl,
  spacingL,
  spacingXL,
  widthM,
  widthL,
  widthXl,
  fontXSmall,
} from "../../assets/styles/constants/size";
import AvatarSkeleton from "./AvatarSkeleton";

export interface AvatarProps {
  img?: string;
  initials?: string;
  statusIcon?: ReactElement;
  size?: "medium" | "large" | "small";
  icon?: ReactElement;
  logoSource?: ImageSourcePropType | string;
  loading?: boolean;
  overrideStyles?: any;
  disableStatusWrapper?: boolean;
}

/**
 * Avatar Component
 * @property img - The URL to the image to be displayed inside avatar (e.g. profile picture)
 * @property initials - User's initials that will be displayed instead of profile picture
 * @property statusIcon - The content of the circle displayed in the bottom right
 * @property size - Determines the height and width of the avatar, can be 'medium' or 'large' or 'small'
 * @property icon - The icon to be displayed inside avatar (for usages other than beneficiary)
 * @property logoSource - Image source for "logo with icon" variant; use with icon to show logo in main circle and icon in small bottom-right badge
 * @property loading - If true, the avatar will be displayed as a skeleton
 * @property overrideStyles - Styles to override the default styles of the avatar
 * @property disableStatusWrapper - use this props true if you dont want to use any default border behaviour of the status icon pass this disableStatusWrapper as true
 */

export const Avatar: FC<AvatarProps> = ({
  img,
  initials,
  statusIcon,
  size = "medium",  // Update default size to "medium"
  icon,
  logoSource,
  loading = false,
  overrideStyles,
  disableStatusWrapper
}) => {
  const { theme, isDarkTheme } = useTheme();
  const isMediumSize = size === "medium"; // Rename the variable to match the new default
  const isLogoWithIcon = Boolean(logoSource && icon);

  const initialsTrim = useMemo(() => {
    if (!initials) {
      return null;
    }
    if (initials.length >= 2) {
      return initials.slice(0, 2).toUpperCase();
    }
    return initials.toUpperCase();
  }, [initials]);

  const dynamicIcon = icon
    ? React.cloneElement(icon, {
        width: size === "small"
        ? actuatedNormalize(16) :isMediumSize ? widthM : widthL,
        height: size === "small"
        ? actuatedNormalize(16) : isMediumSize ? heightM : heightL,
        fill: theme.primarycolor3,
      })
    : null;

  const logoWithIconBadgeIcon = icon
    ? React.cloneElement(icon, {
        width: actuatedNormalize(24),
        height: actuatedNormalize(24),
        fill: theme.primarycolor3,
      })
    : null;

  if (loading) {
    return <AvatarSkeleton />;
  }

  if (isLogoWithIcon) {
    const containerSize = actuatedNormalize(84);
    const bigSize = actuatedNormalize(72);
    const logoSize = actuatedNormalize(48);
    const smallSize = actuatedNormalize(36);
    const bigPadding = actuatedNormalize(24);
    const smallPadding = actuatedNormalize(6);
    return (
      <View style={[styles.avatar, { width: containerSize, height: containerSize }, overrideStyles]}>
        <View
          style={{
            width: bigSize,
            height: bigSize,
            padding: bigPadding,
            justifyContent: "center",
            alignItems: "center",
            flexShrink: 0,
            borderRadius: actuatedNormalize(150),
            borderWidth: 1.5,
            borderColor: theme.primarycolor2_20,
            backgroundColor: theme.primarycolor4static,
          }}
        >
          <Image
            source={typeof logoSource === "string" ? { uri: logoSource } : logoSource}
            style={{ width: logoSize, height: logoSize }}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            position: "absolute",
            right: -smallPadding,
            bottom: -smallPadding,
            width: smallSize,
            height: smallSize,
            padding: smallPadding,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: actuatedNormalize(150),
            backgroundColor: theme.tintredshade,
          }}
        >
          {logoWithIconBadgeIcon}
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        ...styles.avatar,
        ...styles[size],
        backgroundColor:
        initialsTrim || icon ? theme["primarycolor3tonal"] : "",
        borderRadius: (styles[size].height || 0) / 2, // make it circular
        justifyContent: initialsTrim || icon ? "center" : "flex-start",
          alignItems: "center",
        ...overrideStyles
      }}
    >
      {img && <Image source={{ uri: img }} style={styles.img} />}
      {initialsTrim && (
        <Text
          variant="primarycolor3"
          size={size === "small" ? fontXSmall :isMediumSize ? fontMediumLarge : fontXLarge}
        >
          {initialsTrim}
        </Text>
      )}
      {statusIcon && (
  disableStatusWrapper ? (
    <View
      style={{
        ...styles.statusIcon,
        top: size === "small"
          ? actuatedNormalize(20)
          : isMediumSize ? spacingL : spacingXL,
        left: size === "small"
          ? actuatedNormalize(20)
          : isMediumSize ? spacingL : spacingXL,
      }}
     >
      {statusIcon}
      </View>
  ) : (
    <View
      style={{
        ...styles.statusIcon,
        width: size === "small"
          ? actuatedNormalize(16)
          : isMediumSize ? widthM : actuatedNormalize(36),
        height: size === "small"
          ? actuatedNormalize(16)
          : isMediumSize ? heightM : actuatedNormalize(36),
        top: size === "small"
          ? actuatedNormalize(20)
          : isMediumSize ? spacingL : spacingXL,
        left: size === "small"
          ? actuatedNormalize(20)
          : isMediumSize ? spacingL : spacingXL,
        borderColor: theme.primarycolor4,
        backgroundColor: isDarkTheme
          ? theme.primarycolor4static
          : theme.stylescolor7,
        borderRadius: actuatedNormalize(100),
        borderWidth: actuatedNormalize(1),
      }}
    >
      {statusIcon}
    </View>
  )
)}
      {dynamicIcon}
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    top: actuatedNormalize(3),
    marginRight: actuatedNormalize(6),
    // borderRadius: actuatedNormalize(100),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  medium: {  // Changed "default" to "medium"
    height: heightXl,
    width: widthXl,
  },
  large: {
    height: actuatedNormalize(72),
    width: actuatedNormalize(72),
  },
  small: {
    height: actuatedNormalize(32),
    width: actuatedNormalize(32),
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: actuatedNormalize(100),
  },
  statusIcon: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});