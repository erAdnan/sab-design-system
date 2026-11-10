import { View } from "react-native";
import {
  fontMediumLarge,
  spacingXS,
} from "../src/assets/styles/constants/size";
import { Accordion } from "../src/components/accordion/Accordion";
import { List } from "../src/components/list/List";
import { ListItemBadgeType } from "../src/components/list/ListItem";
import { Text } from "../src/components/text/Text";
import { Divider } from "../src/components/divider/Divider";
import { deepTranslateArgs, tx } from "../src/localization/tx";

export default {
  title: "Components/Accordion",
  component: Accordion,
  argTypes: {},
  args: {
    text: "Beneficiary Personal Details",
    loading: false,
  },
};

const listTemplate = [
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
    statusTextState: "active" as "success" | "error" | "warning" | "neutral",
  },
];

const loremLine = () => (
  <View>
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 8,
        paddingVertical: 8,
      }}
    >
      <View
        style={{
          width: 4,
          height: 4,
          borderRadius: 2,
          backgroundColor: "#767676",
          marginTop: 8,
        }}
      />
      <Text
        variant="primarycolor2_100"
        overrideStyles={{ flex: 1, flexShrink: 1 }}
      >
        {tx(
          "Lorem Epsum Lorem Epsum Lorem Epsum Lorem EpsumLorem Epsum Lorem Epsum",
        )}
      </Text>
    </View>
    <Divider />
  </View>
);

const AccordionWithList = (args: any) => {
  const items = (
    <List items={deepTranslateArgs(listTemplate)} />
  );
  return <Accordion {...args} items={items} />;
};

const AccordionWithContent = (args: any) => (
  <Accordion {...args} items={[loremLine(), loremLine(), loremLine()]} />
);

export const Default = {
  render: AccordionWithList,
};

export const NewAccordionWithEditOption = {
  render: AccordionWithList,
  args: {
    text: "Beneficiary Personal Details",
    showEdit: true,
    editLabel: "Edit Section",
  },
};

export const NewAccordionWithCheckbox = {
  render: AccordionWithList,
  args: {
    text: "Title",
    showEdit: true,
    editLabel: "Edit Section",
    showCheckbox: true,
    checkboxProps: {
      isChecked: false,
      handleCheck: (isChecked: boolean) => {
        console.log("Checkbox is now: ", isChecked);
      },
    },
  },
};

export const NewAccordionWithContent = {
  render: AccordionWithContent,
  args: {
    text: "Title",
    showEdit: true,
    editLabel: "Edit Section",
    showCheckbox: true,
    checkboxProps: {
      isChecked: false,
      handleCheck: (isChecked: boolean) => {
        console.log("Checkbox is now: ", isChecked);
      },
    },
  },
};
