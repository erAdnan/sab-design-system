import React, { FC, useCallback, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import CustomRangeSlider from "./CustomRangeSlider";
import { useTheme } from "../../context/theme/themeContext";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { SelectorSkeleton } from "./SelectorSkeleton";
import { AutomationProps, getAutomationProps } from "../automationProps";

interface SelectorProps extends AutomationProps {
  minValue: number;
  maxValue: number;
  defaultMaxValue: number;
  onChange: (range: number) => void;
  loading?: boolean;
  emitWhileSliding?: boolean;
  onSlidingStart?: () => void;
  onSlidingComplete?: (value: number) => void;
  disabled?: boolean;
}

/**
 * @property minValue: Number for minimum possible range value
 * @property maxValue: Number for maximum possible range value
 * @property defaultMaxValue: Number for initial (default) maximum range value
 * @property onChange: Callback for handling range change, called with array of numbers: [defaultMaxValue]
 * @property loading: Boolean for displaying loading state (optional)
 */

export const SimpleRangeSelector: FC<SelectorProps> = ({
  minValue = 0,
  maxValue = 1000,
  defaultMaxValue,
  onChange,
  loading = false,
  emitWhileSliding = true,
  onSlidingStart,
  onSlidingComplete,
  disabled,
  testID,
  accessibilityLabel,
}) => {
  const [rangeValue, setRangeValue] = useState(defaultMaxValue);

  const { theme } = useTheme();

  useEffect(() => {
    setRangeValue(defaultMaxValue);
  }, [defaultMaxValue]);

  const handleValueChangeSingle = useCallback(
    (value: number) => {
      setRangeValue(value);
      if (emitWhileSliding) {
        onChange?.(value);
      }
    },
    [emitWhileSliding, onChange]
  );

  const handleSlideComplete = useCallback(
    (value: number) => {
      onChange?.(value);
      onSlidingComplete?.(value);
    },
    [onChange, onSlidingComplete]
  );

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },
    slider: {
      width: "100%",
    },
    bottomvalue: {
      justifyContent: "space-between",
      flexDirection: "row",
      width: "100%",
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
      {...getAutomationProps(testID, accessibilityLabel, "simple-range-selector")}
    >
      <CustomRangeSlider
        step={0}
        value={rangeValue}
        style={styles.slider}
        minimumValue={minValue}
        maximumValue={maxValue}
        emitWhileSliding={emitWhileSliding}
        minimumTrackTintColor={theme.primarycolor3static}
        maximumTrackTintColor={theme.strokecolor2}
        thumbTintColor={theme.primarycolor4static}
        trackStyle={{
          height: actuatedNormalize(4),
          borderRadius: actuatedNormalize(4) / 2,
        }}
        thumbStyle={styles.thumb}
        onValueChange={handleValueChangeSingle}
        onSlidingStart={onSlidingStart ? () => onSlidingStart() : undefined}
        onSlidingComplete={handleSlideComplete}
        disabled={disabled}
        testID={testID ? `${testID}-slider` : undefined}
        accessibilityLabel={
          accessibilityLabel ? `${accessibilityLabel}-slider` : "simple-range-slider"
        }
      />
    </View>
  );
};