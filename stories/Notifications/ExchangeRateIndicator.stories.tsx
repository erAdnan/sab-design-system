import * as allStories from "./ExchangeRateIndicator.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { ExchangeRateIndicator } from "../../src/components/info/ExchangeRateIndicator";
import { mobileContentDecorators } from "../../.storybook/mobileContentFrame";

export default {
  decorators: mobileContentDecorators,
  title: "Components/Data Display/Notifications/ExchangeRateIndicator",
  component: ExchangeRateIndicator,
  argTypes: {
    text: { control: "text" },
    loading: { control: "boolean" },
  },
  args: {
    text: "New Exchange rate available. Please refresh to proceed with the transfer.",
    loading: false,
  },
};

export const Default = { args: {} };

export const Localized = { args: { text: undefined } };

export const Loading = { args: { loading: true } };

export const AllVariants = createAllVariantsStory(allStories, [
    "Default",
    "Localized",
    "Loading",
]);
