import React, { FC, ReactElement } from 'react'
import { StyleSheet, View } from "react-native"
import { PictogramSpecial } from "../pictogram/PictogramSpecial"
import { ListItem, ListItemProps } from "../list/ListItem";
import { Text } from "../text/Text";
import { ProgressIndicator } from "../progressIndicator/ProgressIndicator";
import { fontLarge, fontMedium, fontMediumLarge, fontXLG, radiusS, spacingS, spacingXS, spacingXXS } from "../../assets/styles/constants/size";
import fonts from "../../assets/styles/constants/fonts";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { useTheme } from '../../context/theme/themeContext';

export interface IcsabCashbackProps {
  mainLabel: string;
  pictogramIcon: ReactElement;
  points: string;
  progressPercentage?: number;
  listItem?: ListItemProps;
  loading?: boolean;
}

export const IcsabCashback: FC<IcsabCashbackProps> = ({
  mainLabel,
  pictogramIcon,
  points,
  progressPercentage,
  listItem,
  loading
}) => {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: spacingXS,
      alignItems: 'center',
      padding: spacingS,
      ...(loading && { backgroundColor: theme.stylesblockbg,borderRadius: radiusS,}),
    },
    pointsText: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacingXXS,
    },
    bottomContent: {
      marginTop: spacingXS,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: spacingXS,
      width: '100%'
    }
  })
  return (
    <View style={styles.container}>
      {loading ? <SkeletonBox shape='square' size='large' /> : <PictogramSpecial icon={pictogramIcon} />}
      {loading ? <SkeletonBox shape='line' size='small' overrideStyles={{ width: '100%'}}/> : <Text size={fontMedium}>{mainLabel}</Text>}
      {loading ? <SkeletonBox shape='line' size='large' overrideStyles={{ width: '100%'}}/> : <View style={styles.pointsText}>
        <Text size={fontXLG} bold>{points}</Text>
        <Text size={fontLarge} overrideStyles={{ fontFamily: fonts.HSBC_Medium }}>Pts</Text>
      </View>}
      {loading ?
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: spacingS }}>
          <SkeletonBox shape='line' size='small' overrideStyles={{ width: "100%", maxWidth: "100%", flexShrink: 1 }} />
          <SkeletonBox shape='line' size='small' overrideStyles={{ width: actuatedNormalize(80)}}/>
        </View>
        :
        (progressPercentage && <View style={styles.bottomContent}>
        {listItem && <ListItem {...listItem} overrideStyles={{ padding: 0}} badgeNumberFontSize={fontMedium}/>}
        <ProgressIndicator progress={progressPercentage} />
      </View>)}
    </View>
  )
}
