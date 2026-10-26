import React, { FC, ReactElement, useMemo } from 'react'
import { StyleSheet, View } from "react-native"
import { TextText, TextTextProps } from "../text/TextText";
import { useTheme } from "../../context/theme/themeContext";
import { fontLarge, fontMedium, fontSmallMedium, fontXLG, fontXXSmall, lineHeightMedium, lineHeightXLG, spacingL, spacingS, spacingXS, spacingXXS } from "../../assets/styles/constants/size";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { Text } from "../text/Text";
import { SarFont } from "../sarFont/SarFont";
import { ProgressIndicator } from "../progressIndicator/ProgressIndicator";
import fonts from "../../assets/styles/constants/fonts";

export interface FCAndLifeGoalsProps {
  pictogramIcon: ReactElement;
  mainLabel: string;
  secondaryLabel: string;
  amount: string;
  text: TextTextProps;
  spentLabel: string;
  spentAmount: string;
  targetLabel: string;
  targetAmount: string;
  isActive?: boolean;
  progressPercentage: number;
  isProgressContent?:boolean
  pictogramBackgroundColor?: string;
  pictogramIconFill?: string;
  progressColor?: string;
 }
 
 
 export const FCAndLifeGoals: FC<FCAndLifeGoalsProps> = ({
  pictogramIcon,
  mainLabel,
  secondaryLabel,
  amount,
  text,
  spentLabel,
  spentAmount,
  targetAmount,
  targetLabel,
  isActive = true,
  progressPercentage,
  isProgressContent=true,
  pictogramBackgroundColor,
  pictogramIconFill,
  progressColor,
 }) => {
  const { theme } = useTheme();
  const iconFill = pictogramIconFill ?? theme.PFMShopping5;
 
 
  const dynamicIcon = useMemo(
    () => pictogramIcon
    ? React.cloneElement(pictogramIcon, {
       width: spacingL,
      height: spacingL,
      fill: iconFill
    })
    : null,
    [pictogramIcon, iconFill]);
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: spacingS,
      alignItems: 'center',
      width: '100%',
      padding: spacingS
    },
    pictogram: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: actuatedNormalize(64),
      width: actuatedNormalize(64),
      borderRadius: actuatedNormalize(64),
      backgroundColor: pictogramBackgroundColor ?? theme.PFMShopping1
    },
    detailsWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: spacingXS,
      alignItems: 'center'
    },
    progressWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: spacingXS,
      alignItems: 'center',
      width: '100%'
    },
    amountsWrapper: {
      display: 'flex',
      flexDirection: 'column',
    },
    amountText: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%'
    },
    textWithSar: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
      gap: spacingXXS
    }
  })
  return (   
    <View style={styles.container}>
      <View style={styles.pictogram}>
        {dynamicIcon}
      </View>
      <Text bold size={fontLarge}>{mainLabel}</Text>
      <View style={styles.detailsWrapper}>
        <Text size={fontSmallMedium} variant="primarytextcolor2">{secondaryLabel}</Text>
        <View style={styles.textWithSar}>
          <SarFont size={fontXLG} lineHeight={lineHeightXLG}/>
          <Text bold size={fontXLG} overrideStyles={{ lineHeight: lineHeightXLG}}>{amount}</Text>
        </View>
        <TextText {...text} variant='primarytextcolor2' overrideTextStyles={{ fontFamily: fonts.HSBC_Medium, fontSize: fontSmallMedium}}/>
      </View>
      {isProgressContent&&(
 
 
      <View style={styles.progressWrapper}>
        <ProgressIndicator progress={progressPercentage} progressColor={progressColor ?? theme.PFMShopping5} />
        <View style={styles.amountsWrapper}>
          <View style={styles.amountText}>
            {isActive ? <Text size={fontXXSmall} variant="primarytextcolor2">{spentLabel}</Text> : <Text size={fontXXSmall} variant="primarytextcolor2">{targetLabel}</Text>}
            {isActive ? <Text size={fontXXSmall} variant="primarytextcolor2">{targetLabel}</Text> : (
              <View style={styles.textWithSar}>
                <SarFont size={fontMedium} lineHeight={lineHeightMedium}/>
                <Text bold size={fontMedium}>{targetAmount}</Text>
              </View>
            )}
          </View>
          {isActive && <View style={styles.amountText}>
            <View style={styles.textWithSar}>
              <SarFont size={fontMedium} lineHeight={lineHeightMedium}/>
              <Text size={fontMedium}>{spentAmount}</Text>
            </View>
            <View style={styles.textWithSar}>
              <SarFont size={fontMedium} lineHeight={lineHeightMedium}/>
              <Text size={fontMedium} bold>{targetAmount}</Text>
            </View>
          </View>}
        </View>
      </View>
      )}
    </View>
  )
 }
 