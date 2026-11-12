import * as allStories from "./EmptyState.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import React from "react";
import {
  fontSmall,
  fontSmallMedium,
} from "../src/assets/styles/constants/size";
import { EmptyState } from "../src/components/emptyState/EmptyState";
import { RagIconType } from "../src/components/rag/Rag";
import Absher from "../src/components/logos/Absher";
import Drahim from "../src/components/logos/Drahim";
import Sarie from "../src/components/logos/Sarie";
import SimahNew from "../src/components/logos/Simah";
import Zakaty from "../src/components/logos/Zakaty";
import ActivityIcon from "../src/assets/svgs/dark/sab360/activity.svg";
import CashIcon from "../src/assets/svgs/dark/sab360/cash.svg";
import PinIcon from "../src/assets/svgs/dark/sab360/pin.svg";
import PointsSummaryIcon from "../src/assets/svgs/dark/sab360/pointsSummary.svg";
import RedeemIcon from "../src/assets/svgs/dark/sab360/redeem.svg";
import LearnIllustration from "../src/components/illustrations/Learn";
import { actuatedNormalize } from "../src/assets/styles/utils/pixelScaling";
import { mobileContentDecorators } from "../.storybook/mobileContentFrame";

export default {
  decorators: mobileContentDecorators,
  title: "Components/EmptyState",
  component: EmptyState,
  argTypes: {
    "iconProps.size": {
      action: "Icon size",
      control: "radio",
      options: ["extralarge", "large", "medium", "small"],
    },
  },
  args: {
    "iconProps.type": RagIconType.warning,
    "iconProps.size": "extralarge",
    loading: false,
  },
};

export const Warning = {
  args: {
    textProps: {
      children: "Not found",
      subtitle: "We couldn't find any results based on your search",
    },
  },
};

export const ErrorWithButton = {
  args: {
    textProps: {
      children: "An error occured",
      subtitle: "Please try again later",
    },
    "iconProps.type": RagIconType.error,
    "buttonProps.variant": "fill",
    "buttonProps.color": "primary",
    "buttonProps.size": "large",
    "buttonProps.buttonText.children": "Go back",
    "buttonProps.disabled": false,
    showButton: true,
  },
  argTypes: {
    showButton: { action: "Show button", control: "boolean" },
    "buttonProps.variant": {
      action: "Button variant",
      control: "radio",
      options: ["fill", "outlined"],
    },
    "buttonProps.color": {
      action: "Button color",
      control: "radio",
      options: ["primary", "secondary"],
    },
    "buttonProps.size": {
      action: "Button size",
      control: "radio",
      options: ["small", "large"],
    },
    "buttonProps.buttonText.children": {
      action: "Button disabled",
      control: "text",
    },
    "buttonProps.disabled": { action: "Button disabled", control: "boolean" },
  },
};

export const Success = {
  args: {
    textProps: {
      children: "Done",
      subtitle: "Your information has been submitted successfully",
    },
    "iconProps.type": RagIconType.success,
  },
};

export const Info = {
  args: {
    textProps: {
      children: "Request help",
      subtitle: "Please contact customer support for this request",
    },
    "iconProps.type": RagIconType.info,
  },
};

export const SuccessIconSmall = {
  args: {
    textProps: {
      children: "Done",
      subtitle: "Your information has been submitted successfully",
      size: fontSmallMedium,
      subtitleSize: fontSmall,
    },
    "iconProps.type": RagIconType.success,
    "iconProps.size": "medium",
  },
};

const emptyStateImageText = {
  children: "No results yet",
  subtitle: "When you have content, it will show up here",
};

export const WithAbsherLogo = {
  args: {
    textProps: emptyStateImageText,
    image: <Absher width={actuatedNormalize(64)} height={actuatedNormalize(64)} />,
  },
};

export const WithDrahimLogo = {
  args: {
    textProps: emptyStateImageText,
    image: <Drahim width={actuatedNormalize(64)} height={actuatedNormalize(64)} />,
  },
};

export const WithSarieLogo = {
  args: {
    textProps: emptyStateImageText,
    image: <Sarie width={actuatedNormalize(64)} height={actuatedNormalize(64)} />,
  },
};

export const WithSimahLogo = {
  args: {
    textProps: emptyStateImageText,
    image: <SimahNew width={actuatedNormalize(64)} height={actuatedNormalize(64)} />,
  },
};

export const WithZakatyLogo = {
  args: {
    textProps: emptyStateImageText,
    image: <Zakaty width={actuatedNormalize(64)} height={actuatedNormalize(64)} />,
  },
};

export const WithIllustration = {
  args: {
    textProps: {
      children: "Nothing to show yet",
      subtitle: "When you add content, it will appear here",
    },
    image: (
      <LearnIllustration
        width={actuatedNormalize(240)}
        height={actuatedNormalize(144)}
      />
    ),
  },
};

export const WithSAB360Activity = {
  args: {
    textProps: emptyStateImageText,
    image: <ActivityIcon width={actuatedNormalize(48)} height={actuatedNormalize(48)} />,
  },
};

export const WithSAB360Cash = {
  args: {
    textProps: emptyStateImageText,
    image: <CashIcon width={actuatedNormalize(48)} height={actuatedNormalize(48)} />,
  },
};

export const WithSAB360Pin = {
  args: {
    textProps: emptyStateImageText,
    image: <PinIcon width={actuatedNormalize(48)} height={actuatedNormalize(48)} />,
  },
};

export const WithSAB360PointsSummary = {
  args: {
    textProps: emptyStateImageText,
    image: <PointsSummaryIcon width={actuatedNormalize(48)} height={actuatedNormalize(48)} />,
  },
};

export const WithSAB360Redeem = {
  args: {
    textProps: emptyStateImageText,
    image: <RedeemIcon width={actuatedNormalize(48)} height={actuatedNormalize(48)} />,
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "Warning",
    "ErrorWithButton",
    "Success",
    "Info",
    "SuccessIconSmall",
    "WithAbsherLogo",
    "WithDrahimLogo",
    "WithSarieLogo",
    "WithSimahLogo",
    "WithZakatyLogo",
    "WithIllustration",
    "WithSAB360Activity",
    "WithSAB360Cash",
    "WithSAB360Pin",
    "WithSAB360PointsSummary",
    "WithSAB360Redeem",
]);
