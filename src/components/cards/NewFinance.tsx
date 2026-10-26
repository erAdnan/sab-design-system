import React, { ReactElement, useMemo } from 'react'
import { I18nManager, StyleSheet, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { fontMedium, fontSmall, fontSmallMedium, fontXLarge, fontXXSmall, lineHeightMedium, lineHeightXLarge, spacingS, spacingXS, spacingXXS } from "../../assets/styles/constants/size";
import { Text } from "../text/Text";
import { SarFont } from "../sarFont/SarFont";
import { ChipsInfo } from "../chips/ChipsInfo";
import { PieGraph } from "../pieGraph/PieGraph";
import { ProgressIndicator } from "../progressIndicator/ProgressIndicator";
import { Avatar, AvatarProps } from "../avatar/Avatar";
import fonts from "../../assets/styles/constants/fonts";
import { SkeletonBox } from "../skeleton/SkeletonBox";

interface NewFinanceProps {
  label: string;
  amount: string;
  isNegativeAmount?: boolean;
  remainingAmountLabel?: string;
  remainingAmount?: string;
  nextInstallmentLabel?: string;
  nextInstallmentAmount?: string;
  paidInstallmentsLabel?: string;
  paidInstallmentsAmount?: number;
  remainingInstallmentsLabel?: string;
  remainingInstallmentsAmount?: number;
  progressBarPercentage?: number;
  view?: 'default' | 'full';
  addOnProps?: AvatarProps;
  addOnType: 'icon' | 'avatar' | 'pieGraph';
  accountNumber?: string;
  state?: 'default' | 'graph' | 'inactive' | 'under-review';
  graphPercentage?: number;
  stateText?: string;
  statusLabel?: string;
  showStatus?: boolean;
  loading?: boolean;
  labelWithAmountStyle?: any;
  hiddenCurrency?: boolean;
  statusLabelOverride?:any;
  overrideStyles?: any;
}

export const NewFinance: React.FC<NewFinanceProps> = ({
  label,
  amount,
  isNegativeAmount = false,
  remainingAmountLabel,
  remainingAmount,
  nextInstallmentLabel,
  nextInstallmentAmount,
  paidInstallmentsLabel,
  paidInstallmentsAmount,
  remainingInstallmentsLabel,
  remainingInstallmentsAmount,
  progressBarPercentage,
  view = 'default',
  accountNumber,
  state = 'default',
  graphPercentage,
  addOnProps,
  addOnType,
  stateText,
  statusLabel,
  showStatus = true,
  loading,
  labelWithAmountStyle,
  hiddenCurrency,
  statusLabelOverride,
  overrideStyles,
}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: view === 'default' ? actuatedNormalize(285) : actuatedNormalize(343),
      backgroundColor: theme.tintgreenshade,
      borderRadius: spacingS,
      padding: spacingS
    },
    defaultView: {
      height: actuatedNormalize(100)
    },
    rowContent: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: "flex-end",
    },
    labelWithAmount: {
      display: 'flex',
      flexDirection: 'column',
      gap: spacingXXS
    },
    installmentsRow: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacingXXS
    },
    amountWrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacingXXS
    },
    greenMarker: {
      height: actuatedNormalize(10),
      width: actuatedNormalize(10),
      borderRadius: actuatedNormalize(10),
      backgroundColor: theme.ragcolor6
    },
     grayMarker: {
      height: actuatedNormalize(10),
      width: actuatedNormalize(10),
      borderRadius: actuatedNormalize(10),
      backgroundColor: theme.primarycolor2
    }
  });

  const isDefaultView = useMemo(() => {
    return view === 'default'
  }, [view]);

  const chipsState = useMemo(() => {
    switch (state) {
      case 'default':
        return 'success';
      case 'inactive':
        return 'error';
      case 'under-review':
        return 'warning';
    }
  }, [state])

  const showAccountNumber = useMemo(() => {
    return view === 'default' && accountNumber && state !== 'graph'
  }, [view, state, accountNumber]);

  const showChips = useMemo(() => {
    return view === 'default' && state !== 'graph' && stateText
  }, [state, stateText, view]);

  const isInactive = useMemo(() => {
    return state === 'inactive'
  }, [state]);

  const showAvatar = useMemo(() => {
    return addOnType !== 'pieGraph'
  }, [addOnType]);

  const isAmountNegativeFromValue = useMemo(() => {
  return view === "default" && amount?.trim().startsWith("-");
  }, [amount, view]);

 const normalizedAmount = useMemo(() => {
  if (view === "default" && amount?.startsWith("-")) {
    return amount.replace("-", "").trim();
   }
  return amount;
 }, [amount, view]);

 const finalIsNegativeAmount = isNegativeAmount || isAmountNegativeFromValue;

  return loading ? (
    <View style={{ ...styles.container, backgroundColor: theme.stylesblockbg, gap: spacingS, ...overrideStyles }}>
      <View style={styles.rowContent}>
        <SkeletonBox shape='line' size='medium' overrideStyles={{ width: actuatedNormalize(80)}}/>
        <SkeletonBox shape='line' size='small' overrideStyles={{ width: actuatedNormalize(60)}}/>
      </View>
      <SkeletonBox shape='line' size='small' overrideStyles={{ width: actuatedNormalize(100) }} />
      <SkeletonBox shape='line' size='medium' overrideStyles={{ width: '100%'}}/>
    </View>
  ) : (
    <View style={[styles.container,isDefaultView && styles.defaultView, overrideStyles]}>
      <View style={styles.rowContent}>
        <Text overrideStyles={{ fontFamily: fonts.HSBC_Medium}}>{label}</Text>
        {showAccountNumber && <Text variant="primarytextcolor2">{accountNumber}</Text>}
        {showAvatar ? <View style={{ position: 'absolute', right: 0, top: -spacingXS }}>
          <Avatar {...addOnProps} overrideStyles={ addOnType === 'icon' && { backgroundColor: theme.primarycolor4 }} />
        </View>
          : <View style={{ position: 'absolute', right: 0, top: -spacingXS }}>
            <PieGraph
              strokeFillColor={theme.ragcolor6}
              strokeColor={theme.primarycolor4}
              percentage={graphPercentage || 0}
              content={
                <Text
                  variant="ragcolor6"
                  size={fontSmallMedium}
                >
                  {`${graphPercentage}%`}
                </Text>}
            />
          </View>
        }
      </View>
      {isDefaultView ? (<View style={styles.rowContent}>
        {isInactive ? <Text>{statusLabel}</Text> : <View style={[styles.labelWithAmount,statusLabelOverride,{ alignItems: 'flex-start'},labelWithAmountStyle]}>
          <Text size={fontSmall} variant="primarytextcolor2" overrideStyles={{...(I18nManager.isRTL && { paddingBottom: actuatedNormalize(3) })}}>{remainingAmountLabel}</Text>
          <View style={[styles.installmentsRow,{flexDirection: I18nManager.isRTL ? "row-reverse" : "row"}]}>
             {
              hiddenCurrency ? (
                <Text size={fontXLarge} bold>{"* * * * *"}</Text>    
              ):(
                <>
                 <View style={[styles.amountWrapper,{flexDirection: I18nManager.isRTL? "row-reverse" : "row"}]}>
              {finalIsNegativeAmount && <Text size={fontXLarge} overrideStyles={{lineHeight:lineHeightXLarge}} bold>-</Text>}
              <SarFont size={fontXLarge} lineHeight={lineHeightXLarge}/>
            </View>
            <Text size={fontXLarge} overrideStyles={{lineHeight:lineHeightXLarge}} bold>{normalizedAmount}</Text>
                </>
              )
             }
          </View>
        </View>}
        <View>
          {(showChips && showStatus) && (
            <ChipsInfo type="default" pill showIcon={false} state={chipsState} label={stateText} />)
            }
        </View>
        {state === 'graph' && <View style={{ position: 'absolute', right: 0, top: '-40%' }}>
          <PieGraph
            strokeFillColor={theme.ragcolor6}
            strokeColor={theme.primarycolor4}
            percentage={graphPercentage || 0}
            content={
              <Text
                variant="ragcolor6"
                size={fontSmallMedium}
              >
                {`${graphPercentage}%`}
              </Text>}
          />
        </View>}
      </View>) : (
          <View style={styles.labelWithAmount}>
           <View style={styles.installmentsRow}>
            <View style={styles.amountWrapper}>
              {isNegativeAmount && <Text size={fontXLarge} bold>-</Text>}
              <SarFont size={fontXLarge} lineHeight={lineHeightXLarge}/>
            </View>
            <Text size={fontXLarge} bold>{amount}</Text>
          </View>
            <View style={{ ...styles.rowContent, marginTop: spacingXS, alignItems: 'flex-start' }}>
              <View style={styles.labelWithAmount}>
                <Text size={fontXXSmall} variant="primarytextcolor2">{remainingAmountLabel}</Text>
                <View style={styles.installmentsRow}>
                  <SarFont size={fontMedium} lineHeight={lineHeightMedium}/>
                  <Text size={fontMedium}>{remainingAmount}</Text>
                </View>
              </View>
              <View style={styles.labelWithAmount}>
                <Text size={fontXXSmall} variant="primarytextcolor2">{nextInstallmentLabel}</Text>
                <View style={styles.installmentsRow}>
                  <SarFont size={fontMedium} lineHeight={lineHeightMedium}/>
                  <Text size={fontMedium} bold>{nextInstallmentAmount}</Text>
                </View>
              </View>
            </View>
            <ProgressIndicator progress={progressBarPercentage || 0} progressColor={theme.ragcolor6} />
            <View style={styles.rowContent}>
              <View style={styles.installmentsRow}>
                <View style={styles.greenMarker}></View>
                <Text bold size={fontSmall}>{paidInstallmentsAmount}</Text>
                <Text size={fontSmall}>{paidInstallmentsLabel}</Text>
              </View>
              <View style={styles.installmentsRow}>
                <View style={styles.grayMarker}></View>
                <Text bold size={fontSmall} variant="primarytextcolor2">{remainingInstallmentsAmount}</Text>
                <Text size={fontSmall} variant="primarytextcolor2">{remainingInstallmentsLabel}</Text>
              </View>
            </View>
          </View>
      )}
   </View>
  )
}

