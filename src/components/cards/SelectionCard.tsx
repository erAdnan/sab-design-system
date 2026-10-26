import React, { FC, ReactElement, ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import {
  radiusS,
  spacingXS,
  spacingXXS,
  spacingS,
  fontXSmall,
  fontXXSmall,
  lineHeightXSmall,
  lineHeightXXSmall,
} from "../../assets/styles/constants/size";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { Text } from "../text/Text";
import { SelectionCardSkeleton } from "./skeletons/SelectionCardSkeleton";

export const SELECTION_CARD_WIDTH = actuatedNormalize(100);
export const SELECTION_CARD_IMAGE_HEIGHT = actuatedNormalize(80);

const PADDING_BOTTOM = spacingS;

export interface SelectionCardProps {
  image: ReactNode;
  title: string;
  subtitle?: string;
  withBorder?: boolean;
  isLoading?: boolean;
}

function renderImageFillingSlot(image: ReactNode): ReactNode {
  const w = SELECTION_CARD_WIDTH;
  const h = SELECTION_CARD_IMAGE_HEIGHT;
  if (React.isValidElement(image)) {
    return React.cloneElement(image as ReactElement<{ width?: number; height?: number }>, {
      width: w,
      height: h,
    });
  }
  return image;
}

export const SelectionCard: FC<SelectionCardProps> = ({
  image,
  title,
  subtitle,
  withBorder = false,
  isLoading = false,
}) => {
  const { theme } = useTheme();

  if (isLoading) {
    return <SelectionCardSkeleton />;
  }

  const containerStyle = [
    withBorder && {
      borderWidth: 1,
      borderColor: theme.primarycolor3,
    },
    styles.container,
    { width: SELECTION_CARD_WIDTH },
  ];

  const imageContainerStyle = [
    { backgroundColor: theme.stylesblockbg },
    styles.imageContainer,
  ];

  return (
    <View style={containerStyle}>
      <View style={imageContainerStyle}>{renderImageFillingSlot(image)}</View>
      <View style={styles.titleBlock}>
        <View style={styles.titleContainer}>
          <Text
            variant="primarytextcolor"
            size={fontXSmall}
            numberOfLines={1}
            overrideStyles={styles.titleOverride}
          >
            {title}
          </Text>
        </View>
        {subtitle != null && subtitle !== "" && (
          <View style={styles.subtitleContainer}>
            <Text
              variant="primarytextcolor2"
              size={fontXXSmall}
              numberOfLines={1}
              overrideStyles={styles.subtitleOverride}
            >
              {subtitle}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    textAlign: "center",
    paddingBottom: PADDING_BOTTOM,
    paddingHorizontal: 0,
    justifyContent: "center",
    borderRadius: radiusS,
    gap: spacingXS,
    overflow: "hidden",
  },
  titleBlock: {
    alignSelf: "stretch",
    gap: spacingXXS,
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: radiusS,
    overflow: "hidden",
  },
  titleContainer: {
    alignSelf: "stretch",
    overflow: "hidden",
  },
  titleOverride: {
    textAlign: "center",
    lineHeight: lineHeightXSmall,
    width: "100%",
  },
  subtitleContainer: {
    alignSelf: "stretch",
    overflow: "hidden",
  },
  subtitleOverride: {
    textAlign: "center",
    lineHeight: lineHeightXXSmall,
    width: "100%",
    fontStyle: "normal",
    fontWeight: "400",
  },
});
