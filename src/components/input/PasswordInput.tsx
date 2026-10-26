import React, { FC, useState } from "react";
import { TextFieldInput, TextFieldInputProps } from "./TextFieldInput";
import { TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import Password from "../icons/functionals/Password";
import PasswordOff from "../icons/functionals/PasswordOff";
import { getNestedAutomationProps } from "../automationProps";

export const PasswordInput: FC<TextFieldInputProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const Icon = showPassword ? Password : PasswordOff;

  const { theme } = useTheme();
  return (
    <TextFieldInput
      {...props}
      enablePassword={!showPassword}
      rightContent={
        <TouchableOpacity
          onPress={togglePassword}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={{ justifyContent: "center", alignItems: "center" }}
          {...getNestedAutomationProps(props, "visibility-toggle", "visibility-toggle")}
        >
          <Icon
            fill={
              props.disabled ? theme.primarycolor2_70 : theme.primarytextcolor
            }
          />
        </TouchableOpacity>
      }
    />
  );
};
