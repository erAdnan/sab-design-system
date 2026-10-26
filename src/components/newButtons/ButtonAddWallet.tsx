import React from 'react'
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { fontMedium, fontXXSmall, lineHeightMedium, lineHeightSmall, lineHeightXXSmall, radiusS, spacingS, spacingXS, spacingXXS } from "../../assets/styles/constants/size";
import { Text } from "../text/Text";
import fonts from "../../assets/styles/constants/fonts";
import Wallet from "../icons/filled/Wallet";

interface ButtonAddWalletProps {
  text: string;
  text2: string;
  onButtonPress?: () => void;
}

export const ButtonAddWallet: React.FC<ButtonAddWalletProps> = ({
  text,
  text2,
  onButtonPress
}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      height: actuatedNormalize(38),
      backgroundColor: theme.primarycolor,
      borderColor: theme.primarycolor2,
      borderRadius: radiusS,
      borderWidth: 1,
      display: 'flex',
      flexDirection: 'row',
      gap: actuatedNormalize(12),
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: spacingS,
      paddingVertical: spacingXS,
      alignSelf: 'flex-start'
    },
    textContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    }
  })
  return (
    <TouchableOpacity onPress={onButtonPress} style={styles.container}>
      <Wallet fill={theme.primarytextcolor4} />
      <View style={styles.textContainer}>
        <Text size={fontXXSmall} variant="primarytextcolor4" overrideStyles={{ lineHeight: lineHeightXXSmall}}>{text}</Text>
        <Text size={fontMedium} overrideStyles={{ fontFamily: fonts.HSBC_Medium, lineHeight: lineHeightSmall}} variant="primarytextcolor4">{text2}</Text>
      </View>
    </TouchableOpacity>
  )
}
