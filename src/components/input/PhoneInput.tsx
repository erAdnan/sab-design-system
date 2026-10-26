import React, { FC } from "react";
import { TextFieldInput, TextFieldInputProps } from "./TextFieldInput";
import { I18nManager, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import { Text } from "../text/Text";
import MobileProfile from "../icons/banking/MobileProfile";
import { Size } from "../../assets/styles";
import ChevronDown from "../icons/arrows/chevron/ChevronDown";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { getNestedAutomationProps } from "../automationProps";

interface PhoneInputProps extends TextFieldInputProps {
  countryCodeDisabled?: boolean;
  countryCodeShowFlag?: boolean;
  countryCodeFlagImg?: string;
  countryCodeShowIcon?: boolean;
  showContactNumber?: boolean;
  countryCode: string;
  phoneWidth?: number
  onCountryCodeIconPress?: () => void;
  onContactIconPress?: () => void;
}

/**
 * @property countryCodeDisabled: Boolean for disabled state of country code and icon
 * @property countryCodeShowFlag: Boolean for showing country flag on the left side of the country code
 * @property countryCodeFlagImg: URL for the country flag image
 * @property countryCodeShowIcon: Boolean for showing/hiding chevron down icon with onPress event
 * @property showContactNumber: Boolean for showing/hiding Mobile icon on the right side of the input
 * @property countryCode: String that represents the country code
 * @property onCountryCodeIconPress: Optional callback to handle Chevron icon press
 * @property onContactIconPress: Optional callback to handle contact mobile icon press
 * @property phoneWidth : use this props to show width of the phone input
 * */

export const PhoneInput: FC<PhoneInputProps> = ({
  countryCodeDisabled,
  countryCodeShowFlag,
  countryCodeFlagImg,
  countryCodeShowIcon,
  showContactNumber,
  countryCode,
  phoneWidth,
  onCountryCodeIconPress,
  onContactIconPress,
  ...props
}) => {
  const { theme } = useTheme();

  const getInputWidth = () => {
    if (!countryCode) {
      return undefined;
    }
  
    let baseWidth = phoneWidth || 90; // default base width when > 3 chars
    const codeLengthAdjustment = (countryCode.length - 2.5) * 4; // Reduce for long country code

    if (countryCodeShowFlag && countryCodeShowIcon) {
      baseWidth -= 8;
    }else if (countryCode && showContactNumber && countryCodeShowIcon) {
      baseWidth -= 20;
    }
     else if (countryCodeShowFlag || countryCodeShowIcon) {
      baseWidth -= 4;
    }

    return `${baseWidth - codeLengthAdjustment}%`;
  };

  return (
    <TextFieldInput
      {...props}
      inputTextWidthOverride={getInputWidth()}
      leftContent={
        <View style={styles.countryCode}>
          {countryCodeShowFlag && (
            <Image
              style={styles.countryCodeFlag}
              src={countryCodeFlagImg}
              alt="flag"
            />
          )}
          <View>
            <Text
              variant={
                props.disabled || countryCodeDisabled
                  ? "primarytextcolor2_70"
                  : "primarytextcolor"
              }
              overrideStyles={{
                textAlign: "center",
                lineHeight: actuatedNormalize(20),
                writingDirection: "ltr",
              }}
            >
              {countryCode}
            </Text>
          </View>

          {countryCodeShowIcon && (
            <TouchableOpacity
              onPress={() =>
                onCountryCodeIconPress &&
                !countryCodeDisabled &&
                !props.disabled &&
                onCountryCodeIconPress()
              }
              disabled={props.disabled || countryCodeDisabled}
              {...getNestedAutomationProps(props, "country-code", "country-code")}
            >
              <ChevronDown
                fill={
                  props.disabled || countryCodeDisabled
                    ? theme.primarycolor2_70
                    : theme.primarytextcolor
                }
              />
            </TouchableOpacity>
          )}
        </View>
      }
      rightContent={
        showContactNumber ? (
          <TouchableOpacity
            onPress={onContactIconPress}
            disabled={props.disabled}
            {...getNestedAutomationProps(props, "contact", "contact")}
          >
            <MobileProfile
              fill={
                props.disabled ? theme.primarycolor2_70 : theme.primarytextcolor
              }
            />
          </TouchableOpacity>
        ) : (
          <></>
        )
      }
    />
  );
};

const styles = StyleSheet.create({
  countryCode: {
    display: "flex",
    flexDirection: I18nManager.isRTL ? "row-reverse": "row",
    alignItems: "center",
    gap: Size.spacingXXS,
  },
  countryCodeFlag: {
    width: actuatedNormalize(14),
    height: actuatedNormalize(14),
    borderRadius: actuatedNormalize(7),
  },
});
