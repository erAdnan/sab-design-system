import React, { FC } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import {
  fontSmall,
  lineHeightXSmall,
  spacingXXS,
} from "../../assets/styles/constants/size";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { LinearGradient } from "react-native-linear-gradient";
import { Text } from "../text/Text";
import StorySkeleton from "./StorySkeleton";
import LottieView from "lottie-react-native";

interface StoryProps {
  img: string;
  animationSource?: any;
  seen: boolean;
  text?: string;
  extraContent?: string;
  onStoryPress?: () => void;
  loading?: boolean;
}

/**
 * @property img - URL for the story image
 * @property seen - Boolean for applying different styling for seen and not seen stories
 * @property text - Optional text to display under the story image
 * @property extraContent - Optional text for second line
 * @property onStoryPress - Optional callback for handling story press event
 */

export const Story: FC<StoryProps> = ({
  img,
  animationSource,
  seen = false,
  text,
  extraContent,
  onStoryPress,
  loading = false,
}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      gap: spacingXXS,
      alignItems: "center",
      alignSelf: "flex-start",
    },
    storyWrapper: {
      height: actuatedNormalize(74),
      width: actuatedNormalize(74),
      borderRadius: actuatedNormalize(50),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    imageWrapper: {
      width: actuatedNormalize(68),
      height: actuatedNormalize(68),
      borderRadius: actuatedNormalize(50),
      backgroundColor: theme.primarycolor4static,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
      height: actuatedNormalize(62),
      width: actuatedNormalize(62),
      borderRadius: actuatedNormalize(50),
    },
  });

  return loading ? (
    <StorySkeleton />
  ) : (
    <Pressable
      style={styles.container}
      onPress={onStoryPress}
    >
      <LinearGradient
        start={{ x: 0.9, y: 0.1 }}
        end={{ x: 0.3, y: 1 }}
        colors={
          seen
            ? [theme.primarycolor2, theme.primarycolor2]
            : [
                theme.primarylineargradient1,
                theme.primarylineargradient2,
                theme.primarylineargradient3,
              ]
        }
        style={styles.storyWrapper}
      >
       <View style={styles.imageWrapper}>
          {animationSource ? (
            <LottieView source={animationSource} autoPlay loop style={styles.image} />
          ) : (
            <Image source={{ uri: img }} style={styles.image} />
          )}
        </View>
      </LinearGradient>
      {text && (
        <Text
          variant="primarytextcolor"
          size={fontSmall}
          overrideStyles={{ lineHeight: lineHeightXSmall }}
        >
          {text}
        </Text>
      )}
      {extraContent && text && (
        <Text
          variant="primarytextcolor2"
          size={fontSmall}
          overrideStyles={{ lineHeight: lineHeightXSmall }}
        >
          {extraContent}
        </Text>
      )}
    </Pressable>
  );
};
