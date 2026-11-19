import * as allStories from "./RadioButton.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import { useEffect, useState } from "react";
import { expect } from "storybook/test";
import { spy } from "../.storybook/actions";
import i18n from "i18next";
import { RadioButton } from "../src/components/radio/Radio";
import { View } from "react-native";
import { actuatedNormalize } from "../src/assets/styles/utils/pixelScaling";

export default {
  title: "Components/Data Entry/Radio Button",
  component: RadioButton,
  tags: ["!autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
    text: { control: "text" },
    handleCheck: { action: "handleCheck" },
  },
  args: {
    disabled: false,
    handleCheck: spy("handleCheck"),
  },
};

const InteractiveTemplate = (args: any) => {
  const radioValues = ["radio1", "radio2", "radio3"];
  const [checkState, setCheckState] = useState(null);

  useEffect(() => {
    setCheckState(args.value);
  }, [args.value]);

  const handleChange = (value: any) => {
    setCheckState(value);
    args.handleCheck?.(value);
  };

  return (
    <View>
      <View style={{ marginBottom: actuatedNormalize(10) }}>
        <RadioButton
          {...args}
          text={args.text}
          checked={checkState}
          handleCheck={handleChange}
          value={radioValues[0]}
        />
      </View>
      <View style={{ marginBottom: actuatedNormalize(10) }}>
        <RadioButton
          {...args}
          text={args.text}
          checked={checkState}
          handleCheck={handleChange}
          value={radioValues[1]}
        />
      </View>
      <View style={{ marginBottom: actuatedNormalize(10) }}>
        <RadioButton
          {...args}
          text={args.text}
          checked={checkState}
          handleCheck={handleChange}
          value={radioValues[2]}
        />
      </View>
    </View>
  );
};

export const Group = {
  render: InteractiveTemplate,
  args: {
    checked: true,
    text: "",
  },
  play: async ({ canvasElement, userEvent, args }) => {
    const pressables = canvasElement.querySelectorAll(
      '[tabindex],button,[role="radio"],[accessibilityrole="radio"]',
    );
    const target = (pressables[0] || canvasElement.querySelector("div")) as HTMLElement;
    await userEvent.click(target);
    await expect(args.handleCheck).toHaveBeenCalled();
  },
};

export const GroupWithText = {
  render: InteractiveTemplate,
  args: {
    checked: true,
    text: i18n.t("simpleText"),
  },
};

export const GroupWithDisabled = {
  render: InteractiveTemplate,
  args: {
    text: "",
    disabled: true,
  },
};

export const DisabledStates = {
  render: () => (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        gap: actuatedNormalize(8),
      }}
    >
      <RadioButton value="a" checked="none" disabled={true} />
      <RadioButton value="b" checked="b" disabled={true} />
    </View>
  ),
};

export const AllVariants = createAllVariantsStory(allStories, [
  "Group",
  "GroupWithText",
  "GroupWithDisabled",
  "DisabledStates",
]);
