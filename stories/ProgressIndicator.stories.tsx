import * as allStories from "./ProgressIndicator.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import { ProgressIndicator } from "../src/components/progressIndicator/ProgressIndicator";
import { PieGraph } from "../src/components/pieGraph/PieGraph";
import { Text } from "../src/components/text/Text";
import { fontLarge, fontSmall, fontXLarge, fontXXSmall } from "../src/assets/styles/constants/size";
import { mobileContentDecorators } from "../.storybook/mobileContentFrame";

export default {
  decorators: mobileContentDecorators,
  title: "Components/ProgressIndicator",
  components: [ProgressIndicator, PieGraph],
  tags: ["!autodocs"],
  argTypes: {
    progress: { action: "Progress", control: "number" },
  },
  args: {
    loading: false
  }
};

export const ProgressIndicator25 = {
  render: ProgressIndicator,
  args: {
    progress: 25,
  },
};

export const ProgressIndicator50 = {
  render: ProgressIndicator,
  args: {
    progress: 50,
  },
};

export const ProgressIndicator75 = {
  render: ProgressIndicator,
  args: {
    progress: 75,
  },
};

export const ProgressIndicator100 = {
  render: ProgressIndicator,
  args: {
    progress: 100,
  },
};

export const ProgressIndicatorCircularExtraLarge = {
  render: PieGraph,
  args: {
    percentage: 45,
    dimension: 82,
    radius: 36,
    innerStrokeWidth: 6,
    outerStrokeWidth: 6,
    content: <Text size={fontXLarge} variant="primarycolor3">00:25</Text>
  }
}

export const ProgressIndicatorCircularLarge = {
  render: PieGraph,
  args: {
    percentage: 45,
    dimension: 72,
    radius: 32,
    innerStrokeWidth: 6,
    outerStrokeWidth: 6,
    content: <Text size={fontLarge} variant="primarycolor3">00:25</Text>
  }
}

export const ProgressIndicatorCircularMedium = {
  render: PieGraph,
  args: {
    percentage: 45,
    dimension: 48,
    radius: 22,
    innerStrokeWidth: 4,
    outerStrokeWidth: 4,
    content: <Text size={fontSmall} variant="primarycolor3">00:25</Text>
  }
}

export const ProgressIndicatorCircularSmall = {
  render: PieGraph,
  args: {
    percentage: 45,
    dimension: 32,
    radius: 14,
    innerStrokeWidth: 3,
    outerStrokeWidth: 3,
    content: <Text size={8} variant="primarycolor3">00:25</Text>
  }
}

export const AllVariants = createAllVariantsStory(allStories, [
    "ProgressIndicator25",
    "ProgressIndicator50",
    "ProgressIndicator75",
    "ProgressIndicator100",
    "ProgressIndicatorCircularExtraLarge",
    "ProgressIndicatorCircularLarge",
    "ProgressIndicatorCircularMedium",
    "ProgressIndicatorCircularSmall",
]);
