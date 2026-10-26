import { FC } from "react";
import { I18nManager, StyleSheet, View } from "react-native";
import { NavItem, NavItemProps } from "./NavItem";
import { useTheme } from "../../context/theme/themeContext";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { LanguageCodes } from "../../localization/languages";
import i18n from "i18next";
import { spacingS } from "../../assets/styles/constants/size";
import { AutomationProps, getAutomationProps } from "../automationProps";

export interface BottomNavigationProps extends AutomationProps {
  items: NavItemProps[];
  onItemPress: (item: string | number) => void;
  active: string | number | null;
  setActive: (val: string | number) => void;
  overrideStyles?: any;
  loading?: boolean;
}

/**
 * Bottom Navigation Component
 * @property {NavItemProps[]} items - Navigation items
 * @property {(item: string | number) => void} onItemPress - Function to handle item press
 * @property {string | number | null} active - Active item
 * @property {(val: string | number) => void} setActive - Function to set active item
 * @property {any} overrideStyles - Override styles
 */
export const BottomNavigation: FC<BottomNavigationProps> = ({
  items,
  onItemPress,
  active,
  setActive,
  overrideStyles,
  loading = false,
  testID,
  accessibilityLabel,
}) => {
  const { theme } = useTheme();

  const isRtl = I18nManager.isRTL;

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: isRtl ? "row-reverse" : "row",
      alignItems: "center",
      justifyContent: "space-around",
      flexWrap: "nowrap",
      borderTopColor: theme.primarycolor2,
      borderTopWidth: actuatedNormalize(2),
      backgroundColor: loading ? theme.stylesblockbg : "transparent",
      padding: loading ? spacingS : 0,
    },
  });

  const handleItemPress = (val: string | number) => {
    setActive(val);
    onItemPress(val);
  };

  return (
    <View
      style={[styles.container, overrideStyles]}
      {...getAutomationProps(testID, accessibilityLabel)}
    >
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
  );
};
