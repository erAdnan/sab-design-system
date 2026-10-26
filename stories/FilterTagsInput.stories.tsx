import Plus from "../src/components/icons/outline/Plus";
import { FilterTagsInput } from "../src/components/input/FilterTagsInput";

export default {
  title: 'Components/FilterTagsInput',
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