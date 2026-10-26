import React, { FC } from "react";
import { TextFieldInput, TextFieldInputProps } from "./TextFieldInput";
import { View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import Send from "../icons/notifications/Send";
import { getNestedAutomationProps } from "../automationProps";

interface MessageInputProps extends TextFieldInputProps {
  onSendPress?: () => void;
}

export const MessageInput: FC<MessageInputProps> = ({
  onSendPress,
  ...props
}) => {
  const { theme } = useTheme();
  return (
    <TextFieldInput
      {...props}
      rightContent={
        <View {...getNestedAutomationProps(props, "send", "send")}>
          <Send
            fill={
              props.disabled ? theme.primarycolor2_70 : theme.primarytextcolor
            }
            onPress={() => onSendPress && onSendPress()}
          />
        </View>
      }
    />
  );
};
