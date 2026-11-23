import * as allStories from "./ImageThumbnail.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import ImageThumbnail from "../../src/components/imageThumbnail/ImageThumbnail";
import {
  radiusL,
  radiusS,
} from "../../src/assets/styles/constants/size";
import { actuatedNormalize } from "../../src/assets/styles/utils/pixelScaling";

/**
 * Figma: 00. SAB DS Components and Foundations
 * https://www.figma.com/design/JC6uz9pPKMGCUSiA7a8gob/00.-SAB-DS-Components-and-Foundations?node-id=4252-24156
 * Component: image.thumbnail — 343×200, radius.L (16)
 */
export default {
  title: "Components/Data Display/ProductsCards/Image Thumbnail",
  component: ImageThumbnail,
  argTypes: {
    width: { control: "number" },
    height: { control: "number" },
    resizeMode: {
      control: "radio",
      options: ["cover", "contain", "stretch", "center"],
    },
    isAbsolutePath: { control: "boolean" },
  },
  args: {
    width: actuatedNormalize(343),
    height: actuatedNormalize(200),
    resizeMode: "cover",
    isAbsolutePath: true,
    url: require("../../src/assets/images/product_image.png"),
    overrideStyles: {
      borderRadius: radiusL,
      overflow: "hidden",
    },
    overrideImageStyles: {
      borderRadius: radiusL,
    },
  },
};

/** Figma image.thumbnail master — 343×200, radius.L */
export const Default = {};

/** No `url` — merchant placeholder fallback. */
export const Placeholder = {
  args: {
    url: undefined,
    isAbsolutePath: false,
  },
};

/** Products card Medium thumbnail size (163.5×95, radius.S). */
export const ProductPageSize = {
  args: {
    width: actuatedNormalize(163.5),
    height: actuatedNormalize(95),
    overrideStyles: {
      borderRadius: radiusS,
      overflow: "hidden",
    },
    overrideImageStyles: {
      borderRadius: radiusS,
    },
  },
};

/** Products card Carousel thumbnail size (138×80, radius.S). */
export const CarouselSize = {
  args: {
    width: actuatedNormalize(138),
    height: actuatedNormalize(80),
    overrideStyles: {
      borderRadius: radiusS,
      overflow: "hidden",
    },
    overrideImageStyles: {
      borderRadius: radiusS,
    },
  },
};

export const Contain = {
  args: {
    resizeMode: "contain",
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
  "Default",
  "Placeholder",
  "ProductPageSize",
  "CarouselSize",
  "Contain",
]);
