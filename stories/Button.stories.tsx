import {Button} from "../src/components/button/Button";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    color: {
      action: "Color",
      control: "radio",
      options: ["primary", "secondary", "blueAccent", "redAccent"]
    },
    size: {
      action: "Size",
      control: "radio",
      options: ["large", "small", "medium"]
    },
    underline: {
      action: "Underline",
      control: "boolean",
      defaultValue: false
    },
    bold: {
      action: "Bold",
      control: "boolean"
    }
  },
  args: {
    size: "large",
    underline: false,
    bold: false,
    loading: false
  }
};

export const ButtonPrimaryFill = {
  args: {
    variant: "fill",
    color: "primary",
    buttonText: {
      children: "Button"
    }
  }
};

export const ButtonPrimaryFullWidth = {
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