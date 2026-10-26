import React, { FC } from "react";
import { StyleProp, StyleSheet, Switch, View, ViewStyle } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import { ToggleProps } from "./Toggle";
import { getAutomationProps } from "../automationProps";

/**
 *
 * @property isEnabled - check if the toggle is on or off
 * @property handleToggle - function to handle the toggle
 * @property mainContainer - style for the main container to override default if needed
 * @property switchStyle - style for the switch to override default if needed
 * @property trackColor - custom colors for the switch track
 * @property thumbColor - color of the foreground switch grip. If this is set on iOS, the switch grip will lose its drop shadow.
 * @property disabled - if true the user won't be able to toggle the switch.
 * @returns
 */
export const NativeToggle: FC<ToggleProps> = ({
  isEnabled,
  handleToggle,
  trackColor,
  thumbColor,
  mainContainer,
  switchStyle,
  disabled,
  testID,
  accessibilityLabel,
}) => {
  const { theme } = useTheme();

  return (
    <View style={[{ backgroundColor: theme.primaryinvert }, mainContainer]}>
      <Switch
        trackColor={
          trackColor || {
            false: theme.primarycolor2_20,
            true: theme.secondarycolor10,
          }
        }
        style={[switchStyle]}
        thumbColor={thumbColor || theme.primarycolor4static}
        onValueChange={handleToggle}
        value={isEnabled}
        disabled={disabled}
        {...getAutomationProps(testID, accessibilityLabel, "toggle")}
      />
    </View>
  );
};
