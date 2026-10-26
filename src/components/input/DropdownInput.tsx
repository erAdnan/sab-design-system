import React, { FC } from "react";
import { TextFieldInput, TextFieldInputProps } from "./TextFieldInput";
import { I18nManager, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import ChevronDown from "../icons/arrows/chevron/ChevronDown";
import { spacingXS } from "../../assets/styles/constants/size";
import { getAutomationProps, getNestedAutomationProps } from "../automationProps";

interface DropdownInputProps extends TextFieldInputProps {
  onChevronIconPress?: () => void;
  onItemClick?: () => void;
  icon?: React.ReactElement;
}

export const DropdownInput: FC<DropdownInputProps> = ({
  onChevronIconPress,
  onItemClick,
  icon,
  ...props
}) => {
  const { theme } = useTheme();
  const Wrapper: React.ElementType = onItemClick ? TouchableOpacity : View;
  const widthCheck = icon ? "90%" : I18nManager.isRTL ? "100%" : "98%";  // when we have left content and right content we ues 80% otherwise 95%
  return (
    <Wrapper
      onPress={!props.disabled ? onItemClick : undefined}
      disabled={props.disabled}
      {...getAutomationProps(props.testID, props.accessibilityLabel, props.label ?? props.placeholder)}
    >
      <TextFieldInput
        {...props}
        editable={false}
        leftContent={icon ? <View style={{ alignSelf: 'center' }}>{icon}</View> : <></>}
        overrideInputStyle={{ marginRight: I18nManager.isRTL ? undefined : -spacingXS}}
        inputTextWidthOverride={widthCheck}
        rightContent={
          <TouchableOpacity
            onPress={() => {
              if (props.disabled) return;
              (onChevronIconPress ?? onItemClick)?.();
            }}
            disabled={props.disabled}
            hitSlop={spacingXS}
            {...getNestedAutomationProps(props, "chevron", "chevron")}
          >
            <ChevronDown
              fill={
                props.disabled ? theme.primarycolor2_70 : theme.primarytextcolor
              }
            />
          </TouchableOpacity>
        }
        truncateText
      />
    </Wrapper>
  );
};
