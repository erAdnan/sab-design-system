import React, { FC } from "react";
import { I18nManager, TouchableOpacity } from "react-native";
import { TextFieldInput, TextFieldInputProps } from "./TextFieldInput";
import { useTheme } from "../../context/theme/themeContext";
import Calendar from "../icons/banking/Calendar";
import { getNestedAutomationProps } from "../automationProps";

interface DateInputProps extends TextFieldInputProps {
  onCalendarIconPress?: () => void;
}

export const DateInput: FC<DateInputProps> = ({
  onCalendarIconPress,
  ...props
}) => {
  const { theme } = useTheme();
  const isRtl = I18nManager.isRTL;

  const calendarIcon = (
    <TouchableOpacity
      onPress={onCalendarIconPress}
      disabled={props.disabled}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      {...getNestedAutomationProps(props, "calendar", "calendar")}
    >
      <Calendar
        fill={
          props.disabled ? theme.primarycolor2_70 : theme.primarytextcolor
        }
      />
    </TouchableOpacity>
  );

  // LTR: calendar on the right (rightContent) — unchanged.
  // RTL: calendar on the left (leftContent). Use flex width so TextFieldInput's
  // default 85% leftContent width doesn't leave a large empty gap on the right.
  return (
    <TextFieldInput
      {...props}
      leftContent={isRtl ? calendarIcon : props.leftContent}
      rightContent={isRtl ? props.rightContent : calendarIcon}
      textBoxStyle={{ flex: 1, ...props.textBoxStyle }}
      inputTextWidthOverride={
        props.inputTextWidthOverride ?? (isRtl ? ("auto" as const) : undefined)
      }
      overrideInputStyle={{
        ...(isRtl ? { flex: 1 } : null),
        ...(props.overrideInputStyle as object | undefined),
      }}
    />
  );
};
