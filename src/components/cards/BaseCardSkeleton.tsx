import React from "react";
import { DimensionValue, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import { radiusS, spacingS } from "../../assets/styles/constants/size";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";

export const BaseCardSkeleton = ({
    width = actuatedNormalize(260),
    height = "auto" as DimensionValue,
}) => {
    const { theme } = useTheme();

    return (
        <View
            style={{
                backgroundColor: theme.stylesblockbg,
                display: "flex",
                flexDirection: "column",
                gap: spacingS,
                padding: spacingS,
                width: width,
                height: height,
                borderRadius: radiusS
            }}
        >
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: spacingS,
                    justifyContent: "center",
                }}
            >
                <SkeletonBox
                    shape="line"
                    size="small"
                    overrideStyles={{ width: "60%" }}
                />
                <SkeletonBox
                    shape="line"
                    size="small"
                    overrideStyles={{ width: "40%" }}
                />
            </View>
            <View
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: spacingS,
                    justifyContent: "center",
                    alignItems: "flex-start",
                }}
            >
                <SkeletonBox
                    shape="line"
                    size="small"
                    overrideStyles={{ width: "50%" }}
                />
                <SkeletonBox
                    shape="line"
                    size="extralarge"
                    overrideStyles={{ width: "80%" }}
                />
            </View>
        </View>
    );
};
