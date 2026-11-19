import * as allStories from "./Disclaimer.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { disclaimerStoryDecorators } from "../../.storybook/disclaimerStoryFrame";
import { Disclaimer } from "../../src/components/disclaimer/Disclaimer";
import { Text } from "../../src/components/text/Text";
import { fontSmall } from "../../src/assets/styles/constants/size";
import { actuatedNormalize } from "../../src/assets/styles/utils/pixelScaling";
import Absher from "../../src/components/logos/Absher";
import Drahim from "../../src/components/logos/Drahim";
import Sarie from "../../src/components/logos/Sarie";
import SimahNew from "../../src/components/logos/SimahNew";
import Zakaty from "../../src/components/logos/Zakaty";
import Icon from "../../src/components/icon/Icon";

export default {
  title: "Components/Data Display/Notifications/Disclaimer",
  component: Disclaimer,
  decorators: disclaimerStoryDecorators,
  argTypes: {
    type: { control: "select", options: ["tooltip", "checkbox", "image"] },
    size: { control: "select", options: ["default", "small"] },
    loading: { control: "boolean" },
  },
  args: {
    loading: false,
    size: "default",
  },
};

/** Theme-aware disclaimer text (primary-black: black in light, white in dark) */
const disclaimerText = (
  <SafeAreaProvider>
    <SafeAreaView>
      <Text variant="primarycolor" size={fontSmall}>
        By continuing with ‘Proceed’ you acknowledge and agree to the{" "}
        <Text
          variant="primarycolor"
          size={fontSmall}
          bold
          overrideStyles={{ textDecorationLine: "underline" }}
        >
          Terms & Conditions
        </Text>
      </Text>
    </SafeAreaView>
  </SafeAreaProvider>
);

export const Tooltip = {
  args: {
    type: "tooltip",
    text: disclaimerText,
  },
};

export const Checkbox = {
  args: {
    type: "checkbox",
    text: disclaimerText,
    onSelect: () => console.log("selected"),
  },
};

export const ImageType = {
  args: {
    type: "image",
    imgProps: {
      url: require("../../src/assets/images/checker.png"), // Sample image URL
      isAbsolutePath: true,
      width: actuatedNormalize(31),
      height: actuatedNormalize(31),
    },
    text: disclaimerText,
  },
};

export const WithAbsherLogo = {
  args: {
    type: "image",
    imgProps: {
      localSvg: Absher,
      width: actuatedNormalize(31),
      height: actuatedNormalize(31),
    },
    text: disclaimerText,
  },
};

export const WithDrahimLogo = {
  args: {
    type: "image",
    imgProps: {
      localSvg: Drahim,
      width: actuatedNormalize(31),
      height: actuatedNormalize(31),
    },
    text: disclaimerText,
  },
};

export const WithSarieLogo = {
  args: {
    type: "image",
    imgProps: {
      localSvg: Sarie,
      width: actuatedNormalize(31),
      height: actuatedNormalize(31),
    },
    text: disclaimerText,
  },
};

export const WithSimahLogo = {
  args: {
    type: "image",
    imgProps: {
      localSvg: SimahNew,
      width: actuatedNormalize(31),
      height: actuatedNormalize(31),
    },
    text: disclaimerText,
  },
};

export const Small = {
  args: {
    type: "tooltip",
    size: "small",
    icon: <Icon type="functionals" name="money_limit" width={actuatedNormalize(20)} height={actuatedNormalize(15)} />,
    text: "Remaining limit: ﷼100,000.00",
  },
};

export const WithZakatyLogo = {
  args: {
    type: "image",
    imgProps: {
      localSvg: Zakaty,
      width: actuatedNormalize(31),
      height: actuatedNormalize(31),
    },
    text: disclaimerText,
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "Tooltip",
    "Checkbox",
    "ImageType",
    "WithAbsherLogo",
    "WithDrahimLogo",
    "WithSarieLogo",
    "WithSimahLogo",
    "Small",
    "WithZakatyLogo",
]);
