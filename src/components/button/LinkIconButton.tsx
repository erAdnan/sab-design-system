import React, { cloneElement, FC, ReactElement } from "react";
import { TouchableOpacity } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import { AutomationProps, getAutomationProps } from "../automationProps";

export interface LinkIconButtonProps extends AutomationProps {
  icon: ReactElement;
  onButtonPress: () => void;
  disabled?: boolean;
  overrideStyles?: any;
  loading?: boolean;
}

/**
 * Button Component
 * @property icon: Icon component to be displayed as button icon
 * @property onButtonPress: Event handler for button press
 * @property disabled: When true, button is not clickable, background and border color is changed to indicate the state. Default is false
 * @property overrideStyles: Applies new styling settings that will override the default ones
 * @property loading - boolean for showing the skeleton
 */

export const LinkIconButton: FC<LinkIconButtonProps> = ({
  icon,
  onButtonPress,
  disabled = false,
  overrideStyles,
  loading,
  testID,
  accessibilityLabel,
}) => {
  const { theme } = useTheme();

  const dynamicIcon = cloneElement(icon, {
    fill: disabled ? theme.primarycolor2_30 : theme.primarycolor3,
  });

  return loading ? (
    <SkeletonBox shape="square" size="small" />
  ) : (
    <TouchableOpacity
      onPress={onButtonPress}
      disabled={disabled}
      style={overrideStyles}
      {...getAutomationProps(testID, accessibilityLabel)}
    >
      {dynamicIcon}
    </TouchableOpacity>
  );
};
