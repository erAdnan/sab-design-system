import { useEffect, useState } from "react";
import { Checkbox } from "../src/components/checkbox/Checkbox";
import i18n from "i18next";

export default {
    title: 'Components/Checkbox',
    component: Checkbox,
    argTypes: {
        'disabled': { action: 'Checkbox disabled', control: 'boolean' },
        'isChecked': { action: 'Checkbox isEnabled', control: 'boolean' },
        'text': { action: 'Checkbox text', control: 'text' }
    },
    args: {
        'disabled': false,
        'text': i18n.t("simpleText"),
        loading: false
    }
};

const InteractiveTemplate = (args: any) => {
    const [checkState, setCheckState] = useState(args.isChecked || false);

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
        <Checkbox {...args} isChecked={checkState} handleCheck={handleChange} />
    );
};

export const Interactive = {
    render: InteractiveTemplate,
    args: {
        'isChecked': true,
        handleCheck: (value: boolean) => { },
    },
};

export const Static = {
    args: {
        'isChecked': true,
        handleCheck: (value: boolean) => { },
    }
};

export const Disabled = {
    args: {
        'isChecked': true,
        onCheck: (value: boolean) => { },
        'disabled': true,
    }
};