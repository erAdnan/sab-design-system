import React, { ReactElement, useMemo } from 'react'
import { useTheme } from "../../context/theme/themeContext";
import { StyleSheet, View } from "react-native";
import { fontSmallMedium, radiusL, spacingXS } from "../../assets/styles/constants/size";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { Text, TextProps } from "../text/Text";
import fonts from "../../assets/styles/constants/fonts";
import { SkeletonBox } from "../skeleton/SkeletonBox";

interface NewWidgetProps {
  icon: ReactElement<any>;
  size: 'small' | 'medium' | 'large' | 'extra-large';
  color: 'red' | 'neutral' | 'purple' | 'green' | 'amber';
  headline: string;
  text?: string;
  loading?: boolean;
  overrideStyles?: any;
  iconWrapper?: any;
  iconColor?: string;
  headlineProps?: TextProps;
}

/** 
   * @property {ReactElement} icon - The icon element to display inside the widget.
   * @property {'small' | 'medium' | 'large' | 'extra-large'} size - Determines the widget size.
   * @property {'red' | 'neutral' | 'purple' | 'green' | 'amber'} color - Sets the color theme of the widget.
   * @property {string} headline - The main text displayed as the headline of the widget.
   * @property {string} [text] - Optional descriptive or supporting text for the widget.
   * @property {boolean} [loading=false] - Indicates whether the widget is in a loading state.
   * @property {any} [overrideStyles] - Custom style overrides for the widget container.
   * @property {any} [iconWrapper] - Custom wrapper or style for the icon container.
   * @property {TextProps} [headlineProps] - Use this prop to customize the headline’s style, color, or size by directly passing TextProps.  For example: headlineProps={{ variant: "primarytextcolor" }}.
   * @property {string} [iconColor] - Optional custom change the icon color use this prop.
*/

export const NewWidget: React.FC<NewWidgetProps> = ({
  icon,
  size,
  color,
  headline,
  text,
  loading,
  overrideStyles,
  iconWrapper,
  iconColor,
  headlineProps
}) => {
  const { theme } = useTheme();
  const containerHeight = useMemo(() => {
    switch (size) {
      case 'small':
        return actuatedNormalize(90);
      case 'medium':
        return actuatedNormalize(110);
      case 'large':
        return actuatedNormalize(140);
      case 'extra-large':
        return actuatedNormalize(195);
    }
  }, [size]);

  const colors = useMemo(() => {
    switch (color) {
      case 'red':
        return { bg: theme.stroke3tint, border: theme.ragcolor3tint, icon: theme.strokecolor3tint };
      case 'neutral':
        return { bg: theme.tintneutral, border: theme.tintneutral, icon: theme.strokeneutraltint };
      case 'purple':
        return { bg: theme.strokepurpletint, border: theme.strokepurple, icon: theme.purpletint };
      case 'green':
        return { bg: theme.strokecolor6tint, border: theme.ragcolor6tint, icon: theme.greentint };
      case 'amber':
        return { bg: theme.strokecolor15tint, border: theme.strokecolor15, icon: theme.ambertint };
    }
  }, [color, theme]);
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      padding: actuatedNormalize(12),
      borderRadius: radiusL,
      width: actuatedNormalize(164),
      borderWidth: 1,
      borderColor: colors.border,
      height: containerHeight,
      backgroundColor: loading ? theme.stylesblockbg : colors.bg
    },
    textContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start'
    },
    iconWrapper: {
      width: actuatedNormalize(32),
      height: actuatedNormalize(32),
      borderRadius: actuatedNormalize(32),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.inverttransparent,
      borderWidth: 1,
      borderColor: theme.tintneutral
    }
  });

  const dynamicIcon = useMemo(
      () => icon
      ? React.cloneElement(icon, {
        fill: iconColor ?? colors.icon,
        width: actuatedNormalize(20),
        height: actuatedNormalize(20)
      })
      : null,
    [colors,iconColor]);
  
  const showText = useMemo(() => text && size !== "small", [text, size])
  return (
    <View style={[styles.container,overrideStyles ]}>
      {loading ? <SkeletonBox shape='circle' size='medium' /> : <View style={[styles.iconWrapper,iconWrapper]}>
        {dynamicIcon}
      </View>}
      <View style={styles.textContainer}>
      {loading ? <SkeletonBox shape='line' size='medium'  overrideStyles={{ width: actuatedNormalize(120), marginBottom: spacingXS}}/> : <Text  overrideStyles={{ fontFamily: fonts.HSBC_Medium }} {...headlineProps} >{headline}</Text>}
        {showText && (loading ? <SkeletonBox shape='line' size='small' overrideStyles={{ width: actuatedNormalize(120)}}/> :<Text
          size={fontSmallMedium}
          variant="primarytextcolor2"
          numberOfLines={size === 'extra-large' ? 3 : 2}
        >{text}</Text>)}
      </View>
    </View>
  )
}
