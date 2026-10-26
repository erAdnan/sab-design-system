import { ErrorStateIndicator } from "../src/components/errorStateIndicator/ErrorStateIndicator";

export default {
  title: "Components/ErrorStateIndicator",
  component: ErrorStateIndicator,
  argTypes: {
    message: { control: "text" },
    actionLabel: { control: "text" },
    showAction: { control: "boolean" },
    loading: { control: "boolean" },
  },
  args: {
    message: "Couldn't load.",
    actionLabel: "Try Again",
    showAction: true,
    loading: false,
    onTryAgain: () => console.log("Try Again pressed"),
  },
};

export const Default = { args: {} };

export const CustomMessage = {
  args: {
    message: "Unable to fetch transactions.",
    actionLabel: "Retry",
  },
};

export const WithoutAction = {
  args: {
    showAction: false,
  },
};

export const Loading = { args: { loading: true } };
