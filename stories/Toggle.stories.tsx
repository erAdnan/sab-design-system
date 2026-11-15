import * as allStories from "./Toggle.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import { useEffect, useState } from "react";
import { expect } from "storybook/test";
import { spy } from "../.storybook/actions";
import { Toggle } from "../src/components/toggle/Toggle";

export default {
  title: "Components/Toggle",
  component: Toggle,
  argTypes: {
    disabled: { control: "boolean" },
    isEnabled: { control: "boolean" },
    label: { control: "text", description: "Label text shown to the right of the switch" },
    handleToggle: { action: "handleToggle" },
  },
  args: {
    disabled: false,
    handleToggle: spy("handleToggle"),
    onChange: spy("onChange"),
  },
};

const InteractiveTemplate = (args: any) => {
  const [checkState, setCheckState] = useState(args.isEnabled || false);

  useEffect(() => {
    if (typeof args.isEnabled === "boolean") {
      setCheckState(args.isEnabled);
    }
  }, [args.isEnabled]);

  const handleChange = () => {
    const next = !checkState;
    setCheckState(next);
    args.handleToggle?.(next);
    args.onChange?.(next);
  };

  return (
    <Toggle {...args} isEnabled={checkState} handleToggle={handleChange} />
  );
};

export const Interactive = {
  render: InteractiveTemplate,
  args: {
    isEnabled: false,
  },
  play: async ({ canvas, userEvent, args, canvasElement }) => {
    // Toggle is a switch; prefer role, fall back to first pressable in the story root.
    const switchEl =
      canvas.queryByRole?.("switch") ||
      canvasElement.querySelector('[role="switch"],[accessibilityrole="switch"],input') ||
      canvasElement.querySelector("[tabindex]");
    await userEvent.click(switchEl as HTMLElement);
    await expect(args.handleToggle).toHaveBeenCalled();
  },
};

export const Static = {
  args: {
    isEnabled: true,
  },
};

export const Disabled = {
  args: {
    isEnabled: true,
    disabled: true,
  },
};

export const WithLabel = {
  render: InteractiveTemplate,
  args: {
    isEnabled: true,
    label: "Label comes here",
  },
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.click(canvas.getByText("Label comes here"));
    await expect(args.handleToggle).toHaveBeenCalled();
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
  "Interactive",
  "Static",
  "Disabled",
  "WithLabel",
]);
