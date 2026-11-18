import * as allStories from "./Logos.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import { centerStoryDecorator } from "../.storybook/centerStoryDecorator";
import type { ComponentType } from "react";
import { View } from "react-native";
import type { SvgProps } from "react-native-svg";
import Absher from "../src/components/logos/Absher";
import Drahim from "../src/components/logos/Drahim";
import Mada from "../src/components/logos/Mada";
import Sarie from "../src/components/logos/Sarie";
import SimahNew from "../src/components/logos/SimahNew";
import { SABLogo } from "../src/components/logos/SABLogo";
import Zakaty from "../src/components/logos/Zakaty";
import Visa from "../src/components/logos/Visa";

export default {
  title: "Foundations/Assets/Logos",
  components: [SABLogo, Absher, Drahim, Mada, Sarie, SimahNew, Zakaty, Visa],
};

/** 48×48 preview slot — matches design / disclaimer usage; overflow clips any SVG web quirks. */
const LOGO_STORY_SIZE = 48;

const logoInSlot = (Logo: ComponentType<SvgProps>) => () => (
  <View
    style={{
      width: LOGO_STORY_SIZE,
      height: LOGO_STORY_SIZE,
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    }}
  >
    <Logo
      width={LOGO_STORY_SIZE}
      height={LOGO_STORY_SIZE}
      preserveAspectRatio="xMidYMid meet"
      style={{ width: LOGO_STORY_SIZE, height: LOGO_STORY_SIZE }}
    />
  </View>
);

const SABLogosTemplate = () => (
  <View style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "flex-start" }}>
    <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", width: "100%", gap: 20, alignItems: "center" }}>
      <SABLogo width={106} height={34} />
      <SABLogo width={60} height={20} />
      <SABLogo width={46} height={15} />
    </View>
    <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", width: "100%", gap: 20, alignItems: "center" }}>
      <SABLogo  width={64} height={72} vertical={true} />
      <SABLogo  width={36} height={40} vertical={true} />
      <SABLogo  width={23} height={26} vertical={true} />
    </View>
  </View>
) 

export const SAB = {
  render: SABLogosTemplate
};

export const AbsherLogo = {
  render: logoInSlot(Absher),
};

export const SimahLogo = {
  render: logoInSlot(SimahNew),
};

export const DrahimLogo = {
  render: logoInSlot(Drahim),
};

export const MadaLogo = {
  render: logoInSlot(Mada),
};

export const SarieLogo = {
  render: logoInSlot(Sarie),
};

export const ZakatyLogo = {
  render: logoInSlot(Zakaty),
};

export const VisaLogo = {
  render: logoInSlot(Visa),
};

// Every logo (brand lockups + 48x48 partner slots) as a labelled, top-aligned column at the 343 mobile width.
export const AllVariants = {
  ...createAllVariantsStory(
    allStories,
    ["SAB", "AbsherLogo", "SimahLogo", "DrahimLogo", "MadaLogo", "SarieLogo", "ZakatyLogo", "VisaLogo"],
    { gap: 24, itemStyle: { alignItems: "flex-start" } },
  ),
  decorators: [centerStoryDecorator],
};
