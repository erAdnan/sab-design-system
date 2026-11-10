import React, { FC, useMemo } from "react";
import { I18nManager, StyleSheet, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import {
  fontLarge,
  fontMediumLarge,
  fontWeightRegular,
  radiusS,
  spacingM,
  spacingS,
  spacingXS,
  spacingXXS,
} from "../../assets/styles/constants/size";
import { Text } from "../text/Text";
import { Button } from "../button/Button";
import CarouselBannerPattern from "../patterns/CarouselBannerPattern";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import ImageThumbnail, {
  ImageThumbnailProps,
} from "../imageThumbnail/ImageThumbnail";
import { LanguageCodes } from "../../localization/languages";
import i18n from "i18next";
import BannerSkeleton from "./BannerSkeleton";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import { useFluidWidth } from "../../assets/styles/utils/responsive";

export interface CarouselBannerProps {
  type?: "image" | "default";
  title: string;
  description: string;
  buttonText?: string;
  onButtonPress?: () => void;
  backgroundImage?: ImageThumbnailProps;
  overrideStyles?: any;
  loading?: boolean;
}

/**
 * CarouselBanner component
 * @property {string} type - type of the carousel banner, optional. Default is 'default', can be 'image'
 * @property {string} title - title of the carousel banner
 * @property {string} description - description of the carousel banner
 * @property {string} buttonText - text of the button, optional
 * @property {() => void} onButtonPress - function to be called on button press, optional
 * @property {ImageThumbnailProps} backgroundImage - background image of the carousel banner, optional
 * @property {any} overrideStyles - override styles of the component, optional
 **/

export const CarouselBanner: FC<CarouselBannerProps> = ({
  type = "default",
  title,
  description,
  buttonText,
  onButtonPress,
  backgroundImage,
  overrideStyles,
  loading = false,
}) => {
  const { theme } = useTheme();
  const frame = useFluidWidth();
  const isDefault = useMemo(() => type === "default", [type]);

  const isRtl = I18nManager.isRTL;

  const styles = StyleSheet.create({
    container: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      backgroundColor:"red",
      justifyContent: "center",
      ...frame.of(343),
      height: actuatedNormalize(161),
      borderRadius: radiusS,
      paddingHorizontal: spacingS,
      paddingVertical: spacingM,
      overflow: "hidden",
    },
    defaultContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start", 
      gap: spacingXXS,
    },
    imageContent: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: isRtl ? "flex-end" : "flex-start",
      paddingHorizontal: spacingS,
    },
    backgroundPattern: {
      position: "absolute",
      top: 0,
      left: 0,
    },
  });

  const bannerBody = (
    <View style={isDefault ? styles.defaultContent : styles.imageContent}>
      <Text bold size={fontLarge} variant="primarycolorstatic">
        {title}
      </Text>
      <Text
        size={fontMediumLarge}
        variant="primarycolorstatic"
        overrideStyles={{
          width: isDefault ? actuatedNormalize(219) : actuatedNormalize(154),
          fontWeight:fontWeightRegular,
        }}
      >
        {description}
      </Text>
      {isDefault && buttonText && onButtonPress && (
        <Button
          variant="fill"
          color="secondary"
          size="small"
          onButtonPress={() => onButtonPress && onButtonPress()}
          buttonText={{
            children: buttonText,
            overrideStyles: { color: theme.primarycolor4static },
          }}
          overrideStyles={{
            backgroundColor: theme.primarycolorstatic,
            borderColor: theme.primarycolorstatic,
            marginTop: spacingXS,
            width: "100%",
          }}
        />
      )}
    </View>
  );

  return loading ? (
    <BannerSkeleton width={343} height={161}>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: spacingS,
          paddingVertical: spacingM,
          paddingHorizontal: spacingS,
          alignItems: isRtl ? "flex-end" : "flex-start",
          justifyContent: "space-around",
          height: "100%",
        }}
      >
        <SkeletonBox shape="line" size="large" />
        <View style={{ display: "flex", flexDirection: "column", gap: spacingXS }}>
          <SkeletonBox shape="line" size="small" />
          <SkeletonBox shape="line" size="small" />
        </View>
        {isDefault && <SkeletonBox shape="line" size="large" overrideStyles={{ width: "100%" }} />}
      </View>
    </BannerSkeleton>
  ) : (
    <View style={[styles.container, overrideStyles]}>
      {isDefault && <CarouselBannerPattern style={styles.backgroundPattern} />}
      {isDefault ? (
        bannerBody
      ) : (
        <ImageThumbnail
          {...backgroundImage}
          width={frame.span}
          height={actuatedNormalize(161)}
          overrideStyles={{ position: "absolute" }}
        >
          {bannerBody}
        </ImageThumbnail>
      )}
    </View>
  );
};
