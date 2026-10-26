import React from 'react'
import { StyleSheet, View } from "react-native"
import { Avatar, AvatarProps } from "../avatar/Avatar"
import { useTheme } from "../../context/theme/themeContext";
import { fontLarge, fontMediumLarge, fontWeightMedium, spacingM, spacingS, spacingXS } from "../../assets/styles/constants/size";
import { Text } from "../text/Text";
import fonts from "../../assets/styles/constants/fonts";
import { SkeletonBox } from "../skeleton/SkeletonBox";

interface PreloginPageTitleProps {
  avatarProps: AvatarProps;
  title: string;
  subtitle: string;
  loading?: boolean;
  textVariant?:string;
}

export const PreloginPageTitle: React.FC<PreloginPageTitleProps> = ({ avatarProps, title, subtitle, textVariant, loading }) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      paddingTop: spacingS,
      paddingBottom: spacingM,
      width: '100%',
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: spacingXS
    },
    title: {
      fontFamily: fonts.HSBC_Medium,
      fontWeight: fontWeightMedium,
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center"
    }
  });
  return loading ? (
    <View style={styles.container}>
      {avatarProps && <SkeletonBox shape='circle' size='large' />}
      <Text size={fontLarge} overrideStyles={styles.title}>{title}</Text>
      <SkeletonBox shape='line' size='small' overrideStyles={{ width: '50%'}}/>
    </View>
  ) : (
    <View style={styles.container}>
      {avatarProps && <Avatar {...avatarProps} />}
      <Text size={fontLarge} overrideStyles={styles.title} variant={textVariant}>{title}</Text>
      <Text size={fontMediumLarge} variant={textVariant}>{subtitle}</Text>
    </View>
  )
}
