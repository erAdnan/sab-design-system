import React, { FC, useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import { RangeSlider as Slider } from "@react-native-assets/slider";
import { useTheme } from "../../context/theme/themeContext";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { Text } from "../text/Text";
import { fontSmall, spacingXS } from "../../assets/styles/constants/size";
import { RangeEntryText } from "./EntryText";
import { SelectorSkeleton } from "./SelectorSkeleton";
import { AutomationProps, getAutomationProps } from "../automationProps";

interface SelectorProps extends AutomationProps {
  minValue: number;
  maxValue: number;
  defaultMinValue: number;
  defaultMaxValue: number;
  onChange: (range: number[]) => void;
  step?: number;
  errorMessage?: string;
  errorMessageLeft?: string;
  helperTextRight?: string;
  helperTextLeft?: string;
  amountHelperText?: string;
  label?: string;
  loading?: boolean;
  type: 'dobule' | 'single';
}

/**
 * @property minValue: Number for minimum possible range value
 * @property maxValue: Number for maximum possible range value
 * @property defaultMinValue: Number for initial (default) minimum range value
 * @property defaultMaxValue: Number for initial (default) maximum range value
 * @property onChange: Callback for handling range change, called with array of numbers: [min, max]
 * @property step: Portion of the range to be used for updating values everytime thumb is moved (default is 1)
 * @property errorMessage: String for passing an error message (optional)
 * @property amountHelperText: String for a helper text shown directly under the amount input (optional)
 * @property label: String for displaying label on top of RangeEntryText
 * @property loading: Boolean for displaying loading state (optional)
 */

export const Selector: FC<SelectorProps> = ({
  minValue = 0,
  maxValue = 1000,
  defaultMaxValue,
  defaultMinValue,
  onChange,
  step = 1,
  errorMessage = "",
  errorMessageLeft = "",
  helperTextLeft = "",
  helperTextRight = "",
  amountHelperText = "",
  label = "",
  loading = false,
  type = 'double',
  testID,
  accessibilityLabel,
}) => {
  const [rangeValue, setRangeValue] = useState([
    defaultMinValue,
    defaultMaxValue,
  ]);

  const { theme } = useTheme();

  const handleValueChange = (value: number[]) => {
    const newRange = [...rangeValue];
    newRange[0] = value[0];
    newRange[1] = value[1];
    setRangeValue(newRange);
    onChange && onChange(newRange);
  };
  // format input to match designs
  const minEntry = useMemo(
    () =>
      rangeValue[0] < 10
        ? `0${rangeValue[0]?.toFixed(2)}`
        : rangeValue[0]?.toFixed(2),
    rangeValue
  );
  const maxEntry = useMemo(
    () =>
      rangeValue[1] < 10
        ? `0${rangeValue[1]?.toFixed(2)}`
        : rangeValue[1]?.toFixed(2),
    rangeValue
  );

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      gap: spacingXS,
    },
    slider: {
      width: "100%",
      paddingHorizontal: actuatedNormalize(12),
    },
    textContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%"
    },
    singleMessage: {
      justifyContent: 'flex-end'
    },
    thumb: {
      backgroundColor: theme.primarycolor4static,
      borderColor: theme.strokecolor2,
      borderWidth: 1,
      height: actuatedNormalize(24),
      width: actuatedNormalize(24),
      borderRadius: actuatedNormalize(12),
    },
  });

  return loading ? (
    <SelectorSkeleton />
  ) : (
    <View
      style={styles.container}
      {...getAutomationProps(testID, accessibilityLabel, label || "range-selector")}
    >
      <RangeEntryText
        minValue={type === 'double' ? minEntry : undefined}
        maxValue={maxEntry}
        error={Boolean(errorMessage.length)}
        onMinValueChange={type === 'double' ? (newValue) =>
          handleValueChange([newValue, rangeValue[1]]) : undefined
        }
        onMaxValueChange={(newValue) =>
          handleValueChange([rangeValue[0], newValue])
        }
        label={label}
      />
      {amountHelperText && (
        <View>
          <Text size={fontSmall}>{amountHelperText}</Text>
        </View>
      )}
      <Slider
        step={step}
        range={[rangeValue[0], rangeValue[1]]}
        style={styles.slider}
        minimumValue={minValue}
        maximumValue={maxValue}
        onValueChange={handleValueChange}
        trackHeight={actuatedNormalize(4)}
        midTrackStyle={{ backgroundColor: theme.primarycolor3static }}
        minTrackStyle={{ backgroundColor: theme.strokecolor2 }}
        maxTrackStyle={{ backgroundColor: theme.strokecolor2 }}
        thumbStyle={styles.thumb}
        testID={testID ? `${testID}-slider` : undefined}
        accessibilityLabel={
          accessibilityLabel ? `${accessibilityLabel}-slider` : "range-slider"
        }
        />
        {(errorMessage || errorMessageLeft || helperTextLeft || helperTextRight) && (
          <View style={(!errorMessageLeft && !helperTextLeft) ? [styles.textContainer, styles.singleMessage] : styles.textContainer}>
            {errorMessage && (
            <View>
              <Text size={fontSmall} variant="ragcolor3">
                {errorMessage}
              </Text>
            </View>
            )}
          {errorMessageLeft && (
            <View>
              <Text size={fontSmall} variant="ragcolor3">
                {errorMessageLeft}
              </Text>
            </View>
          )}
          {helperTextLeft && (
            <View>
              <Text size={fontSmall}>
                {helperTextLeft}
              </Text>
            </View>
          )}
          {helperTextRight && (
            <View>
              <Text size={fontSmall}>
                {helperTextRight}
              </Text>
            </View>
          )}
          </View>
        )}
     
    </View>
  );
};
