import * as allStories from "./Checkbox.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import { useEffect, useState } from "react";
import { expect } from "storybook/test";
import { spy } from "../.storybook/actions";
import { Checkbox } from "../src/components/checkbox/Checkbox";
import i18n from "i18next";

export default {
  title: "Components/Data Entry/Checkbox",
  component: Checkbox,
  tags: ["!autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    isChecked: { control: "boolean" },
    text: { control: "text" },
    handleCheck: { action: "handleCheck" },
  },
  args: {
    disabled: false,
    text: i18n.t("simpleText"),
    loading: false,
    handleCheck: spy("handleCheck"),
    onChange: spy("onChange"),
  },
};

const InteractiveTemplate = (args: any) => {
  const [checkState, setCheckState] = useState(args.isChecked || false);

  useEffect(() => {
    if (typeof args.isChecked === "boolean") {
      setCheckState(args.isChecked);
    }
  }, [args.isChecked]);

  const handleChange = () => {
    const next = !checkState;
    setCheckState(next);
    args.handleCheck?.(next);
    args.onChange?.(next);
  };

  return (
    <Checkbox {...args} isChecked={checkState} handleCheck={handleChange} />
  );
};

export const Interactive = {
  render: InteractiveTemplate,
  args: {
    isChecked: false,
  },
  play: async ({ canvas, userEvent, args, canvasElement }) => {
    const label = String(args.text || "");
    const target = label
      ? canvas.getByText(label)
      : (canvasElement.querySelector("[tabindex],button") as HTMLElement);
    await userEvent.click(target);
    await expect(args.handleCheck).toHaveBeenCalled();
  },
};

export const Static = {
  args: {
    isChecked: true,
  },
};

export const Disabled = {
  args: {
    isChecked: true,
    disabled: true,
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
  "Interactive",
  "Static",
  "Disabled",
]);
