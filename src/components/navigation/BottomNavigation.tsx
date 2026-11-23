import { FC } from "react";
import { I18nManager, Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavItem, NavItemProps } from "./NavItem";
import { useTheme } from "../../context/theme/themeContext";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { spacingXS } from "../../assets/styles/constants/size";
import { AutomationProps, getAutomationProps } from "../automationProps";

/**
 * Figma "New Bottom Nav" (nodes 17299:3252 dev spec, 16489:31088 variants)
 * - Container: 375 wide screen, 8px horizontal padding, 8px gap above the home indicator / safe area
 * - Navbar pill: 333 x 58, fully rounded (radius 1000), 90% white fill, soft drop shadow
 * - Tabs group: 310 wide, tabs 52 high (3px top/bottom inside the pill)
 */
const NAVBAR_WIDTH = 333;
const NAVBAR_HEIGHT = 58;
const NAVBAR_RADIUS = 1000;
const TABS_GROUP_WIDTH = 310;
const TABS_GROUP_VERTICAL_PADDING = 3;

export interface BottomNavigationProps extends AutomationProps {
  items: NavItemProps[];
  onItemPress: (item: string | number) => void;
  active: string | number | null;
  setActive: (val: string | number) => void;
  overrideStyles?: any;
  loading?: boolean;
  /** Adds the bottom safe-area inset (home indicator) below the navbar. Defaults to true. */
  safeArea?: boolean;
}

/**
 * Bottom Navigation Component
 * @property {NavItemProps[]} items - Navigation items
 * @property {(item: string | number) => void} onItemPress - Function to handle item press
 * @property {string | number | null} active - Active item
 * @property {(val: string | number) => void} setActive - Function to set active item
 * @property {any} overrideStyles - Override styles
 * @property {boolean} safeArea - Reserve the bottom safe-area inset below the navbar (default true)
 */
export const BottomNavigation: FC<BottomNavigationProps> = ({
  items,
  onItemPress,
  active,
  setActive,
  overrideStyles,
  loading = false,
  safeArea = true,
  testID,
  accessibilityLabel,
}) => {
  const { theme } = useTheme();

  const isRtl = I18nManager.isRTL;

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      alignItems: "center",
      paddingHorizontal: spacingXS,
      paddingBottom: spacingXS,
    },
    navbar: {
      width: actuatedNormalize(NAVBAR_WIDTH),
      maxWidth: "100%",
      height: actuatedNormalize(NAVBAR_HEIGHT),
      borderRadius: NAVBAR_RADIUS,
      backgroundColor: theme.styleshdscrollbgshades,
      alignItems: "center",
      justifyContent: "center",
      // Figma drop shadow: 0 2 30 rgba(0,0,0,0.05), 0 8 72 -5 rgba(0,0,0,0.1)
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.1,
      shadowRadius: 30,
      elevation: Platform.OS === "android" ? 8 : 0,
    },
    tabsGroup: {
      width: actuatedNormalize(TABS_GROUP_WIDTH),
      maxWidth: "100%",
      flexDirection: isRtl ? "row-reverse" : "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: actuatedNormalize(TABS_GROUP_VERTICAL_PADDING),
    },
  });

  const handleItemPress = (val: string | number) => {
    setActive(val);
    onItemPress(val);
  };

  const Container = safeArea ? SafeAreaView : View;
  const containerProps = safeArea ? { edges: ["bottom" as const] } : {};

  return (
    <Container
      style={[styles.container, overrideStyles]}
      {...containerProps}
      {...getAutomationProps(testID, accessibilityLabel)}
    >
      <View style={styles.navbar}>
        <View style={styles.tabsGroup}>
          {items &&
            items.map((item, index) => (
              <NavItem
                key={index}
                {...item}
                onPress={handleItemPress}
                active={active}
                loading={loading}
                testID={item.testID ?? (testID ? `${testID}-${item.value}` : undefined)}
                accessibilityLabel={
                  item.accessibilityLabel ??
                  (accessibilityLabel ? `${accessibilityLabel}-${item.value}` : item.label)
                }
              />
            ))}
        </View>
      </View>
    </Container>
  );
};
