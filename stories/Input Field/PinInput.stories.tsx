import * as allStories from "./PinInput.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { PinInput } from "../../src/components/input/PinInput";
import { mobileContentDecorators } from "../../.storybook/mobileContentFrame";

export default {
  decorators: mobileContentDecorators,
  title: "Components/Input Field/PinInput",
  component: PinInput,
  argTypes: {
    error: { action: "Error", control: "boolean" },
  },
  args: {
    error: false,
    loading: false,
  },
};

export const PIN = {
  args: {
    type: "pin",
  },
};

export const OTP = {
  args: {
    type: "otp",
    onSubmit: (inputs: string[]) => console.log(inputs), // array of inputs will be logged, e.g. (["1", "2", "3", "4", "5"])
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "PIN",
    "OTP",
]);
