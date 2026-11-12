import * as allStories from "./Icons.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import { centerStoryDecorator } from "../.storybook/centerStoryDecorator";
import Icon from "../src/components/icon/Icon";
import { View } from "react-native";
import {
    ArrowSvgsLight,
    ArrowSvgsDark,
    BankingSvgsLight,
    BankingSvgsDark,
    FilledSvgsLight,
    FilledSvgsDark,
    FunctionalsSvgsLight,
    FunctionalsSvgsDark,
    NotificationsSvgsLight,
    NotificationsSvgsDark,
    OthersSvgsLight,
    OthersSvgsDark,
    Sab360SvgsLight,
    Sab360SvgsDark,
    SocialSvgsLight,
    SocialSvgsDark,
} from "../src/components/icon/IconList";
import {
    fontLarge,
    spacingS,
    spacingXS,
} from "../src/assets/styles/constants/size";
import { Text } from "../src/components/text/Text";
import { actuatedNormalize } from "../src/assets/styles/utils/pixelScaling";

type IconModule = Record<string, unknown>;

/** Union light + dark keys so every asset appears; `Icon` still picks the correct SVG from the active theme. */
const iconNames = (light: IconModule, dark: IconModule): string[] =>
    [...new Set([...Object.keys(light), ...Object.keys(dark)])].sort((a, b) =>
        a.localeCompare(b)
    );

export default {
    title: "Components/Icons",
    component: Icon,
};

const InteractiveTemplate = (args: any) => {
    const isBanking = args.type === "banking";

    const getByType = (type: string) => {
        switch (type) {
            case "arrows":
                return iconNames(ArrowSvgsLight, ArrowSvgsDark);
            case "banking":
                return iconNames(BankingSvgsLight, BankingSvgsDark);
            case "functionals":
                return iconNames(FunctionalsSvgsLight, FunctionalsSvgsDark);
            case "notifications":
                return iconNames(NotificationsSvgsLight, NotificationsSvgsDark);
            case "other":
                return iconNames(OthersSvgsLight, OthersSvgsDark);
            case "social":
                return iconNames(SocialSvgsLight, SocialSvgsDark);
            case "sab360":
                return iconNames(Sab360SvgsLight, Sab360SvgsDark);
            case "filled":
                return iconNames(FilledSvgsLight, FilledSvgsDark);
        }
    };

    const getTitle = (type: string) => {
        switch (type) {
            case "arrows":
                return "Arrows";
            case "banking":
                return "Banking";
            case "functionals":
                return "Functionals";
            case "notifications":
                return "Notifications";
            case "other":
                return "Others";
            case "social":
                return "Social";
            case "sab360":
                return "Sab 360";
            case "filled":
                return "Filled";
            default:
                return "";
        }
    };

    return (
        <View>
            <Text bold size={fontLarge}>
                {getTitle(args.type)}
            </Text>
            <View
                style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: isBanking ? spacingXS : actuatedNormalize(12),
                    marginTop: spacingS,
                }}
            >
                {getByType(args.type)?.map((name: string) => (
                    <Icon key={name} type={args.type} name={name} />
                ))}
            </View>
        </View>
    );
};

export const Arrows = {
    render: InteractiveTemplate,
    args: {
        type: "arrows",
    },
};

export const Banking = {
    render: InteractiveTemplate,
    args: {
        type: "banking",
    },
};

export const Functionals = {
    render: InteractiveTemplate,
    args: {
        type: "functionals",
    },
};

export const Notifications = {
    render: InteractiveTemplate,
    args: {
        type: "notifications",
    },
};

export const Others = {
    render: InteractiveTemplate,
    args: {
        type: "other",
    },
};

export const Social = {
    render: InteractiveTemplate,
    args: {
        type: "social",
    },
};

export const Sab360 = {
    render: InteractiveTemplate,
    args: {
        type: "sab360",
    },
};

export const Filled = {
    render: InteractiveTemplate,
    args: {
        type: "filled",
    },
};

// Every icon category (Arrows, Banking, ...) as a section at the 343 mobile content width; the icon grids wrap.
export const AllVariants = {
  ...createAllVariantsStory(
    allStories,
    ["Arrows", "Banking", "Functionals", "Notifications", "Others", "Social", "Sab360", "Filled"],
    { gap: 32 },
  ),
  decorators: [centerStoryDecorator],
};
