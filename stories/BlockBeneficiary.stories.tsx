import * as allStories from "./BlockBeneficiary.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import { Beneficiary } from "../src/components/block/Beneficiary";
import { View } from "react-native";
import MyAccounts from "../src/components/icons/banking/MyAccounts";

export default {
  title: "Components/BlockBeneficiary",
  component: Beneficiary,
  argTypes: {
    name: { action: "Name", control: "text" },
    description: { action: "Description", control: "text" },
  },
  args: {
    loading: false,
  },
};

export const BeneficiaryInitials = {
  args: {
    name: "Ahmed",
    description: "ABC Bank",
    avatarProps: { initials: "AM" },
  },
};

export const BeneficiaryImage = {
  args: {
    name: "Sarah",
    description: "ABC Bank",
    avatarProps: {
      img: "https://t4.ftcdn.net/jpg/04/44/53/99/360_F_444539901_2GSnvmTX14LELJ6edPudUsarbcytOEgj.jpg",
    },
  },
};

export const BeneficiaryInitialsWithStatusIcon = {
  args: {
    name: "Ahmed",
    description: "ABC Bank",
    avatarProps: {
      initials: "AM",
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
  },
};

export const BeneficiaryInitialsWithIcon = {
  args: {
    name: "",
    description: "",
    avatarProps: {
      initials: "AM",
      statusIcon: <MyAccounts width={16} height={16} />,
    },
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "BeneficiaryInitials",
    "BeneficiaryImage",
    "BeneficiaryInitialsWithStatusIcon",
    "BeneficiaryInitialsWithIcon",
]);
