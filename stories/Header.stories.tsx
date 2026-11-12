import * as allStories from "./Header.stories";
import {createAllVariantsStory} from "../.storybook/allVariants";
import {MOBILE_FRAME_WIDTH} from "../.storybook/mobileContentFrame";
import {Animated, ScrollView, StyleSheet, View} from "react-native";
import {Header} from "../src/components/header/Header";
import {useState} from "react";
import {BadgeSize, BadgeType} from "../src/components/badge/Badge";
import Info from "../src/components/icons/status/Info";
import Close from "../src/components/icons/arrows/outline/Close";
import Wallet from "../src/components/icons/filled/Wallet";
import Menu from "../src/components/icons/functionals/Menu";
import Settings from "../src/components/icons/outline/Settings";
import {actuatedNormalize} from "../src/assets/styles/utils/pixelScaling";

export default {
  title: "Components/Header",
  component: Header,
  argTypes: {
    state: {
      action: "State",
      control: "radio",
      options: ["prelogin", "postlogin"]
    },
    profileIconType: {
      action: "Profile icon type",
      control: "radio",
      options: ["filled", "outline"]
    },
    profileIconEdit: {
      action: "Profile icon edit",
      control: "boolean"
    },
    showNotificationBadge: {
      action: "Notification badge",
      control: "boolean"
    },
    "notificationBadgeProps.number": {
      action: "Notification number",
      control: "number"
    },
    showNotificationIcon: {
      action: "Notification icon",
      control: "boolean"
    },
    showSearchIcon: {
      action: "Search icon",
      control: "boolean"
    },
    loading: {
      action: "Loading",
      control: "boolean"
    }
  },
  args: {
    state: "prelogin",
    profileIconSize: "medium",
    profileIconEdit: false,
    profileIconType: "filled",
    showNotificationBadge: true,
    "notificationBadgeProps.size": BadgeSize.xs,
    "notificationBadgeProps.type": BadgeType.warning,
    "notificationBadgeProps.number": 1,
    showNotificationIcon: true,
    showSearchIcon: true,
    loading: false
  }
};

const HeaderScrollTemplate = (args : any) => {
  const [isScroll, setIsScroll] = useState(false);

  const scrollY = new Animated.Value(0);

  const handleScroll = Animated.event([
    {
      nativeEvent: {
        contentOffset: {
          y: scrollY
        }
      }
    }
  ], {useNativeDriver: false});

  scrollY.addListener(({value}) => {
    if (value > 0) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  });
  const styles = StyleSheet.create({
    container: {
      height: actuatedNormalize(300),
      width: "100%",
      overflow: "scroll",
      flex: 1, 
    },
    box: {
      height: actuatedNormalize(48),
      width: "100%",
      backgroundColor: "#000000",
      borderRadius: actuatedNormalize(8),
      marginTop: actuatedNormalize(16)
    }, 
  });
  return (<ScrollView style={styles.container} onScroll={handleScroll} stickyHeaderIndices={[0]}>
    <Header {...args} isScrollActive={isScroll}/>
    <View style={{
        paddingHorizontal: actuatedNormalize(8)
      }}>
      <View style={styles.box}></View>
      <View style={styles.box}></View>
      <View style={styles.box}></View>
      <View style={styles.box}></View>
      <View style={styles.box}></View>
      <View style={styles.box}></View>
      <View style={styles.box}></View>
      <View style={styles.box}></View>
      <View style={styles.box}></View>
      <View style={styles.box}></View>
      <View style={styles.box}></View>
      <View style={styles.box}></View>
      <View style={styles.box}></View>
    </View>
  </ScrollView>);
};

const nonScrollStyles = {
  overrideStyles: {
    top: actuatedNormalize(100), 
  }
}

export const Link = {
  args: {
    type: "link",
    postloginLabel: "Premiere",
    ...nonScrollStyles,
    "linkButtonProps.buttonText": {
      children: "Link button"
    },
    "linkButtonProps.linkIconLeft": false,
    "linkButtonProps.linkIconRight": false,
    "linkButtonProps.size": "small",
    "linkButtonProps.disabled": false,
    showChatbotIcon: false
  },
  argTypes: {
    showChatbotIcon: {
      action: "Show chatbot icon",
      control: "boolean"
    },
    "linkButtonProps.size": {
      action: "Link button size",
      control: "radio",
      options: ["small", "large"]
    },
    "linkButtonProps.disabled": {
      action: "Link button disabled",
      control: "boolean"
    }
  }
};

export const Level0 = {
  args: {
    type: "level0",
    postloginLabel: "Premiere",
    showChatbotIcon: false, 
    ...nonScrollStyles
  },
  argTypes: {
    showChatbotIcon: {
      action: "Show chatbot icon",
      control: "boolean"
    }, 
  }
};
export const Level0_NewVariantTopTier = {
  args: {
    type: "level0",
    postloginLabel: "Premier Top Tier",
    state: "postlogin",
    showChatbotIcon: false, 
    ...nonScrollStyles
  },
  argTypes: {
    showChatbotIcon: {
      action: "Show chatbot icon",
      control: "boolean"
    }, 
  }
};

export const Level0_NewVariantFamily = {
  args: {
    type: "level0",
    postloginLabel: "Family",
    state: "postlogin",
    postloginLabelType: "chip",
    showChatbotIcon: false, 
    ...nonScrollStyles
  },
  argTypes: {
    showChatbotIcon: {
      action: "Show chatbot icon",
      control: "boolean"
    }, 
  }
};

export const Level1 = {
  args: {
    type: "level1",
    headlineText: "Headline",
    showLinkButton: false,
    ...nonScrollStyles,
    "linkButtonProps.buttonText": {
      children: "Link button"
    },
    "linkButtonProps.linkIconLeft": false,
    "linkButtonProps.linkIconRight": true,
    "linkButtonProps.size": "small",
    "linkButtonProps.disabled": false,
    isScrollActive: false
  },
  argTypes: {
    isScrollActive: {
      action: "Active scroll",
      control: "boolean"
    },
    showChatbotIcon: {
      action: "Show chatbot icon",
      control: "boolean"
    },
    "linkButtonProps.size": {
      action: "Link button size",
      control: "radio",
      options: ["small", "large"]
    },
    "linkButtonProps.disabled": {
      action: "Link button disabled",
      control: "boolean"
    }
  }
};

export const Level1Intermediate = {
  args: {
    type: "level1-intermediate",
    headlineText: "Headline",
    showLinkButton: false,
    ...nonScrollStyles,
    state: "postlogin",
    "linkButtonProps.buttonText": {
      children: "Link button"
    },
    "linkButtonProps.linkIconLeft": false,
    "linkButtonProps.linkIconRight": true,
    "linkButtonProps.size": "small",
    "linkButtonProps.disabled": false,
    isScrollActive: false
  },
  argTypes: {
    isScrollActive: {
      action: "Active scroll",
      control: "boolean"
    },
    "linkButtonProps.size": {
      action: "Link button size",
      control: "radio",
      options: ["small", "large"]
    },
    "linkButtonProps.disabled": {
      action: "Link button disabled",
      control: "boolean"
    }
  }
};

export const Level1Services = {
  args: {
    type: "level1services",
    headlineText: "Services",
    ...nonScrollStyles,
  },

};

export const Level1WithSegmentedButton = {
  args: {
    type: "level1",
    headlineText: "Headline",
    showSegmentedButton: true,
    segmentedButtonProps: {
      count: 2,
      rounded: true,
      defaultActiveTab: 1,
      buttonOne: {
        buttonText: "Card view",
        icon: <Wallet />,
        onButtonPress: () => console.log("Card view pressed"),
      },
      buttonTwo: {
        buttonText: "List view",
        icon: <Menu />,
        onButtonPress: () => console.log("List view pressed"),
      },
    },
    ...nonScrollStyles,
  },
};

export const Level1IntermediateWithSupportIcons = {
  args: {
    type: "level1-intermediate",
    headlineText: "Headline",
    ...nonScrollStyles,
    firstSupportIcon: <Info/>,
    secondSupportIcon: <Info/>,
    showLinkButton: false,
    state: "postlogin",
    "linkButtonProps.buttonText": {
      children: "Link button"
    },
    "linkButtonProps.linkIconLeft": false,
    "linkButtonProps.linkIconRight": true,
    "linkButtonProps.size": "small",
    "linkButtonProps.disabled": false,
    isScrollActive: false
  },
  argTypes: {
    isScrollActive: {
      action: "Active scroll",
      control: "boolean"
    },
    "linkButtonProps.size": {
      action: "Link button size",
      control: "radio",
      options: ["small", "large"]
    },
    "linkButtonProps.disabled": {
      action: "Link button disabled",
      control: "boolean"
    }
  }
};

export const Level1ForYou = {
  args: {
    type: "level1-foryou",
    headlineText: "For You",
    state: "postlogin",
    showLinkButton: false,
    ...nonScrollStyles,
    "linkButtonProps.buttonText": {
      children: "Link button"
    },
    "linkButtonProps.linkIconLeft": false,
    "linkButtonProps.linkIconRight": true,
    "linkButtonProps.size": "small",
    "linkButtonProps.disabled": false,
    showShoppingCartBadge: true,
    "shoppingCartBadgeProps.size": BadgeSize.xs,
    "shoppingCartBadgeProps.type": BadgeType.primary,
    "shoppingCartBadgeProps.number": 1,
    showNotificationIcon: false,
    isScrollActive: false
  },
  argTypes: {
    isScrollActive: {
      action: "Active scroll",
      control: "boolean"
    },
    "linkButtonProps.size": {
      action: "Link button size",
      control: "radio",
      options: ["small", "large"]
    },
    "linkButtonProps.disabled": {
      action: "Link button disabled",
      control: "boolean"
    }
  }
};

export const Level2 = {
  args: {
    type: "level2",
    headlineText: "Headline",
    ...nonScrollStyles,
    showBackIcon: true,
    firstSupportIcon: <Info/>,
    secondSupportIcon: <Info/>
  }
};

// Figma "Type=Search" (375 x 102): circular back button + pill input (".Global Search", state Active).
const HeaderSearchTemplate = (args: any) => {
  const [value, setValue] = useState<string>(args.searchValue ?? "");
  return (
    <Header
      {...args}
      searchValue={value}
      onSearchChange={setValue}
      onSearchClear={() => setValue("")}
    />
  );
};

export const Search = {
  render: HeaderSearchTemplate,
  args: {
    type: "search",
    state: "postlogin",
    ...nonScrollStyles,
    showSearchInput: true,
    searchActive: true,
    searchPlaceholder: "Search",
    showBackIcon: true
  }
};

// Legacy search header: back arrow + centered headline (no input).
export const SearchTitleOnly = {
  args: {
    type: "search",
    ...nonScrollStyles,
    headlineText: "Search",
    showBackIcon: true
  }
};

export const Authentication = {
  args: {
    type: "authentication",
    ...nonScrollStyles,
    headlineText: "Authentication",
    showBackIcon: false,
    firstSupportIcon: <Close/>
  }
};

export const Level1Scroll = {
  render: HeaderScrollTemplate,
  args: {
    type: "level1",
    headlineText: "Headline",
    showLinkButton: false,
    "linkButtonProps.buttonText": {
      children: "Link button"
    },
    "linkButtonProps.linkIconLeft": false,
    "linkButtonProps.linkIconRight": true,
    "linkButtonProps.size": "small",
    "linkButtonProps.disabled": false,
    isScrollActive: true
  },
  argTypes: {
    isScrollActive: {
      action: "Active scroll",
      control: "boolean"
    },
    "linkButtonProps.size": {
      action: "Link button size",
      control: "radio",
      options: ["small", "large"]
    },
    "linkButtonProps.disabled": {
      action: "Link button disabled",
      control: "boolean"
    }
  }
};

// ---- Figma parity (Header page 8:2922): Level 0 / Level 1 x Pre login / Postlogin, On Scroll variants ----
export const Level0PostLogin = {
  args: {
    type: "level0",
    state: "postlogin",
    postloginLabel: "Premiere",
    showChatbotIcon: false,
    ...nonScrollStyles
  }
};

export const Level1PreLogin = {
  args: {
    type: "level1",
    state: "prelogin",
    headlineText: "Headline",
    showLinkButton: false,
    ...nonScrollStyles
  }
};

export const Level1PostLogin = {
  args: {
    type: "level1",
    state: "postlogin",
    headlineText: "Headline",
    showLinkButton: false,
    ...nonScrollStyles
  }
};

export const Level1ForYouScroll = {
  render: HeaderScrollTemplate,
  args: {
    type: "level1-foryou",
    state: "postlogin",
    headlineText: "For You",
    showLinkButton: false,
    showShoppingCartBadge: true,
    "shoppingCartBadgeProps.size": BadgeSize.xs,
    "shoppingCartBadgeProps.type": BadgeType.primary,
    "shoppingCartBadgeProps.number": 1,
    showNotificationIcon: false,
    isScrollActive: true
  }
};

export const Level1IntermediateScroll = {
  render: HeaderScrollTemplate,
  args: {
    type: "level1-intermediate",
    state: "postlogin",
    headlineText: "Headline",
    showLinkButton: false,
    isScrollActive: true
  }
};

// ---- Figma parity (Header page 8:2922): remaining Level 1 variants ----
// Figma Level 1 (375 x 122 incl. 50 status bar): 35 logo/actions row, 25 headline, 12 bottom padding,
// with the "Link Button" shown in the headline area.
const figmaLinkButtonProps = {
  buttonText: { children: "Link Button" },
  linkIconLeft: false,
  linkIconRight: true,
  size: "small",
  disabled: false,
};

export const Level1PostLoginWithLink = {
  args: {
    type: "level1",
    state: "postlogin",
    headlineText: "Headline",
    showLinkButton: true,
    linkButtonProps: figmaLinkButtonProps,
    ...nonScrollStyles
  }
};

export const Level1PreLoginWithLink = {
  args: {
    type: "level1",
    state: "prelogin",
    headlineText: "Headline",
    showLinkButton: true,
    linkButtonProps: figmaLinkButtonProps,
    ...nonScrollStyles
  }
};

// Figma Level 1 "On Scroll" (375 x 90): 32 centered title row with trailing actions, 8 bottom padding.
export const Level1PostLoginScroll = {
  render: HeaderScrollTemplate,
  args: {
    type: "level1",
    state: "postlogin",
    headlineText: "Headline",
    showLinkButton: false,
    isScrollActive: true
  }
};

export const Level0PostLoginScroll = {
  render: HeaderScrollTemplate,
  args: {
    type: "level0",
    state: "postlogin",
    headlineText: "Headline",
    postloginLabel: "Premiere",
    isScrollActive: true
  }
};

// Static (non-interactive) scrolled states for pixel-checking against Figma "On Scroll" (375 x 90).
export const Level1PostLoginScrolled = {
  args: {
    type: "level1",
    state: "postlogin",
    headlineText: "Headline",
    showLinkButton: false,
    isScrollActive: true,
    ...nonScrollStyles
  }
};

export const Level1IntermediateScrolled = {
  args: {
    type: "level1-intermediate",
    state: "postlogin",
    headlineText: "Headline",
    showLinkButton: false,
    isScrollActive: true,
    ...nonScrollStyles
  }
};

// ============================================================================
// Figma parity (Header page 8:2922) - full variant coverage
// Component set "header" (16999:29744): Type x Language x State x Scroll.
// English/Arabic are the same variants - switch the Storybook locale toolbar for RTL.
// ============================================================================

// ---- Level 0 - Prelogin (375 x 90): brand logo + trailing action (globe / language / close) ----
// Figma doc block 1474:9264: globe, close (X), and their Arabic mirrors.
export const Level0PreLoginLanguage = {
  args: {
    type: "level0",
    state: "prelogin",
    language: "en",
    onLanguageIconPress: () => console.log("Language pressed"),
    ...nonScrollStyles
  }
};

export const Level0PreLoginClose = {
  args: {
    type: "level0",
    state: "prelogin",
    onCloseIconPress: () => console.log("Close pressed"),
    ...nonScrollStyles
  }
};

// ---- Level 0 - Postlogin (375 x 90): logo | label + search, bell (badge), profile ----
export const Level0PostLoginPremier = {
  args: {
    type: "level0",
    state: "postlogin",
    postloginLabel: "Premier",
    showChatbotIcon: false,
    ...nonScrollStyles
  }
};

// ---- Level 1 - Prelogin (375 x 122): logo, headline, optional chatbot + link button ----
export const Level1PreLoginWithChatbot = {
  args: {
    type: "level1",
    state: "prelogin",
    headlineText: "Headline",
    showChatbotIcon: true,
    showLinkButton: false,
    ...nonScrollStyles
  }
};

export const Level1PreLoginWithChatbotAndLink = {
  args: {
    type: "level1",
    state: "prelogin",
    headlineText: "Headline",
    showChatbotIcon: true,
    showLinkButton: true,
    linkButtonProps: figmaLinkButtonProps,
    ...nonScrollStyles
  }
};

// ---- Level 1 - ForYou (375 x 122 / On Scroll 375 x 90) ----
export const Level1ForYouWithLink = {
  args: {
    type: "level1-foryou",
    state: "postlogin",
    headlineText: "ForYou",
    showLinkButton: true,
    linkButtonProps: figmaLinkButtonProps,
    showShoppingCartBadge: true,
    "shoppingCartBadgeProps.size": BadgeSize.xs,
    "shoppingCartBadgeProps.type": BadgeType.primary,
    "shoppingCartBadgeProps.number": 1,
    showNotificationIcon: false,
    ...nonScrollStyles
  }
};

// Static On Scroll state for pixel-checking against Figma "Level 1-ForYou / On Scroll" (375 x 90).
export const Level1ForYouScrolled = {
  args: {
    type: "level1-foryou",
    state: "postlogin",
    headlineText: "ForYou",
    showLinkButton: false,
    showShoppingCartBadge: true,
    "shoppingCartBadgeProps.size": BadgeSize.xs,
    "shoppingCartBadgeProps.type": BadgeType.primary,
    "shoppingCartBadgeProps.number": 1,
    showNotificationIcon: false,
    isScrollActive: true,
    ...nonScrollStyles
  }
};

// ---- Level 1 - Intermediate (375 x 111 / On Scroll 375 x 90) ----
// Figma props: First / Second / Additional Support Icon + link.button add-on.
export const Level1IntermediateWithLink = {
  args: {
    type: "level1-intermediate",
    state: "postlogin",
    headlineText: "Headline",
    showLinkButton: true,
    linkButtonProps: figmaLinkButtonProps,
    ...nonScrollStyles
  }
};

export const Level1IntermediateWithOneSupportIcon = {
  args: {
    type: "level1-intermediate",
    state: "postlogin",
    headlineText: "Headline",
    firstSupportIcon: <Info/>,
    showLinkButton: false,
    ...nonScrollStyles
  }
};

export const Level1IntermediateWithThreeSupportIcons = {
  args: {
    type: "level1-intermediate",
    state: "postlogin",
    headlineText: "Headline",
    firstSupportIcon: <Info/>,
    secondSupportIcon: <Info/>,
    additionalSupportIcon: <Info/>,
    showLinkButton: false,
    ...nonScrollStyles
  }
};

export const Level1IntermediateWithSupportIconsAndLink = {
  args: {
    type: "level1-intermediate",
    state: "postlogin",
    headlineText: "Headline",
    firstSupportIcon: <Info/>,
    secondSupportIcon: <Info/>,
    showLinkButton: true,
    linkButtonProps: figmaLinkButtonProps,
    ...nonScrollStyles
  }
};

export const Level1IntermediateWithSupportIconsScrolled = {
  args: {
    type: "level1-intermediate",
    state: "postlogin",
    headlineText: "Headline",
    firstSupportIcon: <Info/>,
    secondSupportIcon: <Info/>,
    showLinkButton: false,
    isScrollActive: true,
    ...nonScrollStyles
  }
};

// ---- Level 1 - Services (375 x 111): back arrow + large "Services" title ----
// Figma has no On Scroll variant for this type; Level1Services above covers Default.
// Figma "Supporting Actions / Type=Service": settings icon + "Services" link in the Level 1 row.
export const Level1ServiceDashboard = {
  args: {
    type: "level1",
    state: "postlogin",
    headlineText: "Payments",
    showServiceDashbaord: true,
    // The service link replaces the profile icon, so clear the global profile arg.
    profileIconType: undefined,
    profileIconEdit: false,
    showSearchIcon: false,
    showNotificationIcon: false,
    showNotificationBadge: false,
    linkButtonProps: {
      buttonText: { children: "Services", variant: "primarytextcolor" },
      linkIconLeft: true,
      leftIcon: <Settings fill="#000000" />
    },
    ...nonScrollStyles
  }
};

export const Level1ServiceDashboardScrolled = {
  args: {
    type: "level1",
    state: "postlogin",
    headlineText: "Payments",
    showServiceDashbaord: true,
    profileIconType: undefined,
    profileIconEdit: false,
    showSearchIcon: false,
    showNotificationIcon: false,
    showNotificationBadge: false,
    firstSupportIcon: <Info/>,
    secondSupportIcon: <Info/>,
    linkButtonProps: {
      buttonText: { children: "Services", variant: "primarytextcolor" },
      linkIconLeft: true,
      leftIcon: <Settings fill="#000000" />
    },
    isScrollActive: true,
    ...nonScrollStyles
  }
};

// ---- Level 2 (375 x 90): back / centered title / support icons ----
// Figma doc block 1474:9662: back + close, and the mirrored close + forward arrow (Arabic).
export const Level2WithBackAndClose = {
  args: {
    type: "level2",
    state: "postlogin",
    headlineText: "Header",
    showBackIcon: true,
    firstSupportIcon: <Close/>,
    ...nonScrollStyles
  }
};

export const Level2WithClose = {
  args: {
    type: "level2",
    state: "postlogin",
    headlineText: "Header",
    showBackIcon: false,
    firstSupportIcon: <Close/>,
    ...nonScrollStyles
  }
};

export const Level2BackOnly = {
  args: {
    type: "level2",
    state: "postlogin",
    headlineText: "Header",
    showBackIcon: true,
    ...nonScrollStyles
  }
};

export const Level2WithOneSupportIcon = {
  args: {
    type: "level2",
    state: "postlogin",
    headlineText: "Header",
    showBackIcon: true,
    firstSupportIcon: <Info/>,
    ...nonScrollStyles
  }
};

// ---- Authentication / Verification (375 x 90, "Both states") ----
// Figma uses this single header for OTP, IVR, Touch ID and Face ID verification screens
// (frames otp-default 2320:16890, ivr-default 2320:16900, TouchID 2320:18484, FaceID 2320:18491):
// centered "Authentication" title + close as the only action. There is no separate IVR header type.
const authenticationArgs = {
  type: "authentication",
  headlineText: "Authentication",
  showBackIcon: false,
  firstSupportIcon: <Close/>,
  ...nonScrollStyles
};

export const AuthenticationWithBack = {
  args: {
    ...authenticationArgs,
    showBackIcon: true
  }
};

export const AuthenticationOTP = {
  args: { ...authenticationArgs }
};

export const AuthenticationIVR = {
  args: { ...authenticationArgs }
};

export const AuthenticationTouchID = {
  args: { ...authenticationArgs }
};

export const AuthenticationFaceID = {
  args: { ...authenticationArgs }
};

// ---- Search (375 x 102) ----
// Filled state (Figma ".Global Search / State=Filled"): bold value + red clear icon.
export const SearchFilled = {
  render: HeaderSearchTemplate,
  args: {
    type: "search",
    state: "postlogin",
    showSearchInput: true,
    searchValue: "Placeholder",
    showBackIcon: true,
    ...nonScrollStyles
  }
};

// Figma Proto section (17412:27888): search input without the back button (cancel in the field).
export const SearchWithoutBack = {
  render: HeaderSearchTemplate,
  args: {
    type: "search",
    state: "postlogin",
    showSearchInput: true,
    searchActive: true,
    showBackIcon: false,
    ...nonScrollStyles
  }
};

export const SearchFilledWithoutBack = {
  render: HeaderSearchTemplate,
  args: {
    type: "search",
    state: "postlogin",
    showSearchInput: true,
    searchValue: "Placeholder",
    showBackIcon: false,
    ...nonScrollStyles
  }
};

// ---- Loading ----
export const Level0Loading = {
  args: { type: "level0", state: "prelogin", loading: true }
};

export const Level1Loading = {
  args: { type: "level1", state: "postlogin", headlineText: "Headline", loading: true }
};

// Gallery on the 375 Figma frame. Headers are full-width bars, so stack them with generous spacing, drop the
// per-story `top` offset (it is a relative shift that makes stacked headers overlap), and skip the three
// interactive ScrollView templates (their static "Scrolled" siblings are included).
export const AllVariants = createAllVariantsStory(
  allStories,
  [
    "Link",
    "Level0",
    "Level0_NewVariantTopTier",
    "Level0_NewVariantFamily",
    "Level1",
    "Level1Intermediate",
    "Level1Services",
    "Level1WithSegmentedButton",
    "Level1IntermediateWithSupportIcons",
    "Level1ForYou",
    "Level2",
    "Search",
    "SearchTitleOnly",
    "Authentication",
    "Level0PostLogin",
    "Level1PreLogin",
    "Level1PostLogin",
    "Level1PostLoginWithLink",
    "Level1PreLoginWithLink",
    "Level1PostLoginScroll",
    "Level0PostLoginScroll",
    "Level1PostLoginScrolled",
    "Level1IntermediateScrolled",
    "Level0PreLoginLanguage",
    "Level0PreLoginClose",
    "Level0PostLoginPremier",
    "Level1PreLoginWithChatbot",
    "Level1PreLoginWithChatbotAndLink",
    "Level1ForYouWithLink",
    "Level1ForYouScrolled",
    "Level1IntermediateWithLink",
    "Level1IntermediateWithOneSupportIcon",
    "Level1IntermediateWithThreeSupportIcons",
    "Level1IntermediateWithSupportIconsAndLink",
    "Level1IntermediateWithSupportIconsScrolled",
    "Level1ServiceDashboard",
    "Level1ServiceDashboardScrolled",
    "Level2WithBackAndClose",
    "Level2WithClose",
    "Level2BackOnly",
    "Level2WithOneSupportIcon",
    "AuthenticationWithBack",
    "AuthenticationOTP",
    "AuthenticationIVR",
    "AuthenticationTouchID",
    "AuthenticationFaceID",
    "SearchFilled",
    "SearchWithoutBack",
    "SearchFilledWithoutBack",
    "Level0Loading",
    "Level1Loading",
  ],
  {
    exclude: ["Level1Scroll", "Level1ForYouScroll", "Level1IntermediateScroll"],
    maxWidth: MOBILE_FRAME_WIDTH,
    gap: 40,
    itemStyle: { paddingBottom: 8 },
    mapArgs: (args) => {
      const { overrideStyles, ...rest } = args;
      if (!overrideStyles) return rest;
      const { top, ...styles } = overrideStyles;
      return Object.keys(styles).length ? { ...rest, overrideStyles: styles } : rest;
    },
  },
);
