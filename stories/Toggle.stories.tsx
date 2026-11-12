import * as allStories from "./Toggle.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import { useEffect, useState } from "react";
import { Toggle } from "../src/components/toggle/Toggle";

export default {
    title: 'Components/Toggle',
    component: Toggle,
    argTypes: {
        'disabled': { action: 'Toggle disabled', control: 'boolean' },
        'isEnabled': { action: 'Toggle isEnabled', control: 'boolean' },
        label: { control: 'text', description: 'Label text shown to the right of the switch' },
    },
    args: {
        'disabled': false,
    }
};

const InteractiveTemplate = (args: any) => {
    const [checkState, setCheckState] = useState(args.isEnabled || false);

    useEffect(() => {
        setCheckState(args.value);
    }, [args.value]);

    const handleChange = () => {
        setCheckState(!checkState);
        if (args.onChange) {
            args.onChange(!checkState);
        }
    };

    return (
        <Toggle {...args} isEnabled={checkState} handleToggle={handleChange} />
    );
};

export const Interactive = {
    render: InteractiveTemplate,
    args: {
        'isEnabled': true,
        handleToggle: (value: boolean) => { },
    },
};

export const Static = {
    args: {
        'isEnabled': true,
        handleToggle: (value: boolean) => { },
    }
};

export const Disabled = {
    args: {
        'isEnabled': true,
        handleToggle: (value: boolean) => { },
        'disabled': true,
    },
};

export const WithLabel = {
    render: InteractiveTemplate,
    args: {
        isEnabled: true,
        handleToggle: () => {},
        label: "Label comes here",
    },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "Interactive",
    "Static",
    "Disabled",
    "WithLabel",
]);
