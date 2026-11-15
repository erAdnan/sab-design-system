import * as allStories from "./Accordion.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import React, { useState } from "react";
import { View } from "react-native";
import { expect } from "storybook/test";
import { spy } from "../.storybook/actions";
import { listStoryDecorators } from "../.storybook/listStoryFrame";
import {
  fontMediumLarge,
  spacingXS,
} from "../src/assets/styles/constants/size";
import { Accordion } from "../src/components/accordion/Accordion";
import { List } from "../src/components/list/List";
import { ListItemBadgeType, ListItemProps } from "../src/components/list/ListItem";
import { Text } from "../src/components/text/Text";
import { Divider } from "../src/components/divider/Divider";
import { deepTranslateArgs, tx } from "../src/localization/tx";
import { TextFieldInput } from "../src/components/input/TextFieldInput";

export default {
  title: "Components/Accordion",
  component: Accordion,
  decorators: listStoryDecorators,
  argTypes: {
    handleActionPress: { action: "handleActionPress" },
  },
  args: {
    text: "Beneficiary Personal Details",
    loading: false,
  },
};

const listTemplate: ListItemProps[] = [
  {
    label: { children: "Full Name", variant: "primarycolor2_100static" },
    badgeType: ListItemBadgeType.text,
    badgeText: "Value",
    badgeTextProps: {
      children: "Value",
      bold: true,
      size: fontMediumLarge,
      variant: "primarytextcolor",
    },
    showDivider: true,
    overrideStyles: {
      paddingVertical: spacingXS,
      paddingHorizontal: 0,
      justfyContent: "space-between",
    },
  },
  {
    label: { children: "Address", variant: "primarycolor2_100static" },
    badgeType: ListItemBadgeType.text,
    badgeText: "Value",
    badgeTextProps: {
      children: "Value",
      bold: true,
      size: fontMediumLarge,
      variant: "primarytextcolor",
    },
    showDivider: true,
    overrideStyles: {
      paddingVertical: spacingXS,
      paddingHorizontal: 0,
      justfyContent: "space-between",
    },
  },
  {
    label: { children: "Account Currency", variant: "primarycolor2_100static" },
    badgeType: ListItemBadgeType.text,
    badgeText: "Value",
    badgeTextProps: {
      children: "Value",
      bold: true,
      size: fontMediumLarge,
      variant: "primarytextcolor",
    },
    showDivider: true,
    onItemPress: () => console.log("Copy pressed"),
    overrideStyles: {
      paddingVertical: spacingXS,
      paddingHorizontal: 0,
      justfyContent: "space-between",
    },
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

/** Controlled accordion so Actions/Interactions can spy on expand/collapse. */
const InteractiveAccordion = (args: any) => {
  const [open, setOpen] = useState(!!args.isOpen);
  const handleActionPress = () => {
    setOpen((v) => !v);
    args.handleActionPress?.();
  };
  return (
    <AccordionWithList
      {...args}
      isOpen={open}
      handleActionPress={handleActionPress}
    />
  );
};

export const Interactive = {
  render: InteractiveAccordion,
  args: {
    handleActionPress: spy("handleActionPress"),
  },
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.click(canvas.getByText("Beneficiary Personal Details"));
    await expect(args.handleActionPress).toHaveBeenCalled();
  },
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
      handleCheck: spy("checkbox.handleCheck"),
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
      handleCheck: spy("checkbox.handleCheck"),
    },
  },
};

// ---- Figma parity (Accordion page 103:637, .list): State = Close / Open / Selection / Content ----
// `Default` above is the Close state; the stories below render the expanded states.
export const Open = {
  render: AccordionWithList,
  args: {
    text: "List Title",
    defaultOpen: true,
    showEdit: true,
    editLabel: "Edit Section",
  },
};

export const OpenWithoutEdit = {
  render: AccordionWithList,
  args: {
    text: "List Title",
    defaultOpen: true,
  },
};

export const SelectionOpen = {
  render: AccordionWithList,
  args: {
    text: "List Title",
    defaultOpen: true,
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

export const ContentOpen = {
  render: AccordionWithContent,
  args: {
    text: "List Title",
    defaultOpen: true,
    showEdit: true,
    editLabel: "Edit Section",
  },
};

const AccordionWithInputs = (args: any) => (
  <Accordion
    {...args}
    items={
      <View style={{ gap: 16 }}>
        <TextFieldInput label="Label" placeholder="Placeholder" textInputInput="" onChange={() => {}} error={false} fetched={false} />
        <TextFieldInput label="Label" placeholder="Placeholder" textInputInput="" onChange={() => {}} error={false} fetched={false} />
        <TextFieldInput label="Label" placeholder="Placeholder" textInputInput="" onChange={() => {}} error={false} fetched={false} />
      </View>
    }
  />
);

// Figma `inputList` field list (Field 1..n inside the open accordion)
export const OpenWithInputFields = {
  render: AccordionWithInputs,
  args: {
    text: "List Title",
    defaultOpen: true,
    showEdit: true,
    editLabel: "Edit Section",
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "Default",
    "Interactive",
    "NewAccordionWithEditOption",
    "NewAccordionWithCheckbox",
    "NewAccordionWithContent",
    "Open",
    "OpenWithoutEdit",
    "SelectionOpen",
    "ContentOpen",
    "OpenWithInputFields",
]);
