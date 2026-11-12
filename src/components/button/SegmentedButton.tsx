import { FC, ReactElement, useCallback, useState } from "react";
import { Platform, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import { Text } from "../text/Text";
import { Size } from "../../assets/styles";
import { fontMedium, lineHeightMedium, radiusS, spacingS, spacingXS, spacingXXS } from "../../assets/styles/constants/size";
import { ButtonSkeleton } from "./ButtonSkeleton";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { AutomationProps, getAutomationProps } from "../automationProps";
import { Badge, BadgeSize, BadgeType } from "../badge/Badge";

export interface SegmentedButtonEvent {
  onButtonPress: () => void;
  buttonText: string;
  icon?: ReactElement;
  badgeType?: BadgeType;
  disabled?: boolean;
  testID?: string;
  accessibilityLabel?: string;
}
export interface SegmentedButtonProps extends AutomationProps {
  count: 2 | 3;
  buttonOne: SegmentedButtonEvent;
  buttonTwo: SegmentedButtonEvent;
  buttonThree?: SegmentedButtonEvent;
  loading?: boolean;
  defaultActiveTab?: 1 | 2 | 3;
  /** When set, component is controlled and active tab follows this value */
  activeTab?: 1 | 2 | 3;
  /** Pill-style control: 100px corner radius; outer container and selected segment show a border */
  rounded?: boolean;
  /** When true, stretches to full width with equal-width segments */
  fullWidth?: boolean;
  /** Custom styles applied to the outer container */
  overrideStyles?: ViewStyle;
}
/** 
@property count - number of buttons in segment
@property buttonOne - First button to be rendered
@property buttonTwo - Second button to be rendered
@property buttonThree - Third button to be rendered (optional)
@property loading - boolean for showing the skeleton 
@property rounded - When true, pill-shaped segment (100px radius) with border on container and active segment
@property fullWidth - When true, stretches to full width with equal-width segments
@property overrideStyles - Custom styles applied to the outer container
*/
export const SegmentedButton: FC<SegmentedButtonProps> = ({
  count = 3,
  buttonOne,
  buttonTwo,
  buttonThree,
  loading = false,
  defaultActiveTab = 1,
  activeTab,
  rounded = false,
  fullWidth = false,
  overrideStyles,
  testID,
  accessibilityLabel,
}) => {
  const { theme, isDarkTheme } = useTheme();
  const pillBorderRadius = actuatedNormalize(100);
  const [internalActive, setInternalActive] = useState<number | null>(defaultActiveTab);
  const active = activeTab !== undefined ? activeTab : internalActive;

  const shadowStyle =
    !isDarkTheme &&
    (Platform.OS === "ios"
      ? {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 6,
        }
      : { elevation: 4 });

  const cornerRadius = rounded ? pillBorderRadius : Size.radiusS;
  const innerCornerRadius = rounded ? pillBorderRadius : radiusS;

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "flex-start",
      backgroundColor: theme.stylescolor7,
      borderRadius: cornerRadius,
      // Figma segmentedButton: 1px inner padding around the cells
      padding: 1,
    },
    containerFullWidth: {
      width: "100%",
      alignSelf: "stretch",
    },
    btnWrapper: {
      borderRadius: cornerRadius,
    },
    btnWrapperFullWidth: {
      flex: 1,
    },
    btnWrapperActive: {
      ...(shadowStyle || {}),
      backgroundColor: theme.primarywhite,
      borderRadius: cornerRadius,
    },
    // Figma .segmentedButtonCell: hugs its label (px 16 / py 8, 4 gap, 14/18 text), e.g. "Button" = 76 x 34
    btnGeneral: {
      minWidth: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: innerCornerRadius,
      paddingVertical: spacingXS,
      paddingHorizontal: spacingS,
    },
    btnIconOnly: {
      minWidth: actuatedNormalize(40),
      paddingHorizontal: spacingXS,
    },
    btnGeneralFullWidth: {
      // flex: 1,
      minWidth: 0,
      width: "100%",
    },
    labelRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: spacingXXS,
    },
  });

  const handleButtonPress = useCallback(
    (number: number, button: SegmentedButtonEvent) => {
      if (button.disabled) return;
      if (activeTab === undefined) setInternalActive(number);
      button.onButtonPress();
    },
    [activeTab]
  );

  const getButton = (number: number, button: SegmentedButtonEvent) => {
    return (
      <View style={[styles.btnWrapper, fullWidth && styles.btnWrapperFullWidth]}>
        <TouchableOpacity
          onPress={() => handleButtonPress(number, button)}
          {...getAutomationProps(
            button.testID ?? (testID ? `${testID}-${number}` : undefined),
            button.accessibilityLabel ?? (accessibilityLabel ? `${accessibilityLabel}-${number}` : undefined),
            button.buttonText
          )}
          style={[
            styles.btnGeneral,
            button.icon ? styles.btnIconOnly : null,
            fullWidth && styles.btnGeneralFullWidth,
            number === active
              ? [
                  styles.btnWrapperActive,
                  button.icon && { shadowOpacity: 0, elevation: 0 },
                ]
              : {},
          ]}
        >
          <View style={styles.labelRow}>
            {button.icon ?? (
              <Text size={fontMedium} overrideStyles={{ lineHeight: lineHeightMedium }}>{button.buttonText.toString()}</Text>
            )}
            {button.badgeType ? (
              <Badge size={BadgeSize.xs} type={button.badgeType} />
            ) : null}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return loading ? (
    <ButtonSkeleton
      overrideStyles={{ width: "100%", height: actuatedNormalize(48) }}
    />
  ) : (
    <View
      style={[
        styles.container,
        fullWidth && styles.containerFullWidth,
        overrideStyles,
      ]}
    >
      {getButton(1, buttonOne)}
      {getButton(2, buttonTwo)}
      {count === 3 && buttonThree && getButton(3, buttonThree)}
    </View>
  );
};
