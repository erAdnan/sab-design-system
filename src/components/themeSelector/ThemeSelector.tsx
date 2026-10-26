import React, { useMemo } from 'react'
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { fontSmall, radiusS, spacingXS } from "../../assets/styles/constants/size";
import { Text } from "../text/Text";
import ThemeIcon from "../icons/functionals/ThemeIcon";
import { lightTheme } from "../../assets/styles/theme/light";

interface ThemeSelectorProps {
  type?: 'light' | 'dark' | 'foundingDay' | 'nationalDay';
  onPress?: (theme?: string) => void;
  label: string;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ type, onPress, label }) => {
  const { theme } = useTheme();

  const iconColor = useMemo(() => {
    switch (type) {
      case 'light':
        return theme.primarycolor2_100static;
      case 'dark':
        return theme.primarycolor2static;
      case 'foundingDay':
        return theme.complimentaryprimarycolor3_3;
        case 'nationalDay':
          return theme.secondarycolor10;
    }
  }, [type, theme]);

  const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: theme.primarycolor3,
      borderRadius: radiusS,
      padding: spacingXS,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      alignSelf: 'flex-start',
      gap: spacingXS,
    },
    selectorWrapper: {
      width: actuatedNormalize(72),
      height: actuatedNormalize(72),
      borderRadius: actuatedNormalize(36),
      backgroundColor: type === 'dark' ? theme.primarycolorstatic : lightTheme.stylesblockbg,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }
  }
  );
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress && onPress(type)}>
      <View style={styles.selectorWrapper}>
        <ThemeIcon fill={iconColor} />
      </View>
      <Text size={fontSmall}>{label}</Text>
    </TouchableOpacity>
  )
}
