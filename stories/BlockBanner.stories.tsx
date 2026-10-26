import { Banner } from "../src/components/block/Banner";
import i18n from "i18next";

export default {
  title: "Components/BlockBanner",
  component: Banner,
  argTypes: {
    label: { action: "Label", control: "text" },
    linkButtonText: { action: "Link button text", control: "text" },
  },
};

export const Default = {
  args: {
    label: i18n.t("bannerText"),
    linkButtonText: "Link button",
    loading: false,
  },
};
