import { useState } from "react";
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
import Payments from "../src/components/icons/banking/Payments";

export default {
  title: "Components/Bottom Navigation",
  component: BottomNavigation,
};

const InteractiveTemplate = (args: any) => {
  const [active, setActive] = useState<string | number | null>(null);

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
    <View>
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

export const PreLogin = {
  render: InteractiveTemplate,
  args: {
    preLogin: true,
    loading: false,
  },
};

export const PostLogin = {
  render: InteractiveTemplate,
  args: {
    preLogin: false,
    loading: false,
  },
};
