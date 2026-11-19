import * as allStories from "./ButtonGroup.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { useState } from "react";
import { buttonContentStoryDecorators } from "../../.storybook/buttonStoryFrame";
import { ButtonGroup } from "../../src/components/button/ButtonGroup";
import MyAccounts from "../../src/components/icons/banking/MyAccounts";
import { useTheme } from "../../src/context/theme/themeContext";
import BlockProductComplexStories from '../BlockProductComplex.stories';

const InteractiveTemplate = (args: any) => {
  const { theme } = useTheme();

  const icon = <MyAccounts fill={theme.primarytextcolor} />;
  return (
    <ButtonGroup {...args} tertiaryButton={{ ...args.tertiaryButton, icon }} />
  );
};

const CheckboxDisclaimerTemplate = (args: any) => {
  const { theme } = useTheme();
  const [checked, setChecked] = useState(false);

  const icon = <MyAccounts fill={theme.primarytextcolor} />;
  const { disclaimerProps: baseDisclaimer, ...rest } = args;

  return (
    <ButtonGroup
      {...rest}
      disclaimerProps={{
        ...baseDisclaimer,
        type: "checkbox",
        isChecked: checked,
        onSelect: setChecked,
      }}
      tertiaryButton={{ ...args.tertiaryButton, icon }}
    />
  );
};

export default {
  title: "Components/Buttons/ButtonGroup",
  component: ButtonGroup,
  // Figma mobile content width (343) centered, instead of stretching across the desktop canvas.
  decorators: buttonContentStoryDecorators,
  argTypes: {
    type: { action: "Type", control: "radio", options: ["stacked", "inline"] },
    tertiaryButton: { action: "Tertiary Button", control: "object" },
  },
  args: {
    type: "stacked",
    loading: false,
  },
};

const defaultDisclaimerText =
  "By continuing with 'Proceed' you acknowledge and agree to the Terms & Conditions";

export const Stacked = {
  render: InteractiveTemplate,
  argTypes: {
    disclaimerProps: { control: "object" },
  },
  args: {
    type: "stacked",
    disclaimerProps: undefined,
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
      variant: "link",
      buttonText: { children: "Link Button" },
      linkIconRight: true,
      linkIconLeft: false,
    },
  },
};

export const Inline = {
  render: InteractiveTemplate,
  args: {
    type: "inline",
    primaryButton: {
      variant: "fill",
      color: "primary",
      buttonText: { children: "Action" },
      size: "large",
    },
    secondaryButton: {
      variant: "outlined",
      buttonText: { children: "Action" },
      size: "large",
    },
    tertiaryButton: {
      variant: "icon",
      size: "large",
      // not needed for icon buttons, but added for demonstration purposes and not to break the storybook dynamic changes
      buttonText: { children: "Link Button" },
      linkIconRight: true,
      linkIconLeft: true,
    },
  },
};

export const StackedWithDisclaimer = {
  name: "Stacked with disclaimer",
  render: InteractiveTemplate,
  argTypes: {
    disclaimerProps: { control: "object" },
  },
  args: {
    type: "stacked",
    disclaimerProps: {
      type: "tooltip",
      text: defaultDisclaimerText,
    },
    primaryButton: {
      variant: "fill",
      color: "primary",
      buttonText: { children: "Action" },
      onButtonPress: () => {},
    },
    secondaryButton: {
      variant: "outlined",
      buttonText: { children: "Action" },
      onButtonPress: () => {},
    },
    tertiaryButton: {
      variant: "link",
      bold: true,
      buttonText: { children: "Link Button" },
      linkIconRight: true,
      onButtonPress: () => {},
    },
  },
};

export const StackedWithCheckboxDisclaimer = {
  name: "Stacked with checkbox disclaimer",
  render: CheckboxDisclaimerTemplate,
  argTypes: {
    disclaimerProps: { control: "object" },
  },
  args: {
    type: "stacked",
    disclaimerProps: {
      type: "checkbox",
      text: defaultDisclaimerText,
    },
    primaryButton: {
      variant: "fill",
      color: "primary",
      buttonText: { children: "Proceed" },
      onButtonPress: () => {},
    },
    secondaryButton: {
      variant: "outlined",
      buttonText: { children: "Cancel" },
      onButtonPress: () => {},
    },
    tertiaryButton: {
      variant: "link",
      bold: true,
      buttonText: { children: "Link Button" },
      linkIconRight: true,
      onButtonPress: () => {},
    },
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "Stacked",
    "Inline",
    "StackedWithDisclaimer",
    "StackedWithCheckboxDisclaimer",
]);
