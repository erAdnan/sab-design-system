import React, {FC, ReactElement, useMemo} from "react";
import {I18nManager, Platform, StyleSheet, TouchableOpacity, View} from "react-native";
import {Size} from "../../assets/styles";
import {Text, TextProps} from "../text/Text";
import {useTheme} from "../../context/theme/themeContext";
import ChevronLeft from "../icons/arrows/chevron/ChevronLeft";
import ChevronRight from "../icons/arrows/chevron/ChevronRight";
import {actuatedNormalize} from "../../assets/styles/utils/pixelScaling";
import {
  fontLarge,
  fontMedium,
  fontMediumLarge,
  fontSmallMedium,
  heightXl,
  iconS,
  lineHeightLarge,
  lineHeightMedium,
  lineHeightMediumLarge,
  lineHeightSmallMedium,
  radiusL,
  spacingXXS,
} from "../../assets/styles/constants/size";
import {ButtonSkeleton} from "./ButtonSkeleton";
import LottieView from 'lottie-react-native';
import loadingCtaAnimation from '../../assets/json/cta-loading.json';
import { AutomationProps, getAutomationProps } from "../automationProps";

export interface ButtonProps extends AutomationProps {
  variant?: "fill" | "outlined" | "link" | "icon" | "tab";
  color?: "primary" | "secondary" | "blueAccent" | "redAccent";
  buttonText: TextProps;
  linkIconLeft?: boolean;
  linkIconRight?: boolean;
  icon?: ReactElement;
  size?: "large" | "small" | "medium";
  disabled?: boolean;
  overrideStyles?: any;
  onButtonPress: () => void;
  underline?: boolean;
  bold?: boolean;
  loading?: boolean;
  loadingStyles?: any;
  leftIcon?:ReactElement;
  isLeftIcon?:boolean;
  rightIcon?:ReactElement;
  isRightIcon?:boolean;
  loadingCta?: boolean; // 👈 new prop
}

/**
 * Button Component
 * @property variant: Option to have border, background or none (for Link buttons). Default is "fill"  (accepts "fill" or "outlined" or "link")
 * @property color: Toggles fill colors: primary red, primary black, blue accent (secondary button-accent), or red accent (complimentary red3). Default is "primary" (accepts "primary", "secondary", "blueAccent", or "redAccent")
 * @property buttonText: Text component to be displayed as button text, text props can be passed to change variant, size etc.
 * @property linkIconLeft: When true, a chevron icon will be displayed on the left side of the button text
 * @property linkIconRight: When true, a chevron icon will be displayed on the right side of the button text
 * @property size: Changes height and width of the button and text size. Default is "large" (accepts "large" or "small");
 * @property disabled: When true, button is not clickable, background and border color is changed to indicate the state. Default is false
 * @property onButtonPress: Event handler for button press
 * @property underline: underline the text
 * @property bold: Event handler for button press
 * @property overrideStyles: Applies new styling settings that will override the default ones
 * @property loading - boolean for showing the skeleton
 * @property loadingCta - boolean use this props to show cta-loader inside button component
 */

export const Button: FC < ButtonProps > = ({
  variant = "fill",
  color = "primary",
  buttonText,
  linkIconLeft = false,
  linkIconRight = false,
  icon = null,
  onButtonPress,
  underline = false,
  bold,
  size = "large",
  disabled = false,
  overrideStyles,
  loading = false,
  loadingStyles,
  leftIcon=null,
  isLeftIcon=false,
  rightIcon=null,
  isRightIcon=false,
  loadingCta=false,
  testID,
  accessibilityLabel,
}) => {
  const {theme} = useTheme();

  const activeStyles = StyleSheet.create({
    buttonWrapper: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap"
    },
    general: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: Size.spacingXS,
      borderRadius: Size.radiusS
    },
    buttonText: {
      textDecorationLine: underline
        ? "underline"
        : "none"
    },
    large: {
      height: heightXl,
      minWidth: actuatedNormalize(128),
      paddingHorizontal: Size.spacingS,
      paddingVertical: Size.spacing1XS
    },
    small: {
      height: actuatedNormalize(32),
      minWidth: actuatedNormalize(60),
      paddingHorizontal: Size.spacingS,
      paddingVertical: Size.spacingXXS
    },
    medium: {
      height: actuatedNormalize(40),
      minWidth: actuatedNormalize(107),
      paddingHorizontal: Size.spacingL,
      paddingVertical: Size.spacingXS
    },
    primary: {
      borderColor: theme.primarycolor3static,
      backgroundColor: theme.primarycolor3static
    },
    secondary: {
      borderColor: theme.primarycolor,
      backgroundColor: theme.primarycolor
    },
    blueAccent: {
      borderColor: theme.secondaryButtonAccentBgDefault ?? "#F5F9FF",
      backgroundColor: theme.secondaryButtonAccentBgDefault ?? "#F5F9FF"
    },
    redAccent: {
      borderColor: theme.complimentaryprimarycolor3_3 ?? "#730014",
      backgroundColor: theme.complimentaryprimarycolor3_3 ?? "#730014",
      borderRadius: radiusL
    },
    // Figma link button: 24px tall, no horizontal padding / min-width, 4px vertical padding.
    linkGeometry: {
      height: actuatedNormalize(24),
      minWidth: 0,
      paddingHorizontal: 0,
      paddingVertical: spacingXXS
    },
    active: {},
    disabledFill: {
      borderColor: theme.primarycolor2_30,
      backgroundColor: theme.primarycolor2_30
    },
    disabledOutlined: {
      borderColor: theme.primarycolor2_30
    },
    outlined: {
      borderWidth: 1,
      borderColor: theme.primarycolor,
      backgroundColor: "transparent"
    },
    fill: {},
    link: {
      backgroundColor: "transparent",
      flexDirection: "row"
    },
    icon: {
      borderWidth: 1,
      borderColor: theme.primarycolor,
      backgroundColor: "transparent"
    },
    tab: {
      backgroundColor: theme.stylesblockbg,
      borderColor: theme.stylesblockbg
    }
  });

  const disabledStyles = StyleSheet.create({
    primary: {
      borderColor: theme.primarycolor2_30,
      backgroundColor: theme.primarycolor2_30
    },
    secondary: {
      borderColor: theme.primarycolor2_30,
      backgroundColor: theme.primarycolor2_30
    },
    blueAccent: {
      borderColor: theme.secondaryButtonAccentBgDisabled ?? "#F2F4F7",
      backgroundColor: theme.secondaryButtonAccentBgDisabled ?? "#F2F4F7"
    },
    redAccent: {
      borderColor: theme.primarycolor2_30,
      backgroundColor: theme.primarycolor2_30,
      borderRadius: radiusL
    },
    outlined: {
      borderWidth: 1,
      borderColor: theme.primarycolor2_30,
      backgroundColor: "transparent"
    },
    buttonText: {
      textDecorationLine: underline
        ? "underline"
        : "none",
      lineHeight: fontLarge
    },
    fill: {},
    link: {
      backgroundColor: "transparent",
      flexDirection: "row"
    },
    icon: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: theme.primarycolor2_30
    },
    iconWrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    tab: {
      backgroundColor: theme.stylesblockbg,
      borderColor: theme.stylesblockbg
    }
  });

  const isLinkButton = useMemo(() => variant === "link", [variant]);
  const isIconButton = useMemo(() => variant === "icon", [variant]);

  // Figma type scale per size: Fill/Outline L 15/20 bold, M 13/17 bold, S 13/17 regular;
  // Link L 17/22 (Medium weight), M 14/18 (Regular), S 13/17 (Regular); Link Active / Underline = Bold.
  const textMetrics = useMemo(() => {
    if (isLinkButton) {
      if (size === "large") return {fontSize: fontLarge, lineHeight: lineHeightLarge};
      if (size === "medium") return {fontSize: fontMedium, lineHeight: lineHeightMedium};
      return {fontSize: fontSmallMedium, lineHeight: lineHeightSmallMedium};
    }
    if (size === "large") return {fontSize: fontMediumLarge, lineHeight: lineHeightMediumLarge};
    return {fontSize: fontSmallMedium, lineHeight: lineHeightSmallMedium};
  }, [isLinkButton, size]);

  const buttonTextColor = useMemo(
    () => {
      if (variant === "fill") {
        if (color === "primary") return "primarycolor4static";
        if (color === "blueAccent") return disabled ? "secondaryButtonAccentContentDisabled" : "secondaryButtonAccentContentDefault";
        if (color === "redAccent") return disabled ? "primarycolor2_60" : "primarycolor4static";
        return "primarytextcolor4"; // secondary
      }
      return disabled ? "primarytextcolor5" : "primarytextcolor";
    },
  [color, variant, disabled]);

  const iconFillColor = useMemo(
    () => theme[buttonTextColor],
    [theme, buttonTextColor]
  );

  const dynamicIcon = useMemo(() => {
    if (!icon) {
      return null;
    }
    const iconEl = icon as ReactElement<{
      fill?: string;
      width?: number | string;
      height?: number | string;
    }>;
    return React.cloneElement(iconEl, {
      fill: iconEl.props.fill ?? iconFillColor ?? theme[buttonTextColor],
      width: iconEl.props.width ?? iconS,
      height: iconEl.props.height ?? iconS,
    });
  }, [icon, iconFillColor, theme, buttonTextColor]);

  const linkTextColor = useMemo(() => 
  {
    const isLinkUnderline = isLinkButton && underline;
    const activeTextColor = isLinkUnderline
      ? "primarytextcolor"
      : buttonText.variant || "primarycolor3";
    
    return disabled
    ? "primarytextcolor5"
    : activeTextColor}, [disabled, variant, underline, buttonText.variant]);

    const compactHitSlop =
      isLinkButton
        ? { top: 12, bottom: 12, left: 4, right: 4 }
        : size === "small"
        ? { top: 6, bottom: 6, left: 4, right: 4 }
        : size === "medium"
          ? { top: 2, bottom: 2, left: 2, right: 2 }
          : undefined;

    if (loadingCta) {
      return (
        <View style={activeStyles.buttonWrapper}>
          <TouchableOpacity
            hitSlop={compactHitSlop}
            disabled={disabled}
            style={{
              ...activeStyles.general,
              ...activeStyles[size],
              ...activeStyles[color],
              ...overrideStyles,
            }}
            {...getAutomationProps(testID, accessibilityLabel, String(buttonText.children ?? ""))}
          >
            <LottieView
              source={loadingCtaAnimation}
              autoPlay
              loop
              style={{
                width: actuatedNormalize(60),
                height: actuatedNormalize(60),
              }}
            />
          </TouchableOpacity>
        </View>
      );
    }

  const linkChevronGap =
    isLinkButton && (linkIconLeft || linkIconRight)
      ? { gap: 0 }
      : null;

  return loading
    ? (<ButtonSkeleton width={size === "small"
        ? actuatedNormalize(60)
        : size === "medium"
          ? actuatedNormalize(107)
          : actuatedNormalize(128)} height={size === "small"
        ? actuatedNormalize(32)
        : size === "medium"
          ? actuatedNormalize(40)
          : actuatedNormalize(48)} overrideStyles={loadingStyles}/>)
    : (<View style={activeStyles.buttonWrapper}>
      <TouchableOpacity hitSlop={compactHitSlop} onPress={onButtonPress} disabled={disabled} style={disabled
          ? {
            ...activeStyles.general,
            ...linkChevronGap,
            ...disabledStyles[color],
            ...disabledStyles[variant],
            ...activeStyles[size],
            ...(isLinkButton ? activeStyles.linkGeometry : null),
            ...overrideStyles,
          }
          : {
            ...activeStyles.general,
            ...linkChevronGap,
            ...activeStyles[color],
            ...activeStyles[variant],
            ...activeStyles[size],
            ...(isLinkButton ? activeStyles.linkGeometry : null),
            ...overrideStyles,
          }
} {...getAutomationProps(testID, accessibilityLabel, String(buttonText.children ?? ""))}>

   {isLeftIcon && leftIcon}
        {!isIconButton && dynamicIcon}

        {
          isLinkButton && linkIconLeft &&  (
            leftIcon ? leftIcon: 
            <ChevronLeft fill={theme[linkTextColor]} transform={[{
                rotate: I18nManager.isRTL
                  ? "180deg"
                  : "0deg"
              }
            ]}/>)
        }

        {
             !isIconButton && (<Text size={textMetrics.fontSize} variant={isLinkButton
              ? linkTextColor
              : buttonTextColor} bold={isLinkButton
              ? (bold || underline)
              : (bold || linkIconLeft || linkIconRight || size === "small"
                ? false
                : true)
}
medium={isLinkButton && !bold && !underline && size === "large"}
numberOfLines={1}
overrideStyles={{
              ...activeStyles.buttonText,
              lineHeight: textMetrics.lineHeight,
            }} {...buttonText}>
            {buttonText.children}
          </Text>)
        }
        {
          isLinkButton && linkIconRight && (<ChevronRight fill={theme[linkTextColor]} transform={[{
                rotate: I18nManager.isRTL
                  ? "180deg"
                  : "0deg"
              }
            ]}/>)
        }
        {isRightIcon && rightIcon}
        {
          isIconButton && (<View style={[
              disabledStyles.iconWrapper, {
                height: size === "small"
                  ? actuatedNormalize(20)
                  : actuatedNormalize(38)
              }
            ]}>
            {icon}
          </View>)
        }
      </TouchableOpacity>
    </View>);
};
