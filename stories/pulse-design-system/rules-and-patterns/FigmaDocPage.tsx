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
};

type FigmaDocPageProps = {
  title: string;
  eyebrow?: string;
  images: FrameImage[];
};

/** Pixel-faithful docs page: tint header + stacked Figma frame exports (responsive). */
export const FigmaDocPage: FC<FigmaDocPageProps> = ({
  title,
  eyebrow = "Rules and Patterns",
  images,
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
      <View style={[styles.frames, { maxWidth: layout.maxContent }]}>
        {images.map((img, index) => (
          <Image
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            source={img.source}
            style={[styles.frame, { aspectRatio: img.aspectRatio }]}
            resizeMode="contain"
            accessibilityLabel={`${title} section ${index + 1}`}
          />
        ))}
      </View>
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
});
