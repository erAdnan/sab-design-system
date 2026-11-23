import { I18nManager, StyleSheet, View } from "react-native";
import React, { FC } from "react";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import {
  fontMedium,
  fontSmall,
  fontXSmall,
  fontXXSmall,
  lineHeightMedium,
  lineHeightSmall,
  lineHeightXSmall,
  lineHeightXXSmall,
  radiusS,
  spacing1XS,
  spacingS,
  spacingXS,
  spacingXXS,
} from "../../assets/styles/constants/size";
import { useTheme } from "../../context/theme/themeContext";
import ImageThumbnail, {
  ImageThumbnailProps,
} from "../imageThumbnail/ImageThumbnail";
import ProductsCardsSkeleton from "./ProductsCardsSkeleton";
import { Text } from "../text/Text";
import { PieGraph } from "../pieGraph/PieGraph";

export interface LearningProductCardProps {
  /** Caption label — Figma secondary/blue-green */
  subheading: string;
  /** Bold headline */
  title: string;
  /** Supporting body — Figma text/gray */
  bodyText: string;
  /** Progress ring percentage (0–100) */
  percentage: number;
  /** Center label inside pie, e.g. "80% Left" */
  percentageText: string;
  imageProps?: Partial<ImageThumbnailProps>;
  loading?: boolean;
  containerStyle?: object;
}

/**
 * Learning Product Card — Figma Products card → Learning-Product-Cards (11592:53928)
 * Tokens: styles/block-bg, secondary/blue-green, text/black, text/gray,
 * secondary/purple + primary/white-invert for pie.
 */
export const LearningProductCard: FC<LearningProductCardProps> = ({
  subheading,
  title,
  bodyText,
  percentage,
  percentageText,
  imageProps,
  loading = false,
  containerStyle,
}) => {
  const { theme } = useTheme();
  const isRTL = I18nManager.isRTL;
  const textAlign = isRTL ? "right" : "left";

  if (loading) {
    return <ProductsCardsSkeleton isSmall={false} />;
  }

  const pieMatch = percentageText.match(/^(\d+%)\s+(.+)$/);
  const pieLines = percentageText.includes("\n")
    ? percentageText.split("\n")
    : pieMatch
      ? [pieMatch[1], pieMatch[2]]
      : [percentageText];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.stylesblockbg },
        containerStyle,
      ]}
    >
      <View style={styles.imageWrap}>
        <ImageThumbnail
          width={actuatedNormalize(343)}
          height={actuatedNormalize(95)}
          resizeMode={imageProps?.resizeMode ?? "cover"}
          isAbsolutePath={imageProps?.isAbsolutePath ?? true}
          url={
            imageProps?.url ??
            require("../../assets/images/merchant_placeholder.png")
          }
          localSvg={imageProps?.localSvg}
          fallbackLocalUrl={imageProps?.fallbackLocalUrl}
          overrideStyles={[styles.imageThumbnail, imageProps?.overrideStyles]}
          overrideImageStyles={[styles.image, imageProps?.overrideImageStyles]}
        >
          {imageProps?.children}
        </ImageThumbnail>
        <View style={styles.imageScrim} pointerEvents="none" />
      </View>

      <View style={[styles.bottomContent, isRTL && styles.bottomContentRtl]}>
        <View style={[styles.textContainer, isRTL && styles.textContainerRtl]}>
          <Text
            size={fontXSmall}
            variant="secondarycolor10"
            overrideStyles={{
              lineHeight: lineHeightXSmall,
              textAlign,
              width: "100%",
            }}
          >
            {subheading}
          </Text>
          <View style={styles.titleBody}>
            <Text
              size={fontMedium}
              bold
              variant="primarycolor"
              numberOfLines={1}
              overrideStyles={{
                lineHeight: lineHeightMedium,
                textAlign,
                width: "100%",
              }}
            >
              {title}
            </Text>
            <Text
              size={fontSmall}
              variant="primarytextcolor2"
              overrideStyles={{
                lineHeight: lineHeightSmall,
                textAlign,
                width: "100%",
              }}
            >
              {bodyText}
            </Text>
          </View>
        </View>

        <View style={styles.pieWrap}>
          <PieGraph
            percentage={percentage}
            size="small"
            dimension={actuatedNormalize(48)}
            radius={actuatedNormalize(22)}
            /** Figma primary/white-invert track */
            strokeColor={theme.whiteinvert}
            /** Figma secondary/purple fill */
            strokeFillColor={theme.secondarycolor12}
            content={
              <View style={styles.pieLabel}>
                {pieLines.map((line) => (
                  <Text
                    key={line}
                    size={fontXXSmall}
                    bold
                    variant="primarycolor"
                    overrideStyles={{
                      lineHeight: lineHeightXXSmall,
                      textAlign: "center",
                    }}
                  >
                    {line}
                  </Text>
                ))}
              </View>
            }
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: radiusS,
    width: actuatedNormalize(343),
    height: actuatedNormalize(203),
    overflow: "hidden",
  },
  imageWrap: {
    width: actuatedNormalize(343),
    height: actuatedNormalize(95),
    opacity: 0.9,
  },
  imageThumbnail: {
    borderTopLeftRadius: radiusS,
    borderTopRightRadius: radiusS,
    overflow: "hidden",
  },
  image: {
    borderTopLeftRadius: radiusS,
    borderTopRightRadius: radiusS,
  },
  imageScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderTopLeftRadius: radiusS,
    borderTopRightRadius: radiusS,
  },
  bottomContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingS,
    height: actuatedNormalize(108),
    paddingHorizontal: spacingS,
    paddingVertical: spacing1XS,
  },
  bottomContentRtl: {
    flexDirection: "row-reverse",
  },
  textContainer: {
    flex: 1,
    maxWidth: actuatedNormalize(221),
    gap: spacingXXS,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  textContainerRtl: {
    alignItems: "flex-end",
  },
  titleBody: {
    gap: spacingXS,
    width: "100%",
  },
  pieWrap: {
    flexShrink: 0,
  },
  pieLabel: {
    width: actuatedNormalize(40),
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LearningProductCard;
