import * as allStories from "./BottomNavigation.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import { useEffect, useState } from "react";
import Home from "../src/components/icons/functionals/Home";
import { BottomNavigation } from "../src/components/navigation/BottomNavigation";
import Transfers from "../src/components/icons/sab360/Transfers";
import ForYou from "../src/components/icons/other/ForYou";
import Call from "../src/components/icons/functionals/Call";
import Menu from "../src/components/icons/functionals/Menu";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { actuatedNormalize } from "../src/assets/styles/utils/pixelScaling";
import Sadad from "../src/components/icons/other/Sadad";
import { centerStoryDecorator } from "../.storybook/centerStoryDecorator";

export default {
  title: "Components/Navigation/Bottom Navigation",
  component: BottomNavigation,
  tags: ["!autodocs"],
  decorators: [centerStoryDecorator],
  argTypes: {
    preLogin: { control: "boolean" },
    loading: { control: "boolean" },
    safeArea: { control: "boolean" },
    initialActive: {
      control: "select",
      options: [null, "home", "payments", "transfers", "forYou", "menu", "contactUs"],
    },
  },
};

/** Figma screen width (375) — the bar is a 333 wide pill centered inside it. */
const FRAME_WIDTH = actuatedNormalize(375);

const InteractiveTemplate = ({ initialActive = null, ...args }: any) => {
  const [active, setActive] = useState<string | number | null>(initialActive);

  // Keep the selected tab in sync when the `initialActive` control changes
  useEffect(() => {
    setActive(initialActive);
  }, [initialActive]);

  const { t } = useTranslation();

  // Get the value of the clicked nav item
  const handlePress = (value: any) => {
    console.log("NavItem clicked", value);
  };

  const items = [
    {
      label: t("navigation.home"),
      value: "home",
      icon: <Home />,
    },
    {
      label: t("navigation.payments"),
      value: "payments",
      icon: <Sadad />,
    },
    {
      label: t("navigation.transfers"),
      value: "transfers",
      icon: <Transfers />,
    },
    {
      label: t("navigation.forYou"),
      value: "forYou",
      icon: <ForYou />,
    },
    args.preLogin
      ? {
          label: t("navigation.contact"),
          value: "contactUs",
          icon: <Call />,
        }
      : {
          label: t("navigation.menu"),
          value: "menu",
          icon: <Menu />,
        },
  ];

  return (
    <View style={{ width: FRAME_WIDTH, maxWidth: "100%" }}>
      <BottomNavigation
        {...args}
        items={items}
        onItemPress={handlePress}
        active={active}
        setActive={setActive}
      />
    </View>
  );
};

// Figma: Active State=None, State=Pre Login / Post Login
export const PreLogin = {
  render: InteractiveTemplate,
  args: {
    preLogin: true,
    loading: false,
    initialActive: null,
  },
};

export const PostLogin = {
  render: InteractiveTemplate,
  args: {
    preLogin: false,
    loading: false,
    initialActive: null,
  },
};

// Selected variants — Figma "New Bottom Nav" (16489:31088), Language=English
// (Arabic is covered by the existing RTL toolbar, not separate stories).
/** Figma: Active State=Home, Language=English, State=Post Login (node 16489:31081) */
export const PostLoginHome = {
  name: "Home selected — Post Login",
  render: InteractiveTemplate,
  args: { preLogin: false, loading: false, initialActive: "home" },
};

/** Figma: Active State=Payments, Language=English, State=Post Login (node 16489:31082) */
export const PostLoginPayments = {
  name: "Payments selected — Post Login",
  render: InteractiveTemplate,
  args: { preLogin: false, loading: false, initialActive: "payments" },
};

/** Figma: Active State=Transfers, Language=English, State=Post Login (node 16489:31077) */
export const PostLoginTransfers = {
  name: "Transfers selected — Post Login",
  render: InteractiveTemplate,
  args: { preLogin: false, loading: false, initialActive: "transfers" },
};

/** Figma: Active State=ForYou, Language=English, State=Post Login (node 16489:31075) */
export const PostLoginForYou = {
  name: "ForYou selected — Post Login",
  render: InteractiveTemplate,
  args: { preLogin: false, loading: false, initialActive: "forYou" },
};

/** Figma: Active State=Menu, Language=English, State=Post Login (node 16489:31073) */
export const PostLoginMenu = {
  name: "Menu selected — Post Login",
  render: InteractiveTemplate,
  args: { preLogin: false, loading: false, initialActive: "menu" },
};

/** Figma: Active State=Home, Language=English, State=Pre Login (node 16489:31084) */
export const PreLoginHome = {
  name: "Home selected — Pre Login",
  render: InteractiveTemplate,
  args: { preLogin: true, loading: false, initialActive: "home" },
};

/** Figma: Active State=Payments, Language=English, State=Pre Login (node 16489:31079) */
export const PreLoginPayments = {
  name: "Payments selected — Pre Login",
  render: InteractiveTemplate,
  args: { preLogin: true, loading: false, initialActive: "payments" },
};

/** Figma: Active State=Transfers, Language=English, State=Pre Login (node 16489:31083) */
export const PreLoginTransfers = {
  name: "Transfers selected — Pre Login",
  render: InteractiveTemplate,
  args: { preLogin: true, loading: false, initialActive: "transfers" },
};

/** Figma: Active State=ForYou, Language=English, State=Pre Login (node 16489:31069) */
export const PreLoginForYou = {
  name: "ForYou selected — Pre Login",
  render: InteractiveTemplate,
  args: { preLogin: true, loading: false, initialActive: "forYou" },
};

/** Figma: Active State=Contact Us, Language=English, State=Pre Login (node 16489:31072) */
export const PreLoginContactUs = {
  name: "Contact Us selected — Pre Login",
  render: InteractiveTemplate,
  args: { preLogin: true, loading: false, initialActive: "contactUs" },
};

export const Loading = {
  render: InteractiveTemplate,
  args: { preLogin: false, loading: true, initialActive: null },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "PreLogin",
    "PostLogin",
    "PostLoginHome",
    "PostLoginPayments",
    "PostLoginTransfers",
    "PostLoginForYou",
    "PostLoginMenu",
    "PreLoginHome",
    "PreLoginPayments",
    "PreLoginTransfers",
    "PreLoginForYou",
    "PreLoginContactUs",
    "Loading",
]);
