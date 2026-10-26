import ChevronEffectUp from '../src/components/icons/arrows/chevron/ChevronEffectUp';
import Prepaid from "../src/components/icons/outline/Prepaid";
import { ButtonAddWallet } from "../src/components/newButtons/ButtonAddWallet";
import { ButtonWallet } from "../src/components/newButtons/ButtonWallet";
import { FloatingButton } from "../src/components/newButtons/FloatingButton";

export default {
  title: "Components/New Buttons"
};

export const FloatingButtonWithIconRedAccent = {
  render: (args: any) => <FloatingButton {...args} />,
  args: {
    variant: "redAccent",
    text: "Add Card to AlAwwal Pay",
    icon: <Prepaid />,
  },
};

export const FloatingButtonWithIconGrayAccent = {
  render: (args: any) => <FloatingButton {...args} />,
  args: {
    variant: "grayAccent",
    text: "Payments Services",
    icon: <ChevronEffectUp />,
  },
};

export const FloatingButtonIcon = {
  render: (args: any) => <FloatingButton {...args} />,
  args: {
    icon: <Prepaid />
  }
};

export const FloatingButtonText = {
  render: (args: any) => <FloatingButton {...args} />,
  args: {
    text: "Add Card to AlAwwal Pay",
  }
};

export const ButtonAddToWallet = {
  render: (args: any) => <ButtonAddWallet {...args} />,
  args: {
    text: "Add to",
    text2: "Wallet"
  }
}

export const ButtonsWalletAlAwaal = {
  render: (args: any) => <ButtonWallet {...args} />,
  args: {
    text: "Add to AlAwwal Pay",
    //usage: 'selection',
    type: 'alawaal'
  },
 
}

export const ButtonsWalletGoogleLarge = {
  render: (args: any) => <ButtonWallet {...args} />,
  args: {
    text: "Add to",
   // usage: 'selection',
    type: 'google'

  },
}

export const ButtonsWalletGoogleSmall = {
  render: (args: any) => <ButtonWallet {...args} />,
  args: {
    text: "Add to",
   // usage: 'selection',
    type: 'google-small'

  },
}

export const ButtonsWalletSamsung = {
  render: (args: any) => <ButtonWallet {...args} />,
  args: {
    //usage: 'cta',
    type: 'samsung'
  },
}

export const ButtonsWalletApple = {
  render: (args: any) => <ButtonWallet {...args} />,
  args: {
    text: "Add to",
    type: 'apple'
  },
}
