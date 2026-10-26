import React, { useMemo } from 'react'
import { useTheme } from "../../context/theme/themeContext"
import { StyleSheet, View } from "react-native";
import { radiusS, spacingS, spacingXS } from "../../assets/styles/constants/size";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { SkeletonBox } from "../skeleton/SkeletonBox";

interface CreditCardSkeletonProps {
  view: 'default' | 'detailed' | 'carousel' | 'virtual' | 'selection'
}

export const CreditCardSkeleton: React.FC<CreditCardSkeletonProps> = ({ view }) => {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    common: {
      backgroundColor: theme.stylesblockbg,
      borderRadius: radiusS
    },
    default: {
      padding: spacingS,
      height: actuatedNormalize(172),
      width: actuatedNormalize(343)
    },
    detailed: {
      padding: spacingS,
      height: actuatedNormalize(172),
      width: actuatedNormalize(343)
    },
    carousel: {
      paddingTop: actuatedNormalize(13),
      paddingRight: actuatedNormalize(10),
      paddingBottom: actuatedNormalize(9),
      paddingLeft: actuatedNormalize(8),
      width: actuatedNormalize(200),
      height: actuatedNormalize(100)
    },
    selection: {
      paddingVertical: actuatedNormalize(11),
      paddingHorizontal: actuatedNormalize(12),
      width: actuatedNormalize(306),
      height: actuatedNormalize(100)
    },
    virtual: {
      height: actuatedNormalize(203),
      width: actuatedNormalize(325)
    },
    elementsWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: actuatedNormalize(24)
    },
    parallelLines: {
      display: 'flex',
      flexDirection: 'column',
      gap: spacingXS
    },
    rowContent: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
  });

  const defaultSkeleton = (
    <View style={styles.elementsWrapper}>
      <View style={styles.rowContent}>
        <View style={styles.parallelLines}>
          <SkeletonBox shape='line' size='small' overrideStyles={{ width: actuatedNormalize(152)} }/>
          <SkeletonBox shape='line' size='small' overrideStyles={{ width: actuatedNormalize(152)} }/>
        </View>
        <SkeletonBox shape='circle' size='large' />
      </View>
      <View style={styles.rowContent}>
        <View style={styles.parallelLines}>
          <SkeletonBox shape='line' size='small' overrideStyles={{ width: actuatedNormalize(152)} }/>
          <SkeletonBox shape='line' size='medium' overrideStyles={{ width: actuatedNormalize(152)} }/>
        </View>
        <View style={styles.parallelLines}>
          <SkeletonBox shape='line' size='small' overrideStyles={{ width: actuatedNormalize(152)} }/>
          <SkeletonBox shape='line' size='medium' overrideStyles={{ width: actuatedNormalize(152)} }/>
        </View>
      </View>
    </View>
  )


  const carouselSkeleton = (
    <View style={{
      ...styles.elementsWrapper, height: '100%', gap: 0, justifyContent: 'space-between'
    }}>
      <View style={styles.rowContent}>
        <SkeletonBox shape='line' size='small' overrideStyles={{ width: actuatedNormalize(100)} }/>
        <SkeletonBox shape='line' size='small' overrideStyles={{ width: actuatedNormalize(26)} }/>
      </View>
      <View style={styles.parallelLines}>
        <SkeletonBox shape='line' size='small' overrideStyles={{ width: actuatedNormalize(100)} }/>
        <SkeletonBox shape='line' size='medium' overrideStyles={{ width: actuatedNormalize(100)} }/>
      </View>
    </View>
  )

  const selectionSkeleton = (
    <View style={{
      ...styles.elementsWrapper, height: '100%', gap: 0, justifyContent: 'space-between'
    }}>
      <View style={styles.parallelLines}>
        <SkeletonBox shape='line' size='small' overrideStyles={{ width: actuatedNormalize(160)} }/>
        <SkeletonBox shape='line' size='small' overrideStyles={{ width: actuatedNormalize(40)} }/>
      </View>
      <SkeletonBox shape='line' size='medium' overrideStyles={{ width: actuatedNormalize(120)} }/>
    </View>
  )
    
  const skeleton = useMemo(() => {
    switch (view) {
      case 'default':
      case 'detailed':
        return defaultSkeleton;
      case 'carousel':
        return carouselSkeleton;
      case 'selection':
        return selectionSkeleton;
      case 'virtual':
        return <></>;
    }
  }, [view])
  return (
    <View style={[styles.common, styles[view]]}>
      {skeleton}
    </View>
  )
}
