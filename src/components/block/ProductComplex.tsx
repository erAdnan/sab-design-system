import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import {
  fontLarge,
  fontSmall,
  fontWeightBold,
  radiusL,
  radiusS,
  spacingS,
  spacingXS,
} from "../../assets/styles/constants/size";
import { Text } from "../text/Text";
import { Button } from "../button/Button";
import { Title } from "../text/Title";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import ImageThumbnail, { ImageThumbnailProps } from "../imageThumbnail/ImageThumbnail";

interface BlockProductComplexProps {
  title: string;
  subtitle: string;
  linkButtonText?: string;
  linkButtonIconLeft?: boolean;
  linkButtonIconRight?: boolean;
  onLinkButtonPress?: () => void;
  primaryButtonText?: string;
  onPrimaryButtonPress?: () => void;
  imgProps: ImageThumbnailProps;
  loading?: boolean;
  variant?: "default" | "large";
  variantColor?: string;
}

const LARGE_CARD_MAX_WIDTH = actuatedNormalize(300);
const LARGE_IMAGE_SIZE = actuatedNormalize(200);

const ProductComplexSkeleton = ({ variant = "default" }: { variant?: "default" | "large" }) => {
  const { theme } = useTheme();
  const isLarge = variant === "large";
  const w = isLarge ? "100%" : actuatedNormalize(213);
  const h = isLarge ? undefined : actuatedNormalize(224);
  return (
    <View
      style={{
        width: w,
        maxWidth: isLarge ? LARGE_CARD_MAX_WIDTH : undefined,
        height: h,
        minHeight: isLarge ? actuatedNormalize(360) : undefined,
        alignSelf: "flex-start",
        backgroundColor: theme.stylesblockbg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        padding: spacingS,
        gap: spacingS,
        borderRadius: isLarge ? radiusL : radiusS,
      }}
    >
      <SkeletonBox
        shape="square"
        size="medium"
        overrideStyles={
          isLarge
            ? { width: LARGE_IMAGE_SIZE, height: LARGE_IMAGE_SIZE, alignSelf: "center" }
            : undefined
        }
      />
      <View style={{ flexDirection: "column", gap: spacingXS, justifyContent: "center", alignItems: "center", width: "100%" }}>
        <SkeletonBox shape="line" size="medium" overrideStyles={{ width: "100%" }} />
        <SkeletonBox shape="line" size="small" overrideStyles={{ width: "100%" }} />
        <SkeletonBox shape="line" size="small" overrideStyles={{ width: "100%" }} />
      </View>
      <SkeletonBox shape="line" size="medium" overrideStyles={{ width: "100%" }} />
    </View>
  );
};

/**
 * @property title - Text to be displayed in bold
 * @property subtitle - Text to be displayed on the second line
 * @property linkButtonText - Text for link button (omit to hide link)
 * @property onLinkButtonPress - Callback for link button press
 * @property linkButtonIconRight - Boolean to show/hide link button right icon (default is true)
 * @property linkButtonIconLeft - Boolean to show/hide link button left icon (default is false)
 * @property primaryButtonText - Primary CTA label (omit to hide primary button)
 * @property onPrimaryButtonPress - Primary CTA press handler
 * @property loading - boolean for showing the skeleton
 * @property variant - `large` uses wider card, larger illustration, and larger corner radius
 **/
export const ProductComplex: FC<BlockProductComplexProps> = ({
  title,
  subtitle,
  linkButtonText,
  linkButtonIconLeft = false,
  linkButtonIconRight = true,
  onLinkButtonPress,
  primaryButtonText,
  onPrimaryButtonPress,
  imgProps,
  loading = false,
  variant = "default",
  variantColor = "primarytextcolor",
}) => {
  const { theme } = useTheme();
  const isLarge = variant === "large";
  const imgWidth = isLarge ? LARGE_IMAGE_SIZE : actuatedNormalize(114);
  const imgHeight = isLarge ? LARGE_IMAGE_SIZE : actuatedNormalize(72);
  const imageResizeMode = isLarge ? "contain" : imgProps.resizeMode ?? "cover";

  const showPrimary =
    typeof primaryButtonText === "string" && primaryButtonText.trim().length > 0;
  const showLink = typeof linkButtonText === "string" && linkButtonText.trim().length > 0;
  const showActions = showPrimary || showLink;

  if (loading) {
    return <ProductComplexSkeleton variant={variant} />;
  }

  return (
    <View
      style={[
        styles.container,
        isLarge ? styles.containerLarge : styles.containerDefault,
        { backgroundColor: theme.stylesblockbg },
      ]}
    >
      <ImageThumbnail {...imgProps} width={imgWidth} height={imgHeight} resizeMode={imageResizeMode} />
      <View style={styles.textContent}>
        <Title
          size={fontLarge}
          variant="primarytextcolor"
          overrideStyles={{
            paddingHorizontal: 0,
            paddingVertical: 0,
            alignSelf: "flex-start",
            fontWeight: fontWeightBold
          }}
        >
          {title}
        </Title>
        <Text size={fontSmall} variant={isLarge ? "primarytextcolor2" : "primarytextcolor"}>
          {subtitle}
        </Text>
      </View>
      {showActions ? (
        <View style={[styles.btnContainer, { alignItems: isLarge ? "center" : "flex-start" }]}>
          {showPrimary ? (
            <Button
              variant="fill"
              size="small"
              buttonText={{ children: primaryButtonText }}
              onButtonPress={() => onPrimaryButtonPress?.()}
              overrideStyles={{ flex: 1, height: actuatedNormalize(32) }}
            />
          ) : null}
          {showLink ? (
            <Button
              variant="link"
              size="small"
              onButtonPress={() => onLinkButtonPress?.()}
              buttonText={{
                children: linkButtonText ?? "",
                variant: variantColor ?? "primarytextcolor",
              }}
              linkIconRight={linkButtonIconRight}
              linkIconLeft={linkButtonIconLeft}
              overrideStyles={{
                 width: undefined,
                 height: undefined,
                 paddingHorizontal: 0,
                 paddingVertical: 0,
              }}
            />
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: spacingS,
  },
  containerDefault: {
    width: actuatedNormalize(213),
    gap: actuatedNormalize(21),
    borderRadius: radiusS,
  },
  containerLarge: {
    width: "100%",
    maxWidth: LARGE_CARD_MAX_WIDTH,
    alignSelf: "flex-start",
    gap: actuatedNormalize(24),
    borderRadius: radiusL,
  },
  textContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: spacingXS,
    width: "100%",
  },
  btnContainer: {
    display: "flex",
    flexDirection: "column",
    gap: spacingXS,
    width: "100%",
  },
});
