
import { useTranslation } from "react-i18next";
import {TextDivider} from "../src/components/text/TextDivider";
import { background } from "@storybook/core/theming";

export default {
  title: "Components/TextDivider",
  component: TextDivider,
  args: {
    text: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur",
    subTitle: true,
  },
};

const TextDivderInteractive = (args: any) => {
  const { t } = useTranslation();

  let textDivider = <TextDivider {...args} headLine={t("titleText")} />;

  // if (args.badge) {
  //   textDivider = <TextDivider
  //     {...args}
  //     headLine={t("titleText")}
  //     showBadge={true}
  //     badgeProps={{
  //       number: 5,
  //     }}
  //   />;
  // }

  // if (args.tooltip) {
  //   textDivider = <TextDivider
  //     {...args}
  //     headLine={t("titleText")}
  //     showTooltip={true}
  //     tooltipProps={{
  //       text: "Lorem Ipsum"
  //     }}
  //   />;
  // }

  return (
    <TextDivider
        {...args}
        headline={t("titleText")}
        text={t("loremIpsum")}
      />
  );
};

export const PageTitle = {
  render: TextDivderInteractive,
  args: {
    type: "Page Title",
  }
};

export const Promotional = {
  render: TextDivderInteractive,
  args: {
    type: "Promotional",
  }
};

export const Bottomsheet = {
  render: TextDivderInteractive,
  args: {
    type: "BottomSheet",
  }
};

export const InPageDefault = {
  render: TextDivderInteractive,
  args: {
    type: "In Page",
     link : true,
     linkButtonLink: "Link Text"
  }
};

export const InPageBadge = {
  render: TextDivderInteractive,
  args: {
    type: "In Page",
    badge: true,
    badgeProps:{
        number: 5,
      }
  }
};

export const InPageTooltip = {
  render: TextDivderInteractive,
  args: {
    type: "In Page",
    tooltip: true,
    tooltipProps:{
        text: "Lorem Ipsum"
      }
  }
};

export const InPageOverideStyle = {
  render: TextDivderInteractive,
  args: {
    type: "In Page",
    linkButtonLink: "Link text",
    mainWrapper:{ alignItems:"center",justifyContent:"center"},
    descriptionStyle: { alignSelf:"center",textAlign:"center"},
    headlineStyle: { alignSelf:"center",textAlign:"center",flex:1},
  }
};
