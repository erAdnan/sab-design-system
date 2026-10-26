import React from "react";
import { View } from "react-native";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { spacingS, spacingXS } from "../../assets/styles/constants/size";
import { SkeletonBox } from "../skeleton/SkeletonBox";

export const SelectorSkeleton = () => {

    return (
        <View style={{ display: "flex", flexDirection: "column", gap: spacingS }}>
            <View style={{ display: "flex", flexDirection: "row", gap: spacingXS }}>
                <SkeletonBox
                    shape="square"
                    size="large"
                    overrideStyles={{
                        width: "50%",
                        height: actuatedNormalize(8),
                    }}
                />
            </View>
            <SkeletonBox
                shape="line"
                size="extralarge"
                overrideStyles={{ width: "100%" , height: actuatedNormalize(8)}}
            />
        </View>
    );
};
