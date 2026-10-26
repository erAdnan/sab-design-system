import i18n from "i18next";
import { TextTitleActions } from "../src/components/text/TextTitleActions";
import Password from "../src/components/icons/functionals/Password";
import PasswordOff from "../src/components/icons/functionals/PasswordOff";
import { useState } from "react";

export default {
  title: "Components/Text Title Actions",
  component: TextTitleActions,
  argTypes: {
    text: { action: "Text title", type: "string", control: "text" },
    showIcon: { action: "Show icon", control: "boolean" },
    showLinkButton: { action: "Show link button", control: "boolean" },
    showLinkButtonIcon: { action: "Show link button", control: "boolean" },
    linkButtonText: { action: "Link button text", control: "text" },
  },
  args: {
    showIcon: true,
    showLinkButton: true,
    showLinkButtonIcon: false,
    linkButtonText: i18n.t("viewAll"),
    loading: false,
  },
};

const InteractiveTemplate = (args: any) => {
  const [hiddenPassword, setHiddenPassword] = useState(false);

  return (
    <TextTitleActions
      {...args}
      onIconPress={() => setHiddenPassword(!hiddenPassword)}
      icon={hiddenPassword ? <PasswordOff /> : <Password />}
    />
  );
};

export const Default = {
  render: InteractiveTemplate,
  args: {
    text: i18n.t("titleText"),
  },
};
