import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import {
  fontMediumLarge,
  radiusS,
  spacingS,
  spacingXS,
} from "../../assets/styles/constants/size";
import { Text } from "../text/Text";
import BannerPattern from "../patterns/BannerPattern";
import { Button } from "../button/Button";
import Card from "../icons/banking/Card";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { SkeletonBox } from "../skeleton/SkeletonBox";

interface BlockBannerProps {
  label: string;
  linkButtonText: string;
  onLinkButtonPress?: () => void;
  loading?: boolean;
}

/**
 * @property label - Text to be displayed above link button
 * @property linkButtonText - Text for link button
 * @property onLinkButtonPress - Optonal callback for link button press
 * @property loading - boolean for showing the skeleton
 **/

export const Banner: FC<BlockBannerProps> = ({
  label,
  linkButtonText,
  onLinkButtonPress,
  loading = false,
}) => {
  const { theme } = useTheme();

  return loading ? (
    <View
      style={{
        width: actuatedNormalize(343),
        height: actuatedNormalize(133),
        backgroundColor: theme.stylesblockbg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        padding: spacingS,
        gap: spacingS,
        borderRadius: radiusS,
      }}>
      <SkeletonBox shape="circle" size="small" />
      <View style={{ flexDirection: "column", gap: spacingXS, justifyContent: "center", }}>
        <SkeletonBox shape="line" size="small" overrideStyles={{ width: "80%" }} />
        <SkeletonBox shape="line" size="small" overrideStyles={{ width: "80%" }} />
      </View>
    </View>
  ) : (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.stylesblockbg,
      }}
    >
      <BannerPattern style={styles.backgroundPattern} />
      <Card fill={theme.primarycolor3} />
      <View style={styles.textContent}>
        <Text
          size={fontMediumLarge}
          variant="primarytextcolor"
          overrideStyles={{ flex: 1 }}
        >
          {label}
        </Text>
        <Button
          variant="link"
          size="small"
          onButtonPress={() => onLinkButtonPress && onLinkButtonPress()}
          buttonText={{ children: linkButtonText }}
          linkIconRight
          overrideStyles={{
            paddingHorizontal: 0,
            paddingVertical: 0,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    height: actuatedNormalize(133),
    borderRadius: radiusS,
    padding: spacingS,
  },
  textContent: {
    display: "flex",
    flexDirection: "column",
  },
  backgroundPattern: {
    position: "absolute",
    top: 0,
    left: 0,
  },
});
