import React, { FC, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../../../context/theme/themeContext";
import { Text } from "../../text/Text";
import { CurrencyText } from "../../text/CurrencyText";
import { SarFont } from "../../sarFont/SarFont";
import { actuatedNormalize } from "../../../assets/styles/utils/pixelScaling";
import {
    lineHeightXXSmall,
    fontWeightRegular,
    fontWeightBold,
    spacingM,
    spacingS,
    spacingXS,
    spacingXXS,
    spacingXL,
    spacingXXXS,
    fontXSmall,
} from "../../../assets/styles/constants/size";
import { SemiCircle } from "./SemiCircle";

// Adaptive typography: scale amount font by display length (do not truncate)
const AMOUNT_CHAR_THRESHOLD_STEP1 = 15; // >15 chars → Headline (17px)
const AMOUNT_CHAR_THRESHOLD_STEP2 = 22; // >22 chars → Callout (14px)
const AMOUNT_SIZE_TITLE2 = 22;   // Default: Title 2
const AMOUNT_SIZE_HEADLINE = 17; // Step 1
const AMOUNT_SIZE_CALLOUT = 14;  // Step 2

function getAmountFontSize(displayLength: number): number {
    if (displayLength <= AMOUNT_CHAR_THRESHOLD_STEP1) return actuatedNormalize(AMOUNT_SIZE_TITLE2);
    if (displayLength <= AMOUNT_CHAR_THRESHOLD_STEP2) return actuatedNormalize(AMOUNT_SIZE_HEADLINE);
    return actuatedNormalize(AMOUNT_SIZE_CALLOUT);
}

interface SemiCircleGraphProps {    
    percentage: number; // 1-100
    mainText: string;
    amount: string;
    labelOne: string;
    labelTwo: string;
    progressWidth?: number; // Optional: width of the progress arc/border (default: 26)
}

/**
 * SemiCircleGraph Component
 * @property percentage - Percentage value from 1-100 to display on the gauge
 * @property mainText - Main text label displayed above the amount
 * @property amount - Currency amount to display (will be formatted using CurrencyText)
 * @property labelOne - First label for the legend (typically "Assets")
 * @property labelTwo - Second label for the legend (typically "Liabilities")
 * @property progressWidth - Optional: width of the progress arc/border in pixels (default: 26)
 */
export const SemiCircleGraph = ({
    percentage,
    mainText,
    amount,
    labelOne,
    labelTwo,
    progressWidth: customProgressWidth = 26,
} : SemiCircleGraphProps) => {
    const { theme } = useTheme();

    // Display length = currency symbol (1) + formatted amount (do not truncate; scale font instead)
    const amountDisplayLength = 1 + (amount?.length ?? 0);
    const amountSize = useMemo(
        () => getAmountFontSize(amountDisplayLength),
        [amountDisplayLength]
    );
    const amountLineHeight = amountSize * 1.2;

    // Clamp percentage between 1 and 100
    const validPercentage = Math.max(1, Math.min(100, percentage));

    // Normalize dimensions
    const CIRCLE_RADIUS = 150;
    const circleRadius = actuatedNormalize(CIRCLE_RADIUS);
    const progressWidth = actuatedNormalize(customProgressWidth);

    const activeColor = theme.secondarycolor10;
    const inactiveColor = theme.secondarycolor13;
    const interiorColor = theme.stylesbackground2;
    const textColor = theme.primarytextcolor;

    const styles = StyleSheet.create({
        container: {
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            paddingVertical: spacingS,
        },
        infoContainer: {
            paddingTop: spacingXL,
            alignItems: "center",
            justifyContent: "flex-end",
            gap: spacingS,
            width: "100%",
        },
        textContainer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        },
        amountWrapper: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
        },
        legendContainer: {
            flexDirection: "row",
            alignItems: "center",
            gap: spacingM,
        },
        legendItem: {
            flexDirection: "row",
            alignItems: "center",
            gap: spacingXS,
            paddingVertical: spacingXXXS,
            paddingHorizontal: spacingXXS,
        },
        legendCircle: {
            width: actuatedNormalize(16),
            height: actuatedNormalize(16), 
            borderRadius: actuatedNormalize(8), 
        },
    });

    return (
        <View style={styles.container}>
            <SemiCircle
                percentage={validPercentage}
                circleRadius={circleRadius}
                progressWidth={progressWidth}
                progressColor={activeColor}
                progressShadowColor={inactiveColor}
                interiorCircleColor={interiorColor}
                animationSpeed={2}
            >
                <View style={styles.infoContainer}>
                    <View style={styles.textContainer}>
                    {/* Main text */}
                    <Text
                        size={fontXSmall}
                        variant="primarytextcolor"
                        overrideStyles={{
                            marginBottom: actuatedNormalize(4),
                            overflow: "hidden",
                            lineHeight: lineHeightXXSmall,
                            fontWeight: fontWeightRegular,
                        }}
                        numberOfLines={1}
                    >
                        {mainText}
                    </Text>

                    {/* Amount: adaptive font size (Title 2 22px → Headline 17px → Callout 14px) by character count */}
                    <View style={styles.amountWrapper}>
                        <SarFont
                            size={amountSize}
                            variant="primarytextcolor"
                            overrideStyles={{
                                marginRight: actuatedNormalize(4),
                                lineHeight: amountLineHeight,
                            }}
                        />
                        <CurrencyText
                            text={amount}
                            size={amountSize}
                            variant="primarytextcolor"
                            numberOfLines={1}
                            textstyle={{
                                color: textColor,
                                fontWeight: fontWeightBold,
                                textAlign: "center",
                                flexShrink: 1,
                                lineHeight: amountLineHeight,
                            }}
                        />
                    </View>
                    </View>

                    {/* Legend */}
                    <View style={styles.legendContainer}>
                        <View style={styles.legendItem}>
                            <View
                                style={[
                                    styles.legendCircle,
                                    { backgroundColor: activeColor },
                                ]}
                            />
                            <Text
                                size={fontXSmall}
                                variant="primarytextcolor"
                                overrideStyles={{
                                    lineHeight: lineHeightXXSmall,
                                    fontWeight: fontWeightRegular,
                                }}
                            >
                                {labelOne}
                            </Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View
                                style={[
                                    styles.legendCircle,
                                    { backgroundColor: inactiveColor },
                                ]}
                            />
                            <Text
                                size={fontXSmall}
                                variant="primarytextcolor"
                                overrideStyles={{
                                    lineHeight: lineHeightXXSmall,
                                    fontWeight: fontWeightRegular,
                                }}
                            >
                                {labelTwo}
                            </Text>
                        </View>
                    </View>
                </View>
            </SemiCircle>
        </View>
    );
};