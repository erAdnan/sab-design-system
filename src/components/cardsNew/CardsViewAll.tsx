import React, { useMemo } from 'react'
import { Animated, I18nManager, StyleSheet, View } from "react-native"
import { useTheme } from "../../context/theme/themeContext";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { fontMedium, fontSmall, fontXXSmall, lineHeightMedium, lineHeightXXSmall, radiusS, spacing1XS, spacingS, spacingXS, spacingXXS, spacingXXXS } from "../../assets/styles/constants/size";
import fonts from "../../assets/styles/constants/fonts";
import { Text } from "../text/Text";
import { CreditCard } from "./CreditCard";
import Ellipse from "../icons/functionals/Ellipse";
import { SarFont } from "../sarFont/SarFont";
import { ChipsInfo } from "../chips/ChipsInfo";
import { Checkbox, CheckboxProps } from "../checkbox/Checkbox";
import { Button, ButtonProps } from "../button/Button";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import { NewCurrency } from '../text/NewCurrency';
import Plus from '../icons/outline/Plus';
import { useFluidWidth } from "../../assets/styles/utils/responsive";

interface CardsViewAllProps {
  cardName: "Default" |
  "Emirates Infinite" |
  "AlFursan" |
  "Signature" |
  "Cashback" |
  "Premier" |
  "Advance" |
  "Platinum" |
  "My" |
  "Business" |
  "Titanium" |
  "Aqsat" |
  "World Elite" |
  "Muse World" |
  "Muse Low Limit" |
  "Noon" |
  "Umlaty Multi Currency" |
  "Mada Card Advanced" |
  "Mada Card Generic" |
  "Mada Card Household" |
  "Mada Card Premier" |
  "Mada Card Private" |
  "Mada Card Rowad" |
  "Mada Card Salary Card" |
  "Arab National Bank Generic Card" |
  "Alinma Bank Generic Card" |
  "Banque Saudi Fransi Generic Card" |
  "Bilad Bank Generic Card" |
  "Jazira Bank Generic Card" |
  "Rajhi Generic Card" |
  "Riyadh Bank Generic Card" |
  "SNB Generic Card" |
  "D360 Generic Card" |
  "GIB Generic Card" |
  "Meem Generic Card" |
  "Neo Generic Card" |
  "SAIB Generic Card" |
  "STC Generic Card" |
  "Vision Bank Generic Card" |
  "SAB QatarAirways" |
  "Premier Top Tier";
  fullCardName?: string;
  fourDigits?: string;
  expiryDate?: string;
  amount?: string;
  state: "default" | "inactive" | "activation-required" | "frozen" | "carousel" | "description" | "carouselProcessing" | "carouselInactive" | "carouselActive" | "selection" | "active"  | "expiring-soon" | "blocked" | "new-card";
  stateLabel?: string;
  description?: string;
  checkboxProps?: CheckboxProps;
  linkButtonProps?: ButtonProps;
  fadeOut?: boolean;
  isSar?: boolean;
  loading?: boolean;
  numberOfLines?: number;
  overrideStyles?: any;
  /** When true (and `state` is `default`), shows the supplementary pill at the bottom trailing corner */
  supplementaryCard?: boolean;
  supplementaryCardLabel?: string;
  imageUrl?: string;
  holderName?: string;
  newCardLabel?: string;
  leftContentOverrideStyles?: any;
  cardFullnameStyles?: any;
}

export const CardsViewAll: React.FC<CardsViewAllProps> = ({
  cardName,
  fullCardName,
  fourDigits,
  expiryDate,
  amount,
  state = "default",
  stateLabel,
  description,
  checkboxProps,
  linkButtonProps,
  fadeOut,
  isSar,
  loading,
  numberOfLines,
  overrideStyles,
  supplementaryCard = false,
  supplementaryCardLabel = "Supplementary Card",
  imageUrl,
  holderName,
  newCardLabel = "Apply for a New Card",
  leftContentOverrideStyles,
  cardFullnameStyles,
}) => {
  const { theme } = useTheme();
  const frame = useFluidWidth();
  const isRtl = I18nManager.isRTL;

  const cardFullName = useMemo(() => {
       if (fullCardName) return fullCardName;
     if (cardName.endsWith(" Generic Card")) return cardName;
     return cardName === "Umlaty Multi Currency" ? `${cardName} Card` : `${cardName} Credit Card`
  }, [cardName,fullCardName]);

  const isDefaultState = useMemo(() => {
    return state === "default"
  }, [state]);
  const isNewCardState = useMemo(() => {
    return state === "new-card"
  }, [state]);
  const isCarouselState = useMemo(() => {
    return state === "carousel" || state === "carouselProcessing" || state === "carouselInactive" || state === "carouselActive"
  }, [state]);
  const showStatusText = useMemo(() => {
    return state === "frozen" || state === "expiring-soon" || state === "blocked"
  }, [state]);
  const showChips = useMemo(() => {
    return state === "frozen" || state === "inactive" || state === "active";
  }, [state]);
  const showActivationLink = useMemo(() => {
    return state === "activation-required"
  }, [state]);
  const showDescription = useMemo(() => {
    return (state === 'description' || state === "selection") && description
  }, [state, description]);

  const showCheckbox = useMemo(() => {
    return state === "selection" && checkboxProps
  }, [state, checkboxProps]);

  const showSupplementaryTag = useMemo(
    () => supplementaryCard && isDefaultState && !loading,
    [supplementaryCard, isDefaultState, loading]
  );

  const chipsState = useMemo(() => {
    switch (state) {
      case "inactive":
        return "error";
      case "activation-required":
        return "warning";
      case "frozen":
        return "info";
      case "carouselInactive":
        return "error";
      case "carouselProcessing":
        return "warning";
      case "carouselActive":
        return "success";
      case "active":
        return "success";
    }
  }, [state]);
  
  const styles = StyleSheet.create({
    container: {
      width: actuatedNormalize(isCarouselState ? 270 : 343),
      paddingHorizontal: spacingS,
      paddingTop: isNewCardState ? spacingXS : spacing1XS,
      paddingBottom: isNewCardState ? spacingXS : spacingS,
      paddingVertical: spacing1XS,
      backgroundColor: theme.stylesblockbg,
      borderRadius: radiusS,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: isNewCardState ? "center" : "flex-start",
      position: "relative",
      overflow: "visible",
    },
    supplementaryTagOuter: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: "row",
      justifyContent: "flex-end",
      zIndex: 1,
    },
    supplementaryTag: {
      height: actuatedNormalize(23),
      paddingTop: actuatedNormalize(1),
      paddingRight: spacingXXS,
      paddingBottom: 0,
      paddingLeft: spacingXS,
      justifyContent: "center",
      alignItems: "center",
      gap: actuatedNormalize(10),
      backgroundColor: theme.stylescolorpressed,
      borderTopLeftRadius: radiusS,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: radiusS,
    },
    leftContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
    rightContent: {
      gap: spacingS,
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start"
    },
    inlineContent: {
      display: "flex",
      flexDirection: "row",
      gap: spacingXS,
      alignItems: "center"
    },
    statusTextRow: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "nowrap",
      gap: spacingXXS,
    },
    emptyCardSlot: {
      width: actuatedNormalize(73),
      height: actuatedNormalize(46),
      alignItems: "center",
      justifyContent: "center",
    },
    emptyCard: {
      width: actuatedNormalize(49),
      height: actuatedNormalize(31),
      borderWidth: 1,
      borderColor: theme.primarycolor2_40,
      borderStyle: "dotted",
      borderRadius: actuatedNormalize(6),
      alignItems: "center",
      justifyContent: "center",
    },
    detailsContainer: {
      marginTop: actuatedNormalize(isDefaultState ? amount ? 24 : 0 : holderName ? 4 : 8)
    },
    carouselContent: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      ...frame.of(150)
    }
  })
  return (
    <Animated.View style={[styles.container,fadeOut && { opacity: 0.4 },overrideStyles]}>
      {showCheckbox && (loading ? <SkeletonBox shape="square" size="small" /> : <Checkbox {...checkboxProps} overrideStyles={{ alignSelf: "flex-start", marginRight: -spacingXS }}/>)}
      <View style={[styles.leftContent,leftContentOverrideStyles]}>
      {isNewCardState ? (
          loading ? <SkeletonBox shape='line' size='small' overrideStyles={{ width: actuatedNormalize(150) }}/> : <Text numberOfLines={numberOfLines} size={fontMedium} overrideStyles={{ fontFamily: fonts.HSBC_Medium, maxWidth: actuatedNormalize(222), textAlign: "left", lineHeight: lineHeightMedium }}>{newCardLabel}</Text>
        ) : (
          loading ? <SkeletonBox shape='line' size='small' overrideStyles={{ width: actuatedNormalize(150) }}/> : <Text numberOfLines={numberOfLines} overrideStyles={{ fontFamily: fonts.HSBC_Medium,...(isDefaultState ? {maxWidth: actuatedNormalize(170)  }: showDescription || showStatusText || showActivationLink ? { maxWidth: actuatedNormalize(220) } : { width: actuatedNormalize(150) }),  textAlign: "left", ...cardFullnameStyles }}>{cardFullName}</Text>
        )}
        {!isNewCardState && holderName && (loading ? <SkeletonBox shape='line' size='small' overrideStyles={{ width: actuatedNormalize(150), marginTop: spacingXS }}/> : <Text variant="primarytextcolor2" size={fontMedium} overrideStyles={{ marginTop: spacingXXS }}>{holderName}</Text>)}
        {isDefaultState && (loading ? <SkeletonBox shape='line' size='small' overrideStyles={{ width: actuatedNormalize(47), marginTop: spacingXS }} /> : <Text variant="primarytextcolor2">{expiryDate}</Text>)}
        {(isCarouselState && fourDigits) && <View style={styles.carouselContent}>
          <View style={styles.inlineContent}>
            {!loading && <Ellipse fill={theme.primarytextcolor2} />}
            {loading ? <SkeletonBox shape='line' size='small' overrideStyles={{ width: actuatedNormalize(47), marginTop: spacingXS }} /> : <Text variant="primarytextcolor2">{fourDigits}</Text>}
            
          </View>
          {state === "carouselProcessing" && (loading ? <SkeletonBox shape='line' size='small' overrideStyles={{ width: actuatedNormalize(47), marginTop: spacingXS }} /> : <ChipsInfo type="textWithIcon" state={chipsState} label={stateLabel} overrideStyles={{ alignSelf: "stretch" }} />)}
          {state === "carouselInactive" && (loading ? <SkeletonBox shape='line' size='small' overrideStyles={{ width: actuatedNormalize(47), marginTop: spacingXS }} /> : <ChipsInfo type="textWithIcon" state={chipsState} label={stateLabel} overrideStyles={{ alignSelf: "stretch" }} />)}
          {state === "carouselActive" && (loading ? <SkeletonBox shape='line' size='small' overrideStyles={{ width: actuatedNormalize(47), marginTop: spacingXS }} /> : <ChipsInfo type="textWithIcon" state={chipsState} label={stateLabel} overrideStyles={{ alignSelf: "stretch" }} />)}
        </View> }
        {!isNewCardState && (
        <View style={styles.detailsContainer}>
          {isDefaultState && (loading ? <SkeletonBox shape='line' size='medium' overrideStyles={{ width: actuatedNormalize(80) }} />  : <View style={{ ...styles.inlineContent, gap: spacingXXS, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
           {amount &&  <SarFont />}
           {amount && <Text bold>{amount || 0}</Text>}
          </View>)}
          {(showChips || showStatusText) && (loading ? <SkeletonBox shape='line' size='small' overrideStyles={{ width: actuatedNormalize(showStatusText ? 120 : 47) }} /> : (
            <View style={styles.statusTextRow}>
              {showChips && <ChipsInfo type="textWithIcon" state={chipsState} label={stateLabel} />}
              {showStatusText && (
                <>
                  {fourDigits ? (
                    <>
                      <Ellipse fill={theme.primarytextcolor2} />
                      <Text variant="primarytextcolor2">{fourDigits}</Text>
                    </>
                  ) : null}
                  {/* Avoid repeating stateLabel when the chip already shows it (e.g. frozen). */}
                  {!showChips && (
                    <>
                      {fourDigits ? (
                        <Text variant="primarytextcolor2" overrideStyles={{ color: theme.primarycolor2_80 }}>|</Text>
                      ) : null}
                      <Text variant="primarytextcolor2" overrideStyles={{ color: theme.primarycolor2_80 }}>{stateLabel}</Text>
                    </>
                  )}
                </>
              )}
            </View>
          ))}
          {showDescription && (loading ?
            <View style={{ display: 'flex', flexDirection: 'column', gap: spacingXS, marginTop: spacingXS }}>
              <SkeletonBox shape="line" size="small" overrideStyles={{ width: actuatedNormalize(showCheckbox ? 143 : 223) }}/>
              <SkeletonBox shape="line" size="small" overrideStyles={{ width: actuatedNormalize(showCheckbox ? 143 : 223) }}/>
            </View>
            :
            isSar ? <NewCurrency text={description ?? ""} variant='primarytextcolor2' size={fontSmall} textstyle={{ width: actuatedNormalize(showCheckbox ? 200 : 220), textAlign: "left" }}/>
            :<Text variant="primarytextcolor2" size={fontSmall} overrideStyles={{ width: actuatedNormalize(showCheckbox ? 200 : 220), textAlign: "left" }}>{description ?? ""}</Text>)}
        </View>
         )}
        {((showCheckbox || showActivationLink ) && linkButtonProps) && (loading ? <SkeletonBox shape='line' size='medium' overrideStyles={{ width: actuatedNormalize(80), marginTop: spacingXS }} /> : <Button variant="link" {...linkButtonProps} />)}
      </View>
      <View style={styles.rightContent}>
      {(!isCarouselState && !showDescription && !showStatusText && !showActivationLink && !isNewCardState && fourDigits) && (loading ? <SkeletonBox shape='line' size='small' overrideStyles={{ width: actuatedNormalize(47) }} />  :<View style={styles.inlineContent}>
          <Ellipse fill={theme.primarytextcolor2} />
          <Text variant="primarytextcolor2">{fourDigits}</Text>
        </View>)}
        {loading ? <SkeletonBox shape="square" size="large" overrideStyles={{ width: actuatedNormalize(73), height: actuatedNormalize(46) }} /> : isNewCardState ? (
          <View style={styles.emptyCardSlot}>
            <View style={styles.emptyCard}>
              <Plus width={actuatedNormalize(20)} height={actuatedNormalize(20)} fill={theme.primarycolor2_40} />
            </View>
          </View>
        ) : (
          /*@ts-ignore */
          <CreditCard
            cardName={cardName}
            freeze={state === 'frozen'}
            statusOverlay={
              state === "blocked"
                ? "blocked"
                : state === "expiring-soon"
                  ? "expiring-soon"
                  : state === "inactive" || state === "activation-required"
                    ? "inactive"
                    : undefined
            }
            view="virtual"
            isViewAll
            imageUrl={imageUrl}
            overrideStyles={{
             borderRadius: radiusS,
            }}
          />
        )}
        
      </View>
      {showSupplementaryTag && (
        <View style={styles.supplementaryTagOuter}>
          <View style={styles.supplementaryTag}>
            <Text
              size={fontXXSmall}
              variant="primarycolor4static"
              overrideStyles={{
                fontFamily: fonts.HSBC,
                lineHeight: lineHeightXXSmall,
              }}
            >
              {supplementaryCardLabel}
            </Text>
          </View>
        </View>
      )}
    </Animated.View>
  )
}
