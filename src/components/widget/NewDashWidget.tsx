import React, { ReactElement } from 'react'
import { useTheme } from "../../context/theme/themeContext";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { fontMedium, radiusS, spacing1XS, spacingS, spacingXXS } from "../../assets/styles/constants/size";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { Text } from "../text/Text";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import { useFluidWidth } from "../../assets/styles/utils/responsive";

type AddOn = {
  icon: ReactElement,
  iconColor: string,
  bgColor: string,
  strokeColor?: string,
  onClick: () => void,
}

interface NewDashWidgetProps {
  label: string;
  description: string;
  addOns: AddOn[];
  loading?: boolean;
}

export const NewDashWidget: React.FC<NewDashWidgetProps> = ({
  label,
  description,
  addOns,
  loading = false
}) => {
  const { theme } = useTheme();
  const frame = useFluidWidth();
  const styles = StyleSheet.create({
    container: {
      padding: spacingS,
      borderRadius: radiusS,
      backgroundColor: theme.stylesblockbg,
      ...frame.of(164),
      height: actuatedNormalize(178),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'space-between'
    },
    addOnsContainer: {
      display: 'flex',
      flexDirection: 'row'
    },
    iconWrapper: {
      height: actuatedNormalize(48),
      width: actuatedNormalize(48),
      borderRadius: actuatedNormalize(24),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });
  return (
    loading ? (
      <View style={styles.container}>
        <SkeletonBox shape="line" size="medium" overrideStyles={{ width: actuatedNormalize(120)}}/>
        <View style={{ gap: spacingXXS}}>
          <SkeletonBox shape="line" size="small" overrideStyles={{ width: actuatedNormalize(120)}}/>
          <SkeletonBox shape="line" size="small" overrideStyles={{ width: actuatedNormalize(120) }} />
          <SkeletonBox shape="line" size="small" overrideStyles={{ width: actuatedNormalize(120)}}/>
        </View>
        <SkeletonBox shape="circle" size="large" />
      </View>
    ) : (
    <View style={styles.container}>
      <View style={{gap: spacing1XS,alignItems: 'flex-start'}}>

      <Text>{label}</Text>
      <Text size={fontMedium} variant="primarytextcolor2" overrideStyles={{ textAlign: 'left' }}>{description}</Text>
      </View>

      <View style={styles.addOnsContainer}>
        {addOns.map((addOn, index) => {
          const dynamicIcon = React.cloneElement(addOn.icon, {
            fill: theme[addOn.iconColor],
            height: actuatedNormalize(24),
            width: actuatedNormalize(24)
          })
          return (
            <TouchableOpacity
              onPress={addOn.onClick}
              style={{
                ...styles.iconWrapper,
                backgroundColor: theme[addOn.bgColor],
                borderWidth: addOn.strokeColor ? 1 : 0,
                borderColor: theme[addOn.strokeColor || ''],
                marginLeft: index === 0 ? 0 : actuatedNormalize(-18),
                zIndex: index === 0 ? 99 : 1
              }}
              key={index}>
              {dynamicIcon}
            </TouchableOpacity>
          )
          }
        )}
      </View>
    </View >
    )
  )
}
