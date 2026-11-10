import { useEffect, useState } from "react";
import i18n from "i18next";
import { RadioButton } from "../src/components/radio/Radio";
import { View } from "react-native";
import { actuatedNormalize } from "../src/assets/styles/utils/pixelScaling";

export default {
    title: 'Components/Radio Button',
    component: RadioButton,
    argTypes: {
        'disabled': { action: 'Checkbox disabled', control: 'boolean' },
        'checked': { action: 'Checkbox isEnabled', control: 'boolean' },
        'text': { action: 'Checkbox text', control: 'text' }
    },
    args: {
        'disabled': false,
    }
};

const InteractiveTemplate = (args: any) => {
    const radioValues = ['radio1', 'radio2', 'radio3'];
    const [checkState, setCheckState] = useState(null);

    useEffect(() => {
        setCheckState(args.value);
    }, [args.value]);

    const handleChange = (value: any) => {
        setCheckState(value);
        if (args.handleCheck) {
            args.handleCheck(value);
        }
    };

    return (
        <View>
            <View style={{ marginBottom: actuatedNormalize(10) }}>
                <RadioButton {...args} text={args.text} checked={checkState} handleCheck={handleChange} value={radioValues[0]} />
            </View>
            <View style={{ marginBottom: actuatedNormalize(10) }}>
                <RadioButton {...args} text={args.text} checked={checkState} handleCheck={handleChange} value={radioValues[1]} />
            </View>
            <View style={{ marginBottom: actuatedNormalize(10) }}>
                <RadioButton {...args} text={args.text} checked={checkState} handleCheck={handleChange} value={radioValues[2]} />
            </View>
        </View>
    );
};

export const Group = {
    render: InteractiveTemplate,
    args: {
        'checked': true,
        handleCheck: (value: boolean) => { },
        'text': ''
    },
};

export const GroupWithText = {
    render: InteractiveTemplate,
    args: {
        'checked': true,
        handleCheck: (value: boolean) => { },
        text: i18n.t("simpleText"),
    },
};

export const GroupWithDisabled = {
    render: InteractiveTemplate,
    args: {
        handleCheck: (value: boolean) => { },
        text: '',
        disabled: true,
    },
};

export const DisabledStates = {
    render: () => (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%', gap: actuatedNormalize(8) }}>
            {/* disabled unselected */}
            <RadioButton value="a" checked="none" disabled={true} />
            {/* disabled selected */}
            <RadioButton value="b" checked="b" disabled={true} />
        </View>
    ),
};