import { View } from "react-native";
import { ButtonGroupReview } from "../src/components/button/ButtonGroupReview";
import MyAccounts from "../src/components/icons/banking/MyAccounts";
import { useTheme } from "../src/context/theme/themeContext";

export default {
  title: "Components/ButtonGroupReview",
  component: ButtonGroupReview,
  argTypes: {
    type: { action: "Type", control: "radio", options: ["stacked", "inline"] },
  },
  args: {
    type: "stacked",
    loading: false,
  },
};

const InteractiveTemplate = (args: any) => {
  const { theme } = useTheme();

  const icon = <MyAccounts fill={theme.primarycolor4static} />;

  return (
    <View>
      <ButtonGroupReview
        {...args}
        buttonGroup={{
          ...args.buttonGroup,
          secondaryButton: {
            ...args.buttonGroup.secondaryButton,
            buttonText: { children: "Action", variant: "primarycolor4static" },
          },
          tertiaryButton: {
            ...args.buttonGroup.tertiaryButton,
            icon: icon,
            overrideStyles: {
              minWidth: "auto",
              borderColor: theme.primarycolor4static,
            },
          },
        }}
      />
    </View>
  );
};

export const Stacked = {
  args: {
    buttonGroup: {
      type: "stacked",
      primaryButton: {
        variant: "fill",
        color: "primary",
        buttonText: { children: "Action" },
      },
      secondaryButton: {
        variant: "outlined",
        buttonText: { children: "Action", variant: "primarycolor4static" },
        overrideStyles: { borderColor: "#fff", width: "100%" },
      },
    },
    amount: 49.735,
    description: "Lorem Ipsum",
  },
};

export const Inline = {
  render: InteractiveTemplate,
  args: {
    buttonGroup: {
      type: "inline",
      primaryButton: {
        variant: "fill",
        color: "primary",
        buttonText: { children: "Action" },
      },
      secondaryButton: {
        variant: "outlined",
        buttonText: { children: "Action" },
      },
      tertiaryButton: {
        variant: "outlined",
        buttonText: { children: "" },
        linkIconRight: true,
        linkIconLeft: false,
      },
    },
    amount: 49.735,
    description: "Lorem Ipsum",
  },
};

export const Quantity = {
  render: (args: any) => <ButtonGroupReview {...args} />,
  args: {
    buttonGroup: {
      type: "inline",
      primaryButton: {
        variant: "fill",
        color: "primary",
        buttonText: { children: "Action" },
      },
      secondaryButton: {
        variant: "outlined",
        buttonText: {
          children: "Action", variant: "primarycolor4static"
        },
      },
      // tertiaryButton: {
      //   variant: "outlined",
      //   buttonText: { children: "" },
      //   linkIconRight: true,
      //   linkIconLeft: false,
      // },
    },
    amount: 49.735,
    withQuantity: true,
    quantityButtonProps: {onButtonPress: () => console.log("Quantity changed")},
    description: "Lorem Ipsum",
  },
};

export const NewVariantQuantity = {
  render: (args: any) => <ButtonGroupReview {...args} />,
  args: {
    buttonGroup: {
      type: "inline",
      primaryButton: {
        variant: "fill",
        color: "primary",
        buttonText: { children: "Action" },
      },
      secondaryButton: {
        variant: "outlined",
        buttonText: {
          children: "Action", variant: "primarytextcolor"
        },
      },
    },
    lightVariant: true,
    amount: "49,735.00",
    withQuantity: true,
    quantityButtonProps: {onButtonPress: () => console.log("Quantity changed")},
  },
};

export const NewVariantQuantityWithDisclaimer = {
  render: (args: any) => <ButtonGroupReview {...args} />,
  args: {
    buttonGroup: {
      type: "inline",
      primaryButton: {
        variant: "fill",
        color: "primary",
        buttonText: { children: "Action" },
      },
      secondaryButton: {
        variant: "outlined",
        buttonText: {
          children: "Action", variant: "primarytextcolor"
        },
      },
    },
    lightVariant: true,
    amount: "49,735.00",
    withQuantity: true,
    quantityButtonProps: { onButtonPress: () => console.log("Quantity changed") },
    showDisclaimer: true,
    disclaimerText: "This is a disclaimer text for Button Group Review component.",
  },
};

export const NewVariantSummary = {
  render: (args: any) => <ButtonGroupReview {...args} />,
  args: {
    buttonGroup: {
      type: "inline",
      primaryButton: {
        variant: "fill",
        color: "primary",
        buttonText: { children: "Action" },
      },
      secondaryButton: {
        variant: "outlined",
        buttonText: {
          children: "Action", variant: "primarytextcolor"
        },
      },
    },
    lightVariant: true,
    amount: "49,735.00",
    withQuantity: false,
    amountLabel: "Total Amount"
  },
};
