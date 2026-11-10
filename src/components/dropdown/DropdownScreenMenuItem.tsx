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
      maxWidth: "100%",
      minWidth: 0,
      alignSelf: "stretch",
      paddingVertical: spacing1XS,
      paddingHorizontal: spacingS,
    },
    textWrapper: {
      width: "100%",
      maxWidth: "100%",
      minWidth: 0,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: spacingS,
    },
    label: {
      flex: 1,
      minWidth: 0,
      ...(I18nManager.isRTL && { paddingBottom: actuatedNormalize(3) }),
    },
    iconSlot: {
      flexGrow: 0,
      flexShrink: 0,
      marginStart: "auto",
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress && onPress(value)}>
      <View style={styles.textWrapper}>
        <Text size={fontSmallMedium} variant="primarycolor" overrideStyles={styles.label}>
          {label.toString()}
        </Text>
        {icon ? <View style={styles.iconSlot}>{icon}</View> : null}
      </View>
    </TouchableOpacity>
  );
};