import React, { FC } from 'react'
import { StyleSheet, View } from "react-native"; 
import { fontMedium, fontMediumLarge, fontSmallMedium, fontXLG, lineHeightXLG, radiusS, spacingS, spacingXS, spacingXXS } from "../../assets/styles/constants/size";
import { Text } from "../text/Text";
import EclipseLight from "../../assets/svgs/light/sab360/eclipse.svg";
import EclipseDark from "../../assets/svgs/dark/sab360/eclipse.svg";
import { SarFont } from "../sarFont/SarFont";
import { useTheme } from "../../context/theme/themeContext";  
import fonts from "../../assets/styles/constants/fonts";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import { LineChartGraph } from "../graphs/line-chart";
import type { LineChartDataPoint } from "../graphs/line-chart";
import { actuatedNormalize } from '../../assets/styles/utils/pixelScaling';
import { I18nManager } from 'react-native';

const GRAPH_X_AXIS_LABELS = ['1', '6', '11', '16', '21', '26', '30'];

export interface PFMProps {
  mainLabel: string;
  totalSpentLabel: string;
  periodLabel: string;
  amount: string;
  /** Chart data (e.g. 7 points for day-of-month). When provided, the line chart is shown with secondary variant and custom x-axis labels. */
  chartData?: LineChartDataPoint[];
  loading?: boolean;
}

export const PFM: FC<PFMProps> = ({
  mainLabel,
  totalSpentLabel,
  periodLabel,
  amount,
  chartData,
  loading
}) => {
  const { theme, isDarkTheme } = useTheme();

  const EclipseIcon = isDarkTheme ? EclipseDark : EclipseLight;

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      overflow: 'hidden',
    },
    mainLabelContainer: {
      paddingVertical: spacingXS,
      paddingHorizontal: spacingS,
      borderRadius: radiusS,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.stylesblockbg,
      marginBottom: spacingS
    },
    inlineLabels: {
      display: 'flex',
      flexDirection: 'row',
      gap: spacingXS,
      alignItems: 'center',
      marginBottom: spacingXS
    },
    amountText: {
      display: 'flex',
      flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
      gap: spacingXXS,
      alignItems: 'center',
      marginBottom: spacingXS
    }
  });

  return (
    <View style={styles.container}>
      {loading ? <SkeletonBox shape='line' size='small' overrideStyles={{ width: '100%' }} /> : <View style={styles.mainLabelContainer}>
        <Text size={fontSmallMedium}>{mainLabel}</Text>
      </View>}
      {loading ? <SkeletonBox shape='line' size='large' overrideStyles={{ width: '100%', marginTop: spacingS }} /> : <View style={styles.inlineLabels}>
        <Text size={fontMedium}>{totalSpentLabel}</Text>
        <EclipseIcon 
          width={actuatedNormalize(4)} 
          height={actuatedNormalize(4)} 
        />
        <Text variant="secondarycolor12" size={fontMediumLarge} overrideStyles={{ fontFamily: fonts.HSBC_Medium }}>{periodLabel}</Text>
      </View>}
      {!loading && <View style={styles.amountText}>
        <SarFont size={fontXLG} lineHeight={lineHeightXLG} />
        <Text size={fontXLG} bold>{amount}</Text>
      </View>}
      {!loading && chartData && chartData.length > 0 && (
        <LineChartGraph
          data={chartData}
          variant="secondary"
          xAxisLabels={GRAPH_X_AXIS_LABELS}
          hideBottomLine
        />
      )}
    </View>
  )
}
