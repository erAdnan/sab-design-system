import React, { FC } from "react";
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import fonts from "../../../src/assets/styles/constants/fonts";
import { usePulseDocLayout } from "../_shared/usePulseDocLayout";

const C = {
  red: "#DB0011",
  redPressed: "#E96670",
  redTint: "#F9F2F3",
  white: "#FFFFFF",
};

type FrameImage = {
  source: ImageSourcePropType;
  /** width / height — React Native aspectRatio */
  aspectRatio: number;
  /** Pixel width when panHorizontal (wide IA / journey maps). */
  width?: number;
  /** Pixel height when panHorizontal. */
  height?: number;
};

type FigmaDocPageProps = {
  title: string;
  eyebrow?: string;
  images: FrameImage[];
  /**
   * Wide Figma canvases (e.g. Journey IA): keep export pixel size and pan
   * horizontally so labels stay readable instead of shrinking to content width.
   */
  panHorizontal?: boolean;
};

/** Pixel-faithful docs page: tint header + stacked Figma frame exports (responsive). */
export const FigmaDocPage: FC<FigmaDocPageProps> = ({
  title,
  eyebrow = "Rules and Patterns",
  images,
  panHorizontal = false,
}) => {
  const layout = usePulseDocLayout();

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      horizontal={false}
    >
      <View
        style={[
          styles.header,
          {
            maxWidth: layout.maxContent,
            paddingHorizontal: layout.pagePadX,
            paddingVertical: layout.pagePadY,
            flexDirection: layout.isMobile ? "column" : "row",
            alignItems: layout.isMobile ? "flex-start" : "flex-end",
            borderTopLeftRadius: layout.isMobile ? 0 : 12,
            borderTopRightRadius: layout.isMobile ? 0 : 12,
          },
        ]}
      >
        <Text
          style={[
            styles.headerTitle,
            {
              fontSize: layout.headerTitleSize,
              lineHeight: layout.headerTitleLine,
            },
          ]}
        >
          {title}
        </Text>
        <Text
          style={[
            styles.headerEyebrow,
            {
              fontSize: layout.headerEyebrowSize,
              lineHeight: layout.headerEyebrowSize + 5,
            },
          ]}
        >
          {eyebrow}
        </Text>
      </View>
      {panHorizontal ? (
        <ScrollView
          horizontal
          style={styles.panScroll}
          contentContainerStyle={styles.panContent}
          showsHorizontalScrollIndicator
        >
          {images.map((img, index) => {
            const h = img.height ?? Math.round(1200 / img.aspectRatio);
            const w = img.width ?? Math.round(h * img.aspectRatio);
            return (
              <Image
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                source={img.source}
                style={{ width: w, height: h }}
                resizeMode="contain"
                accessibilityRole="image"
                accessibilityLabel={`${title} section ${index + 1}`}
                // @ts-expect-error loading is a DOM <img> attribute honored by RN-web
                loading="lazy"
                fadeDuration={0}
              />
            );
          })}
        </ScrollView>
      ) : (
        <View style={[styles.frames, { maxWidth: layout.maxContent }]}>
          {images.map((img, index) => (
            <Image
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              source={img.source}
              style={[styles.frame, { aspectRatio: img.aspectRatio }]}
              resizeMode="contain"
              // role=img so aria-label is allowed (axe aria-allowed-attr on RN-web)
              accessibilityRole="image"
              accessibilityLabel={`${title} section ${index + 1}`}
              // Web: defer offscreen Figma frames (no quality change).
              // @ts-expect-error loading is a DOM <img> attribute honored by RN-web
              loading="lazy"
              fadeDuration={0}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: { flex: 1, width: "100%", backgroundColor: C.white },
  content: {
    alignItems: "stretch",
    paddingBottom: 48,
    width: "100%",
    minWidth: 0,
  },
  header: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: C.redTint,
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 12,
    minWidth: 0,
  },
  headerTitle: {
    fontFamily: fonts.HSBC_Bold,
    color: C.red,
    fontWeight: "700",
    flexShrink: 1,
    minWidth: 0,
  },
  headerEyebrow: {
    fontFamily: fonts.HSBC_Medium,
    color: C.redPressed,
    fontWeight: "500",
    flexShrink: 1,
  },
  frames: {
    width: "100%",
    alignSelf: "center",
    alignItems: "stretch",
    minWidth: 0,
  },
  frame: {
    width: "100%",
    maxWidth: "100%",
    height: undefined,
  },
  panScroll: {
    width: "100%",
    backgroundColor: C.white,
  },
  panContent: {
    paddingBottom: 24,
    alignItems: "flex-start",
  },
});
