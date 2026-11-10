import { View } from "react-native";
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
  },
  args: {
    title: "Title",
    subtitle: "Subtitle",
    variant: "row",
    loading: false,
  },
};

/** Figma ships a placeholder icon — the screen passes its own 24x24 icon */
const placeholderIcon = (
  <Prepaid width={actuatedNormalize(24)} height={actuatedNormalize(24)} />
);

export const Row = {
  args: {
    icon: placeholderIcon,
    onPress: () => console.log("entry pressed"),
  },
};

export const Tile = {
  args: {
    variant: "tile",
    icon: placeholderIcon,
    onPress: () => console.log("entry pressed"),
  },
};

const TilePairTemplate = (args: any) => (
  <View style={{ flexDirection: "row", flexWrap: "wrap", width: "100%", maxWidth: "100%", gap: actuatedNormalize(8) }}>
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
