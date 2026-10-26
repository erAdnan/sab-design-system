import { cloneElement, FC, ReactElement, useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "../text/Text";
import { useTheme } from "../../context/theme/themeContext";
import { fontSmall, spacingXS } from "../../assets/styles/constants/size";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import NavItemSkeleton from "./NavItemSkeleton";
import { AutomationProps, getAutomationProps } from "../automationProps";

export interface NavItemProps extends AutomationProps {
  value: string | number;
  label: string;
  icon: ReactElement;
  onPress?: (item: string | number) => void;
  active?: string | number | null;
  loading?: boolean;
}

/**
 * Navigation Item Component
 * @property {string | number} value - Value
 * @property {string} label - Label
 * @property {ReactElement} icon - Icon
 * @property {(item: string | number) => void} onPress - Function to handle item press
 * @property {string | number | null} active - Active item
 */
export const NavItem: FC<NavItemProps> = ({
  value,
  label,
  icon,
  onPress,
  active,
  loading = false,
  testID,
  accessibilityLabel,
}) => {
  const { theme } = useTheme();

  const isActive = useMemo(() => value === active, [value, active]);

  const dynamicIcon = icon
    ? cloneElement(icon, {
        fill: theme.primarycolornav,
        filled: isActive,
      })
    : null;

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderTopWidth: actuatedNormalize(2),
      borderTopColor: isActive ? theme.primarycolor3 : "transparent",
    },
    active: {},
    iconWrapper: {
      marginTop: spacingXS,
    },
  });
  return loading ? (
    <NavItemSkeleton />
  ) : (
    <TouchableOpacity
      style={[styles.container, isActive ? styles.active : null]}
      onPress={() => onPress && onPress(value)}
      disabled={isActive}
      {...getAutomationProps(testID, accessibilityLabel, label)}
    >
      <View style={styles.iconWrapper}>{dynamicIcon}</View>
      <Text
        size={fontSmall}
        variant={isActive ? "primarycolor3" : "primarycolornav"}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};
