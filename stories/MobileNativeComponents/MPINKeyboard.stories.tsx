import * as allStories from "./MPINKeyboard.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { Pin } from "../../src/components/pinDialPad/Pin";
import { View } from "react-native";

/**
 * Figma: Mobile Native Components → MPIN.keyboard (755:4647)
 * https://www.figma.com/design/JC6uz9pPKMGCUSiA7a8gob/00.-SAB-DS-Components-and-Foundations?node-id=755-4645
 *
 * Types: faceID | Fingerprint | Default
 */
export default {
  title: "Components/Mobile Native Components/MPIN Keyboard",
  component: Pin,
  argTypes: {
    biometricType: {
      control: "radio",
      options: ["faceId", "fingerprint", "none"],
    },
    pinLength: { control: "number" },
  },
  args: {
    info: "",
    pinLength: 6,
    biometricType: "faceId",
    showPinDots: false,
  },
  decorators: [
    (Story: any) => (
      <View style={{ width: 375, backgroundColor: "#FFFFFF", borderTopLeftRadius: 40, borderTopRightRadius: 40, padding: 16 }}>
        <Story />
      </View>
    ),
  ],
};

/** Figma Type=faceID */
export const FaceID = {
  args: {
    biometricType: "faceId",
    onBiometricPress: () => {},
  },
};

/** Figma Type=Fingerprint */
export const Fingerprint = {
  args: {
    biometricType: "fingerprint",
    onBiometricPress: () => {},
  },
};

/** Figma Type=Default — numbers + backspace only */
export const Default = {
  args: {
    biometricType: "none",
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
  "FaceID",
  "Fingerprint",
  "Default",
]);
