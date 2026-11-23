import * as allStories from "./LearningProductCards.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { LearningProductCard } from "../../src/components/productsCards/LearningProductCard";

/**
 * Figma: 00. SAB DS Components and Foundations → Learning-Product-Cards (11592:53928)
 * https://www.figma.com/design/JC6uz9pPKMGCUSiA7a8gob/00.-SAB-DS-Components-and-Foundations?node-id=11592-53928
 *
 * Tokens: styles/block-bg #F2F3F4 · secondary/blue-green #00847F · text/black ·
 * text/gray #767676 · secondary/purple #7878B0 · primary/white-invert (pie)
 */
export default {
  title: "Components/Data Display/ProductsCards/Learning Product Cards",
  component: LearningProductCard,
  argTypes: {
    percentage: { control: { type: "range", min: 0, max: 100, step: 1 } },
    loading: { control: "boolean" },
  },
  args: {
    subheading: "Label",
    title: "Headline",
    bodyText: "Learn to save your money using this tried and tested way.",
    percentage: 80,
    percentageText: "80% Left",
    imageProps: {
      url: require("../../src/assets/images/merchant_placeholder.png"),
      isAbsolutePath: true,
    },
    loading: false,
  },
};

/** Figma Language=English|Arabic — default learning card */
export const Default = {};

/** Progress nearly complete */
export const AlmostDone = {
  args: {
    percentage: 15,
    percentageText: "15% Left",
    title: "Almost there",
    bodyText: "Finish the last lessons to complete this learning path.",
  },
};

/** Empty / not started */
export const NotStarted = {
  args: {
    percentage: 100,
    percentageText: "100% Left",
    title: "Get started",
    bodyText: "Start this course to unlock tips on saving smarter.",
  },
};

// export const Loading = {
//   args: {
//     loading: true,
//   },
// };

export const AllVariants = createAllVariantsStory(allStories, [
  "Default",
  "AlmostDone",
  "NotStarted",
  // "Loading",
]);
