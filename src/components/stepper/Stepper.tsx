import { FC } from "react";
import { DimensionValue, I18nManager, StyleSheet, View } from "react-native";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { useTheme } from "../../context/theme/themeContext";
import {
  fontSmallMedium,
  radiusS,
  spacingXS,
  widthM,
} from "../../assets/styles/constants/size";
import { Text } from "../text/Text";
import { LanguageCodes } from "../../localization/languages";
import i18n from "i18next";
import { SkeletonBox } from "../skeleton/SkeletonBox";

export interface StepperProps {
  currentStep: number;
  stepCount?: number;
  withText?: boolean;
  pillWidth?: DimensionValue | undefined;
  pillHeight?: DimensionValue | undefined;
  overrideStyles?: any;
  loading?: boolean;
}

/**
 * @property {number} currentStep - The current step of the stepper
 * @property {number} stepCount - The total number of steps in the stepper
 * @property {boolean} withText - Whether to show the current step count
 * @property {any} overrideStyles - Override styles for the component
 */
export const Stepper: FC<StepperProps> = ({
  stepCount = 10,
  currentStep,
  withText = true,
  pillWidth = widthM,
  pillHeight = actuatedNormalize(4),
  overrideStyles,
  loading = false,
}) => {
  const { theme } = useTheme();
  const isRtl = I18nManager.isRTL;

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: isRtl ? "row-reverse" : "row",
      justifyContent: "center",
      alignItems: "center",
      gap: spacingXS,
    },
    pillWrapper: {
      flex: 1,
    },
    pill: {
      height: pillHeight,
      backgroundColor: theme.stylescolor7,
      borderRadius: radiusS,
    },
    filled: {
      backgroundColor: theme.primarycolor3static,
    },
  });

  return (
    <View style={[styles.container, overrideStyles]}>
      {Array.from({ length: stepCount }).map((_, index) =>
        loading ? (
          <SkeletonBox
            shape="line"
            size="small"
            overrideStyles={{ width: pillWidth, height: pillHeight }}
            key={index}
          />
        ) : (
          <View style={styles.pillWrapper} key={index}>
            <View
              style={[styles.pill, index < currentStep ? styles.filled : {}]}
            />
          </View>
        )
      )}
      {withText &&
        (loading ? (
          <SkeletonBox
            shape="line"
            size="small"
            overrideStyles={{
              width: actuatedNormalize(32),
              height: pillHeight,
            }}
          />
        ) : (
          <Text
            bold
            size={fontSmallMedium}
          >{`${currentStep}/${stepCount}`}</Text>
        ))}
    </View>
  );
};
