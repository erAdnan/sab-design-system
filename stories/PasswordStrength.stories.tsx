import { PasswordStrength } from "../src/components/passwordStrength/PasswordStrength";
import { useTranslation } from "react-i18next";

export default {
  title: "Components/PasswordStrength",
  component: PasswordStrength,
  argTypes: {
    label: { action: "Label", control: "text" },
    strength: {
      action: "Strength",
      control: "radio",
      options: ["weak", "normal", "strong"],
    },
  },
};

const InteractiveTemplate = (args: any) => {
  const { t } = useTranslation();
  return (
      <PasswordStrength {...args} label={t("label")} />
  );
};

export const Weak = {
  render: InteractiveTemplate,
  args: {
    strength: "weak",
    loading: false,
  },
};

export const Normal = {
  render: InteractiveTemplate,
  args: {
    strength: "normal",
    loading: false,
  },
};

export const Strong = {
  render: InteractiveTemplate,
  args: {
    strength: "strong",
    loading: false,
  },
};
