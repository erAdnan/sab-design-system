import i18n from "i18next";
import { Article } from "../src/components/block/Article";

export default {
  title: "Components/BlockArticle",
  component: Article,
  argTypes: {
    subheading: { action: "Sub Heading", control: "text" },
    title: { action: "Title", control: "text" },
    body: { action: "Subtitle", control: "text" },
    showLinkButton: { action: "Show link button", control: "boolean" },
    linkButtonIconLeft: { action: "Icon left", control: "boolean" },
    linkButtonIconRight: { action: "Icon right", control: "boolean" },
    linkButtonText: { action: "Link button text", control: "text" },
  },
  args: {
    showLinkButton: true,
    linkButtonIconRight: false,
    linkButtonIconLeft: false,
    loading: false,
  },
};

export const Default = {
  args: {
    subheading: "Article",
    title: "Skip the Plastic",
    body: "Carry a reusable bag, bottle, or cup. It cuts daily plastic waste significantly.",
    linkButtonText: "Learn more",
    
  },
};

