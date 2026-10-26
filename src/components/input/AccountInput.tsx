import React, { FC } from "react";
import { Platform, Text as RNText, View } from "react-native";
import { TextFieldInput, TextFieldInputProps } from "./TextFieldInput";
import QRCode from "../icons/banking/QRCode";
import { useTheme } from "../../context/theme/themeContext";
import { Size } from "../../assets/styles";
import fonts from "../../assets/styles/constants/fonts";
import {
  fontMediumLarge,
  lineHeightMediumLarge,
} from "../../assets/styles/constants/size";
import { getNestedAutomationProps } from "../automationProps";

interface AccountInputProps extends TextFieldInputProps {
  showQR?: boolean;
  showSA?: boolean;
  onQRPress?: () => void;
}

/**
 * @property showQR: Boolean for displaying the QR icon
 * @property showSA: Boolean for showing SA before input text
 * @property onQRPress: Optional callback for handling the QR icon press event
 **/

export const AccountInput: FC<AccountInputProps> = ({
  showQR,
  showSA,
  onQRPress,
  ...props
}) => {
  const { theme } = useTheme();
  const prefixColor = props.disabled
    ? theme.primarytextcolor2_70
    : theme.primarytextcolor;

  return (
    <TextFieldInput
      {...props}
      textBoxStyle={[
        showSA
          ? {
              flex: 1,
              alignItems: "center",
              alignSelf: "stretch",
            }
          : null,
        props.textBoxStyle,
      ]}
      overrideInputStyle={
        showSA
          ? {
              // Avoid height:"100%" + lineHeight mismatch that drops typed text below SA.
              height: lineHeightMediumLarge,
              lineHeight: lineHeightMediumLarge,
              paddingTop: 0,
              paddingBottom: 0,
              includeFontPadding: false,
              ...(Platform.OS === "android"
                ? { textAlignVertical: "center" as const }
                : null),
              ...props.overrideInputStyle,
            }
          : props.overrideInputStyle
      }
      leftContent={
        showSA ? (
          <View
            style={{
              height: lineHeightMediumLarge,
              marginRight: Size.spacingS,
              justifyContent: "center",
            }}
          >
            <RNText
              style={{
                color: prefixColor,
                fontFamily: fonts.HSBC,
                fontSize: fontMediumLarge,
                lineHeight: lineHeightMediumLarge,
                includeFontPadding: false,
                textAlignVertical: "center",
              }}
            >
              SA
            </RNText>
          </View>
        ) : undefined
      }
      rightContent={
        showQR ? (
          <View {...getNestedAutomationProps(props, "qr", "qr")}>
            <QRCode
              onPress={() => onQRPress && onQRPress()}
              fill={
                props.disabled ? theme.primarycolor2_70 : theme.primarycolor3
              }
            />
          </View>
        ) : undefined
      }
    />
  );
};
