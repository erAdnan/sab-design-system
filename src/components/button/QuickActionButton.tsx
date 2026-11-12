import { FC, ReactElement } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import { Text } from "../text/Text";
import { Badge, BadgeProps } from "../badge/Badge";
import {
  fontMedium,
  fontSmall,
  fontWeightRegular,
  lineHeightMedium,
  lineHeightSmall,
  radiusM,
  radiusS,
  sizeXL,
  spacing1XS,
  spacingS,
  spacingXS,
} from "../../assets/styles/constants/size";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { ButtonSkeleton } from "./ButtonSkeleton";
import { AutomationProps, getAutomationProps } from "../automationProps";

export interface QuickActionButtonProps extends AutomationProps {
  type: "vertical" | "horizontal";
  text: string;
  icon: ReactElement;
  verticalTextWidth?: number;
  onButtonPress: () => void;
  badgeProps?: BadgeProps;
  disable?: boolean;
  loading?: boolean;
  iconContainerStyles?: any;
  textVariant?: string
}

/**
 * Quick Action Button Component
 * @property type - Determines the layout of the button (Accepts "vertical", "horizontal")
 * @property text - The text to be displayed on the button
 * @property icon - The icon to be displayed on the button
 * @property onButtonPress - Function to be called when the button is pressed
 * @property badgeProps - Props for the badge component. Accepts size, type, number, containerStyle
 * @property loading - boolean for showing the skeleton
 */
export const QuickActionButton: FC<QuickActionButtonProps> = ({
  type = "vertical",
  text,
  icon,
  verticalTextWidth,
  onButtonPress,
  badgeProps,
  disable,
  loading = false,
  iconContainerStyles,
  textVariant,
  testID,
  accessibilityLabel,
}) => {
  const { theme } = useTheme();

  // Figma button.quickAction: Vertical-Small is a 70 wide column (48 icon tile, 8 gap, 12/16 label),
  // Horizontal is a 48 high pill (16/12 padding, 12 radius, 14/18 label).
  const verticalWidth = verticalTextWidth ?? actuatedNormalize(70);

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    btnGeneral: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: disable? theme.primarycolor2_20:theme.stylesblockbg,
      gap: spacingXS,
      borderRadius: radiusS,
      paddingVertical: spacingXS,
      paddingHorizontal: spacingS,
    },
    btnHorizontal: {
      flexDirection: "row",
      height: sizeXL,
    },
    btnHorizontalPill: {
      borderRadius: radiusM,
      paddingVertical: spacing1XS,
    },
    btnVertical: {
      flexDirection: "column",
      gap: spacingXS,
      alignItems: "center",
    },
    btnIconVertical: {
      width: sizeXL,
      height: sizeXL,
      zIndex: -1,
    },
    btnTextVertical: {
      width: verticalWidth,
      textAlign: "center",
    },
  });

  const buttonText = (
    <Text
      size={type === "horizontal" ? fontMedium : fontSmall}
      loading={loading}
      textWidth={verticalWidth}
      overrideStyles={{
        fontWeight: fontWeightRegular,
        lineHeight: type === "horizontal" ? lineHeightMedium : lineHeightSmall,
        ...(type === "vertical" ? styles.btnTextVertical : {}),
      }}
      variant={textVariant}
    >
      {text}
    </Text>
  );

  return (
    <View
      style={[
        styles.container,
        type === "horizontal" ? styles.btnHorizontal : styles.btnVertical,
      ]}
    >
      {type === "vertical" && badgeProps && !loading && (
        <Badge
          {...badgeProps}
          containerStyle={{ position: "absolute", left: spacingS, top: -actuatedNormalize(5) }}
        />
      )}
      {loading ? (
        <ButtonSkeleton
          width={
            type === "vertical" ? actuatedNormalize(48) : actuatedNormalize(80)
          }
          height={40}
        />
      ) : (
        <TouchableOpacity
          onPress={onButtonPress}
          style={[
            styles.btnGeneral,
            type === "horizontal"
              ? [styles.btnHorizontal, styles.btnHorizontalPill]
              : styles.btnIconVertical,
              iconContainerStyles,
          ]}
          {...getAutomationProps(testID, accessibilityLabel, text)}
        >
          <View>{icon}</View>
          {type === "horizontal" && buttonText}
          {type === "horizontal" && badgeProps && <Badge {...badgeProps} />}
        </TouchableOpacity>
      )}
      {type === "vertical" && buttonText}
    </View>
  );
};
