import React, { FC, ReactElement, useCallback, useEffect, useMemo, useRef } from "react";
import { Animated, Easing, I18nManager, LayoutChangeEvent, Pressable, StatusBar, StyleSheet, View } from "react-native";
import { Text } from "../text/Text";
import { Badge, BadgeProps, BadgeSize, BadgeType } from "../badge/Badge";
import { Button, ButtonProps } from "../button/Button";
import { SegmentedButtonProps } from "../button/SegmentedButton";
import { NativeIOSSegmentedButton } from "../button/NativeIOSSegmentedButton";
import { useTheme } from "../../context/theme/themeContext";
import {
  fontLarge,
  fontSmall,
  fontSmallMedium,
  fontXLarge,
  lineHeightXXLarge,
  spacing1XS,
  spacingS,
  spacingXS,
} from "../../assets/styles/constants/size";
import LogoImage from "../icons/sab360/LogoImage";
import International from "../icons/banking/International";
import LogoImageArabic from "../icons/sab360/LogoImageArabic";
import Search from "../icons/functionals/Search";
import Notification from "../icons/notifications/Notification";
import ProfileOutline from "../icons/users/ProfileOutline";
import ProfileOutlineEdit from "../icons/users/ProfileOutlineEdit";
import { Title } from "../text/Title";
import ProfileFilled from "../icons/users/ProfileFilled";
import ArrowLeft from "../icons/arrows/arrow/ArrowLeft";
import ArrowRight from "../icons/arrows/arrow/ArrowRight";
import ProfileFilledEdit from "../icons/users/ProfileFilledEdit";
import Ecommerce from "../icons/other/Ecommerce";
import Chat from "../icons/functionals/Chat";
import { HeaderSkeleton } from "./HeaderSkeleton";
import CustomerService from "../icons/functionals/CustomerService";
import { Edge, SafeAreaView } from "react-native-safe-area-context";
import Help from "../icons/functionals/Help";
import { ChipsOffers } from "../chips/ChipsOffers";
import fonts from "../../assets/styles/constants/fonts";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import Home from "../icons/outline/Home";
import Close from "../icons/arrows/outline/Close";
import Icon from "../icon/Icon";
import { AutomationProps, getAutomationProps } from "../automationProps";
import { holdBackForKeyboard } from "./holdBackForKeyboard";

export interface HeaderProps extends AutomationProps {
	type:
	  | "link"
    | "level0"
    | "level1"
    | "level1-intermediate"
    | "level1-foryou"
    | "level2"
    | "authentication"
    | "search"
    | "level1services";
  state: "prelogin" | "postlogin";
  showNotificationIcon?: boolean;
  onNotificationPress?: () => void;
  showNotificationBadge?: boolean;
  notificationBadgeProps?: BadgeProps;
  showShoppingCartBadge?: boolean;
  shoppingCartBadgeProps?: BadgeProps;
  onShoppingCartPress?: () => void;
  profileIconType?: "filled" | "outline";
  profileIconEdit?: boolean;
  onProfileIconPress?: () => void;
  profileIconSize?: "small" | "large" | "medium";
  showLinkButton?: boolean;
  linkButtonProps?: ButtonProps;
  showSegmentedButton?: boolean;
  segmentedButtonProps?: SegmentedButtonProps;
  showSearchIcon?: boolean;
  onSearchIconPress?: () => void;
  showHelpIcon?: boolean;
  showSearchView?: boolean;
  onHelpIconPress?: () => void;
  showCustomerIcon?: boolean;
  onCustomerServicePress?: () => void;
  firstSupportIcon?: ReactElement<{ fill?: string }>;
  secondSupportIcon?: ReactElement<{ fill?: string }>;
  onFirstSupportIconPress?: () => void;
  onSecondSupportIconPress?: () => void;
  headlineText?: string;
  postloginLabel?: string;
  postloginLabel2?: string;
  postloginLabelType?: "text" | "chips";
  showBackIcon?: boolean;
  onBackIconPress?: () => void;
  onHeaderLogoPress?: () => void;
  /** level2 only — show Home icon on the trailing side of the header */
  showHomeIcon?: boolean;
  showCustomIcon?: boolean;
  customIcon?: ReactElement;
  onCustomIconPress?: () => void;
  onHomeIconPress?: () => void;
  isScrollActive?: boolean;
  showChatbotIcon?: boolean;
  /** Active app language. The pre-login globe shows the other language's icon. */
  language?: "en" | "ar";
  /** Tapping the pre-login language icon. When set, replaces the International icon. */
  onLanguageIconPress?: () => void;
  /** Pre-login close control. When set, replaces the language and International icons. */
  onCloseIconPress?: () => void;
  loading?: boolean;
  overrideStyles?:any
  statusBgColor?: string;
  safeareaviewStyles?:any;
  showCustomProfile?: ReactElement;
  postloginLabelColor?: string;
  logoFill?: string;
  logoColor?: string;
  showForYouCart?:boolean;
  postloginTextWrapper?: any;
  animatedScrollProgress?: Animated.Value | Animated.AnimatedInterpolation<number>;
  safeAreaEdges?: Edge[];
  showServiceDashbaord?: boolean;
  isLite?: boolean;
  setcustomHeaderHeight?: (headerHeight: number) => void | null;
}
/**
 * @property type: Options for choosing header type (same types as in Figma)
 * @property state: Changes the version of the header depeneding on the "prelogin" or "postlogin" state, applicable in cases where header looks different in each state
 * @property showNotificationIcon: Boolean to show/hide notification icon
 * @property onNotificationPress: Optional callback to handle notification icon press
 * @property showNotificationBadge: Boolean to show/hide notification icon badge
 * @property notificationBadgeProps: BadgeProps to configure color, size and number inside the badge used with notification icon
 * @property showShoppingCartBadge: Boolean to show/hide shopping cart icon
 * @property shoppingCartBadgeProps: Boolean to show/hide shopping cart icon badge
 * @property onShoppingCartPress: Optional callback to handle shopping cart icon press
 * @property profileIconType: Choose "filled" or "outline" profile icon
 * @property profileIconEdit: Boolean to show/hide edit option on the profile icon
 * @property onProfileIconPress: Optional callback to handle profile icon press
 * @property profileIconSize: Changes size of the profile icon (default is "medium" - 32px);
 * @property showLinkButton: Boolean to show/hide link button
 * @property linkButtonProps: ButtonProps for configuring link button
 * @property showHelpIcon: Boolean to show/hide help icon
 * @property onHelpIconPress: Optional callback to handle help icon press
 * @property showSearchIcon: Boolean to show/hide search icon
 * @property onSearchIconPress: Optional callback to handle search icon press
 * @property showSearchView: Boolean to show/hide search view
 * @property showCustomerIcon: Boolean to show/hide customer service icon
 * @property onCustomerServicePress: Optional callback to handle customer service icon press
 * @property firstSupportIcon: ReactElement to be used as firstSupportIcon in header variants that support this
 * @property secondSupportIcon: ReactElement to be used as secondSupportIcon in header variants that support this
 * @property onFirstSupportIconPress: Optional callback to handle firstSupportIcon icon press
 * @property onSecondSupportIconPress: Optional callback to handle secondSupportIcon icon press
 * @property headlineText: Text to use as headline of the header
 * @property postloginLabel: Text to be used next to the SAB logo in level0 header with postlogin state (In Figma - "Premiere")
 * @property showBackIcon: Boolean to show/hide back icon
 * @property onBackIconPress: Optional callback to handle back icon press
 * @property onHeaderLogoPress: Optional callback to handle header logo press
 * @property showHomeIcon: Boolean to show/hide Home icon (level2 only)
 * @property onHomeIconPress: Optional callback to handle Home icon press (level2 only)
 * @property isScrollActive: Boolean to be set as true when scroll event is detected (detect scroll outside this component and pass this as a prop to make sure it is activated only when needed)
 * @property showChatbotIcon: Boolean to show/hide chatbot icon, used in prelogin for level 0 and level 1 headers
 * @property loading: Boolean to show/hide loading state
 * @property overrideStyles: Applies new styling settings that will override the default ones
 * @property safeareaviewStyles: Applies new styling for SafeAreaView 
 * @property statusBgColor : add the status background color use this props to change the background color of the status bar 
 * @property showCustomProfile : use this props when you dont want to use profileIconType and pass your customer image and icon View as React Child
 * @property postloginLabelColor : use this props  to change the color of the postlogin Premier Customer Advance Customer label text color change 
 * @property logoFill & logoColor : Use these props to customize the SAB logo colors. logoFill controls the logo’s fill color, and logoColor controls the stroke or text color.
 * @property showForYouCart use this props showForYouCart={false} if you dont want to show Foryou Cart icon
 * @property postloginTextWrapper use this props to change the color of  the Vertical line between Logo & postloginLabel like this postloginTextWrapper={{borderColor: theme.primarycolor4static}} for theme 
 * @property Use the showServiceDashbaord prop for the Header version in the Payments and Transfer pages. Show the link button only in the newer version. Please set it to true only for these two dashboard pages.
 */

export const Header: FC<HeaderProps> = ({
  type,
  state,
  showNotificationIcon,
  onNotificationPress,
  showNotificationBadge,
  notificationBadgeProps,
  showShoppingCartBadge,
  shoppingCartBadgeProps,
  onShoppingCartPress,
  profileIconType,
  profileIconEdit,
  profileIconSize = "medium",
  onProfileIconPress,
  showLinkButton,
  linkButtonProps,
  showSegmentedButton,
  segmentedButtonProps,
  showSearchIcon,
  onSearchIconPress,
  showCustomerIcon,
  onCustomerServicePress,
  firstSupportIcon,
  secondSupportIcon,
  onFirstSupportIconPress,
  onSecondSupportIconPress,
  headlineText,
  postloginLabel,
  postloginLabel2,
  postloginLabelType = "text",
  showBackIcon,
  onBackIconPress,
  showCustomIcon,
  customIcon,
  onCustomIconPress,
  onHeaderLogoPress,
  showHomeIcon = false,
  onHomeIconPress,
  isScrollActive = false,
  showChatbotIcon = false,
  language = I18nManager.isRTL ? "ar" : "en",
  onLanguageIconPress,
  onCloseIconPress,
  loading = false,
  overrideStyles,
  statusBgColor,
  safeareaviewStyles,
  showHelpIcon,
  showSearchView,
  onHelpIconPress,
  showCustomProfile,
  postloginLabelColor,
  logoFill,
  logoColor,
  showForYouCart=true,
  postloginTextWrapper,
  animatedScrollProgress,
  safeAreaEdges = ["top"],
  showServiceDashbaord=false,
  isLite=false,
  testID,
  accessibilityLabel,
  setcustomHeaderHeight,
}) => {
  const { theme ,isDarkTheme} = useTheme();
  const isRtl = I18nManager.isRTL;
  const handleHeaderLayout = useCallback((event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;

    setcustomHeaderHeight?.(height)
  }, []);

  // Captured on press-in, before the touch blurs the field and hides the keyboard.
  const backHeldForKeyboardRef = useRef(false);
  const handleBackPressIn = useCallback(() => {
    backHeldForKeyboardRef.current = holdBackForKeyboard();
  }, []);
  const handleBackIconPress = useCallback(() => {
    if (backHeldForKeyboardRef.current || holdBackForKeyboard()) {
      backHeldForKeyboardRef.current = false;
      return;
    }
    onBackIconPress?.();
  }, [onBackIconPress]);

  
  const internalProgress = useRef(
    new Animated.Value(isScrollActive ? 1 : 0)
  ).current;
  const progress = animatedScrollProgress ?? internalProgress;

  useEffect(() => {
    if (!animatedScrollProgress) {
      Animated.timing(internalProgress, {
        toValue: isScrollActive ? 1 : 0,
        duration: 220,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();
    }
  }, [isScrollActive, animatedScrollProgress, internalProgress]);

  // level1-intermediate / level1services render the same headline twice (large + nav-bar).
  // Stagger opacities so large is gone before compact appears — never both visible at once.
  const isIntermediateLargeTitle = type === "level1-intermediate" || type === "level1services";

  const compactTitleAnim = useMemo(() => {
    if (isIntermediateLargeTitle) {
      return {
        opacity: progress.interpolate({
          inputRange: [0.48, 1],
          outputRange: [0, 1],
          extrapolate: "clamp",
        }),
      };
    }
    return { opacity: progress };
  }, [progress, isIntermediateLargeTitle]);

  const largeTitleAnim = useMemo(() => {
    if (isIntermediateLargeTitle) {
      return {
        opacity: progress.interpolate({
          inputRange: [0, 0.42],
          outputRange: [1, 0],
          extrapolate: "clamp",
        }),
        maxHeight: progress.interpolate({
          inputRange: [0, 0.48],
          outputRange: [200, 0],
          extrapolate: "clamp",
        }),
        overflow: "hidden" as const,
      };
    }
    return {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
        extrapolate: "clamp",
      }),
      maxHeight: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [200, 0],
        extrapolate: "clamp",
      }),
      overflow: "hidden" as const,
    };
  }, [progress, isIntermediateLargeTitle]);

  const showHeadline = useMemo(
    () =>
      type === "level1" ||
      type === "level1-intermediate" ||
      type === "level1-foryou" ||
      type === "level1services",
    [type]
  );
  const layoutStyles = StyleSheet.create({
    mainContainer: {
      width: "100%",
      // Figma header: px = s (16), pb = xs (12). No top padding after safe-area —
      // keeps the logo row at a stable Y across level0 / level1 tab headers.
      paddingHorizontal: spacingS,
      paddingTop: 0,
      paddingBottom: spacing1XS,
      display: "flex",
      flexDirection: "column",
    },
    level0: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      // Figma content row is a fixed 32px tall — without this, taller/shorter
      // trailing actions (profile vs Services link) change row height and the
      // logo appears to jump when switching Home ↔ Payments tabs.
      alignItems: "center",
      minHeight: actuatedNormalize(32),
    },
    logoSlot: {
      // Lock logo vertical box to Figma content row (32) so height/Y stay
      // identical across level0 (Home) and level1 service headers (Payments).
      height: actuatedNormalize(32),
      justifyContent: "center",
    },
    inlineContent: {
      display: "flex",
      flexDirection: "row",
      gap: spacingXS,
      alignItems: "center",
    },
    postloginTextWrapper: {
      borderLeftWidth: 1,
      borderColor: theme.primarytextcolor,
      paddingHorizontal: spacingXS,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    headlineContent: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      maxWidth: "100%",
      minWidth: 0,
      alignSelf: "stretch",
    },
    headlineContentWrapper:{
     position: "absolute",
     left: 0,
     right: 0,
     bottom:0,
     alignItems: "center",
    }
  });

  const dynamicFirstSupportIcon = useMemo(
    () =>
      firstSupportIcon ? (
        <Pressable
          onPress={onFirstSupportIconPress}
          hitSlop={10}
          {...getAutomationProps(
            testID ? `${testID}-support-1` : undefined,
            accessibilityLabel ? `${accessibilityLabel}-support-1` : undefined,
            "support-1"
          )}
        >
          {React.cloneElement(firstSupportIcon, {
            fill: theme.primarytextcolor,
          })}
        </Pressable>
      ) : null,
    [firstSupportIcon, theme, onFirstSupportIconPress]
  );

  const dynamicSecondSupportIcon = useMemo(
    () =>
      secondSupportIcon ? (
        <Pressable
          onPress={onSecondSupportIconPress}
          hitSlop={10}
          {...getAutomationProps(
            testID ? `${testID}-support-2` : undefined,
            accessibilityLabel ? `${accessibilityLabel}-support-2` : undefined,
            "support-2"
          )}
        >
          {React.cloneElement(secondSupportIcon, {
            fill: theme.primarytextcolor,
          })}
        </Pressable>
      ) : null,
    [secondSupportIcon, theme, onSecondSupportIconPress]
  );

  const isContentWithLogoOrLink = useMemo(
    () => type === "link" || type === "level0" || type === "level1" || type === "level1-foryou",
    [type]
  );

  const isContentWithHeadline = useMemo(
    () => type === "level2" || type === "authentication" || type === "search",
    [type]
	);
	
	const isLink = type === "link";


 const formattedPostloginLabel = useMemo(() => {
  if (!postloginLabel) return "";
  return postloginLabel
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}, [postloginLabel]);

const formattedPostloginLabel2 = useMemo(() => {
  if (!postloginLabel2) return "";
  return postloginLabel2
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}, [postloginLabel2]);


  return loading ? (
    <HeaderSkeleton type={type} state={state} />
  ) : (
    <SafeAreaView edges={safeAreaEdges} style={safeareaviewStyles} onLayout={handleHeaderLayout} >
    <StatusBar
     animated
     backgroundColor={statusBgColor ? statusBgColor : theme.stylesbackground2 }
    barStyle={isLite ? "light-content" : isDarkTheme ? "light-content":"dark-content"}
     translucent={true}
     />

     <View
      style={[layoutStyles.mainContainer,overrideStyles]}
      {...getAutomationProps(testID, accessibilityLabel, headlineText ?? type)}
    >
      {isContentWithLogoOrLink && (
        <View style={layoutStyles.level0}>
          {!isScrollActive && (
            <View style={layoutStyles.inlineContent}>
							  {isRtl ? (
                  <View style={layoutStyles.logoSlot}>
								  <LogoImageArabic
									  width={60}
									  height={20}
									  fill={logoFill ?? theme.primarycolor3}
									  color={logoColor ?? theme.primarytextcolor}
									  onPress={() => onHeaderLogoPress?.()}
								  />
                  </View>
							  ) : (
                  <View style={layoutStyles.logoSlot}>
								  <LogoImage
                    width={60}
                    height={20}
                    fill={logoFill ?? theme.primarycolor3}
                    color={logoColor ?? theme.primarytextcolor}
									  onPress={() => onHeaderLogoPress?.()}
								  />
                  </View>
							  )}
              {state === "postlogin" && postloginLabel && (
                <View style={[layoutStyles.postloginTextWrapper,postloginTextWrapper]}>
                  {postloginLabelType === "text" ? <Text bold variant={postloginLabelColor} size={fontSmall}>
                    {formattedPostloginLabel || ""}
                      </Text> :
                        <ChipsOffers
                          type="new"
                          label={formattedPostloginLabel}
                          overrideStyles={{ backgroundColor: theme.primarycolor3 }}
                          overrideLabelStyles={{ fontFamily: fonts.HSBC_Bold, color: theme.primarytextcolor4 }}
                        />
                      }
                      {postloginLabel2 && <Text bold variant={postloginLabelColor} size={fontSmall}>{formattedPostloginLabel2}</Text>}
                </View>
              )}
            </View>
          )}
          {state === "prelogin" && type === "level1" && showChatbotIcon && (
            <Chat fill={theme.primarytextcolor} />
          )}
          {isScrollActive && headlineText && (
            <>
              <View style={state === "postlogin" && { width: 60 }}></View>
              <Text
                bold
                size={fontLarge}
                overrideStyles={{
                  paddingVertical: 0,
                  paddingHorizontal: 0,
                  alignSelf: "center",
                }}
              >
                {headlineText}
              </Text>
              {state === "prelogin" && <View></View>}
            </>
          )}
          {state === "postlogin" ? (
            <View style={[layoutStyles.inlineContent]}>
                {showCustomIcon && <Pressable onPress={onCustomIconPress} hitSlop={10} {...getAutomationProps(testID ? `${testID}-custom-icon` : undefined, accessibilityLabel ? `${accessibilityLabel}-custom-icon` : undefined, "custom-icon")}>
                  {customIcon}
                </Pressable>}
              {showSearchIcon && (
                <Pressable
                  onPress={onSearchIconPress}
                  hitSlop={10}
                  {...getAutomationProps(
                    testID ? `${testID}-search` : undefined,
                    accessibilityLabel ? `${accessibilityLabel}-search` : undefined,
                    "search"
                  )}
                >
                {/** automation handled on parent pressable */}
                <Search fill={logoFill ?? theme.primarytextcolor} />
              </Pressable>
              )}
              {showSearchView && (
                 <Pressable
                  onPress={onSearchIconPress}
                  hitSlop={10}
                  {...getAutomationProps(
                    testID ? `${testID}-search-view` : undefined,
                    accessibilityLabel ? `${accessibilityLabel}-search-view` : undefined,
                    "search-view"
                  )}
                >
                {/** automation handled on parent pressable */}
                <View style={{backgroundColor: theme.primarygrayinvert, borderRadius: actuatedNormalize(100), paddingHorizontal:spacing1XS, paddingVertical:spacingXS, flexDirection: "row", alignItems: "center", gap: spacingXS}}>
                  <Search height={actuatedNormalize(16)} width={actuatedNormalize(16)} fill={logoFill ?? theme.primarytextcolor} />
                  <Text size={fontSmallMedium} variant={"primarytextcolor"}>Search</Text>
                </View>
                </Pressable>
              )}
              {showHelpIcon && (
                <Pressable
                  onPress={onHelpIconPress}
                  hitSlop={10}
                  {...getAutomationProps(
                    testID ? `${testID}-help` : undefined,
                    accessibilityLabel ? `${accessibilityLabel}-help` : undefined,
                    "help"
                  )}
                >
               <Help
                fill={theme.primarytextcolor}
                 
                />
                </Pressable>
               
              )}
              {showCustomerIcon && (
                <Pressable
                  onPress={onCustomerServicePress}
                  hitSlop={10}
                  {...getAutomationProps(
                    testID ? `${testID}-customer-service` : undefined,
                    accessibilityLabel ? `${accessibilityLabel}-customer-service` : undefined,
                    "customer-service"
                  )}
                >
                 <CustomerService
                 fill={theme.primarytextcolor}
                 
                 />
                 </Pressable>
               
              )}
              {showNotificationIcon && (
                <View style={generalStyles.notificationWrapper}>
                   <Pressable
                    onPress={onNotificationPress}
                    hitSlop={10}
                    {...getAutomationProps(
                      testID ? `${testID}-notification` : undefined,
                      accessibilityLabel ? `${accessibilityLabel}-notification` : undefined,
                      "notification"
                    )}
                  >
                    <Notification fill={logoFill ?? theme.primarytextcolor} />
                   </Pressable>
                  {showNotificationBadge && (
                    <View style={generalStyles.badgeWrapper}>
                      <Badge
                        size={BadgeSize.small}
                        type={BadgeType.primary}
                        {...notificationBadgeProps}
                      />
                    </View>
                  )}
                </View>
              )}
              {type === "level1-foryou" ? (
                  showForYouCart && <View style={generalStyles.notificationWrapper}>
                  <Pressable
                    onPress={onShoppingCartPress}
                    hitSlop={10}
                    {...getAutomationProps(
                      testID ? `${testID}-cart` : undefined,
                      accessibilityLabel ? `${accessibilityLabel}-cart` : undefined,
                      "cart"
                    )}
                  >
                  <Ecommerce
                    fill={theme.primarytextcolor}/>
                  </Pressable>
                  {showShoppingCartBadge && (
                    <View style={generalStyles.badgeWrapper}>
                      <Badge
                        size={BadgeSize.small}
                        type={BadgeType.primary}
                        {...shoppingCartBadgeProps}
                      />
                    </View>
                  )}
                </View>
              ) : showCustomProfile ? (
                  <Pressable
                    onPress={onProfileIconPress}
                    hitSlop={10}
                    {...getAutomationProps(
                      testID ? `${testID}-profile` : undefined,
                      accessibilityLabel ? `${accessibilityLabel}-profile` : undefined,
                      "profile"
                    )}
                  >
                    {showCustomProfile}
                   </Pressable>
              ) : profileIconEdit ? (
                profileIconType === "filled" ? (
                  <Pressable
                    onPress={onProfileIconPress}
                    hitSlop={10}
                    {...getAutomationProps(
                      testID ? `${testID}-profile` : undefined,
                      accessibilityLabel ? `${accessibilityLabel}-profile` : undefined,
                      "profile"
                    )}
                  >
                    <ProfileFilledEdit
                    fill={logoFill ?? theme.primarytextcolor}
                    width={generalStyles[profileIconSize].width}
                    height={generalStyles[profileIconSize].height}
                    
                  />
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={onProfileIconPress}
                    hitSlop={10}
                    {...getAutomationProps(
                      testID ? `${testID}-profile` : undefined,
                      accessibilityLabel ? `${accessibilityLabel}-profile` : undefined,
                      "profile"
                    )}
                  >
                  <ProfileOutlineEdit
                    fill={logoFill ?? theme.primarytextcolor}
                    width={generalStyles[profileIconSize].width}
                    height={generalStyles[profileIconSize].height}
                  />
                  </Pressable>
                )
              ) : profileIconType === "filled" ? (
                <Pressable
                  onPress={onProfileIconPress}
                  hitSlop={10}
                  {...getAutomationProps(
                    testID ? `${testID}-profile` : undefined,
                    accessibilityLabel ? `${accessibilityLabel}-profile` : undefined,
                    "profile"
                  )}
                >
                <ProfileFilled
                  fill={logoFill ?? theme.primarytextcolor}
                  width={generalStyles[profileIconSize].width}
                  height={generalStyles[profileIconSize].height}
                />
                </Pressable>
              ) : showServiceDashbaord && linkButtonProps && !isScrollActive ? (
                <Button
                    size="medium"
                    variant="link"
                    {...linkButtonProps}
                    overrideStyles={{
                      paddingHorizontal: 0,
                      paddingVertical: 0,
                      gap: 0,
                      ...linkButtonProps.overrideStyles,
                    }}
                  />
              ) : showServiceDashbaord && linkButtonProps && isScrollActive ? (
                <View style={layoutStyles.inlineContent}>
                     {dynamicFirstSupportIcon}
                     {dynamicSecondSupportIcon}
                </View>
              ): (
                <ProfileOutline
                  fill={logoFill ?? theme.primarytextcolor}
                  width={generalStyles[profileIconSize].width}
                  height={generalStyles[profileIconSize].height}
                  onPress={() => onProfileIconPress && onProfileIconPress()}
                />
              )}
            </View>
          ) : (
            (type === "level0" || isLink) && (
              <View style={layoutStyles.inlineContent}>
                {/* {showChatbotIcon && state === "prelogin" && (
                  <Chat fill={logoFill ?? theme.primarytextcolor} />
                )} */}
				{ isLink ? (<Button
                    size="medium"
                    variant="link"
                    overrideStyles={{
                      paddingHorizontal: 0,
                      paddingVertical: 0,
                      gap:0,
                    }}
                    {...(linkButtonProps as ButtonProps)}
                  />) : onCloseIconPress ? (
                    <Pressable
                      onPress={onCloseIconPress}
                      hitSlop={10}
                      {...getAutomationProps(
                        testID ? `${testID}-close` : undefined,
                        accessibilityLabel ? `${accessibilityLabel}-close` : undefined,
                        "close"
                      )}
                    >
                      <Close
                        fill={logoFill ?? theme.primarytextcolor}
                        width={24}
                        height={24}
                      />
                    </Pressable>
                  ) : onLanguageIconPress ? (
                    <Pressable
                      onPress={onLanguageIconPress}
                      hitSlop={10}
                      {...getAutomationProps(
                        testID ? `${testID}-language` : undefined,
                        accessibilityLabel ? `${accessibilityLabel}-language` : undefined,
                        "language"
                      )}
                    >
                      <Icon
                        type="banking"
                        name={language === "ar" ? "language_en" : "language_ar"}
                        width={24}
                        height={24}
                        fill={logoFill ?? theme.primarytextcolor}
                      />
                    </Pressable>
                  ) : (
                    <International fill={logoFill ?? theme.primarytextcolor} />
                  )
				} 
              </View>
            )
          )}
        </View>
      )}
      {(type === "level1-intermediate" || type === "level1services") && (
        <View style={layoutStyles.headlineContent}>
          <View>
            {isRtl ? (
              <Pressable
                onPressIn={handleBackPressIn}
                onPress={handleBackIconPress}
                hitSlop={10}
                {...getAutomationProps(
                  testID ? `${testID}-back` : undefined,
                  accessibilityLabel ? `${accessibilityLabel}-back` : undefined,
                  "back"
                )}
              >
                <ArrowRight fill={theme.primarytextcolor} />
              </Pressable>
            ) : (
              <Pressable
                onPressIn={handleBackPressIn}
                onPress={handleBackIconPress}
                hitSlop={10}
                {...getAutomationProps(
                  testID ? `${testID}-back` : undefined,
                  accessibilityLabel ? `${accessibilityLabel}-back` : undefined,
                  "back"
                )}
              >
                <ArrowLeft fill={theme.primarytextcolor} />
              </Pressable>
            )}
          </View>
          {headlineText && (
            <Animated.View style={compactTitleAnim} pointerEvents="none">
              <Text
                bold
                size={fontLarge}
                overrideStyles={{ paddingVertical: 0, paddingHorizontal: 0 }}
              >
                {headlineText}
              </Text>
            </Animated.View>
          )}
         
          <Animated.View style={[compactTitleAnim,{ flexDirection: "row", gap: spacingXS }]} pointerEvents="none">
          {dynamicFirstSupportIcon}
          {dynamicSecondSupportIcon}
          </Animated.View>
        </View>
      )}
      {isContentWithHeadline && (
        <View style={layoutStyles.headlineContent}>
          <View>
            {showBackIcon &&
              (isRtl ? (
                <Pressable
                  onPressIn={handleBackPressIn}
                  onPress={handleBackIconPress}
                  hitSlop={10}
                  {...getAutomationProps(
                    testID ? `${testID}-back` : undefined,
                    accessibilityLabel ? `${accessibilityLabel}-back` : undefined,
                    "back"
                  )}
                >
                <ArrowRight
                  fill={theme.primarytextcolor}
                />
                </Pressable>
              ) : (
                <Pressable
                  onPressIn={handleBackPressIn}
                  onPress={handleBackIconPress}
                  hitSlop={10}
                  {...getAutomationProps(
                    testID ? `${testID}-back` : undefined,
                    accessibilityLabel ? `${accessibilityLabel}-back` : undefined,
                    "back"
                  )}
                >
                <ArrowLeft
                  fill={theme.primarytextcolor}
                />
                </Pressable>
              ))}
          </View>
          {headlineText && (
            <View style={layoutStyles.headlineContentWrapper}>
            <Text
              bold
              size={fontLarge}
              overrideStyles={{ paddingVertical: 0, paddingHorizontal: 0,maxWidth:actuatedNormalize(279) }}
              numberOfLines={1}
            >
              {headlineText}
            </Text>
            </View>
            
          )}
          <View style={layoutStyles.inlineContent}>
            {dynamicFirstSupportIcon}
            {dynamicSecondSupportIcon}
            {type === "level2" && showHomeIcon && (
              <Pressable
                onPress={onHomeIconPress}
                hitSlop={10}
                {...getAutomationProps(
                  testID ? `${testID}-home` : undefined,
                  accessibilityLabel ? `${accessibilityLabel}-home` : undefined,
                  "home"
                )}
              >
                <Home fill={theme.primarytextcolor} />
              </Pressable>
            )}
          </View>
        </View>
      )}

      {showHeadline && (
        <Animated.View style={largeTitleAnim} pointerEvents="box-none">
          <View style={layoutStyles.headlineContent} pointerEvents="box-none">
            <Title
              overrideStyles={{ paddingHorizontal: 0, paddingVertical: 0,...(showLinkButton && { flex: 1, minWidth: 0, flexShrink: 1 }),lineHeight: lineHeightXXLarge}}
              size={fontXLarge}
              numberOfLines={1}
            >
              {headlineText || ""}
            </Title>
            {(showLinkButton || showSegmentedButton || firstSupportIcon || secondSupportIcon) &&
              (state === "postlogin" || (state === "prelogin" && type === "level1")) && !showServiceDashbaord && (
                <View style={layoutStyles.inlineContent}>
                  {dynamicFirstSupportIcon}
                  {dynamicSecondSupportIcon}
                  {showLinkButton && (
                    <Button
                      variant="link"
                      overrideStyles={{
                        paddingHorizontal: 0,
                        paddingVertical: 0,
                      }}
                      {...(linkButtonProps as ButtonProps)}
                    />
                  )}
                  {showSegmentedButton && (
                    <NativeIOSSegmentedButton
                      rounded
                      {...(segmentedButtonProps as SegmentedButtonProps)}
                    />
                  )}
                </View>
              )}
          </View>
        </Animated.View>
      )}
    </View>
    </SafeAreaView>
   
  );
};
const generalStyles = StyleSheet.create({
  small: {
    height: 24,
    width: 24,
  },
  medium: {
    height: 32,
    width: 32,
  },
  large: {
    height: 40,
    width: 40,
  },
  notificationWrapper: {
    position: "relative",
  },
  badgeWrapper: {
    position: "absolute",
    right: 0,
    top: 0,
  },
});
