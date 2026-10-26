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
    position: "absolute" as const,
    bottom: actuatedNormalize(100),
    alignSelf: "center" as const,
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
      style={[
        styles.container,
        {
          borderColor: theme.primarygray,
          backgroundColor: theme.stylesbackground2,
          borderRadius: actuatedNormalize(100),
        },
        toastStyle,
        containerStyle,
      ]}
    >
      <View style={{ display: "flex" }}>
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

      <View style={{ flexDirection: "column" }}>
        <Text
          size={fontMediumLarge}
          medium
          variant="primarycolor"
          overrideStyles={styles.heading}
        >
          {text}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "auto",
    paddingVertical: spacingS,
    paddingLeft: spacingS,
    paddingRight: spacingM,
    gap: spacingXS,
    borderWidth: 1,
    borderRadius: actuatedNormalize(100),
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
