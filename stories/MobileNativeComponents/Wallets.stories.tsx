import React from "react";
import { View, StyleSheet } from "react-native";
import * as allStories from "./Wallets.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { ButtonAddWallet } from "../../src/components/newButtons/ButtonAddWallet";
import { ButtonWallet } from "../../src/components/newButtons/ButtonWallet";
import {
  NativeAppStoreButton,
  NativeWalletCardButton,
} from "../../src/components/mobileNative";
import { spacingS, spacingXS } from "../../src/assets/styles/constants/size";

/**
 * Figma: Mobile Native Components → Wallets (12029:55792)
 * button.add-wallets · add-button.wallet · button.wallets
 * https://www.figma.com/design/JC6uz9pPKMGCUSiA7a8gob/00.-SAB-DS-Components-and-Foundations?node-id=755-4645
 */
export default {
  title: "Components/Mobile Native Components/Wallets",
};

const stack = StyleSheet.create({
  col: { gap: spacingS, alignItems: "flex-start" },
  gapSm: { gap: spacingXS },
});

/** Figma app.nativebutton — Playstore / Appstore / Appgallery */
export const AppStoreBadges = {
  render: () => (
    <View style={stack.col}>
      <NativeAppStoreButton type="playstore" />
      <NativeAppStoreButton type="appstore" />
      <NativeAppStoreButton type="appgallery" />
    </View>
  ),
};

/** Figma button.add-wallet — EN / AR via RTL */
export const AddToWallet = {
  render: () => (
    <ButtonAddWallet text="Add to" text2="Wallet" onButtonPress={() => {}} />
  ),
};

/** Figma add-button.wallet — Google / Samsung / AlAwaal / Apple */
export const PayButtons = {
  render: () => (
    <View style={stack.col}>
      <ButtonWallet
        usage="cta"
        type="google"
        text="Add to"
        onButtonPress={() => {}}
      />
      <ButtonWallet
        usage="cta"
        type="google-small"
        text="Add to"
        onButtonPress={() => {}}
      />
      <ButtonWallet usage="cta" type="samsung" onButtonPress={() => {}} />
      <ButtonWallet
        usage="cta"
        type="alawaal"
        text="Add to AlAwaal Pay"
        onButtonPress={() => {}}
      />
      <ButtonWallet
        usage="cta"
        type="apple"
        text="Add to"
        onButtonPress={() => {}}
      />
    </View>
  ),
};

/** Figma button.wallets — Width × Size × Stroke */
export const WalletCardButtons = {
  render: () => (
    <View style={[stack.col, stack.gapSm]}>
      <NativeWalletCardButton width="narrow" size="small" stroke={false} />
      <NativeWalletCardButton width="narrow" size="small" stroke />
      <NativeWalletCardButton width="narrow" size="medium" stroke={false} />
      <NativeWalletCardButton width="narrow" size="medium" stroke />
      <NativeWalletCardButton width="wide" size="small" stroke={false} />
      <NativeWalletCardButton width="wide" size="small" stroke />
      <NativeWalletCardButton width="wide" size="large" stroke={false} />
      <NativeWalletCardButton width="wide" size="large" stroke />
    </View>
  ),
};

export const AllVariants = createAllVariantsStory(allStories, [
  "AppStoreBadges",
  "AddToWallet",
  "PayButtons",
  "WalletCardButtons",
]);
