import * as allStories from "./Widget.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import { useTranslation } from "react-i18next";
import Gift from "../src/components/icons/other/Gift";
import { Widget } from "../src/components/widget/Widget";

export default {
  title: "Components/Widget",
  component: Widget,
  argTypes: {
    color: {
      action: "Color",
      control: "radio",
      options: [
        "complimentary",
        "rag-neutral",
        "secondary-purple",
        "secondary-cold-green",
        "secondary-orange",
        "secondary-blue-green",
      ],
    },
  },
  args: {
    onWidgetPress: () => {
      console.log("Widget Pressed");
    },
    loading: false,
  },
};

const InteractiveTemplate = (args: any) => {
  const { t } = useTranslation();
  let title = "";
  if (args.title) {
    title = t("widgetTitle");
  }

  let description = "";
  if (args.description) {
    description = t("widgetDescription");
  }

  let extraContent = "";
  if (args.extraContent) {
    extraContent = t("widgetExtraContent");
  }

  return (
      <Widget
        {...args}
        title={title}
        description={description}
        extraContent={extraContent}
      />
  );
};

export const IconSmall = {
  render: InteractiveTemplate,
  args: {
    icon: <Gift />,
    type: "icons",
    size: "small",
    color: "complimentary",
    title: "Widget Name",
    description: "Write your subhead here",
  },
};

export const IconMedium = {
  render: InteractiveTemplate,
  args: {
    icon: <Gift />,
    type: "icons",
    size: "medium",
    color: "complimentary",
    title: "Widget Name",
    description: "Write your subhead here",
  },
};

export const IconLarge = {
  render: InteractiveTemplate,
  args: {
    icon: <Gift />,
    type: "icons",
    size: "large",
    color: "complimentary",
    title: "Widget Name",
    description: "Write your subhead here",
    extraContent: "Extra Content",
  },
};

export const GraphMedium = {
  render: InteractiveTemplate,
  args: {
    type: "graph",
    size: "medium",
    color: "complimentary",
    title: "Widget Name",
    description: "Write your subhead here",
  },
};

export const GraphLarge = {
  render: InteractiveTemplate,
  args: {
    type: "graph",
    size: "large",
    color: "complimentary",
    title: "Widget Name",
    description: "Write your subhead here",
    extraContent: "Extra Content",
  },
};

export const ImageMedium = {
  render: InteractiveTemplate,
  args: {
    type: "image",
    size: "medium",
    color: "complimentary",
    title: "Widget Name",
    description: "Write your subhead here",
    imageThumbnailProps: {
      url: "https://i.pinimg.com/474x/81/6f/5c/816f5c680f1dc28a4a17f9e484080ade.jpg",
    },
  },
};

export const ImageMediumWithChips = {
  render: InteractiveTemplate,
  args: {
    type: "image",
    size: "medium",
    title: "Widget Name",
    description: "Write your subhead here",
    extraContent: "Extra Content",
    imageThumbnailProps: {
      url: "https://i.pinimg.com/474x/81/6f/5c/816f5c680f1dc28a4a17f9e484080ade.jpg",
    },
    chipsProps: {
      label: "Best Deal",
      state: "info",
    },
  },
};

export const ImageLarge = {
  render: InteractiveTemplate,
  args: {
    type: "image",
    size: "large",
    title: "Widget Name",
    description: "Write your subhead here",
    extraContent: "Extra Content",
    imageThumbnailProps: {
      url: "https://i.pinimg.com/474x/81/6f/5c/816f5c680f1dc28a4a17f9e484080ade.jpg",
    },
  },
};

export const ImageLargeWithChips = {
  render: InteractiveTemplate,
  args: {
    type: "image",
    size: "large",
    title: "Widget Name",
    description: "Write your subhead here",
    extraContent: "Extra Content",
    imageThumbnailProps: {
      url: "https://i.pinimg.com/474x/81/6f/5c/816f5c680f1dc28a4a17f9e484080ade.jpg",
    },
    chipsProps: {
      label: "Best Deal",
      state: "info",
    },
  },
};

export const IconWithImageMedium = {
  render: InteractiveTemplate,
  args: {
    type: "iconwithimage",
    size: "medium",
    color: "complimentary",
    title: "Widget Name",
    description: "Write your subhead here",
    imageThumbnailProps: {
      url: "https://i.pinimg.com/474x/81/6f/5c/816f5c680f1dc28a4a17f9e484080ade.jpg",
    },
    icon: <Gift />,
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "IconSmall",
    "IconMedium",
    "IconLarge",
    "GraphMedium",
    "GraphLarge",
    "ImageMedium",
    "ImageMediumWithChips",
    "ImageLarge",
    "ImageLargeWithChips",
    "IconWithImageMedium",
]);
