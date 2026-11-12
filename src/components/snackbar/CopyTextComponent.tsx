import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  I18nManager,
  Animated,
  Platform,
} from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import Copy from "../icons/functionals/Copy";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { Text } from "../text/Text";
import {
  fontMediumLarge,
  fontSmall,
  fontWeightMedium,
  fontWeightRegular,
  lineHeightMediumLarge,
  lineHeightSmall,
  spacingS,
  spacingXS,
  spacingM,
} from "../../assets/styles/constants/size";
import fonts from "../../assets/styles/constants/fonts";

export interface CopyTextComponentProps {
  text: string;
  containerStyle?: StyleProp<ViewStyle>;
  duration?: number;
  onDismiss?: () => void;
}

const CopyTextComponent: React.FC<CopyTextComponentProps> = ({
  text = "Reference Number Copied",
  containerStyle,
  duration = 5000,
  onDismiss,
}) => {
  const { theme } = useTheme();
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(animation, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        onDismiss?.();
      });
    }, duration);

    return () => clearTimeout(timer);
  }, [animation, duration, onDismiss]);

  const toastStyle = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
        }),
      },
    ],
    opacity: animation,
  };

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[styles.wrapper, toastStyle]}
    >
      <View
        style={[
          styles.container,
          {
            borderColor: theme.primarygray,
            backgroundColor: theme.stylesbackground2,
            borderRadius: actuatedNormalize(100),
          },
          containerStyle,
        ]}
      >
        <View style={styles.icon}>
          <Copy
            width={actuatedNormalize(24)}
            height={actuatedNormalize(24)}
            fill={theme.primarycolor}
            transform={[
              {
                rotate: I18nManager.isRTL ? "360deg" : "0deg",
              },
            ]}
          />
        </View>

        <View style={styles.content}>
          <Text
            size={fontMediumLarge}
            medium
            variant="primarycolor"
            overrideStyles={styles.heading}
          >
            {text}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  // Full-width positioning layer so the pill can size to its content
  // (absolute + shrink-to-fit previously clipped the width to the icon).
  wrapper: {
    position: "absolute",
    bottom: actuatedNormalize(100),
    left: 0,
    right: 0,
    paddingHorizontal: spacingM,
    // Row so the pill is a flex item: it takes its max-content width and only
    // shrinks (wrapping the text) when the screen is narrower than that.
    flexDirection: "row",
    justifyContent: "center",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "100%",
    paddingVertical: spacingS,
    paddingLeft: spacingS,
    paddingRight: spacingM,
    gap: spacingXS,
    borderWidth: 1,
    borderRadius: actuatedNormalize(100),
  },
  icon: {
    flexShrink: 0,
  },
  content: {
    flexShrink: 1,
    flexDirection: "column",
  },
  heading: {
    fontSize: fontMediumLarge,
    fontFamily: fonts.HSBC,
    fontWeight: fontWeightMedium,
    lineHeight: lineHeightMediumLarge,
    textAlign: "left",
    alignSelf: "stretch",
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  text: {
    fontSize: fontSmall,
    fontFamily: fonts.HSBC,
    fontWeight: fontWeightRegular,
    lineHeight: lineHeightSmall,
    textAlign: "left",
    alignSelf: "stretch",
  },
});

export default CopyTextComponent;
