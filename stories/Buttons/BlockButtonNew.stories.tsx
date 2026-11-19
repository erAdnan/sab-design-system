import * as allStories from "./BlockButtonNew.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { BlockButtonNew } from "../../src/components/block/BlockButtonNew";
import Mada from "../../src/components/logos/Mada";
import Drahim from "../../src/components/logos/Drahim";
import Sarie from "../../src/components/logos/Sarie";

export default {
  title: "Components/Buttons/BlockButtonNew",
  component: BlockButtonNew,
  argTypes: {
    caption: { control: "text" },
    mainText: { control: "text" },
    secondaryText: { control: "text" },
    secondaryCaption: { control: "text" },
    buttonText: { control: "text" },
    loading: { control: "boolean" },
  },
  args: {
    caption: "Caption",
    mainText: "Main Text",
    secondaryText: "Outstanding Bills",
    secondaryCaption: "3 Bills Due",
    buttonText: "Action",
    loading: false,
    onButtonPress: () => console.log("BlockButtonNew action pressed"),
    onMoreIconPress: () => console.log("BlockButtonNew more pressed"),
  },
};

export const Default = {
  args: {
    logos: [<Mada />, <Drahim />, <Sarie />],
  },
};

/** Remote image/SVG URLs instead of local SVG components */
export const RemoteUrlLogos = {
  args: {
    caption: "Caption",
    mainText: "Main Text",
    secondaryText: "Outstanding Bills",
    secondaryCaption: "3 Bills Due",
    buttonText: "Action",
    logos: [
      "https://crystalpng.com/wp-content/uploads/2025/01/STC-logo-png.png",
      "https://urmb.sabb.com/MobileImages/sabbstore/10005.svg",
      "https://crystalpng.com/wp-content/uploads/2025/01/STC-logo-png.png",
    ],
  },
};

/** Two logos — no "+more" button (threshold is 3) */
export const TwoLogos = {
  args: {
    logos: [<Mada />, <Drahim />],
  },
};

export const WithoutLogos = {
  args: {
    logos: [],
  },
};

export const Loading = {
  args: {
    loading: true,
    logos: [<Mada />, <Drahim />, <Sarie />],
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "Default",
    "RemoteUrlLogos",
    "TwoLogos",
    "WithoutLogos",
    "Loading",
]);
