import * as allStories from "./AmountEntryText.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { TextInput, View } from "react-native";
import { AmountEntryText } from "../../src/components/amountEntry/AmountEntryText";
import { useEffect, useRef, useState } from "react";
import { Dropdown } from "../../src/components/dropdown/Dropdown";
import { actuatedNormalize } from "../../src/assets/styles/utils/pixelScaling";
import { SABLogo } from "../../src/components/logos/SABLogo";
import Icon from "../../src/components/icon/Icon";
import { mobileContentDecorators } from "../../.storybook/mobileContentFrame";

export default {
  decorators: mobileContentDecorators,
  title: "Components/Input Field/AmountEntry",
  component: AmountEntryText,
  argTypes: {
    showChipsInfoText: { action: "Show chips info text", control: "boolean" },
    chipsInfoTextLabel: { action: "Chips info label", control: "text" },
    chipsInfoTextState: {
      action: "Chips info state",
      control: "radio",
      options: ["success", "error", "info", "warning"],
    },
    showIcon: { action: "Show icon", control: "boolean" },
    showCurrencySelector: { control: "boolean" },
    currencyLabel: { control: "text" },
    helperText: { control: "text" },
  },
  args: {
    showChipsInfoText: false,
    chipsInfoTextLabel: "Default",
    chipsInfoTextState: "error",
    showIcon: false,
    loading: false,
    showCurrencySelector: false,
    currencyLabel: "Saudi Riyal",
    helperText: "",
  },
};

const InteractiveTemplate = (args: any) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [active, setActive] = useState<string | number | null>(null);
  const [amount, setAmount] =useState<string>("");

  const dropdownItems = [
    { withSar: true, label: "Saudi Riyal", value: "dirh1" },
    { label: "(AED) Dirhams", value: "dirh2" },
  ];

  // Get the value of the clicked dropdown item
  const handlePress = (value: any) => {
    setIsDropdownVisible(false);
    console.log("DropdownMenuItem clicked", value);
  };

  const inputRef = useRef<TextInput | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const iconPress = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  useEffect(() => {
    // Simulate data fetch or props update
  
    setAmount(formatAmount(amount ?? ""));
  }, []);

  const formatAmount = (amountvalue: string) => {
    if (!amountvalue) return "";
    let numericAmount = amountvalue.replace(/[^\d.]/g, "");
    if (!numericAmount.includes(".")) {
      numericAmount += ".00";
    }

    if (numericAmount.includes(".")) {
      const [integerPart, decimalPart] = numericAmount.split(".");
      numericAmount = `${integerPart}.${decimalPart.slice(0, 2)}`;
    }

    if (
      numericAmount.length > 1 &&
      numericAmount[0] === "0" &&
      numericAmount[1] !== "."
    ) {
      numericAmount = numericAmount.replace(/^0+/, "");
    }

    // Split into integer and decimal parts
    let [integerPart, decimalPart] = numericAmount.split(".");

    // Add commas
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    if (decimalPart) {
      decimalPart = decimalPart.slice(0, 2);
      if (decimalPart.length === 1) {
        decimalPart = `${decimalPart}0`;
      }
    }

    return `${integerPart}.${decimalPart}`;
  };

  const handleBlur = () => {
    const formattedAmount = formatAmount(amount);
    setAmount(formattedAmount);
    
  };

  return (
    <View>
      <AmountEntryText {...args} onIconPress={iconPress} amount={amount} onBlur={handleBlur}  onChangeValue={(value) => setAmount(value)} ref={inputRef} />
      {isDropdownVisible && (
        <Dropdown
          items={dropdownItems}
          onItemPress={handlePress}
          overrideStyles={{ left: actuatedNormalize(40) }}
          active={active}
          setActive={setActive}
          addonPosition="left"
        />
      )}
    </View>
  );
};

export const Default = {
  render: InteractiveTemplate,
  args: {
    showIcon: true,
  },
};

/** Currency exchange: selector above the amount + helper text below it */
export const CurrencyExchange = {
  render: InteractiveTemplate,
  args: {
    showIcon: false,
    showCurrencySelector: true,
    currencyLabel: "Saudi Riyal",
    currencyIcon: <SABLogo width={actuatedNormalize(24)} height={actuatedNormalize(24)} />,
    currencySwitchIcon: <Icon type="arrows" name="switch" width={actuatedNormalize(7)} height={actuatedNormalize(12)} />,
    helperText: "Default",
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "Default",
    "CurrencyExchange",
]);
