import React from "react";
import { Platform, View } from "react-native";
import type { Decorator } from "@storybook/react";

/**
 * Web Storybook only: PasswordStrength's bar row relies on Yoga giving flex:1
 * children a definite parent width (native). RN-web shrink-wraps that row under
 * `alignItems: "flex-start"`, so the bars collapse to 0. Force the empty-bar
 * row to full width without changing the mobile component.
 */
export const passwordStrengthWebDecorator: Decorator = (Story) => (
  <View
    // RN-web → data-password-strength-story="true"
    {...({ dataSet: { passwordStrengthStory: true } } as object)}
    style={{ width: "100%" }}
  >
    {Platform.OS === "web" ? (
      <style>{`
        [data-password-strength-story="true"] div:has(> :empty + :empty + :empty) {
          width: 100% !important;
          align-self: stretch !important;
        }
      `}</style>
    ) : null}
    <Story />
  </View>
);
