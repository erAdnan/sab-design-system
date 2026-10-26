import { Balance } from "../src/components/balance/Balance";

export default {
  title: "Components/Balance",
  component: Balance,
  argTypes: {
    firstValue: { action: "First Value", control: "text" },
    secondValue: { action: "Second Value", control: "text" },
  },
  args: {
    loading: false,
  },
};

export const Default = {
  args: {
    firstValue: 12300,
    secondValue: 45000,
  },
};

export const WithStatus = {
  args: {
    firstValue: 12300,
    secondValue: 45000,
    showStatus: true,
    "statusProps.label": "Inactive",
    "statusProps.state": "error",
  },
  argTypes: {
    showStatus: { action: "Show statue", control: "boolean" },
    "statusProps.label": { action: "Status label", control: "text" },
    "statusProps.state": {
      action: "Status state",
      control: "radio",
      options: ["success", "error", "warning", "info"],
    },
  },
};
