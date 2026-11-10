import { TextTitleActions } from "../src/components/text/TextTitleActions";
import Password from "../src/components/icons/functionals/Password";
import PasswordOff from "../src/components/icons/functionals/PasswordOff";
import { useState } from "react";
import en from "../src/localization/locales/en";
import { useStoryCopy } from "./helpers/useStoryCopy";

const SAMPLE_TITLE = en.stories.accountBalance;

export default {
  title: "Components/Text Title Actions",
  component: TextTitleActions,
  argTypes: {
    text: { control: "text" },
    showIcon: { control: "boolean" },
    showLinkButton: { control: "boolean" },
    showLinkButtonIcon: { control: "boolean" },
    linkButtonText: { control: "text" },
  },
  args: {
    text: SAMPLE_TITLE,
    showIcon: true,
    showLinkButton: true,
    showLinkButtonIcon: false,
    linkButtonText: en.stories.viewAll,
    loading: false,
  },
};

const InteractiveTemplate = (args: any) => {
  const [hiddenPassword, setHiddenPassword] = useState(false);
  const copy = useStoryCopy();

  return (
    <TextTitleActions
      {...args}
      text={copy.resolveAccountBalance(args.text)}
      linkButtonText={copy.resolveViewAll(args.linkButtonText)}
      onIconPress={() => setHiddenPassword(!hiddenPassword)}
      icon={hiddenPassword ? <PasswordOff /> : <Password />}
    />
  );
};

export const Default = {
  render: InteractiveTemplate,
  args: {
    text: SAMPLE_TITLE,
  },
};
