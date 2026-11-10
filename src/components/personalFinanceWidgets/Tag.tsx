import React, { FC } from "react";
import { useTheme } from "../../context/theme/themeContext";
import { StyleSheet, View } from "react-native";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import {
  fontMedium,
  fontSmallMedium,
  radiusS,
  spacingXS,
  spacingXXS,
} from "../../assets/styles/constants/size";
import { Text } from "../text/Text";
import Hash from "../icons/banking/Hash";
import TagSkeleton from "./TagSkeleton";
import { useFluidWidth } from "../../assets/styles/utils/responsive";

interface TagWidgetProps {
  mainText: string;
  description: string;
  loading?: boolean;
}

/**
 * @property mainText: Text for the first line
 * @property description: Text for the second line
 */

export const Tag: FC<TagWidgetProps> = ({
  mainText,
  description,
  loading = false,
}) => {
  const { theme } = useTheme();
  const frame = useFluidWidth();

  const styles = StyleSheet.create({
    container: {
      ...frame.of(230),
      height: actuatedNormalize(64),
      borderRadius: radiusS,
      backgroundColor: theme.stylesblockbg,
      padding: spacingXS,
      display: "flex",
      flexDirection: "row",
      gap: spacingXS,
      alignItems: "center",
    },
    textContent: {
      display: "flex",
      flexDirection: "column",
      gap: spacingXXS,
      alignItems: "center",
      justifyContent: "center",
    },
    iconWrapper: {
      width: actuatedNormalize(32),
      height: actuatedNormalize(32),
      borderRadius: actuatedNormalize(32),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.inverttransparent
    }
  });
  return loading ? (
    <TagSkeleton />
  ) : (
    <View style={styles.container}>
        <View style={styles.iconWrapper}>
        <Hash
          width={actuatedNormalize(24)}
          height={actuatedNormalize(24)}
          fill={theme.primarycolor3}
        />
      </View>
      <View style={styles.textContent}>
        <Text bold variant="primarytextcolor" size={fontMedium}>
          {mainText}
        </Text>
        <Text variant="primarytextcolor2" size={fontSmallMedium}>
          {description}
        </Text>
      </View>
    </View>
  );
};
