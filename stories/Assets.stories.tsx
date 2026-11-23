import * as allStories from "./Assets.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import { centerStoryDecorator } from "../.storybook/centerStoryDecorator";
import Icon from "../src/components/icon/Icon";
import { ScrollView, View } from "react-native";
import {
  fontLarge,
  spacingS,
  spacingXS,
} from "../src/assets/styles/constants/size";
import { Text } from "../src/components/text/Text";
import { actuatedNormalize } from "../src/assets/styles/utils/pixelScaling";
import {
  ASSET_ICON_SECTIONS,
  type AssetSection,
} from "./foundations/assetsCatalog";

/** Figma Final Pulse → Assets → Icons (65:2047). */
export default {
  title: "Foundations/Assets",
  component: Icon,
  tags: ["!autodocs"],
};

const SectionGallery = ({ section }: { section: AssetSection }) => {
  const isBanking = section.id === "banking";

  return (
    <View>
      <Text bold size={fontLarge}>
        {section.title}
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: isBanking ? spacingXS : actuatedNormalize(12),
          marginTop: spacingS,
        }}
      >
        {section.icons.map((icon) => (
          <Icon key={`${icon.type}-${icon.name}`} type={icon.type} name={icon.name} />
        ))}
      </View>
    </View>
  );
};

const sectionStory = (id: string) => {
  const section = ASSET_ICON_SECTIONS.find((s) => s.id === id)!;
  return {
    name: section.title,
    render: () => <SectionGallery section={section} />,
  };
};

export const Placeholder = sectionStory("placeholder");
export const Banking = sectionStory("banking");
export const Functionals = sectionStory("functionals");
export const Users = sectionStory("users");
export const Notifications = sectionStory("notifications");
export const Arrows = sectionStory("arrows");
export const Others = sectionStory("others");
export const Social = sectionStory("social");
export const Filled = sectionStory("filled");
export const Sab360 = sectionStory("sab360");

/** Full Icons frame gallery in Figma section order. */
export const Icons = {
  name: "Icons",
  render: () => (
    <ScrollView contentContainerStyle={{ gap: 32, paddingBottom: 48 }}>
      {ASSET_ICON_SECTIONS.map((section) => (
        <SectionGallery key={section.id} section={section} />
      ))}
    </ScrollView>
  ),
};

export const AllVariants = {
  ...createAllVariantsStory(
    allStories,
    [
      "Placeholder",
      "Banking",
      "Functionals",
      "Users",
      "Notifications",
      "Arrows",
      "Others",
      "Social",
      "Filled",
      "Sab360",
    ],
    { gap: 32 },
  ),
  decorators: [centerStoryDecorator],
};
