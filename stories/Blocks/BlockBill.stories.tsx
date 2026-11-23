import * as allStories from "./BlockBill.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import React, { useState } from "react";
import { View } from "react-native";
import { BlockBill } from "../../src/components/block/BlockBill";
import STC from "../../src/components/logos/banks/STC";
import { spacingS } from "../../src/assets/styles/constants/size";

const baseBillArgs = {
  mainText: "Saudi Telecom Company",
  secondaryText: "1234567890 | Postpaid",
  additionalContent: "",
  dueDateText: "Due Date: dd/mm/yyyy",
  amount: "SAR 990.00",
  minAmount: 990,
  informationMessage: "Paid towards SAR 990.00",
  errorMessage: "Amount is below minimum allowed",
  chipInfoProps: {
    variant: "warning" as const,
    label: "Pending",
  },
};

export default {
  title: "Components/Data Display/Blocks/BlockBill",
  component: BlockBill,
  argTypes: {
    mainText: { control: "text" },
    secondaryText: { control: "text" },
    additionalContent: { control: "text" },
    dueDateText: { control: "text" },
    amount: { control: "text" },
    loading: { control: "boolean" },
    selected: { control: "boolean" },
    editable: { control: "boolean" },
    editableAmount: { control: "text" },
    minAmount: { control: "number" },
    informationMessage: { control: "text" },
    errorMessage: { control: "text" },
    inputActive: { control: "boolean" },
    chipInfoProps: { control: "object" },
  },
  args: {
    ...baseBillArgs,
    loading: false,
    selected: false,
    editable: true,
    editableAmount: "990.00",
    inputActive: false,
  },
};

export const Default = {
  args: {
    logo: <STC />,
  },
};

export const Selected = {
  args: {
    logo: <STC />,
    selected: true,
    editableAmount: "990.00",
  },
};

export const SelectedInputActive = {
  args: {
    logo: <STC />,
    selected: true,
    editableAmount: "990.00",
    inputActive: true,
  },
};

export const SelectedNonEditable = {
  args: {
    logo: <STC />,
    selected: true,
    editable: false,
  },
};

export const SelectedWithEditedAmount = {
  args: {
    logo: <STC />,
    selected: true,
    editableAmount: "90.00",
    inputActive: false,
  },
};

export const SelectedWithError = {
  args: {
    logo: <STC />,
    selected: true,
    editableAmount: "9.00",
    inputActive: true,
  },
};

export const WithAdditionalContent = {
  args: {
    logo: <STC />,
    additionalContent: "Account nickname | Reference 12345",
  },
};

export const Pending = {
  args: {
    logo: <STC />,
    chipInfoProps: {
      variant: "warning",
      label: "Pending",
    },
  },
};

export const Loading = {
  args: {
    loading: true,
  },
};

const InteractiveBill = () => {
  const [selected, setSelected] = useState(false);
  const [editableAmount, setEditableAmount] = useState("990.00");
  const [inputActive, setInputActive] = useState(false);

  return (
    <BlockBill
      {...baseBillArgs}
      logo={<STC />}
      selected={selected}
      editableAmount={editableAmount}
      onAmountChange={setEditableAmount}
      inputActive={inputActive}
      onInputActiveChange={setInputActive}
      onPress={() => {
        if (!selected) setSelected(true);
      }}
      onDoublePress={() => {
        setSelected(false);
        setInputActive(false);
        setEditableAmount("990.00");
      }}
    />
  );
};

export const InteractiveSelection = {
  render: () => <InteractiveBill />,
};

const MultiBillList = () => {
  const bills = [
    { id: "1", mainText: "Saudi Telecom Company", amount: "SAR 990.00", min: 990 },
    { id: "2", mainText: "Saudi Electricity Company", amount: "SAR 450.00", min: 450 },
  ];

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [amounts, setAmounts] = useState<Record<string, string>>({
    "1": "990.00",
    "2": "450.00",
  });
  const [activeInputId, setActiveInputId] = useState<string | null>(null);

  const getDefaultAmount = (id: string) => {
    const bill = bills.find((b) => b.id === id);
    return bill ? bill.amount.replace(/SAR\s*/gi, "").trim() : "";
  };

  const selectBill = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const unselectBill = (id: string) => {
    setSelectedIds((prev) => prev.filter((item) => item !== id));
    setActiveInputId(null);
    setAmounts((prev) => ({
      ...prev,
      [id]: getDefaultAmount(id),
    }));
  };

  return (
    <View style={{ gap: spacingS }}>
      {bills.map((bill) => (
        <BlockBill
          key={bill.id}
          {...baseBillArgs}
          mainText={bill.mainText}
          amount={bill.amount}
          minAmount={bill.min}
          logo={<STC />}
          selected={selectedIds.includes(bill.id)}
          editableAmount={amounts[bill.id]}
          onAmountChange={(value) =>
            setAmounts((prev) => ({ ...prev, [bill.id]: value }))
          }
          inputActive={activeInputId === bill.id}
          onInputActiveChange={(active) =>
            setActiveInputId(active ? bill.id : null)
          }
          onPress={() => selectBill(bill.id)}
          onDoublePress={() => unselectBill(bill.id)}
        />
      ))}
    </View>
  );
};

export const MultipleBills = {
  render: () => <MultiBillList />,
};

export const AllVariants = createAllVariantsStory(allStories, [
    "Default",
    "Selected",
    "SelectedInputActive",
    "SelectedNonEditable",
    "SelectedWithEditedAmount",
    "SelectedWithError",
    "WithAdditionalContent",
    "Pending",
    "Loading",
    "InteractiveSelection",
    "MultipleBills",
]);
