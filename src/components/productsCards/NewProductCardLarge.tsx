import React, { ReactElement, useMemo } from 'react'
import ImageThumbnail, { ImageThumbnailProps } from "../imageThumbnail/ImageThumbnail"
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import { fontMedium, fontSmallMedium, fontXXSmall, radiusS, radiusXS, spacing1XS, spacingS, spacingXS, spacingXXS, spacingXXXS } from "../../assets/styles/constants/size";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { Text } from "../text/Text";
import { SarFont } from "../sarFont/SarFont";

interface NewProductCardLargeProps {
  imgProps?: ImageThumbnailProps,
  horizontal?: boolean;
  label: string;
  description: string;
  amount: string;
  icon?: ReactElement;
  iconLabel?: string;
  overrideStyles?: any;
}

export const NewProductCardLarge: React.FC<NewProductCardLargeProps> = ({
  imgProps,
  horizontal = true,
  label,
  description,
  amount,
  icon,
  iconLabel,
  overrideStyles,
}) => {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    container: {
      borderRadius: radiusS,
      borderColor: theme.primarycolor2_20,
      borderWidth: 1,
      backgroundColor: theme.stylesblockbg,
      display: 'flex',
      flexDirection: horizontal ? 'row' : 'column',
      gap: horizontal ? spacingXS : 0,
      height: horizontal ? actuatedNormalize(164) : actuatedNormalize(286),
      width: horizontal ? actuatedNormalize(343) : actuatedNormalize(164)
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      gap: horizontal ? spacingS : 0,
      paddingVertical: horizontal ? spacingS : spacing1XS,
      paddingHorizontal: spacingXS,
      alignItems: 'flex-start',
      ...(!horizontal && {
        height: actuatedNormalize(124),
        width: "100%",
        justifyContent: "space-between",
      }),
    },
    iconWrapper: {
      display: 'flex',
      flexDirection: 'row',
      gap: spacingXXS,
      alignItems: 'center',
      backgroundColor: theme.primarycolor4,
      borderRadius: radiusXS,
      paddingHorizontal: spacingXXS,
      paddingVertical: spacingXXXS
    },
    labelWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: spacingXS
    }
  });

  const dynamicIcon = useMemo(
      () => icon
      ? React.cloneElement(icon, {
        fill: theme.primarycolor3,
        width: actuatedNormalize(16),
        height:  actuatedNormalize(16)
      })
      : null,
    [theme, icon]);

  return (
    <View style={[styles.container, overrideStyles]}>
      <ImageThumbnail
        url={imgProps?.url}
        width={actuatedNormalize(162)}
        height={actuatedNormalize(162)}
        isAbsolutePath={imgProps?.isAbsolutePath}
        overrideImageStyles={horizontal ? { borderTopLeftRadius: radiusS, borderBottomLeftRadius: radiusS } : { borderTopLeftRadius: radiusS, borderTopRightRadius: radiusS }}
      />
      <View style={styles.details}>
        <View style={styles.labelWrapper}>
          <Text bold size={fontMedium}>{label}</Text>
          <Text size={fontSmallMedium} variant="primarytextcolor2" overrideStyles={{ width: actuatedNormalize(120), textAlign: 'left' }}>{description}</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', gap: spacingXXS, alignItems: 'center'}}>
          <SarFont size={fontMedium} overrideStyles={{ fontWeight: 'bold'}}/>
          <Text bold size={fontMedium}>{amount}</Text>
        </View>
        {(horizontal && iconLabel && icon) && (
          <View style={styles.iconWrapper}>
            {dynamicIcon}
            <Text size={fontXXSmall}>{iconLabel}</Text>
          </View>
        )}
      </View>
    </View>
  )
}
