import { ExchangeRateIndicator } from "../src/components/info/ExchangeRateIndicator";

export default {
  title: "Components/ExchangeRateIndicator",
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
