import { I18nManager, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "../text/Text";
import { FC, ReactElement } from "react";
import {  fontSmallMedium, spacing1XS, spacingS } from "../../assets/styles/constants/size";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";

export interface DropdownScreenMenuItemProps {
  value: string | number;
  label: string;
  onPress?: (item: string | number) => void;
  icon?: ReactElement;
}

/**
 * Dropdown Screen Menu Item component
 * @property {string | number} value - Value of the item
 * @property {string} label - Label of the item
 * @property {(item: string | number) => void} onPress - Function to be called when the item is pressed
 * @property {ReactElement} icon - The icon to be displayed in the menu
 */
export const DropdownScreenMenuItem: FC<DropdownScreenMenuItemProps> = ({
    value,
    label,
    onPress,
    icon
}) => {
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      paddingVertical: spacing1XS,
      paddingHorizontal: spacingS,
    },
    textWrapper: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: spacingS,
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress && onPress(value)}>
      <View style={styles.textWrapper}>
        <Text size={fontSmallMedium} variant="primarycolor" overrideStyles={{maxWidth:actuatedNormalize(146),...(I18nManager.isRTL && { paddingBottom: actuatedNormalize(3) })}}>
          {label.toString()}
        </Text>
        {icon}
      </View>
    </TouchableOpacity>
  );
};