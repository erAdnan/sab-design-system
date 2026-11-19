import * as allStories from "./Button.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { expect } from "storybook/test";
import { spy } from "../../.storybook/actions";
import {Button} from "../../src/components/button/Button";
import {buttonContentStoryDecorators} from "../../.storybook/buttonStoryFrame";

export default {
  title: "Components/Navigation/Buttons/Button",
  component: Button,
  tags: ["!autodocs"],
  argTypes: {
    color: {
      control: "radio",
      options: ["primary", "secondary", "blueAccent", "redAccent"]
    },
    size: {
      control: "radio",
      options: ["large", "small", "medium"]
    },
    underline: {
      control: "boolean",
      defaultValue: false
    },
    bold: {
      control: "boolean"
    },
    onButtonPress: { action: "onButtonPress" },
  },
  args: {
    size: "large",
    underline: false,
    bold: false,
    loading: false,
    onButtonPress: spy("onButtonPress"),
  }
};

export const ButtonPrimaryFill = {
  args: {
    variant: "fill",
    color: "primary",
    buttonText: {
      children: "Button"
    }
  },
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.click(canvas.getByText("Button"));
    await expect(args.onButtonPress).toHaveBeenCalled();
  },
};

export const ButtonPrimaryFullWidth = {
  // Figma full-width button: 343 wide (375 frame - 2 x 16), centered instead of spanning the desktop canvas.
  decorators: buttonContentStoryDecorators,
  args: {
    variant: "fill",
    color: "primary",
    buttonText: {
      children: "Button"
    },
    overrideStyles: {
      width: "100%"
    }
  }
};

export const ButtonSecondaryFill = {
  args: {
    variant: "fill",
    color: "secondary",
    buttonText: {
      children: "Button"
    }
  }
};

export const ButtonBlueAccentFill = {
  args: {
    variant: "fill",
    color: "blueAccent",
    buttonText: {
      children: "Button"
    }
  }
};

export const ButtonBlueAccentDisabled = {
  args: {
    variant: "fill",
    color: "blueAccent",
    disabled: true,
    buttonText: {
      children: "Button"
    }
  }
};

export const ButtonRedAccentFill = {
  args: {
    variant: "fill",
    color: "redAccent",
    buttonText: {
      children: "Button"
    }
  }
};

export const ButtonRedAccentDisabled = {
  args: {
    variant: "fill",
    color: "redAccent",
    disabled: true,
    buttonText: {
      children: "Button"
    }
  }
};

export const ButtonDisabledFill = {
  args: {
    variant: "fill",
    color: "primary",
    disabled: true,
    buttonText: {
      children: "Button"
    }
  }
};

export const ButtonOutlinedActive = {
  args: {
    variant: "outlined",
    buttonText: {
      children: "Button"
    }
  }
};

export const ButtonOutlinedDisabled = {
  args: {
    variant: "outlined",
    buttonText: {
      children: "Button"
    },
    disabled: true
  }
};

export const ButtonLink = {
  args: {
    variant: "link",
    buttonText: {
      children: "Link Button"
    }
  }
};

export const ButtonLinkIconLeft = {
  args: {
    variant: "link",
    buttonText: {
      children: "Link Button"
    },
    linkIconLeft: true
  }
};

export const ButtonLinkIconRight = {
  args: {
    variant: "link",
    buttonText: {
      children: "Link Button"
    },
    linkIconRight: true
  }
};

export const ButtonLinkBoldIconLeft = {
  args: {
    variant: "link",
    bold: true,
    buttonText: {
      children: "Link Button"
    },
    linkIconLeft: true
  }
};

export const ButtonLinkBoldIconRight = {
  args: {
    variant: "link",
    bold: true,
    buttonText: {
      children: "Link Button"
    },
    linkIconRight: true
  }
};

export const ButtonLinkDisabled = {
  args: {
    variant: "link",
    buttonText: {
      children: "Link Button"
    },
    disabled: true
  }
};

export const ButtonLinkIconRightDisabled = {
  args: {
    variant: "link",
    buttonText: {
      children: "Link Button"
    },
    linkIconRight: true,
    disabled: true
  }
};

export const ButtonLinkUnderlined = {
  args: {
    variant: "link",
    underline: true,
    buttonText: {
      children: "Link Button"
    }
  }
};


export const ButtonPrimaryFillCtaLoading = {
  args: {
    variant: "fill",
    color: "primary",
    buttonText: {
      children: "Button"
    },
    loadingCta: false,
  }
};

// ---- Figma parity (Buttons page 7:189): Size (Large / Medium / Small) x Type (Filled / Outline) x State ----
export const ButtonPrimaryFillMedium = {
  args: {
    variant: "fill",
    color: "primary",
    size: "medium",
    buttonText: {
      children: "Button"
    }
  }
};
export const ButtonPrimaryFillMediumDisabled = {
  args: {
    variant: "fill",
    color: "primary",
    size: "medium",
    disabled: true,
    buttonText: {
      children: "Button"
    }
  }
};
export const ButtonOutlinedMedium = {
  args: {
    variant: "outlined",
    size: "medium",
    buttonText: {
      children: "Button"
    }
  }
};
export const ButtonOutlinedMediumDisabled = {
  args: {
    variant: "outlined",
    size: "medium",
    disabled: true,
    buttonText: {
      children: "Button"
    }
  }
};
export const ButtonBlueAccentMedium = {
  args: {
    variant: "fill",
    color: "blueAccent",
    size: "medium",
    buttonText: {
      children: "Button"
    }
  }
};
export const ButtonRedAccentMedium = {
  args: {
    variant: "fill",
    color: "redAccent",
    size: "medium",
    buttonText: {
      children: "Button"
    }
  }
};
export const ButtonLinkMedium = {
  args: {
    variant: "link",
    size: "medium",
    buttonText: {
      children: "Link Button"
    }
  }
};
export const ButtonLinkMediumIconRight = {
  args: {
    variant: "link",
    size: "medium",
    linkIconRight: true,
    buttonText: {
      children: "Link Button"
    }
  }
};
export const ButtonPrimaryFillSmall = {
  args: {
    variant: "fill",
    color: "primary",
    size: "small",
    buttonText: {
      children: "Button"
    }
  }
};
export const ButtonPrimaryFillSmallDisabled = {
  args: {
    variant: "fill",
    color: "primary",
    size: "small",
    disabled: true,
    buttonText: {
      children: "Button"
    }
  }
};
export const ButtonOutlinedSmall = {
  args: {
    variant: "outlined",
    size: "small",
    buttonText: {
      children: "Button"
    }
  }
};
export const ButtonOutlinedSmallDisabled = {
  args: {
    variant: "outlined",
    size: "small",
    disabled: true,
    buttonText: {
      children: "Button"
    }
  }
};
export const ButtonBlueAccentSmall = {
  args: {
    variant: "fill",
    color: "blueAccent",
    size: "small",
    buttonText: {
      children: "Button"
    }
  }
};
export const ButtonRedAccentSmall = {
  args: {
    variant: "fill",
    color: "redAccent",
    size: "small",
    buttonText: {
      children: "Button"
    }
  }
};
export const ButtonLinkSmall = {
  args: {
    variant: "link",
    size: "small",
    buttonText: {
      children: "Link Button"
    }
  }
};
export const ButtonLinkSmallIconRight = {
  args: {
    variant: "link",
    size: "small",
    linkIconRight: true,
    buttonText: {
      children: "Link Button"
    }
  }
};
export const ButtonSecondaryDisabled = {
  args: {
    variant: "fill",
    color: "secondary",
    disabled: true,
    buttonText: {
      children: "Button"
    }
  }
};
export const ButtonLinkUnderlinedMedium = {
  args: {
    variant: "link",
    size: "medium",
    underline: true,
    buttonText: {
      children: "Link Button"
    }
  }
};
export const ButtonLinkUnderlinedSmall = {
  args: {
    variant: "link",
    size: "small",
    underline: true,
    buttonText: {
      children: "Link Button"
    }
  }
};

export const AllVariants = createAllVariantsStory(allStories, [
    "ButtonPrimaryFill",
    "ButtonPrimaryFullWidth",
    "ButtonSecondaryFill",
    "ButtonBlueAccentFill",
    "ButtonBlueAccentDisabled",
    "ButtonRedAccentFill",
    "ButtonRedAccentDisabled",
    "ButtonDisabledFill",
    "ButtonOutlinedActive",
    "ButtonOutlinedDisabled",
    "ButtonLink",
    "ButtonLinkIconLeft",
    "ButtonLinkIconRight",
    "ButtonLinkBoldIconLeft",
    "ButtonLinkBoldIconRight",
    "ButtonLinkDisabled",
    "ButtonLinkIconRightDisabled",
    "ButtonLinkUnderlined",
    "ButtonPrimaryFillCtaLoading",
    "ButtonPrimaryFillMedium",
    "ButtonPrimaryFillMediumDisabled",
    "ButtonOutlinedMedium",
    "ButtonOutlinedMediumDisabled",
    "ButtonBlueAccentMedium",
    "ButtonRedAccentMedium",
    "ButtonLinkMedium",
    "ButtonLinkMediumIconRight",
    "ButtonPrimaryFillSmall",
    "ButtonPrimaryFillSmallDisabled",
    "ButtonOutlinedSmall",
    "ButtonOutlinedSmallDisabled",
    "ButtonBlueAccentSmall",
    "ButtonRedAccentSmall",
    "ButtonLinkSmall",
    "ButtonLinkSmallIconRight",
    "ButtonSecondaryDisabled",
    "ButtonLinkUnderlinedMedium",
    "ButtonLinkUnderlinedSmall",
]);
