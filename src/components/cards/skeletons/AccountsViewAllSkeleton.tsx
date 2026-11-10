import React, { useMemo } from 'react'
import { useTheme } from "../../../context/theme/themeContext";
import { StyleSheet, View } from "react-native";
import { radiusS, spacingS, spacingXS } from "../../../assets/styles/constants/size";
import { actuatedNormalize } from "../../../assets/styles/utils/pixelScaling";
import { SkeletonBox } from "../../skeleton/SkeletonBox";
import { useFluidWidth } from "../../../assets/styles/utils/responsive";

interface AccountsViewAllSkeletonProps {
  type: 'carousel' | 'default';
}

export const AccountsViewAllSkeleton: React.FC<AccountsViewAllSkeletonProps> = ({ type }) => {
  const { theme } = useTheme();
  const frame = useFluidWidth();
  const styles = StyleSheet.create({
    common: {
      padding: spacingS,
      borderRadius: radiusS,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: theme.stylesblockbg,
      height: actuatedNormalize(118)
    },
    default: {
      ...frame.of(343),
    },
    carousel: {
      ...frame.of(217),
    },
    parallelLines: {
      display: 'flex',
      flexDirection: 'column',
      gap: spacingXS
    },
    inlineContent: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  });

  const isDefault = useMemo(() => {
    return type === 'default'
  }, [type])
  return (
    <View style={[styles.common, styles[type]]}>
      <View style={styles.inlineContent}>
        <View style={styles.parallelLines}>
          <SkeletonBox shape='line' size='small' overrideStyles={{ width: actuatedNormalize(isDefault ? 220 : 120) }} />
          <SkeletonBox shape='line' size='small' overrideStyles={{ width: actuatedNormalize(isDefault ? 220 : 120)}} />
        </View>
        <SkeletonBox shape='line' size='small' overrideStyles={{ width: actuatedNormalize(40) }} />
      </View>
      <View>
        <View style={styles.parallelLines}>
          {isDefault && <SkeletonBox shape='line' size='small' overrideStyles={{ width: actuatedNormalize(106) }} />}
          <SkeletonBox shape='line' size='medium' overrideStyles={{ width: actuatedNormalize(106)}} />
        </View>
      </View>
    </View>
  )
}
