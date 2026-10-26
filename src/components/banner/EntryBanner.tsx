import React, { FC, useMemo } from "react";
import {
  I18nManager,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  fontLarge,
  fontMediumLarge,
  fontSmallMedium,
  radiusS,
  spacingS,
  spacingXXS,
} from "../../assets/styles/constants/size";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { useTheme } from "../../context/theme/themeContext";
import { Text } from "../text/Text";
import fonts from "../../assets/styles/constants/fonts";
import ImageThumbnail from "../imageThumbnail/ImageThumbnail";

interface EntryBannerProps {
  title: string;
  description: string;
  type?: "illustration" | "graph";
  /** Renders the compact 72px-tall banner instead of the default 105px */
  small?: boolean;
  image?: ImageSourcePropType;
  onPress?: () => void;
  overrideStyles?: any;
  isLite?: boolean;
}

/**
 * Entry banner for light educational callouts.
 *
 * @property title - Main heading text
 * @property description - Supporting subtitle text
 * @property image - Optional custom banner image (e.g. theme + locale asset from parent)
 * @property onPress - Optional callback when banner is pressed
 * @property overrideStyles - Optional container style overrides
 * @property isLite - Optional flag to render the lite banner
 */
export const EntryBanner: FC<EntryBannerProps> = ({
  title,
  description,
  type = "illustration",
  small = false,
  image,
  onPress,
  overrideStyles,
  isLite=false,
}) => {
  const { isDarkTheme } = useTheme();
  const isArabic = I18nManager.isRTL;
  


  const BannerContainer = onPress ? TouchableOpacity : View;
  const mode = isDarkTheme ? "dark" : "light";
  const language = isArabic ? "arabic" : "english";

  const backgroundImage = useMemo(() => {
    if (image) {
      return image;
    }

    if (type === "graph") {
      if (mode === "dark" && language === "arabic") {
        return require("../../assets/images/entrybanner/graphical/dark_arabic.png");
      }
      if (mode === "dark" && language === "english") {
        return require("../../assets/images/entrybanner/graphical/dark_english.png");
      }
      if (mode === "light" && language === "arabic") {
        return require("../../assets/images/entrybanner/graphical/light_arabic.png");
      }
      return require("../../assets/images/entrybanner/graphical/light_english.png");
    }

    if (mode === "dark" && language === "arabic") {
      return require("../../assets/images/entrybanner/illustration/dark_arabic.png");
    }
    if (mode === "dark" && language === "english") {
      return require("../../assets/images/entrybanner/illustration/dark_english.png");
    }
    if (mode === "light" && language === "arabic") {
      return require("../../assets/images/entrybanner/illustration/light_arabic.png");
    }
    return require("../../assets/images/entrybanner/illustration/light_english.png");
  }, [image, language, mode, type]);

  const bannerWidth = actuatedNormalize(343);
  const bannerHeight = actuatedNormalize(small ? 72 : 105);
  const smallBorderWidth = 1;
  const imageWidth = small ? bannerWidth - smallBorderWidth * 2 : bannerWidth;
  const imageHeight = small ? bannerHeight - smallBorderWidth * 2 : bannerHeight;

  return (
    <BannerContainer
      onPress={onPress}
      disabled={!onPress}
      style={[
        overrideStyles,
        small && [styles.smallBorder, { width: bannerWidth }],
      ]}
    >
      <ImageThumbnail
        width={imageWidth}
        height={imageHeight}
        url={backgroundImage}
        overrideStyles={styles.container}
        overrideImageStyles={styles.image}
        isAbsolutePath
      >
        <View style={[styles.textWrapper, { gap: small ? 0 : spacingXXS, width: isLite ? actuatedNormalize(230) : actuatedNormalize(220) }]}>
          <Text
            size={isLite ? fontLarge : fontMediumLarge}
            variant={isLite ? "primarycolor4static" : "primarycolor"}
            overrideStyles={styles.title}
          >
            {title}
          </Text>
          <Text
            size={fontSmallMedium}
            variant={isLite ? "primarycolor4static" : "primarycolor"}
          >
            {description}
          </Text>
        </View>
      </ImageThumbnail>
    </BannerContainer>
  );
};

const styles = StyleSheet.create({
  smallBorder: {
    borderRadius: radiusS,
    borderWidth: 1,
    borderColor: "rgba(240, 240, 240, 0.45)",
    overflow: "hidden",
  },
  container: {
    borderRadius: radiusS - 1,
    padding: spacingS,
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    borderRadius: radiusS - 1,
  },
  textWrapper: {
    alignItems:"flex-start",
  },
  title: {
    fontFamily: fonts.HSBC_Medium,
  },
});
