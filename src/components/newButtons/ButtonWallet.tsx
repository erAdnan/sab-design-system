import React, { useMemo } from 'react'
import { StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { fontMediumLarge, radiusS, spacingS, spacingXS } from "../../assets/styles/constants/size";
import { Text } from "../text/Text";
import fonts from "../../assets/styles/constants/fonts";
import GooglePay from "../logos/wallet/GooglePay";
import SamsungWallet from "../logos/wallet/SamsungWallet";
import ApplePay from "../logos/wallet/ApplePay";
import AlAwaalPay from "../logos/wallet/AlAwaalPay";

interface ButtonWalletProps {
  usage: 'selection' | 'cta',
  type: 'google' | 'apple' | 'samsung' | 'alawaal' | "google-small",
  text?: string;
  onButtonPress: () => void;
}

export const ButtonWallet: React.FC<ButtonWalletProps> = ({
  usage,
  type,
  text,
  onButtonPress
}) => {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    container: {
      width: type === 'google-small' ? actuatedNormalize(148) : actuatedNormalize(343),
      height: actuatedNormalize(48),
      borderRadius: type === 'google' || type === 'google-small' ? 50 : radiusS,
      paddingHorizontal: spacingS,
      paddingVertical: spacingXS,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacingXS,
     
    },
    selection: {
      borderWidth: 1,
      backgroundColor: theme.primarycolor4,
      borderColor: theme.primarycolor
    },
    cta: {
      backgroundColor: theme.primarycolor
    }
  });

  const isSelection = useMemo(() => {
    return usage === 'selection'
  }, [usage]);

  const icon = useMemo(() => {
    switch (type) {
      case 'alawaal':
        return <AlAwaalPay fill={isSelection ? theme.primarycolor3 : theme.primarytextcolor4} />;
      case 'apple':
        return <ApplePay fill={isSelection ? theme.primarytextcolor : theme.primarytextcolor4} />;
      case 'samsung':
        return <SamsungWallet fill={isSelection ? theme.primarytextcolor : theme.primarytextcolor4} />;
      case 'google':
        return <GooglePay fill={isSelection ? theme.primarytextcolor : theme.primarytextcolor4} />
      
      case 'google-small':
        return <GooglePay fill={isSelection ? theme.primarytextcolor : theme.primarytextcolor4} />
    }
  }, [type, theme, isSelection])
  return (
    <TouchableOpacity style={isSelection ? [styles.container, styles.selection] : [styles.container, styles.cta]} onPress={onButtonPress}>
      {text && <Text size={fontMediumLarge} overrideStyles={{ fontFamily: fonts.HSBC_Medium }} variant={isSelection ? 'primarytextcolor' : 'primarytextcolor4'}>{text}</Text>}
      {icon}
    </TouchableOpacity>
  )
}
