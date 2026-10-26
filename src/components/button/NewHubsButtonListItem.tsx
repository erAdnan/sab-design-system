import { SkeletonBox } from "../skeleton/SkeletonBox";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import React, { ReactElement, FC } from "react";
import { I18nManager, StyleSheet, TouchableOpacity, View } from "react-native";
import { radiusS, spacingS, spacingXS, spacingXXS, fontSmallMedium, spacingXXXS, fontXSmall, fontWeightMedium, lineHeightXXSmall } from "../../assets/styles/constants/size";
import { TextTitle } from "../text/TextTitle";
import { useTheme } from "../../context/theme/themeContext";
import { Text } from "../text/Text";
import Right from "../icons/chevron/Right";
import fonts from "../../assets/styles/constants/fonts";
import LampRamdan from "../../assets/svgs/illustration/LampRamdan.svg"
import { AutomationProps, getAutomationProps } from "../automationProps";

interface NewHubsButtonListItemProps extends AutomationProps {
  title: string;
  body: string;
  chipsLabel?: string;
  icon?: ReactElement<{ fill?: string }>;
  onButtonPress?: () => void;
  loading?: boolean;
  overrideStyles?: any;
  showThemeIcon?: any;
  iconFill?: string;
}

/**
 * @property title - Text to be displayed as headline. Pass text title props to configure badge and tooltip
 * @property body - Text to be displayed under the headline
 * @property icon - Icon element to be displayed when showIcon is true
 * @property onButtonPress - Optional callback for the component press
 * @property loading - boolean for showing the skeleton
 * @property overrideStyles - Optional styles to override the default styles of the component.
 */

export const NewHubsButtonListItem: FC<NewHubsButtonListItemProps> = ({
  title,
  body,
  icon,
  chipsLabel = '',
  onButtonPress,
  loading = false,
  overrideStyles,
  showThemeIcon,
  testID,
  accessibilityLabel,
  iconFill,
}) => {
  const { theme } = useTheme();

  const isRtl = I18nManager.isRTL;

  const dynamicIcon = icon
    ? React.cloneElement(icon, {
        fill: iconFill ?? theme.ragneutral,
      })
    : null;

  const styles = StyleSheet.create({
    container: {
      borderRadius: radiusS,
      padding: spacingS,
      flexDirection: "row",
      alignItems: "stretch",
      justifyContent: "space-between",
      gap: spacingXS,
      backgroundColor: theme.stylesblockbg,
      ...(showThemeIcon && { position: "relative", }),
    },
    leftContent: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacingXS,
      flex: 1, // Ensures it takes available space and prevents overflow
    },
    iconWrapper: {
      height: actuatedNormalize(48),
      width: actuatedNormalize(48),
      borderRadius: 24,
      backgroundColor: theme.inverttransparent,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    iconWrapperRtl: {
      height: actuatedNormalize(48),
      width: actuatedNormalize(48),
      borderRadius: 24,
      backgroundColor: theme.inverttransparent,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    textWrapper: {
      flexDirection: "column",
      alignItems:"flex-start",
      flexShrink: 1, // Prevents text from overflowing
    },
    rightContent: {
      ...(!chipsLabel && { alignSelf: "flex-end",}),
      alignItems: "flex-end",
      justifyContent: "space-between",
      marginLeft: spacingS,
      gap: spacingXS// Ensures spacing from text to chevron
    },
    rightContentRtl: {
      ...(!chipsLabel && { alignSelf: "flex-end",}),
      justifyContent: "space-between",
      alignItems: "flex-end",
      gap: spacingXS// Ensures spacing from text to chevron
    },
    chips: {
      backgroundColor: theme.primarycolor3static,
      paddingVertical: spacingXXXS,
      paddingHorizontal: spacingXS,
      borderRadius: actuatedNormalize(12),
    },
    lampWrapper: {
    position: "absolute",
    top: -spacingXS, // pulls it upward to touch border
    zIndex: 2,
    },
    lampLtr: {
    right: actuatedNormalize(40), // space before chevron
    }
  });

  return loading ? (
    <View style={{ ...styles.container, justifyContent: 'center' }}>
      <SkeletonBox shape='circle' size='large' />
      <View style={{ ...styles.textWrapper, gap: spacingXS }}>
        <SkeletonBox shape='line' size='medium' overrideStyles={{ width: actuatedNormalize(60)}}/>
        <SkeletonBox shape='line' size='small' overrideStyles={{ width: actuatedNormalize(240)}}/>
        <SkeletonBox shape='line' size='small' overrideStyles={{ width: actuatedNormalize(240)}}/>
      </View>
    </View>
  ) : (
    <TouchableOpacity
      style={[styles.container, overrideStyles]}
      onPress={() => onButtonPress && onButtonPress()}
      {...getAutomationProps(testID, accessibilityLabel, title)}
    >
      {showThemeIcon && <View
       style={[
       styles.lampWrapper,
       styles.lampLtr,
       ]}
       pointerEvents="none"
       >
       <LampRamdan width={actuatedNormalize(29)} height={actuatedNormalize(65)} />
      </View>}
      {/* Left Side (Icon + Text) */}
      <View style={styles.leftContent}>
        {dynamicIcon && (
          <View style={isRtl ? styles.iconWrapperRtl : styles.iconWrapper}>    
            {dynamicIcon}
          </View>
        )}
        <View style={styles.textWrapper}>
          <TextTitle
            text={title}
            overrideStyles={{ paddingVertical: 0, paddingHorizontal: 0, fontWeight: fontWeightMedium,fontFamily:fonts.HSBC}}
          />
         
            <Text
              size={fontSmallMedium}
              variant="primarytextcolor2"
            >
              {body}
            </Text>
        </View>
      </View>

      {/* Right Side (Chevron) */}
      <View style={isRtl ? styles.rightContentRtl : styles.rightContent}>
        {chipsLabel && <View style={styles.chips}><Text size={fontXSmall} overrideStyles={{lineHeight:lineHeightXXSmall}} variant="primarycolor4static">{chipsLabel}</Text></View>}
        <Right fill={iconFill ?? theme.secondaryButtonAccentContentDefault} style={isRtl && {transform: [{rotate: "180deg"}]}} />
       
      </View>
    </TouchableOpacity>
  );
};
