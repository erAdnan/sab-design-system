import * as allStories from "./BlockProductComplex.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { actuatedNormalize } from "../../src/assets/styles/utils/pixelScaling";
import { ProductComplex } from "../../src/components/block/ProductComplex";
import CreditCards from "../../src/assets/svgs/illustration/CreditCards.svg";

export default {
  title: "Components/Blocks/BlockProductComplex",
  component: ProductComplex,
  argTypes: {
    variant: { control: "radio", options: ["default", "large"] },
    title: { action: "Title", control: "text" },
    subtitle: { action: "Subtitle", control: "text" },
    linkButtonIconLeft: { action: "Icon left", control: "boolean" },
    linkButtonIconRight: { action: "Icon right", control: "boolean" },
    linkButtonText: { action: "Link button text", control: "text" },
    primaryButtonText: { action: "Primary button text", control: "text" },
  },
  args: {
    linkButtonIconRight: false,
    linkButtonIconLeft: false,
    loading: false,
    variant: "default",
    onLinkButtonPress: () => console.log("Link button pressed"),
    onPrimaryButtonPress: () => console.log("Primary button pressed")
  },
};

export const Default = {
  args: {
    title: "Title",
    subtitle: "Subtitle",
    linkButtonText: "Explore Benefits",
    primaryButtonText: "Apply Now",
    imgProps: {
      url: require('../../src/assets/images/card-image.png'),
      isAbsolutePath: true,
      overrideStyles: {
        transform: [{ rotate: '90deg' }],
        width: actuatedNormalize(80)   
      },
      overrideImageStyles: {objectFit: "contain"}
    }
  },
};

export const Large = {
  args: {
    variant: "large",
    title: "Current Account",
    subtitle:
      "Our day to day account, for all your debit card and cheque needs.",
    primaryButtonText: "",
    linkButtonText: "",
    imgProps: {
      localSvg: CreditCards,
    },
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "Default",
    "Large",
]);
