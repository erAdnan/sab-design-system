import React from 'react'
import ImageThumbnail, { ImageThumbnailProps } from "../imageThumbnail/ImageThumbnail"
import { useTheme } from "../../context/theme/themeContext";
import { StyleSheet, View } from "react-native";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { Text } from "../text/Text";
import { fontLarge, spacingS, spacingXS } from "../../assets/styles/constants/size";
import fonts from "../../assets/styles/constants/fonts";
import { Checkbox, CheckboxProps } from "../checkbox/Checkbox";

interface FlagListItemProps {
  circleImageProps?: ImageThumbnailProps;
  rectImageProps?: ImageThumbnailProps;
  countryName: string;
  showDivider?: boolean;
  showAction?: boolean;
  checkboxProps?: CheckboxProps;
}

export const FlagListItem: React.FC<FlagListItemProps> = ({
  circleImageProps,
  rectImageProps,
  countryName,
  showDivider,
  showAction,
  checkboxProps
}) => {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    container: {
      paddingVertical: spacingS,
      width: "100%",
      maxWidth: "100%",
      minWidth: 0,
      alignSelf: "stretch",
      display: 'flex',
      flexDirection: 'row',
      gap: spacingXS,
      borderBottomWidth: showDivider ? 1 : 0,
      borderBottomColor: theme.primarycolor2_20,
      alignItems: 'center'
    },
    placeholderCircle: {
      width: actuatedNormalize(24),
      height: actuatedNormalize(24),
      borderRadius: actuatedNormalize(24),
      backgroundColor: theme.primarycolor2_10
    },
    placeholderRect: {
      width: actuatedNormalize(32),
      height: actuatedNormalize(20),
      borderRadius: actuatedNormalize(2),
      backgroundColor: theme.primarycolor2_10
    },
    countryName: {
      fontFamily: fonts.HSBC_Medium,
      flex: 1,
      minWidth: 0,
    },
    actionContainer: {
      marginStart: 'auto',
      flexGrow: 0,
      flexShrink: 0,
    }
  })
  return (
    <View style={styles.container}>
      {circleImageProps ?
        <ImageThumbnail
          width={actuatedNormalize(24)}
          height={actuatedNormalize(24)}
          overrideImageStyles={{ borderRadius: actuatedNormalize(24) }}
          overrideStyles={{ borderRadius: actuatedNormalize(24) }}
          url={circleImageProps.url}
          isAbsolutePath={circleImageProps.isAbsolutePath}
        />
        : <View style={styles.placeholderCircle}></View>
      }
      {rectImageProps ?
        <ImageThumbnail
          width={actuatedNormalize(32)}
          height={actuatedNormalize(20)}
          overrideImageStyles={{ borderRadius: actuatedNormalize(2) }}
          overrideStyles={{ borderRadius: actuatedNormalize(2) }}
          url={rectImageProps.url}
          isAbsolutePath={rectImageProps.isAbsolutePath}
        />
        : <View style={styles.placeholderRect}></View>
      }
      <Text size={fontLarge} overrideStyles={styles.countryName}>{countryName}</Text>
      {showAction && checkboxProps && <View style={styles.actionContainer}><Checkbox {...checkboxProps} /></View>}
    </View>
  )
}
