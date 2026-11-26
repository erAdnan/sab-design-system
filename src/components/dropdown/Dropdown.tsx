import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { DropdownMenuItem, DropdownMenuItemProps } from "./DropdownMenuItem";
import {
  radiusS,
  spacingS,
  spacingXXS,
} from "../../assets/styles/constants/size";
import { useTheme } from "../../context/theme/themeContext";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import DropdownAddon from "../icons/dropdown/DropdownAddon";
import { AutomationProps, getAutomationProps, getNestedAutomationProps } from "../automationProps";

export interface DropdownProps extends AutomationProps {
  items: DropdownMenuItemProps[];
  onItemPress: (item: string | number) => void;
  active: string | number | null;
  setActive: (val: string | number) => void;
  addonPosition?: "left" | "right";
  overrideStyles?: any;
}

/**
 * Dropdown component
 * @property {DropdownMenuItemProps[]} items - List of items to be displayed in the dropdown
 * @property {(item: string | number) => void} onItemPress - Function to be called when an item is pressed
 * @property {string | number | null} active - Active item
 * @property {(val: string | number) => void} setActive - Function to set the active item
 * @property {any} overrideStyles - Override styles for the dropdown
 */
export const Dropdown: FC<DropdownProps> = ({
  items,
  onItemPress,
  active,
  setActive,
  addonPosition = "right",
  overrideStyles,
  testID,
  accessibilityLabel,
}) => {
  const { theme } = useTheme();

  const handleItemPress = (val: string | number) => {
    setActive(val);
    onItemPress(val);
  };

  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      top: actuatedNormalize(40),
      left: actuatedNormalize(10),
    },
    dropdownShadow: {
      shadowColor: theme.primarycolorstatic,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.8,
    },
    dropdownAddonLeft: {
      position: "absolute",
      top: -actuatedNormalize(5),
      left: spacingS,
    },
    dropdownAddonRight: {
      position: "absolute",
      top: -actuatedNormalize(5),
      right: spacingS,
    },
    listContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: spacingXXS,
      borderRadius: radiusS,
      flex: 1,
      backgroundColor: theme.primarycolor4static,
      shadowColor: theme.primarycolorstatic,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 6,
    },
  });

  return (
    <View
      style={[styles.container, overrideStyles]}
      {...getAutomationProps(testID, accessibilityLabel)}
    >
      <View
        style={[
          styles.dropdownShadow,
          addonPosition === "left"
            ? styles.dropdownAddonLeft
            : styles.dropdownAddonRight,
        ]}
      >
        <DropdownAddon />
      </View>
      <View style={[styles.listContainer, { width: "100%" }]}>
        {/*
          Plain map — not FlatList. Device Storybook wraps the canvas in a
          ScrollView; nesting VirtualizedList there logs a hard console error.
          Dropdown menus are short, so windowing is unnecessary.
        */}
        {items.map((item, index) => (
          <DropdownMenuItem
            key={`${String(item.value)}-${index}`}
            {...item}
            onPress={handleItemPress}
            active={active}
            {...getNestedAutomationProps(
              { testID, accessibilityLabel },
              String(item.value),
              item.label
            )}
          />
        ))}
      </View>
    </View>
  );
};
