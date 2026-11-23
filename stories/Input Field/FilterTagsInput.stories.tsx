import * as allStories from "./FilterTagsInput.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import Plus from "../../src/components/icons/outline/Plus";
import { FilterTagsInput } from "../../src/components/input/FilterTagsInput";
import { mobileContentDecorators } from "../../.storybook/mobileContentFrame";

export default {
  decorators: mobileContentDecorators,
  title: 'Components/Data Entry/Input Field/FilterTagsInput',
  component: FilterTagsInput
};

export const InputWith3FilterTags = {
  args: {
    label: 'Label',
    filterTags: [
      { 
        label: "Label",
        leftIcon: <Plus />,
        rightIcon: <Plus />
      },
      { 
        label: "Label",
        leftIcon: <Plus />,
        rightIcon: <Plus />
      },
      { 
        label: "Label",
        leftIcon: <Plus />,
        rightIcon: <Plus />
      },
    ]
  }
}

export const InputWith6FilterTags = {
  args: {
    label: 'Label',
    filterTags: [
      { 
        label: "Label",
        leftIcon: <Plus />,
        rightIcon: <Plus />
      },
      { 
        label: "Label",
        leftIcon: <Plus />,
        rightIcon: <Plus />
      },
      { 
        label: "Label",
        leftIcon: <Plus />,
        rightIcon: <Plus />
      },
      { 
        label: "Label",
        leftIcon: <Plus />,
        rightIcon: <Plus />
      },
      { 
        label: "Label",
        leftIcon: <Plus />,
        rightIcon: <Plus />
      },
      { 
        label: "Label",
        leftIcon: <Plus />,
        rightIcon: <Plus />
      },
    ]
  }
}

export const InputWith9FilterTags = {
  args: {
    label: 'Label',
    filterTags: [
      { 
        label: "Label",
      },
      { 
        label: "Label",
      },
  
      { 
        label: "Label",
      },
      { 
        label: "Label",
      },
      { 
        label: "Label",
      },
      { 
        label: "Label",
      },
      { 
        label: "Label",
      },
      { 
        label: "Label",
      },
      { 
        label: "Label",
      },
    ]
  }
}

export const AllVariants = createAllVariantsStory(allStories, [
    "InputWith3FilterTags",
    "InputWith6FilterTags",
    "InputWith9FilterTags",
]);
