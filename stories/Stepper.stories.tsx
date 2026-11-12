import * as allStories from "./Stepper.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import { View } from "react-native";
import { Stepper } from "../src/components/stepper/Stepper";
import { spacingS } from "../src/assets/styles/constants/size";
import { actuatedNormalize } from "../src/assets/styles/utils/pixelScaling";
import { mobileContentDecorators } from "../.storybook/mobileContentFrame";

export default {
  decorators: mobileContentDecorators,
    title: "Components/Stepper",
    component: Stepper,
    argTypes: {
        currentStep: {
            action: "Current Step",
            control: "radio",
            options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
    },
    args: {
        stepCount: 10,
    },
};

const InteractiveTemplate = (args: any) => {
    return (
        <View style={{ flexDirection: "column", alignItems: "center", gap: spacingS }}>
            <Stepper pillWidth={actuatedNormalize(22)} currentStep={6} stepCount={10} loading={args.loading} />
            <Stepper pillWidth={actuatedNormalize(22)} currentStep={6} stepCount={9} loading={args.loading}/>
            <Stepper pillWidth={actuatedNormalize(22)} currentStep={6} stepCount={8} loading={args.loading}/>
            <Stepper pillWidth={actuatedNormalize(22)} currentStep={3} stepCount={7} loading={args.loading}/>
            <Stepper pillWidth={actuatedNormalize(22)} currentStep={3} stepCount={6} loading={args.loading}/>
            <Stepper pillWidth={actuatedNormalize(22)} currentStep={3} stepCount={5} loading={args.loading}/>
            <Stepper pillWidth={actuatedNormalize(22)} currentStep={3} stepCount={4} loading={args.loading}/>
            <Stepper pillWidth={actuatedNormalize(22)} currentStep={2} stepCount={3} loading={args.loading}/>
        </View>
    );
};

export const Default = {
    render: InteractiveTemplate,
    args: {
        loading: false
    },
};

export const Interactive = {
    args: {
        currentStep: 6,
        stepCount: 10,
    },
};


export const AllVariants = createAllVariantsStory(allStories, [
    "Default",
    "Interactive",
]);
