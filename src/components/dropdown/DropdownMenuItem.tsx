import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "../text/Text";
import { FC, useMemo } from "react";
import { fontSmall, spacingXXS } from "../../assets/styles/constants/size";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { SarFont } from "../sarFont/SarFont";
import { useTheme } from "../../context/theme/themeContext";
import { AutomationProps, getAutomationProps } from "../automationProps";

export interface DropdownMenuItemProps extends AutomationProps {
  value: string | number;
  label: string;
  onPress?: (item: string | number) => void;
  active?: string | number | null;
  withSar?: boolean;
}

/**
 * Dropdown menu item component
 * @property {string | number} value - Value of the item
 * @property {string} label - Label of the item
 * @property {(item: string | number) => void} onPress - Function to be called when the item is pressed
 * @property {string | number | null} active - Active item
 * @property {boolean} withSar - Whether to display SAR icon
 */
export const DropdownMenuItem: FC<DropdownMenuItemProps> = ({
  value,
  label,
  onPress,
  active,
  withSar = false,
  testID,
  accessibilityLabel,
}) => {
  const { theme } = useTheme();

  const isActive = useMemo(() => value === active, [value, active]);

  const styles = StyleSheet.create({
    container: {
      paddingVertical: spacingXXS,
      paddingHorizontal: isActive
        ? actuatedNormalize(10)
        : actuatedNormalize(12),
      width: "100%",
    },
    active: {
      backgroundColor: theme.strokeneutraltint,
      width: "100%",
    },
    textWrapper: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: spacingXXS,
    },
  });

  return (
    <TouchableOpacity
      style={[styles.container, isActive ? styles.active : null]}
      onPress={() => onPress && onPress(value)}
      disabled={isActive}
      {...getAutomationProps(testID, accessibilityLabel, label)}
    >
      <View style={styles.textWrapper}>
        {withSar && <SarFont size={fontSmall} variant="primarycolorstatic" />}
        <Text bold={isActive} size={fontSmall} variant="primarycolorstatic">
          {label.toString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
