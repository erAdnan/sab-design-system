import * as allStories from "./NewDashWidget.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import More from "../../src/components/icons/functionals/More";
import LogoNoText from "../../src/components/icons/sab360/LogoNoText";
import ProfileOutline from "../../src/components/icons/users/ProfileOutline";
import { NewDashWidget } from "../../src/components/widget/NewDashWidget";

export default {
  title: "Components/Data Display/Cards & Accounts & Finance/New Dash Widget",
  component: NewDashWidget
}

export const IconAndLogo = {
  args: {
    loading: false,
    label: "Label",
    description: "Manage, view and control your family members",
    addOns: [
      {
        icon: <ProfileOutline />,
        onClick: () => console.log("Icon clicked"),
        iconColor: "primarycolor4",
        bgColor: "complimentaryprimarycolor3_3"
      },
      {
        icon: <LogoNoText />,
        onClick: () => console.log("Icon clicked"),
        iconColor: "primarycolor3",
        bgColor: "stylesblockbg",
        strokeColor: "primarycolor2"
      }]
  }
}

export const TwoIcons = {
  args: {
    loading: false,
    label: "Label",
    description: "Manage, view and control your family members",
    addOns: [
      {
        icon: <ProfileOutline />,
        onClick: () => console.log("Icon clicked"),
        iconColor: "primarycolor4static",
        bgColor: "complimentaryprimarycolor3_3"
      },
      {
        icon: <More />,
        onClick: () => console.log("Icon clicked"),
        iconColor: "primarycolor4static",
        bgColor: "primarycolor2",
      }]
  }
}

export const AllVariants = createAllVariantsStory(allStories, [
    "IconAndLogo",
    "TwoIcons",
]);
