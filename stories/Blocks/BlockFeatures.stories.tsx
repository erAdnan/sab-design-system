import * as allStories from "./BlockFeatures.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { Features } from "../../src/components/block/Features";

export default {
  title: "Components/Blocks/BlockFeatures",
  component: Features,
  argTypes: {
	topText: { action: "Top text", control: "text" },
	title: { action: "Title", control: "text" },
    extraContent: { action: "Extra content", control: "text" },
    variant: { control: "select", options: ["default", "insights"] },
  },
  args: {
	topText: "Step",
	title: "Title", 
	extraContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    loading: false,
  },
};


export const Default = {
   args: {
		topText: "Step",
		title: "Title", 
		extraContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  	},
};

export const WithImage = {
   args: {
		topText: "Step",
		title: "Title",
		extraContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		imgProps: {
			url: require('../../src/assets/images/checker.png'),
			isAbsolutePath: true,
			overrideImageStyles: {objectFit: "contain"}
		}
  	},
};

export const Insights = {
   args: {
		variant: "insights",
		topText: "Insights",
		title: "You shop at Namshi often. Get more for your money!",
		extraContent: "Recommended for you based on your activity",
  	},
};

export const AllVariants = createAllVariantsStory(allStories, [
    "Default",
    "WithImage",
    "Insights",
]);
