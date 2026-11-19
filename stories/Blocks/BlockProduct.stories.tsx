import * as allStories from "./BlockProduct.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { Product } from "../../src/components/block/Product";
import i18n from "i18next";
import MyAccounts from "../../src/components/icons/banking/MyAccounts";
import Undrawdocument from "../../src/assets/svgs/illustration/undraw_document_search.svg";

export default {
  title: "Components/Data Display/Blocks/BlockProduct",
  component: Product,
  argTypes: {
    title: { action: "Title", control: "text" },
    subtitle: { action: "Subtitle", control: "text" },
    showLinkButton: { action: "Show link button", control: "boolean" },
    linkButtonIconLeft: { action: "Icon left", control: "boolean" },
    linkButtonIconRight: { action: "Icon right", control: "boolean" },
    linkButtonText: { action: "Link button text", control: "text" },
    addOnType: {
      action: "Addon type",
      control: "radio",
      options: ["bigIcon", "image"],
    },
  },
  args: {
    showLinkButton: true,
    linkButtonIconRight: true,
    linkButtonIconLeft: false,
    addOnType: "bigIcon",
    loading: false,
  },
};

export const BigIcon = {
  args: {
    title: i18n.t("blockProductTitle"),
    subtitle: i18n.t("blockProductSubtitle"),
    linkButtonText: "Apply Now",
    icon: <MyAccounts />,
  },
};

export const Image = {
  args: {
    title: i18n.t("blockProductTitle"),
    subtitle: i18n.t("blockProductSubtitle"),
    linkButtonText: "Apply Now",
    addOnType: "image",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnlGdG6jTyeGrtqL0XPNuQpfLD7L2wZVldypCQja8Gq0vQVNk67LIBVaJF6yJNQy3wtLs&usqp=CAU",
  },
};

export const ImageDefault = {
  args: {
    title: i18n.t("blockProductTitle"),
    subtitle: i18n.t("blockProductSubtitle"),
    linkButtonText: "Apply Now",
    addOnType: "image",
  },
};

export const ComplexImage = {
  args: {
    title: "New to Saudi? First, Get your Documents Ready",
    subtitle: "Just landed? Here’s a quick guide to help you complete essential steps like your Iqama, SIM card, and national address registration.",
    linkButtonText: "Read More",
    addOnType: "image",
    imgType: 'image',
    imgProps: {
      localSvg : Undrawdocument,
      height: 127,
      width: 168
    }
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "BigIcon",
    "Image",
    "ImageDefault",
    "ComplexImage",
]);
