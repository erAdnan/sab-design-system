import * as allStories from "./BlockEntry.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import { View } from "react-native";
import { expect } from "storybook/test";
import { spy } from "../.storybook/actions";
import { Entry } from "../src/components/block/Entry";
import { actuatedNormalize } from "../src/assets/styles/utils/pixelScaling";
import Prepaid from "../src/components/icons/outline/Prepaid";

export default {
  title: "Components/BlockEntry",
  component: Entry,
  argTypes: {
    title: { control: "text" },
    subtitle: { control: "text" },
    variant: { control: "select", options: ["row", "tile"] },
    loading: { control: "boolean" },
    onPress: { action: "onPress" },
  },
  args: {
    title: "Title",
    subtitle: "Subtitle",
    variant: "row",
    loading: false,
    onPress: spy("onPress"),
  },
};

/** Figma ships a placeholder icon — the screen passes its own 24x24 icon */
const placeholderIcon = (
  <Prepaid width={actuatedNormalize(24)} height={actuatedNormalize(24)} />
);

export const Row = {
  args: {
    icon: placeholderIcon,
  },
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.click(canvas.getByText("Title"));
    await expect(args.onPress).toHaveBeenCalled();
  },
};

export const Tile = {
  args: {
    variant: "tile",
    icon: placeholderIcon,
  },
};

const TilePairTemplate = (args: any) => (
  <View style={{ flexDirection: "row", gap: actuatedNormalize(8) }}>
    <Entry {...args} variant="tile" icon={placeholderIcon} />
    <Entry {...args} variant="tile" icon={placeholderIcon} />
  </View>
);

/** Two tiles side by side — the 167.5 Figma width is (343 - 8) / 2 */
export const TilePair = { render: TilePairTemplate, args: {} };

export const WithoutSubtitle = {
  args: {
    icon: placeholderIcon,
    subtitle: undefined,
  },
};

export const Loading = { args: { loading: true } };

export const AllVariants = createAllVariantsStory(allStories, [
    "Row",
    "Tile",
    "TilePair",
    "WithoutSubtitle",
    "Loading",
]);
