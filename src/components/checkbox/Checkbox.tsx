import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useTheme } from "../../context/theme/themeContext";
import { I18nManager, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { Text,TextProps } from "../text/Text";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { FC } from "react";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import { AutomationProps, getAutomationProps } from "../automationProps";

export interface CheckboxProps extends AutomationProps {
  text?: string;
  clickableText?: string;
  handleCheck?: (isChecked: boolean) => void;
  isChecked?: boolean;
  disabled?: boolean;
  nonInteractive?: boolean;
  onTermsPress?: () => void;
  innerIconStyle?: ViewStyle;
  loading?: boolean;
  overrideStyles?: any;
  textProps?: TextProps;
}

/**
 *
 * @property text - Text for checkbox label
 * @property clickableText - Text for the clickable part of checkbox label
 * @property handleCheck - Handler for check event
 * @property isChecked - State of the checkbox, boolean
 * @property disabled - Boolean for disabled state
 * @property nonInteractive - disables touch events but keeps normal visual style (unlike disabled)
 * @property onTermsPress - Handler for pressing on the clickable text
 * @property loading - Boolean for showing skeleton
 * @property innerIconStyle - use for the disable case pass innerIconStyle={{ borderWidth: 1, borderRadius: 4 }} like this to achive achive tick mark with disable case
 * @property overrideStyles - use this overridestyle for checkbox align flex start .
 * @property textProps – Use this prop to customize the checkbox label text (such as color, size, and other accessible text styling options) through the Text component.
 */

export const Checkbox: FC<CheckboxProps> = ({
  text,
  clickableText,
  handleCheck,
  isChecked,
  disabled,
  nonInteractive,
  onTermsPress,
  innerIconStyle,
  loading = false,
  overrideStyles,
  textProps,
  testID,
  accessibilityLabel,
}) => {
  const { theme } = useTheme();

  const renderText = () => {
    if (!clickableText) {
      return <Text overrideStyles={{ ...(I18nManager.isRTL && { paddingBottom: actuatedNormalize(3) }),}} {...textProps}>{text}</Text>;
    }

    return (
      <View
        style={[
          styles.textWrapper,
          {
            gap: actuatedNormalize(2),
          },
        ]}
      >
        <Text overrideStyles={styles.regularText}>{text}</Text>
        <TouchableOpacity onPress={onTermsPress}>
          <Text overrideStyles={styles.clickableText} {...textProps}>{clickableText}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handlePress = (isChecked: boolean) => {
    if (nonInteractive) return;
    handleCheck && handleCheck(isChecked);
  };


  return (
    <View
      style={[
        { backgroundColor: "transparent" },
        styles.container,
        overrideStyles,
        nonInteractive && { opacity: 1 },
      ]}
      pointerEvents={nonInteractive ? "none" : "auto"}
    >
      {loading ? (
        <SkeletonBox shape="square" size="small" />
      ) : (
        <View style={{ width: actuatedNormalize(20) }}>
          <BouncyCheckbox
            size={20}
            fillColor={
              disabled ? theme.primarycolor2_30static : theme.secondarycolor10
            }
            unFillColor={
              disabled ? theme.primarycolor2_30static : "transparent"
            }
            iconStyle={{ borderRadius: 4,...(disabled && { borderWidth: 1, borderColor: theme.primClr,}), }}
            innerIconStyle={
              innerIconStyle ??
              (disabled
                ? { display: "none" }
                : { borderWidth: 1, borderRadius: 4 })
            }
            onPress={handlePress}
            isChecked={isChecked}
            disabled={disabled}
            {...getAutomationProps(testID, accessibilityLabel, text)}
          />
        </View>
      )}

      <View style={{ marginLeft: actuatedNormalize(5), flexShrink: 1 }}>
        {loading ? (
          <SkeletonBox
            shape="line"
            size="small"
            overrideStyles={{
              height: actuatedNormalize(4),
              width: actuatedNormalize(64),
              alignSelf: "flex-center",
            }}
          />
        ) : (
          renderText()
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  textWrapper: {
    flexDirection: "row",
    flexWrap: "wrap", // Ensures text wraps properly
    alignItems: "center", // Aligns items properly
  },
  regularText: {
    textDecorationLine: "none", // Normal text styling
  },
  clickableText: {
    textDecorationLine: "underline", // Underlined clickable text
  },
});
