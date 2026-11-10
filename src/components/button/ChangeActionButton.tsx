import { FC } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  fontMedium,
  fontSmallMedium,
  radiusS,
  spacingS,
  spacingXS,
  spacingXXS,
} from "../../assets/styles/constants/size";
import { useTheme } from "../../context/theme/themeContext";
import { Text } from "../text/Text";
import ChevronDown from "../icons/arrows/chevron/ChevronDown";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { AutomationProps, getAutomationProps } from "../automationProps";

interface ChangeActionButtonProps extends AutomationProps {
  text: string;
  onButtonPress: () => void;
  extraContent?: string;
  overrideStyles?: any;
  variant?: string;
  chevronFill?:string;
  loading?: boolean;
}

/**
 * ChangeActionButton component
 * @prop {string} text - Text to display on the button
 * @prop {() => void} onButtonPress - Function to call when the button is pressed
 * @prop {string} extraContent - Extra content to display on the button
 * @prop {any} overrideStyles - Override styles for the button
 * @prop {string} variant - string for change the color of the text
 * @prop {string} chevronFill - string for change the color of the chevron icon
 * @prop {boolean} loading - boolean for showing the skeleton
 */
export const ChangeActionButton: FC<ChangeActionButtonProps> = ({
  text,
  onButtonPress,
  extraContent,
  overrideStyles,
  variant,
  chevronFill,
  loading = false,
  testID,
  accessibilityLabel,
}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignContent: "center",
      justifyContent: "space-between",
      paddingHorizontal: spacingS,
      paddingVertical: spacingXXS,
      backgroundColor: theme.stylesblockbg,
      borderRadius: radiusS,
      width: "100%",
      maxWidth: "100%",
      minWidth: 0,
      alignSelf: "stretch",
    },
    textWrapper: {
      flex: 1,
      width: "100%",
      minWidth: 0,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: spacingXS,
    },
  });

  return (
    <View style={[styles.container, overrideStyles]}>
      <TouchableOpacity
        onPress={onButtonPress}
        style={styles.textWrapper}
        {...getAutomationProps(testID, accessibilityLabel, text)}
      >
        <Text variant={variant}  bold size={fontMedium} loading={loading} textWidth={80}>
          {text}
        </Text>
        {extraContent && (
          <Text variant={variant} size={fontSmallMedium} loading={loading} textWidth={80}>
            {extraContent}
          </Text>
        )}
        {loading ? (
          <SkeletonBox
            size="small"
            shape="line"
            overrideStyles={{
              width: actuatedNormalize(24),
            }}
          />
        ) : (
          <ChevronDown fill={chevronFill ?? theme.primarytextcolor} />
        )}
      </TouchableOpacity>
    </View>
  );
};
