import * as React from "react";
import { FC, useEffect, useMemo, useRef } from "react";
import {
  Animated,
  Easing,
  Platform,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { Text } from "../text/Text";
import {
  fontMediumLarge,
  lineHeightMediumLarge,
  spacingXS,
} from "../../assets/styles/constants/size";
import { AutomationProps, getAutomationProps } from "../automationProps";

export interface ToggleProps extends AutomationProps {
  isEnabled: boolean;
  handleToggle: (() => Promise<void> | void) | null | undefined;
  /** Optional label shown to the right of the switch (SAB Body: 15px, line-height 20px, black) */
  label?: string;
  mainContainer?: StyleProp<ViewStyle>;
  switchStyle?: StyleProp<ViewStyle>;
  trackColor?: {
    false: string;
    true: string;
  };
  thumbColor?: string;
  disabled?: boolean;
}

/**
 *
 * @property isEnabled - check if the toggle is on or off
 * @property handleToggle - function to handle the toggle
 * @property mainContainer - style for the main container to override default if needed
 * @property switchStyle - style for the switch to override default if needed
 * @property trackColor - custom colors for the switch track
 * @property thumbColor - color of the foreground switch grip.
 * @property disabled - if true the user won't be able to toggle the switch.
 * @returns
 */
export const Toggle: FC<ToggleProps> = ({
  isEnabled,
  handleToggle,
  label,
  mainContainer,
  switchStyle,
  trackColor,
  thumbColor,
  disabled,
  testID,
  accessibilityLabel,
}) => {
  const { theme } = useTheme();
  const animatedValue = useRef(new Animated.Value(isEnabled ? 1 : 0)).current;
  const isAndroid = Platform.OS === "android";

  const trackWidth = actuatedNormalize(43);
  const thumbWidth = actuatedNormalize(22);
  const thumbPadLeft = actuatedNormalize(isAndroid ? 3 : 2);
  const thumbPadRight = actuatedNormalize(isAndroid ? 3 : 2);
  const thumbPositionOff = thumbPadLeft;
  const thumbPositionOn = trackWidth - thumbWidth - thumbPadRight;

  const moveToggle = useMemo(
    () =>
      animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [thumbPositionOff, thumbPositionOn],
      }),
    [animatedValue, thumbPositionOff, thumbPositionOn]
  );

  const color = isEnabled
    ? trackColor?.true || theme.secondarycolor10
    : trackColor?.false || theme.primarycolor2_20;

    useEffect(() => {
      Animated.timing(animatedValue, {
        toValue: isEnabled ? 1 : 0,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }, [isEnabled]);

  return (
    <View style={[styles.container, mainContainer]}>
      <TouchableOpacity
        onPress={() => {
          handleToggle && handleToggle();
        }}
        disabled={disabled}
        style={disabled ? { opacity: 0.5 } : null}
        {...getAutomationProps(testID, accessibilityLabel, label ?? "toggle")}
      >
        <View
          style={[
            styles.toggleContainer,
            switchStyle,
            { backgroundColor: color },
          ]}
        >
          <Animated.View
            style={[
              styles.toggleWheelStyle,
              {
                marginLeft: moveToggle,
                backgroundColor: thumbColor || theme.primarycolor4static,
              },
            ]}
          />
        </View>
      </TouchableOpacity>
      {label != null && label !== "" && (
        <Text
          size={fontMediumLarge}
          variant="primarytextcolor"
          overrideStyles={{
            marginLeft: spacingXS,
            lineHeight: lineHeightMediumLarge,
          }}
        >
          {label}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: actuatedNormalize(22),
  },
  toggleContainer: {
    width: actuatedNormalize(43),
    height: actuatedNormalize(27),
    borderRadius: actuatedNormalize(22),
    justifyContent: "center",
  },
  toggleWheelStyle: {
    width: actuatedNormalize(22),
    height: actuatedNormalize(22),
    borderRadius: actuatedNormalize(11),
    shadowOffset: {
      width: actuatedNormalize(0),
      height: actuatedNormalize(2),
    },
    shadowOpacity: actuatedNormalize(0.2),
    shadowRadius: actuatedNormalize(2.5),
    elevation: actuatedNormalize(1.5),
  },
});
