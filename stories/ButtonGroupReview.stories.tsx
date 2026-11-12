import * as allStories from "./ButtonGroupReview.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import { View } from "react-native";
import { buttonFrameStoryDecorators } from "../.storybook/buttonStoryFrame";
import { actuatedNormalize } from "../src/assets/styles/utils/pixelScaling";
import { ButtonGroupReview } from "../src/components/button/ButtonGroupReview";
import MyAccounts from "../src/components/icons/banking/MyAccounts";
import { useTheme } from "../src/context/theme/themeContext";

// Figma `button.group-review` (Buttons page 7:189) is a 375 wide bottom sheet. The component itself has no outer
// padding (consumers supply it through `overrideStyles`), so the stories pass the Figma sheet frame here.
// Dark (Default / Quantity): 16 side padding, 16 + 16 top, radius 16.
const DARK_SHEET = {
  paddingHorizontal: actuatedNormalize(16),
  paddingTop: actuatedNormalize(32),
  paddingBottom: actuatedNormalize(24),
  borderTopLeftRadius: actuatedNormalize(16),
  borderTopRightRadius: actuatedNormalize(16),
};
// Light ("New button.group-review"): 16 padding, radius 24, soft top shadow (0 -2.5 15, gray 10%).
const LIGHT_SHEET = {
  paddingHorizontal: actuatedNormalize(16),
  paddingTop: actuatedNormalize(16),
  paddingBottom: actuatedNormalize(24),
  borderTopLeftRadius: actuatedNormalize(24),
  borderTopRightRadius: actuatedNormalize(24),
  shadowColor: "#767676",
  shadowOpacity: 0.1,
  shadowRadius: 15,
  shadowOffset: { width: 0, height: -2.5 },
  elevation: 4,
};

export default {
  title: "Components/ButtonGroupReview",
  component: ButtonGroupReview,
  // 375 mobile frame centered on the canvas instead of shrinking/stretching with the desktop width.
  decorators: buttonFrameStoryDecorators,
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
    overrideStyles: DARK_SHEET,
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
    overrideStyles: DARK_SHEET,
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
    overrideStyles: DARK_SHEET,
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
    overrideStyles: LIGHT_SHEET,
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
    overrideStyles: LIGHT_SHEET,
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
    overrideStyles: LIGHT_SHEET,
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

export const AllVariants = createAllVariantsStory(allStories, [
    "Stacked",
    "Inline",
    "Quantity",
    "NewVariantQuantity",
    "NewVariantQuantityWithDisclaimer",
    "NewVariantSummary",
]);
