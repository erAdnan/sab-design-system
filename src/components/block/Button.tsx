import React, { FC } from "react";
import { Button } from "../button/Button";
import { I18nManager, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import {
  fontMediumLarge,
  fontSmall,
  lineHeightMediumLarge,
  radiusS,
  spacingS,
  spacingXS,
  spacingXXS,
} from "../../assets/styles/constants/size";
import { Text } from "../text/Text";
import { SarFont } from "../sarFont/SarFont";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import { ImagesAddon } from "../imagesAddon/ImagesAddon";

interface BlockButtonProps {
  caption: string;
  mainText: string;
  addonType: "action" | "logo";
  buttonText?: string;
  images?: string[];
  onAddonPress?: () => void;
  amount?: boolean;
  loading?: boolean;
}

/**
 * @property caption: Text on the first line
 * @property mainText: Text on the second line
 * @property addonType: Addon to show on the right side of the block, can be "action" - button, or "logo" - image
 * @property buttonText: Text to use on button if addonType is "action"
 * @property images: Array of URLs for logos to be displayed when addonType is "logo"
 * @property onAddonPress: Optional callback for handling addon press (button or logo)
 * @property amount: Boolean to show/hide SAR symbol next to the main text
 * @property loading - boolean for showing the skeleton
 */

export const BlockButton: FC<BlockButtonProps> = ({
  caption,
  mainText,
  addonType = "action",
  buttonText,
  images,
  onAddonPress,
  amount = false,
  loading = false,
}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      width: actuatedNormalize(343),
      height: actuatedNormalize(80),
      padding: spacingS,
      backgroundColor: theme.stylesblockbg,
      borderRadius: radiusS,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    textWrapper: {
      display: "flex",
      flexDirection: "column",
      gap: spacingXXS,
    },
    textWithAmount: {
      display: "flex",
      flexDirection:  I18nManager.isRTL? "row-reverse":"row",
      gap: spacingXXS,
      alignItems: "center",
      justifyContent: I18nManager.isRTL? "flex-end": "flex-start",
    },
  });
  return loading ? (
    <View
      style={{
        width: actuatedNormalize(343),
        height: actuatedNormalize(80),
        backgroundColor: theme.stylesblockbg,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: spacingS,
        gap: spacingS,
        borderRadius: radiusS,
      }}>
      <View style={{ flexDirection: "column", gap: spacingXS, justifyContent: "center", width: "60%" }}>
        <SkeletonBox shape="line" size="small" overrideStyles={{ width: "100%" }} />
        <SkeletonBox shape="line" size="small" overrideStyles={{ width: "100%" }} />
      </View>
      <View style={{ width: "40%" }}>
        <SkeletonBox shape="line" size="medium" overrideStyles={{ width: "100%" }} />
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <Text
          variant="primarytextcolor2"
          size={fontSmall}
          overrideStyles={{ textAlign: "left"}}
        >
          {caption}
        </Text>
        <View style={styles.textWithAmount}>
          {amount && (
            <SarFont
              size={fontMediumLarge}
              lineHeight={lineHeightMediumLarge}
            />
          )}
          <Text bold variant="primarytextcolor" size={fontMediumLarge}>
            {mainText}
          </Text>
        </View>
      </View>
      {addonType === "action" && buttonText && (
        <Button
          variant="fill"
          color="secondary"
          size="small"
          buttonText={{ children: buttonText }}
          onButtonPress={() => onAddonPress && onAddonPress()}
        />
      )}
      {addonType === "logo" && images?.length && (
        <ImagesAddon
          images={images}
          onMoreIconPress={() => onAddonPress && onAddonPress()}
        />
      )}
    </View>
  );
};
