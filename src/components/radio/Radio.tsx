import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useTheme } from "../../context/theme/themeContext";
import { I18nManager, StyleSheet, View } from "react-native";
import { Text } from "../text/Text";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import i18n from "i18next";
import { LanguageCodes } from "../../localization/languages";
import { FC } from "react";
import { AutomationProps, getAutomationProps } from "../automationProps";

export interface RadioButtonProps extends AutomationProps {
  value: string | number | boolean;
  text?: string;
  handleCheck?: (value: string | number | boolean) => void;
  checked?: string | number | boolean;
  disabled?: boolean;
}

/**
 * RadioButton component
 * @property value - value of the radio button
 * @property text - text to display next to the radio button
 * @property handleCheck - function to handle the radio button click
 * @property checked - value of the checked radio button
 * @property disabled - boolean to disable the radio button
 */
export const RadioButton: FC<RadioButtonProps> = ({
  value,
  text,
  handleCheck,
  checked,
  disabled,
  testID,
  accessibilityLabel,
}) => {
  const { theme } = useTheme();
  const isRtl = I18nManager.isRTL;

  return (
    <View style={[{ backgroundColor: "transparent" }, styles.container]}>
      {isRtl && text && (
        <View style={{ marginRight: actuatedNormalize(5) }}>
          <Text>{text}</Text>
        </View>
      )}
      <View style={{ width: actuatedNormalize(20) }}>
        <BouncyCheckbox
          size={20}
          fillColor="transparent"
          unFillColor={disabled ? theme.primarycolor2_30 : "transparent"}
          iconStyle={{ borderRadius: actuatedNormalize(50) }}
          iconComponent={
            <View
              style={{
                height: 14,
                width: 14,
                borderRadius: 7,
                backgroundColor:
                  checked === value
                    ? disabled
                      ? theme.primarycolor2_50
                      : theme.secondarycolor10
                    : "transparent",
              }}
            />
          }
          innerIconStyle={{
            borderWidth: 1,
            borderColor: disabled ? theme.primarycolor2_100static : theme.secondarycolor10,
            borderRadius: actuatedNormalize(50),
          }}
          onPress={() => {
            handleCheck && handleCheck(value);
          }}
          isChecked={checked === value}
          disabled={disabled}
          {...getAutomationProps(testID, accessibilityLabel, text?.toString())}
        />
      </View>
      {!isRtl && text && (
        <View style={{ marginLeft: actuatedNormalize(5) }}>
          <Text>{text}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
