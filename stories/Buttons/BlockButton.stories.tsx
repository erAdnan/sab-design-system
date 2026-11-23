import * as allStories from "./BlockButton.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { BlockButton } from "../../src/components/block/Button";
import LogoImage from "../../src/components/icons/sab360/LogoImage";

export default {
  title: "Components/Navigation/Buttons/BlockButton",
  component: BlockButton,
  argTypes: {
    caption: { action: "Caption", control: "text" },
    mainText: { action: "Main text", control: "text" },
    addonType: {
      action: "Addon type",
      control: "radio",
      options: ["action", "logo"],
    },
    buttonText: { action: "Button text", control: "text" },
    amount: { action: "Amount", control: "boolean" },
  },
  args: {
    buttonText: "Action",
    caption: "Caption",
    mainText: "Main text",
    amount: false,
    images: [
      "https://i.ytimg.com/vi/CMbcmO59Ua8/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AG-B4AC0AWKAgwIABABGEcgEyh_MA8=&rs=AOn4CLBAcuKNOcXrS_d_VD21KyXR9rBSxQ",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYH_SSP7aYL6wv2X-zOV8WvWh4PWLoBiAgJw&s",
      "https://i.ytimg.com/vi/CMbcmO59Ua8/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AG-B4AC0AWKAgwIABABGEcgEyh_MA8=&rs=AOn4CLBAcuKNOcXrS_d_VD21KyXR9rBSxQ",
      "https://i.ytimg.com/vi/CMbcmO59Ua8/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AG-B4AC0AWKAgwIABABGEcgEyh_MA8=&rs=AOn4CLBAcuKNOcXrS_d_VD21KyXR9rBSxQ",
    ],
    loading: false,
  },
};

export const Action = {
  args: {
    addonType: "action",
  },
};

export const Logo = {
  args: {
    addonType: "logo",
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "Action",
    "Logo",
]);
