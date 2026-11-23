import React, { FC } from "react";
import { Image, TouchableOpacity, ViewStyle } from "react-native";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";

export type NativeAppStoreType = "playstore" | "appstore" | "appgallery";

export interface NativeAppStoreButtonProps {
  /** Figma app.nativebutton Type=Playstore | Appstore | Appgallery */
  type?: NativeAppStoreType;
  onPress?: () => void;
  containerStyle?: ViewStyle;
}

const BADGES: Record<
  NativeAppStoreType,
  { source: number; width: number; height: number }
> = {
  playstore: {
    source: require("./assets/badge-playstore.png"),
    width: actuatedNormalize(135),
    height: actuatedNormalize(40),
  },
  appstore: {
    source: require("./assets/badge-appstore.png"),
    width: actuatedNormalize(120),
    height: actuatedNormalize(40),
  },
  appgallery: {
    source: require("./assets/badge-appgallery.png"),
    width: actuatedNormalize(133),
    height: actuatedNormalize(40),
  },
};

/**
 * Native app store badge — Figma Mobile Native → app.nativebutton (141:2118)
 */
export const NativeAppStoreButton: FC<NativeAppStoreButtonProps> = ({
  type = "appstore",
  onPress,
  containerStyle,
}) => {
  const badge = BADGES[type];

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={type}
      onPress={onPress}
      activeOpacity={0.85}
      style={containerStyle}
    >
      <Image
        source={badge.source}
        style={{ width: badge.width, height: badge.height }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default NativeAppStoreButton;
