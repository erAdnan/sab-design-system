import { View } from "react-native";
import { Avatar } from "../src/components/avatar/Avatar";
import Edit from "../src/components/icons/functionals/Edit";
import MyAccounts from "../src/components/icons/banking/MyAccounts";
import IconComponent from "../src/components/icon/Icon";

export default {
  title: "Components/Avatar",
  component: Avatar,
  argTypes: {
    initials: { action: "Initials", control: "text" },
    size: { action: "Size", control: "radio", options: ["small", "medium", "large"] },
  },
  args: {
    size: "medium",
    initials: "",
    loading: false,
  },
};

export const InitialsSmall = {
  args: {
    initials: "JM",
    size: "small",
  },
};

export const InitialsMedium = {
  args: {
    initials: "JM",
    size: "medium",
  },
};

export const InitialsLarge = {
  args: {
    initials: "JM",
    size: "large",
  },
};

export const ProfilePictureSmall = {
  args: {
    img: "https://t4.ftcdn.net/jpg/04/44/53/99/360_F_444539901_2GSnvmTX14LELJ6edPudUsarbcytOEgj.jpg",
    size: "small",
  },
};

export const ProfilePictureMedium = {
  args: {
    img: "https://t4.ftcdn.net/jpg/04/44/53/99/360_F_444539901_2GSnvmTX14LELJ6edPudUsarbcytOEgj.jpg",
    size: "medium",
  },
};

export const ProfilePictureLarge = {
  args: {
    img: "https://t4.ftcdn.net/jpg/04/44/53/99/360_F_444539901_2GSnvmTX14LELJ6edPudUsarbcytOEgj.jpg",
    size: "large",
  },
};

export const ProfilePictureWithStatusIcon = {
  args: {
    img: "https://t4.ftcdn.net/jpg/04/44/53/99/360_F_444539901_2GSnvmTX14LELJ6edPudUsarbcytOEgj.jpg",
    size: "medium",
    statusIcon: (
      <View
        style={{
          backgroundColor: "green",
          height: 14,
          width: 14,
          borderRadius: 100,
        }}
      ></View>
    ),
  },
};

export const ProfilePictureWithEditIcon = {
  args: {
    img: "https://t4.ftcdn.net/jpg/04/44/53/99/360_F_444539901_2GSnvmTX14LELJ6edPudUsarbcytOEgj.jpg",
    size: "large",
    statusIcon: <Edit width={24} height={24} />,
  },
};

export const Icon = {
  args: {
    icon: <MyAccounts />,
  },
};

export const LogoWithIcon = {
  args: {
    logoSource: require("../src/assets/images/amazonLogo.png"),
    icon: <IconComponent type="banking" name="card" />,
  },
};