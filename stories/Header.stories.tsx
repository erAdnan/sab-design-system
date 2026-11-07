import {Animated, ScrollView, StyleSheet, View} from "react-native";
import {Header} from "../src/components/header/Header";
import {useState} from "react";
import {BadgeSize, BadgeType} from "../src/components/badge/Badge";
import Info from "../src/components/icons/status/Info";
import Close from "../src/components/icons/arrows/outline/Close";
import Wallet from "../src/components/icons/filled/Wallet";
import Menu from "../src/components/icons/functionals/Menu";
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

export const Search = {
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
