import { View } from "react-native";
import { fontSmallMedium, spacingXXS } from "../src/assets/styles/constants/size";
import { actuatedNormalize } from "../src/assets/styles/utils/pixelScaling";
import Info from "../src/components/info/Info";
import { Text } from "../src/components/text/Text";
import { SarFont } from "../src/components/sarFont/SarFont";

export default {
    title: "Components/Info",
    component: Info,
    argTypes: {
        text: {
            control: {
                type: "text",
            },
        },
    },
    args: {
        text: "Recipient gets 0.89 AED",
    },
};

export const Default = {
    args: {
        overrideStyles: { width: actuatedNormalize(190) },
    },
};

const tooltipText =
    "This is an indicative rate. Verfiy the rate with the recipient before sending.";
export const WithTooltip = {
    args: {
        tooltipProps: {
            text: tooltipText,
        },
    },
};

export const WithTopTooltip = {
    args: {
        tooltipProps: {
            text: tooltipText,
        },
        overrideStyles: {
            marginTop: actuatedNormalize(500),
        },
    },
};

const textWithSAR = (
    <View style={{ flexDirection: "row", alignItems: "center", gap: spacingXXS }}>
        <SarFont size={fontSmallMedium} variant="primarycolorstatic" />
        <Text size={fontSmallMedium} variant="primarycolorstatic">
            1.00 = USD 0.26
        </Text>
    </View>
);
export const WithSAR = {
    args: {
        text: textWithSAR,
        tooltipProps: {
            text: tooltipText,
        },
    }
};
