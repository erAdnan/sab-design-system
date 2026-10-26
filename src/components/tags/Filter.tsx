import React, { FC, ReactElement, useMemo } from 'react';
import { useTheme } from "../../context/theme/themeContext";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { fontMedium, radiusS, spacingS, spacingXS } from "../../assets/styles/constants/size";
import { Text } from "../text/Text";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";

export interface FilterTagProps {
  label: string;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  selected?: boolean;
  onPress?: () => void;
}

export const Filter: FC<FilterTagProps> = ({
  label,
  leftIcon,
  rightIcon,
  selected = false,
  onPress
}) => {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: selected ? theme.primarycolorstatic : theme.tintneutral,
      paddingHorizontal: spacingXS,
      paddingVertical: spacingS,
      display: 'flex',
      flexDirection: 'row',
      borderRadius: radiusS,
      gap: spacingXS,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-start'
    }
  });
  const dynamicLeftIcon = useMemo(
      () => leftIcon
      ? React.cloneElement(leftIcon, {
        fill: selected ? theme.primarycolor4static : theme.primarycolorstatic,
        width: actuatedNormalize(16),
        height: actuatedNormalize(16),
      })
      : null,
    [leftIcon, selected]);
  
  const dynamicRightIcon = useMemo(
      () => rightIcon
      ? React.cloneElement(rightIcon, {
        fill: selected ? theme.primarycolor4static : theme.primarycolorstatic,
        width: actuatedNormalize(16),
        height: actuatedNormalize(16),
      })
      : null,
    [rightIcon, selected]);
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.container}>
        {dynamicLeftIcon}
        <Text size={fontMedium} variant={selected ? "primarycolor4static" : "primarycolor"}>{label}</Text>
        {dynamicRightIcon}
      </View>
    </TouchableOpacity>
  )
}
