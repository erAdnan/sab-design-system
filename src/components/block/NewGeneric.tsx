import React, {FC, ReactElement} from "react";
import {I18nManager, StyleSheet, TouchableOpacity, View} from "react-native";
import {useTheme} from "../../context/theme/themeContext";
import {
  fontLarge,
  fontSmallMedium,
  fontWeightBold,
  fontWeightMedium,
  heightM,
  iconXS,
  lineHeightSmallMedium,
  radiusL,
  radiusS,
  spacing1XS,
  spacingS,
  spacingXS,
  widthM
} from "../../assets/styles/constants/size";
import {Text} from "../text/Text";
import Icon from "../icon/Icon";
import {actuatedNormalize} from "../../assets/styles/utils/pixelScaling";
import {SkeletonBox} from "../skeleton/SkeletonBox";
import {ChipsOffers} from "../chips/ChipsOffers";
import {Badge, BadgeSize, BadgeType} from "../badge/Badge";
import ImageThumbnail, {ImageThumbnailProps} from "../imageThumbnail/ImageThumbnail";
import fonts from "../../assets/styles/constants/fonts";

interface BlockNewGenericProps {
  size: "default" | "large";
  text: string;
  chipLabel: string;
  imgProps?: ImageThumbnailProps;
  iconName?: string;
  iconType?: | "banking" | "functionals" | "users" | "notifications" | "arrows" | "other" | "social" | "filled" | "sab360";
  onIconPress?: () => void;
  overrideStyles?: any;
  isChip?: boolean;
  isCategory?: boolean;
  /** Count shown in the badge at the top-right; values above 9 render as "9+" */
  badgeNumber?: number;
  loading?: boolean;
  icon?: ReactElement;
  textStyle?: any;
  iconContainer?: any;
  disabled?:boolean;
  countLoading?:boolean;
}

/**
 * @property text - Text to be displayed on the first line (main text)
 * @property iconName - Icon name to be displayed on the left side of the text
 * @property iconType - Icon type to be displayed on the left side of the text, default is "banking"
 * @property icon - Optional ReactElement (e.g. custom SVG). If provided, overrides iconName+iconType
 * @property onIconPress - Option callback for chevron icon press event
 * @property overrideStyles - Override styles for the component
 * @property loading - boolean for showing the skeleton
 * @property isChip - boolean for  showing chips
 * @property isCategory - SAB Store+ category variation (label + bottom-right background icon)
 * @property badgeNumber - Count shown in the badge at the top-right, values above 9 render as "9+"
 * @property textStyle – Use this prop only in Arabic layouts where the text content overflows. Example: textStyle={{ lineHeight: actuatedNormalize(17) }}
 * @property iconContainer - use this props to manage icon wrapper style
 **/

const NewGenericSkeleton: React.FC<Partial<BlockNewGenericProps>> = ({ size }) => {
  const { theme } = useTheme();
  const isLarge = size === "large";
  const containerWidth = isLarge
    ? actuatedNormalize(200)
    : actuatedNormalize(167);
  const containerHeight = isLarge
    ? actuatedNormalize(123)
    : actuatedNormalize(75);
  return (<View style={{
        width: containerWidth,
        height: containerHeight,
        backgroundColor: theme.stylesblockbg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: spacingS,
        gap: spacingS,
        borderRadius: radiusL
      }}>
    {!isLarge && <View style={{
      flexDirection: "row",
    }}>
      <SkeletonBox shape="circle" size="small" />
    </View>}
    <View style={{ display: 'flex', flexDirection: 'row', alignItems: isLarge ? 'flex-end' : 'flex-start', height: isLarge ? '100%' : 'auto'}}>
      <SkeletonBox shape="line" size={isLarge ? "large" : "small"} overrideStyles={{
        width: "100%",
      }} />
    </View>
    </View>)
}

export const NewGeneric: FC < BlockNewGenericProps > = ({
  size = "default",
  text,
  chipLabel = "New",
  imgProps,
  onIconPress,
  iconName = "bills",
  iconType = "banking",
  overrideStyles,
  icon,
  isChip = false,
  isCategory = false,
  badgeNumber,
  loading = false,
  textStyle,
  iconContainer,
  disabled,
  countLoading = false,
}) => {
  const {theme} = useTheme();

  const isLarge = size === "large";
  const containerWidth = isLarge
    ? actuatedNormalize(200)
    : actuatedNormalize(167);
  const containerHeight = isLarge
    ? actuatedNormalize(123)
    : actuatedNormalize(75);
  const fontSize = isLarge
    ? fontLarge
    : fontSmallMedium;
  const fontWeight = isLarge
    ? fontWeightBold
    : fontWeightMedium;

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      width: containerWidth,
      height: containerHeight,
      borderRadius: radiusL,
      justifyContent: "space-between",
      padding: isLarge
        ? spacingS
        : spacing1XS,
      gap: actuatedNormalize(8),
      backgroundColor: theme.stylesblockbg
    },
    categoryContainer: {
      width: "100%",
      minWidth: containerWidth,
      height: containerHeight,
      backgroundColor: theme.tintgolden,
      borderColor: theme.goldentint,
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: radiusS,
      overflow: "hidden",
      justifyContent: "center",
      paddingLeft: actuatedNormalize(12),
    },
    categoryLabel: {
      zIndex: 1,
      textAlign: "left",
      fontFamily: fonts.HSBC_Medium,
      lineHeight: lineHeightSmallMedium,
    },
    categoryIcon: {
      position: "absolute",
      right: actuatedNormalize(-8),
      bottom: actuatedNormalize(-22),
    },
    details: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      width: "100%"
    },
    topContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: isLarge
        ? "flex-end"
        : "space-between",
      alignItems: "flex-start"
    },
    iconContainer: {
      backgroundColor: theme.inverttransparent,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: actuatedNormalize(100),
      height: heightM,
      width: widthM
    },
    textContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
    text: {
      // fontWeight: fontWeight,
      fontFamily: isLarge ? fonts.HSBC_Bold : fonts.HSBC_Medium,
      ...(!isLarge && { lineHeight: lineHeightSmallMedium }),
      // ...(I18nManager.isRTL && { paddingBottom: actuatedNormalize(3) }),
      writingDirection: "ltr",
    },
  }); 

  if (loading) {
    return <NewGenericSkeleton size={size} />;
  }

  if (isCategory) {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => onIconPress && onIconPress()}
        disabled={disabled}
        style={overrideStyles}
      >
        <View style={styles.categoryContainer}>
          <Text
            size={fontSmallMedium}
            variant="primarytextcolor"
            overrideStyles={StyleSheet.flatten([styles.categoryLabel, textStyle])}
          >
            {text}
          </Text>
          {icon ? (
            <View style={[styles.categoryIcon, iconContainer]}>{icon}</View>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity activeOpacity={1} onPress={() => onIconPress && onIconPress()} disabled={disabled}>
      <View style={[styles.container, overrideStyles]}>
        <View style={styles.topContainer}>
          {
            !isLarge && (<View style={[styles.iconContainer,iconContainer]}>
              {icon ? (icon): <Icon height={iconXS} width={iconXS} name={iconName} type={iconType}/>}
            </View>)
          }
          {
            isLarge
              ? (<ImageThumbnail  height={actuatedNormalize(43)} width={actuatedNormalize(86)} {...imgProps}/>)
              : (isChip && (<ChipsOffers type="new" label={chipLabel} newChip={true} overrideLabelStyles={{
                  color: "#FFFFFF"
                }}/>))
          }
          {countLoading &&  (<SkeletonBox shape="circle" size="small"  />)}
          {!countLoading && badgeNumber !== undefined && (
            <Badge size={BadgeSize.small} type={BadgeType.primary} number={badgeNumber} maxCount={9} />
          )}
        </View>

        <View style={styles.details}>
          <View style={styles.textContent}>
            <Text size={fontSize} overrideStyles={StyleSheet.flatten([styles.text, textStyle])} variant="primarytextcolor">
              {text}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
