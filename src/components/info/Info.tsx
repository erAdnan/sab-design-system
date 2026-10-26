import { FC, ReactElement } from "react";
import { DimensionValue, StyleSheet, View } from "react-native";
import { TooltipComponent, TooltipProps } from "../tooltip/Tooltip";
import { useTheme } from "../../context/theme/themeContext";
import { Text } from "../text/Text";
import {
    fontSmallMedium,
    iconXS,
    radiusS,
    spacingS,
    spacingXS,
} from "../../assets/styles/constants/size";

interface InfoProps {
    text: string | ReactElement;
    tooltipProps: TooltipProps;
    overrideStyles?: any;
}

/**
 * Info Component
 * @property text - The text to display in the info component
 * @property tooltipProps - The props for the tooltip component. See TooltipProps for more details
 * @property overrideStyles - Override styles for the info component
 */
const Info: FC<InfoProps> = ({ text, tooltipProps, overrideStyles }) => {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        container: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            alignSelf: 'flex-start',
            justifyContent: "center",
            backgroundColor: theme.ragneutraltint,
            paddingHorizontal: spacingS,
            paddingVertical: spacingXS,
            borderRadius: radiusS,
            gap: spacingXS,
        },
        tooltipStyle: {
            paddingHorizontal: 0,
            display: "flex",
            alignItems: "center",
            width: iconXS as DimensionValue,
            height: iconXS as DimensionValue,
        },
        iconStyle: {
            width: iconXS as DimensionValue,
            height: iconXS as DimensionValue,
        },
    });
    return (
        <View style={[styles.container, overrideStyles]}>
            {typeof text === "string" ? (
                <Text size={fontSmallMedium} variant="primarycolorstatic">
                    {text}
                </Text>
            ) : (
                text
            )}
            {tooltipProps && (
                <TooltipComponent
                    {...tooltipProps}
                    tooltipStyle={styles.tooltipStyle}
                    iconStyle={styles.iconStyle}
                    iconColor={theme.primarycolor2_100static}
                />
            )}
        </View>
    );
};

export default Info;
