import React, { ReactElement } from 'react'
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { fontSmallMedium, radiusS, spacing1XS, spacingXS } from "../../assets/styles/constants/size";
import { Text } from "../text/Text";

interface NewCategoryCardProps {
  icon: ReactElement;
  iconColor?: string;
  bgColor?: string;
  label: string
}

export const NewCategoryCard: React.FC<NewCategoryCardProps> = ({
  icon,
  iconColor,
  bgColor,
  label
}) => {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    container: {
      width: actuatedNormalize(110),
      display: 'flex',
      flexDirection: 'column',
      borderRadius: radiusS
    },
    iconContainer: {
      backgroundColor: bgColor ? theme[bgColor] : theme.tintstaticamber,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: actuatedNormalize(22),
      paddingHorizontal: actuatedNormalize(30),
      overflow: 'hidden',
      borderTopLeftRadius: radiusS,
      borderTopRightRadius: radiusS,
    },
    labelContainer: {
      paddingHorizontal: spacing1XS,
      paddingVertical: spacingXS,
      backgroundColor: theme.stylesblockbg,
      borderBottomLeftRadius: radiusS,
      borderBottomRightRadius: radiusS,
      height: actuatedNormalize(50),
      justifyContent: 'center',
      alignItems: 'flex-start'
    },
    icon: {
      height: actuatedNormalize(48),
      width: actuatedNormalize(48),
    }
  });

  const dynamicIcon = React.cloneElement(icon, {
    ...styles.icon,
    fill: iconColor ? theme[iconColor] : "#CC6C2A"
  })
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={{ paddingHorizontal: actuatedNormalize(12), paddingVertical: actuatedNormalize(4)}}>{dynamicIcon}</View>
      </View>
      <View style={styles.labelContainer}>
        <Text size={fontSmallMedium}>{label}</Text>
      </View>
    </View>
  )
}
