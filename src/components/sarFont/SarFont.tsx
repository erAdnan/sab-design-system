import React, { FC } from "react";
import { View } from "react-native";
import {
    fontMediumLarge,
    lineHeightMediumLarge,
} from "../../assets/styles/constants/size";
import { Text } from "../text/Text";
import fonts from "../../assets/styles/constants/fonts";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";

export interface TextProps {
    size?: number | undefined;
    variant?: string;
    lineHeight?: number;
    overrideStyles?: any;
}

/**
 * SarFont Component
 * @property size - The font size to be used (Same as text component)
 * @property variant - Determines the font color (Same as text component)
 * @property lineHeight - Determines the line height of the text (Same as text component)
 * @property overrideStyles - Custom styles to be applied to the text
 */
export const SarFont: FC<TextProps> = ({
    size = fontMediumLarge,
    variant = "primarytextcolor",
    lineHeight = lineHeightMediumLarge,
    overrideStyles,
}) => {
    // TODO: refactor, make line height dynamic
    return (
        <View>
            <Text
                size={size}
                variant={variant}
                overrideStyles={{
                    fontFamily: fonts.SAR_Font,
                    lineHeight,
                    paddingVertical: actuatedNormalize(0),
                    paddingHorizontal: actuatedNormalize(0),
                    ...overrideStyles,
                }}
            >
                sar
            </Text>
        </View>
    );
};
