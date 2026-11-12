import * as allStories from "./Tooltip.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import { TooltipComponent } from "../src/components/tooltip/Tooltip";
import { mobileContentDecorators } from "../.storybook/mobileContentFrame";

export default {
  decorators: mobileContentDecorators,
    title: 'Components/Tooltip',
    component: TooltipComponent,
    argTypes: {
        'text': { action: 'Tooltip text', control: 'text' },
        'width': { action: 'Tooltip width', control: 'number' },
        'centerIcon': { action: 'Center Icon', control: 'boolean' },
    },
    args: {
        'width': 242,
        'centerIcon': false,
        loading: false
    }
};

const iconText = 'Neque porro quisquam est qui dolorem ipsum quia consectetur';

export const Regular = {
    args: {
        'text': iconText,
    }
};

export const RegularIconCenter = {
    args: {
        'text': iconText,
        'centerIcon': true
    }
};

export const RegularIconRight = {
    args: {
        'text': iconText,
        'iconPosition': 'right'
    }
};

export const Right = {
    args: {
        'text': iconText,
        'tooltipStyle': { position: 'absolute', right: 10, height: 'auto' }
    }
};

// Gallery at the 343 mobile content width. The tooltip trigger is just the info icon (the bubble opens in an
// overlay on press), so each slot only needs a little vertical room. `Right` pins the trigger with
// `position: absolute; right: 10`, which would pull it out of its slot and stack it on top of its neighbours;
// in the gallery the same intent (trigger on the trailing edge) is expressed with `alignSelf: "flex-end"`.
export const AllVariants = createAllVariantsStory(
  allStories,
  ["Regular", "RegularIconCenter", "RegularIconRight", "Right"],
  {
    gap: 32,
    itemStyle: { minHeight: 48 },
    mapArgs: (args) => {
      const { tooltipStyle } = args;
      if (!tooltipStyle) return args;
      const { position, right, left, top, bottom, ...rest } = tooltipStyle;
      const moved = position === "absolute" && right !== undefined ? { alignSelf: "flex-end" } : {};
      return { ...args, tooltipStyle: { ...rest, ...moved } };
    },
  },
);
