import { cloneElement, FC, ReactElement, useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "../text/Text";
import { useTheme } from "../../context/theme/themeContext";
import {
  fontXXSmall,
  lineHeightXXSmall,
  spacingXXS,
} from "../../assets/styles/constants/size";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import NavItemSkeleton from "./NavItemSkeleton";
import { AutomationProps, getAutomationProps } from "../automationProps";

/**
 * Figma "New Bottom Nav" > .navtab (node 17299:3257 / 16489:21020)
 * - Tab height 52, min width 56 (fills the 310 wide tabs group)
 * - Selected tab: 65 min width, light gray fill, 40 radius, red icon + Medium label
 * - .navItem: padding-top 4, padding-x 4, 24px icon, 10/14 label (fontSize-XXSmall / lineHeight-XXSmall)
 */
export const NAV_TAB_HEIGHT = 52;
export const NAV_TAB_MIN_WIDTH = 56;
export const NAV_TAB_SELECTED_MIN_WIDTH = 65;
const NAV_TAB_RADIUS = 40;

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
    ? cloneElement(icon as ReactElement<any>, {
        fill: isActive ? theme.primarycolor3 : theme.primarycolornav,
        filled: isActive,
      })
    : null;

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
      height: actuatedNormalize(NAV_TAB_HEIGHT),
      minWidth: actuatedNormalize(
        isActive ? NAV_TAB_SELECTED_MIN_WIDTH : NAV_TAB_MIN_WIDTH
      ),
      alignItems: "center",
      justifyContent: "center",
      borderRadius: actuatedNormalize(NAV_TAB_RADIUS),
      backgroundColor: isActive
        ? theme.styleslightgray ?? theme.stylesblockbg
        : "transparent",
      overflow: "hidden",
    },
    content: {
      flexDirection: "column",
      alignItems: "center",
      paddingTop: spacingXXS,
      paddingHorizontal: spacingXXS,
    },
    label: {
      lineHeight: lineHeightXXSmall,
      textAlign: "center",
    },
  });

  return loading ? (
    <NavItemSkeleton />
  ) : (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress && onPress(value)}
      disabled={isActive}
      {...getAutomationProps(testID, accessibilityLabel, label)}
    >
      <View style={styles.content}>
        {dynamicIcon}
        <Text
          size={fontXXSmall}
          variant={isActive ? "primarycolor3" : "primarycolornav"}
          medium={isActive}
          overrideStyles={styles.label}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
