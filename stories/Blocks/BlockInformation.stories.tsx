import * as allStories from "./BlockInformation.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import React from "react";
import { Information } from "../../src/components/block/Information";
import InfoFrame from "../../src/components/icons/status/InfoFrame";
import AlBilad from "../../src/components/logos/banks/AlBilad";
import { LogoWrapper } from "../../src/components/logos/LogoWrapper";

export default {
  title: "Components/Blocks/BlockInformation",
  component: Information,
  args: {
    loading: false
  }
};

export const WithIcon = {
  args: {
    label: "23,100.00 Pts",
    headline: "Points to expire",
    avatarType: "icon",
    avatarProps: { icon: <InfoFrame />}
  },
};

export const WithAvatar = {
  args: {
    label: "23,100.00 Pts",
    headline: "Points to expire",
    avatarType: "avatar",
    avatarProps: { initials: 'JM'}
  },
};

export const WithAvatarBank = {
  args: {
    label: "23,100.00 Pts",
    headline: "Points to expire",
    avatarType: "avatar",
    avatarProps: { initials: 'JM', statusIcon: <LogoWrapper size='extra-small' logo={<AlBilad />} />}
  },
};

export const WithPieGraph = {
  args: {
    label: "23,100.00 Pts",
    headline: "Points to expire",
    avatarType: "pieGraph",
    pieGraphPercentage: 45
  },
};

export const WithoutHeadline = {
  args: {
    label: "23,100.00 Pts",
    avatarType: "icon",
    avatarProps: { icon: <InfoFrame />}
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "WithIcon",
    "WithAvatar",
    "WithAvatarBank",
    "WithPieGraph",
    "WithoutHeadline",
]);
