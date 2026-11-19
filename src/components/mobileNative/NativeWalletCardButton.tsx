import React, { FC } from "react";
import {
  Image,
  StyleSheet,
  Text as RNText,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";

export type NativeWalletCardWidth = "narrow" | "wide";
export type NativeWalletCardSize = "small" | "medium" | "large";

export interface NativeWalletCardButtonProps {
  /** Figma button.wallets Width */
  width?: NativeWalletCardWidth;
  /** Figma button.wallets Size (Large only with Wide) */
  size?: NativeWalletCardSize;
  /** Optional grey stroke */
  stroke?: boolean;
  label?: string;
  bottomLabel?: string;
  onPress?: () => void;
  containerStyle?: ViewStyle;
}

const WALLET_ICON = require("./assets/wallet-card-icon.png");

/**
 * Native wallet card chip — Figma Mobile Native → button.wallets (14808:14995)
 */
export const NativeWalletCardButton: FC<NativeWalletCardButtonProps> = ({
  width = "narrow",
  size = "small",
  stroke = false,
  label = "Label",
  bottomLabel = "Label",
  onPress,
  containerStyle,
}) => {
  const isWide = width === "wide";
  const isLarge = isWide && size === "large";
  const isMedium = !isWide && size === "medium";
  const dualLine = !isWide;

  const iconW = isLarge
    ? actuatedNormalize(46)
    : isMedium
      ? actuatedNormalize(37)
      : actuatedNormalize(26);
  const iconH = isLarge
    ? actuatedNormalize(34)
    : isMedium
      ? actuatedNormalize(27)
      : actuatedNormalize(19);

  const topFont = isMedium ? actuatedNormalize(12) : actuatedNormalize(8.5);
  const bottomFont = isLarge
    ? actuatedNormalize(19)
    : isMedium
      ? actuatedNormalize(15)
      : actuatedNormalize(11.5);

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={bottomLabel || label}
      onPress={onPress}
      activeOpacity={0.85}
      style={[
        styles.base,
        isLarge && styles.padLarge,
        isMedium && styles.padMedium,
        !isLarge && !isMedium && styles.padSmall,
        stroke && styles.stroke,
        containerStyle,
      ]}
    >
      <Image
        source={WALLET_ICON}
        style={{ width: iconW, height: iconH }}
        resizeMode="contain"
      />
      {dualLine ? (
        <View style={styles.textCol}>
          <RNText style={[styles.text, { fontSize: topFont }]}>{label}</RNText>
          <RNText style={[styles.text, { fontSize: bottomFont }]}>
            {bottomLabel}
          </RNText>
        </View>
      ) : (
        <RNText style={[styles.text, { fontSize: bottomFont }]}>
          {bottomLabel}
        </RNText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000000",
    borderRadius: actuatedNormalize(7),
    alignSelf: "flex-start",
  },
  padSmall: {
    gap: actuatedNormalize(4.5),
    paddingTop: actuatedNormalize(6),
    paddingBottom: actuatedNormalize(5),
    paddingLeft: actuatedNormalize(7.5),
    paddingRight: actuatedNormalize(7),
  },
  padMedium: {
    gap: actuatedNormalize(5),
    paddingVertical: actuatedNormalize(7.5),
    paddingLeft: actuatedNormalize(10),
    paddingRight: actuatedNormalize(12),
  },
  padLarge: {
    gap: actuatedNormalize(8),
    paddingVertical: actuatedNormalize(10.5),
    paddingLeft: actuatedNormalize(10),
    paddingRight: actuatedNormalize(12),
  },
  stroke: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#A6A6A6",
  },
  textCol: {
    alignItems: "flex-start",
  },
  text: {
    color: "#FFFFFF",
    fontFamily: "System",
  },
});

export default NativeWalletCardButton;
