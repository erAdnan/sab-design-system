import { View } from "react-native";
import {
  fontMediumLarge,
  spacingXS,
} from "../src/assets/styles/constants/size";
import { Accordion } from "../src/components/accordion/Accordion";
import { BulletPoint } from "../src/components/list/BulletPoint";
import { List } from "../src/components/list/List";
import { ListItemBadgeType } from "../src/components/list/ListItem";
import { Text } from "../src/components/text/Text";
import { Divider } from "../src/components/divider/Divider";

export default {
  title: "Components/Accordion",
  component: Accordion,
  argTypes: {},
  args: {
    text: "Beneficiary Personal Details",
    loading: false,
  },
};

const list = [
  {
    label: { children: "Full Name", variant: "primarycolor2_100static" },
    badgeType: ListItemBadgeType.text,
    badgeText: "Value",
    badgeTextProps: {
      bold: true,
      size: fontMediumLarge,
      variant: "primarytextcolor",
      margin: 0,
      padding: 0,
    },
    showDivider: true,
    overrideStyles: {
      paddingVertical: spacingXS,
      paddingHorizontal: 0,
      justfyContent: "space-between",
    },
    statusTextState: "active" as "success" | "error" | "warning" | "neutral",
  },
  {
    label: { children: "Address", variant: "primarycolor2_100static" },
    badgeType: ListItemBadgeType.text,
    badgeText: "Value",
    badgeTextProps: {
      bold: true,
      size: fontMediumLarge,
      variant: "primarytextcolor",
      margin: 0,
      padding: 0,
    },
    showDivider: true,
    overrideStyles: {
      paddingVertical: spacingXS,
      paddingHorizontal: 0,
      justfyContent: "space-between",
    },
    statusTextState: "active" as "success" | "error" | "warning" | "neutral",
  },
  {
    label: { children: "Account Currency", variant: "primarycolor2_100static" },
    badgeType: ListItemBadgeType.text,
    badgeText: "Value",
    badgeTextProps: {
      bold: true,
      size: fontMediumLarge,
      variant: "primarytextcolor",
      margin: 0,
      padding: 0,
    },
    showDivider: true,
    onItemPress: () => console.log("Copy pressed"),
    overrideStyles: {
      paddingVertical: spacingXS,
      paddingHorizontal: 0,
      justfyContent: "space-between",
    },
    statusTextState: "active" as "success" | "error" | "warning" | "neutral", // Example value
  },
];

/* @ts-ignore*/
const accordionListItems = <List items={list} />;

export const Default = {
  args: {
    items: accordionListItems,
  },
};

export const NewAccordionWithEditOption = {
  args: {
    text: "Beneficiary Personal Details",
    items: accordionListItems,
    showEdit: true,
    editLabel: "Edit Section",
  },
};

export const NewAccordionWithCheckbox = {
  args: {
    text: "Title",
    items: accordionListItems,
    showEdit: true,
    editLabel: "Edit Section",
    showCheckbox: true,
    checkboxProps: {
      isChecked: false,
      handleCheck: (isChecked: boolean) => {
        console.log("Checkbox is now: ", isChecked);
      },
    }
  },
};

export const NewAccordionWithContent = {
  args: {
    text: "Title",
    items: [
      <View>
        <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 8, paddingVertical: 8 }}>
          <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: "#767676", marginTop: 8 }}></View>
          <Text variant="primarycolor2_100">Lorem Epsum Lorem Epsum Lorem Epsum Lorem EpsumLorem Epsum Lorem Epsum</Text>
        </View>
        <Divider />
      </View>,
      <View>
        <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 8, paddingVertical: 8 }}>
          <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: "#767676", marginTop: 8 }}></View>
          <Text variant="primarycolor2_100">Lorem Epsum Lorem Epsum Lorem Epsum Lorem EpsumLorem Epsum Lorem Epsum</Text>
        </View>
        <Divider />
      </View>,
      <View>
        <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 8, paddingVertical: 8 }}>
          <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: "#767676", marginTop: 8 }}></View>
          <Text variant="primarycolor2_100">Lorem Epsum Lorem Epsum Lorem Epsum Lorem EpsumLorem Epsum Lorem Epsum</Text>
        </View>
        <Divider />
      </View>,
    ],
    showEdit: true,
    editLabel: "Edit Section",
    showCheckbox: true,
    checkboxProps: {
      isChecked: false,
      handleCheck: (isChecked: boolean) => {
        console.log("Checkbox is now: ", isChecked);
      },
    }
  },
};
