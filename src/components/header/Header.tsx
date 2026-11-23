import React, { FC, ReactElement, useCallback, useEffect, useMemo, useRef } from "react";
import { Animated, Easing, I18nManager, LayoutChangeEvent, Platform, Pressable, StatusBar, StyleSheet, TextInput, View } from "react-native";
import { Text } from "../text/Text";
import { Badge, BadgeProps, BadgeSize, BadgeType } from "../badge/Badge";
import { Button, ButtonProps } from "../button/Button";
import { SegmentedButtonProps } from "../button/SegmentedButton";
import { NativeIOSSegmentedButton } from "../button/NativeIOSSegmentedButton";
import { useTheme } from "../../context/theme/themeContext";
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

/**
 * Figma "Header" frame width (file JC6uz9pPKMGCUSiA7a8gob, page 8:2922). Every header
 * instance is 375 wide with 16 (spacing.S) side padding => 343 content width.
 * Applied on web only; native keeps the full-bleed bar.
 */
const FIGMA_HEADER_WIDTH = 375;
/**
 * Header-local Figma pixel scaler.
 *
 * The shared `actuatedNormalize` subtracts 1 on web (16 -> 15, 24 -> 23), which many
 * other components were verified against. Rather than change that global behaviour,
 * the Header resolves its own geometry here: web renders Figma pixels exactly 1:1,
 * native keeps the shared scaler so iOS/Android output is unchanged.
 */
const figmaPx = (size: number) => (Platform.OS === "web" ? size : actuatedNormalize(size));

// Header geometry (Figma spacing / size / typography values, exact on web).
const spacingXS = figmaPx(8);
const spacing1XS = figmaPx(12);
const spacingS = figmaPx(16);
const spacingM = figmaPx(24);
const spacingL = figmaPx(32);
const spacing1XL = figmaPx(40);
const widthM = figmaPx(24);
const heightM = figmaPx(24);
const widthL = figmaPx(32);
const heightL = figmaPx(32);
const fontSmall = figmaPx(12);
const fontSmallMedium = figmaPx(13);
const fontLarge = figmaPx(17);
const fontXLarge = figmaPx(20);
const lineHeightLarge = figmaPx(22);
const lineHeightXLarge = figmaPx(25);

/** Figma level 0 post-login / level 1 wrapper heights that have no spacing token. */
const FIGMA_LEVEL0_POSTLOGIN_ROW = figmaPx(38);
const FIGMA_LEVEL1_ROW = figmaPx(35);
/** Figma level 2 / auth title box: 343 - 2 * 32 side gutters. */
const FIGMA_TITLE_MAX_WIDTH = figmaPx(279);

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
  /** level1-intermediate only — Figma "Additional Support Icon" (third icon after the first two). */
  additionalSupportIcon?: ReactElement<{ fill?: string }>;
  onAdditionalSupportIconPress?: () => void;
  /**
   * search only — renders the Figma "Global Search" row (circular back button + pill input)
   * instead of the plain centered headline.
   */
  showSearchInput?: boolean;
  /** search input value. A non-empty value renders the Figma "Filled" state (bold text + clear icon). */
  searchValue?: string;
  onSearchChange?: (text: string) => void;
  /** Placeholder shown in the empty (Figma "Active") state. Defaults to "Search". */
  searchPlaceholder?: string;
  /** Shows the static caret from the Figma "Active" state while the input is empty. */
  searchActive?: boolean;
  onSearchClear?: () => void;
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
 * @property additionalSupportIcon: Third support icon for level1-intermediate (Figma "Additional Support Icon")
 * @property showSearchInput: search type only - show the Figma Global Search row (back button + pill input)
 * @property searchValue: search type only - input value; non-empty renders the Figma "Filled" state
 * @property searchPlaceholder: search type only - placeholder text of the empty input
 * @property searchActive: search type only - show the Figma "Active" caret while the input is empty
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
  additionalSupportIcon,
  onAdditionalSupportIconPress,
  showSearchInput = false,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search",
  searchActive = false,
  onSearchClear,
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
  // Vertical geometry below the status bar, measured from the Figma Header variants
  // (all values are spacing tokens except the two wrapper heights above):
  //   link / level0 prelogin : 16 + 24 row + 16                  (frame 106 = 50 status + 56)
  //   level0 postlogin       :  8 + 38 row + 16                  (frame 112)
  //   level1 / foryou        :  0 + 35 row (32 content) + 25 title + 12   (frame 122)
  //   level1-intermediate    :  0 + 24 back row + 25 title + 12  (frame 111)
  //   level2                 :  8 + 24 row + 24                  (frame 106)
  //   authentication         :  8 + 24 row + 8                   (frame 90)
  //   search                 :  0 + 40 row + 12                  (frame 102)
  //   scrolled level0/1      :  0 + 32 row + 8                   (frame 90)
  const metrics = useMemo(() => {
    const isLevel0Family = type === "link" || type === "level0";
    const isLevel1Family = type === "level1" || type === "level1-foryou";
    if (isScrollActive && (isLevel0Family || isLevel1Family)) {
      return { paddingTop: 0, rowMinHeight: spacingL, contentHeight: spacingL, paddingBottom: spacingXS };
    }
    switch (type) {
      case "link":
      case "level0":
        return state === "postlogin"
          ? { paddingTop: spacingXS, rowMinHeight: FIGMA_LEVEL0_POSTLOGIN_ROW, contentHeight: FIGMA_LEVEL0_POSTLOGIN_ROW, paddingBottom: spacingS }
          : { paddingTop: spacingS, rowMinHeight: spacingM, contentHeight: spacingM, paddingBottom: spacingS };
      case "level1":
      case "level1-foryou":
        return { paddingTop: 0, rowMinHeight: FIGMA_LEVEL1_ROW, contentHeight: spacingL, paddingBottom: spacing1XS };
      case "level1-intermediate":
      case "level1services":
        return { paddingTop: 0, rowMinHeight: spacingM, contentHeight: spacingM, paddingBottom: spacing1XS };
      case "level2":
        return { paddingTop: spacingXS, rowMinHeight: spacingM, contentHeight: spacingM, paddingBottom: spacingM };
      case "authentication":
        return { paddingTop: spacingXS, rowMinHeight: spacingM, contentHeight: spacingM, paddingBottom: spacingXS };
      case "search":
        return { paddingTop: 0, rowMinHeight: spacing1XL, contentHeight: spacing1XL, paddingBottom: spacing1XS };
      default:
        return { paddingTop: 0, rowMinHeight: spacingM, contentHeight: spacingM, paddingBottom: spacing1XS };
    }
  }, [type, state, isScrollActive]);

  // Intermediate headers morph from the large-title layout (24 row, pb 12) to the
  // scrolled nav-bar layout (32 row, pb 8) driven by the same scroll progress.
  const intermediateMorph = useMemo(
    () => ({
      paddingBottom: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [spacing1XS, spacingXS],
        extrapolate: "clamp",
      }),
      rowMinHeight: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [spacingM, spacingL],
        extrapolate: "clamp",
      }),
    }),
    [progress]
  );

  const layoutStyles = StyleSheet.create({
    safeArea: {
      // SafeAreaView has no intrinsic width; without an explicit one it hugs its
      // content inside centered parents (Storybook slot, centered product layouts).
      width: "100%",
      // Figma header frame is 375dp wide; keep that fixed on web/Storybook where the
      // viewport is wider than a phone. Native keeps the full-bleed bar.
      ...(Platform.OS === "web" ? { maxWidth: FIGMA_HEADER_WIDTH, alignSelf: "center" as const } : null),
    },
    mainContainer: {
      width: "100%",
      // Figma header: px = s (16). Vertical paddings are per type, see `metrics`.
      paddingHorizontal: spacingS,
      display: "flex",
      flexDirection: "column",
    },
    level0: {
      display: "flex",
      flexDirection: "row",
      justifyContent: isScrollActive ? "flex-end" : "space-between",
      // Figma content row height is fixed per variant (see `metrics`). Without a
      // locked row, taller/shorter trailing actions change the row height and the
      // logo appears to jump when switching Home ↔ Payments tabs.
      alignItems: "center",
      minHeight: metrics.rowMinHeight,
    },
    logoSlot: {
      // Lock logo vertical box to the Figma content row so height/Y stay identical
      // across level0 (Home) and level1 service headers (Payments).
      height: metrics.contentHeight,
      justifyContent: "center",
    },
    inlineContent: {
      display: "flex",
      flexDirection: "row",
      gap: spacingXS,
      alignItems: "center",
    },
    // Scrolled nav-bar actions use Figma spacing.XS (12) between icons.
    scrolledActions: {
      gap: spacing1XS,
    },
    iconSlot: {
      width: widthM,
      height: heightM,
      alignItems: "center",
      justifyContent: "center",
    },
    postloginTextWrapper: {
      // Figma: logo --16-- | 1px divider (18 tall) --8-- label
      marginLeft: spacingXS,
      minHeight: figmaPx(18),
      borderLeftWidth: 1,
      borderColor: theme.primarytextcolor,
      paddingLeft: spacingXS,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    headlineContent: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      minHeight: metrics.rowMinHeight,
    },
    headlineContentWrapper:{
     position: "absolute",
     left: 0,
     right: 0,
     top: 0,
     bottom: 0,
     alignItems: "center",
     justifyContent: "center",
    },
    scrolledTitleWrapper: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: "center",
      justifyContent: "center",
    },
    largeTitleRow: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    // Figma ".Global Search": 40 tall row, 4 gap between the back circle and the pill.
    searchRow: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: figmaPx(4),
      height: spacing1XL,
    },
    searchBackButton: {
      // 8 padding + 24 icon = 40 circle on gray-invert.
      width: spacing1XL,
      height: spacing1XL,
      borderRadius: figmaPx(100),
      backgroundColor: theme.primarygrayinvert,
      alignItems: "center",
      justifyContent: "center",
    },
    searchPill: {
      flex: 1,
      height: spacing1XL,
      flexDirection: "row",
      alignItems: "center",
      gap: spacingXS,
      // Figma: pl 12, pr 16, py 10, radius 36.
      paddingLeft: spacing1XS,
      paddingRight: spacingS,
      paddingVertical: figmaPx(10),
      borderRadius: figmaPx(36),
      backgroundColor: theme.primarygrayinvert,
    },
    searchCaret: {
      width: 1,
      height: figmaPx(15),
      backgroundColor: theme.primarytextcolor,
    },
    searchInputWrapper: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: spacingXS,
      height: figmaPx(18),
    },
  });

  const hasSearchValue = !!searchValue;
  const searchInputStyle = {
    flex: 1,
    padding: 0,
    margin: 0,
    height: figmaPx(18),
    color: theme.primarytextcolor,
    fontFamily: hasSearchValue ? fonts.HSBC_Bold : fonts.HSBC,
    fontSize: hasSearchValue ? fontSmall : fontSmallMedium,
    textAlign: (isRtl ? "right" : "left") as "left" | "right",
    ...(Platform.OS === "web" ? ({ outlineStyle: "none" } as any) : null),
  };

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

  const dynamicAdditionalSupportIcon = useMemo(
    () =>
      additionalSupportIcon ? (
        <Pressable
          onPress={onAdditionalSupportIconPress}
          hitSlop={10}
          {...getAutomationProps(
            testID ? `${testID}-support-3` : undefined,
            accessibilityLabel ? `${accessibilityLabel}-support-3` : undefined,
            "support-3"
          )}
        >
          {React.cloneElement(additionalSupportIcon, {
            fill: theme.primarytextcolor,
          })}
        </Pressable>
      ) : null,
    [additionalSupportIcon, theme, onAdditionalSupportIconPress]
  );

  const isSearchInput = type === "search" && showSearchInput;

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
    <SafeAreaView edges={safeAreaEdges} style={[layoutStyles.safeArea, safeareaviewStyles]} onLayout={handleHeaderLayout} >
    <StatusBar
     animated
     backgroundColor={statusBgColor ? statusBgColor : theme.stylesbackground2 }
    barStyle={isLite ? "light-content" : isDarkTheme ? "light-content":"dark-content"}
     translucent={true}
     />

     <Animated.View
      style={[
        layoutStyles.mainContainer,
        { paddingTop: metrics.paddingTop, paddingBottom: metrics.paddingBottom },
        isIntermediateLargeTitle && { paddingBottom: intermediateMorph.paddingBottom },
        overrideStyles,
      ]}
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
            // Figma scrolled bar: title centered in the 343 content width (32 side
            // gutters), supporting actions pinned to the trailing edge.
            <View style={[layoutStyles.scrolledTitleWrapper, { paddingHorizontal: spacingL }]} pointerEvents="none">
              <Text
                bold
                size={fontLarge}
                numberOfLines={1}
                overrideStyles={{
                  paddingVertical: 0,
                  paddingHorizontal: 0,
                  lineHeight: lineHeightLarge,
                  alignSelf: "center",
                }}
              >
                {headlineText}
              </Text>
            </View>
          )}
          {state === "postlogin" ? (
            <View style={[layoutStyles.inlineContent, isScrollActive && layoutStyles.scrolledActions]}>
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
                <View style={{backgroundColor: theme.primarygrayinvert, borderRadius: figmaPx(100), paddingHorizontal:spacing1XS, paddingVertical:spacingXS, flexDirection: "row", alignItems: "center", gap: spacingXS}}>
                  <Search height={figmaPx(16)} width={figmaPx(16)} fill={logoFill ?? theme.primarytextcolor} />
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
               <View style={layoutStyles.iconSlot}>
                <Help
                  fill={theme.primarytextcolor}
                />
               </View>
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
                    <View style={layoutStyles.iconSlot}>
                      <Notification fill={logoFill ?? theme.primarytextcolor} />
                    </View>
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
                        width={widthM}
                        height={heightM}
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
                        width={widthM}
                        height={heightM}
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
        <Animated.View style={[layoutStyles.headlineContent, { minHeight: intermediateMorph.rowMinHeight }]}>
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
            // Compact nav-bar title: centered in the 343 content width (32 side gutters).
            <Animated.View
              style={[layoutStyles.scrolledTitleWrapper, { paddingHorizontal: spacingL }, compactTitleAnim]}
              pointerEvents="none"
            >
              <Text
                bold
                size={fontLarge}
                numberOfLines={1}
                overrideStyles={{ paddingVertical: 0, paddingHorizontal: 0, lineHeight: lineHeightLarge }}
              >
                {headlineText}
              </Text>
            </Animated.View>
          )}
         
          <Animated.View style={[compactTitleAnim,{ flexDirection: "row", gap: spacingXS }]} pointerEvents="none">
          {dynamicFirstSupportIcon}
          {dynamicSecondSupportIcon}
          {dynamicAdditionalSupportIcon}
          </Animated.View>
        </Animated.View>
      )}
      {isSearchInput && (
        // Figma ".Global Search": circular back button + pill input (Active / Filled).
        <View style={layoutStyles.searchRow}>
          {showBackIcon && (
            <Pressable
              onPressIn={handleBackPressIn}
              onPress={handleBackIconPress}
              hitSlop={10}
              style={layoutStyles.searchBackButton}
              {...getAutomationProps(
                testID ? `${testID}-back` : undefined,
                accessibilityLabel ? `${accessibilityLabel}-back` : undefined,
                "back"
              )}
            >
              {isRtl ? <ArrowRight fill={theme.primarytextcolor} /> : <ArrowLeft fill={theme.primarytextcolor} />}
            </Pressable>
          )}
          <View style={layoutStyles.searchPill}>
            <Search height={figmaPx(16)} width={figmaPx(16)} fill={theme.primarytextcolor} />
            <View style={layoutStyles.searchInputWrapper}>
              {searchActive && !hasSearchValue && <View style={layoutStyles.searchCaret} />}
              <TextInput
                value={searchValue}
                onChangeText={onSearchChange}
                placeholder={searchPlaceholder}
                placeholderTextColor={theme.primarycolor2_100static}
                style={searchInputStyle}
                {...getAutomationProps(
                  testID ? `${testID}-search-input` : undefined,
                  accessibilityLabel ? `${accessibilityLabel}-search-input` : undefined,
                  "search-input"
                )}
              />
            </View>
            {hasSearchValue && (
              <Pressable
                onPress={onSearchClear}
                hitSlop={10}
                {...getAutomationProps(
                  testID ? `${testID}-search-clear` : undefined,
                  accessibilityLabel ? `${accessibilityLabel}-search-clear` : undefined,
                  "search-clear"
                )}
              >
                <Close fill={theme.primarycolor3} width={widthM} height={heightM} />
              </Pressable>
            )}
          </View>
        </View>
      )}
      {isContentWithHeadline && !isSearchInput && (
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
              overrideStyles={{ paddingVertical: 0, paddingHorizontal: 0, lineHeight: lineHeightLarge, maxWidth: FIGMA_TITLE_MAX_WIDTH }}
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
          <View style={layoutStyles.largeTitleRow} pointerEvents="box-none">
            <Title
              overrideStyles={{ paddingHorizontal: 0, paddingVertical: 0, flexShrink: 1, ...(showLinkButton && { width: figmaPx(217) }), lineHeight: lineHeightXLarge }}
              size={fontXLarge}
              numberOfLines={1}
            >
              {headlineText || ""}
            </Title>
            {(showLinkButton || showSegmentedButton || firstSupportIcon || secondSupportIcon || additionalSupportIcon) &&
              (state === "postlogin" || (state === "prelogin" && type === "level1")) && !showServiceDashbaord && (
                <View style={layoutStyles.inlineContent}>
                  {dynamicFirstSupportIcon}
                  {dynamicSecondSupportIcon}
                  {dynamicAdditionalSupportIcon}
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
    </Animated.View>
    </SafeAreaView>
   
  );
};
const generalStyles = StyleSheet.create({
  small: {
    height: heightM,
    width: widthM,
  },
  medium: {
    height: heightL,
    width: widthL,
  },
  large: {
    height: spacing1XL,
    width: spacing1XL,
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
