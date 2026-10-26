import { ProgressIndicatorCircular } from "../src/components/progressIndicatorCircular/ProgressIndicatorCircular";

export default {
  title: "Components/ProgressIndicatorCircular",
  component: ProgressIndicatorCircular,
  argTypes: {
    size: {
      control: "radio",
      options: ["xl", "large", "medium", "small"],
    },
    timeInSeconds: { control: "number" },
    paused: { control: "boolean" },
  },
  args: {
    size: "xl",
    timeInSeconds: 25,
    paused: false,
  },
};

export const XL = {
  args: {
    size: "xl",
    timeInSeconds: 25,
  },
};

export const Large = {
  args: {
    size: "large",
    timeInSeconds: 30,
  },
};

export const Medium = {
  args: {
    size: "medium",
    timeInSeconds: 15,
  },
};

export const Small = {
  args: {
    size: "small",
    timeInSeconds: 10,
  },
};
