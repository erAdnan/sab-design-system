import { FC, useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import {
  SegmentedButton,
  SegmentedButtonEvent,
  SegmentedButtonProps,
} from "./SegmentedButton";
import { useTheme } from "../../context/theme/themeContext";
import {
  getSABNativeSegmentedControl,
  SABNativeSegmentedControlChangeEvent,
  isNativeIOSSegmentedControlSupported,
} from "../../native/segmentedControl";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";

export type NativeIOSSegmentedButtonProps = SegmentedButtonProps;

const ICON_SEGMENT_WIDTH = actuatedNormalize(40);
const ICON_SNAPSHOT_SIZE = actuatedNormalize(24);

export const NativeIOSSegmentedButton: FC<NativeIOSSegmentedButtonProps> = (
  props
) => {
  const {
    count = 2,
    buttonOne,
    buttonTwo,
    buttonThree,
    loading = false,
    defaultActiveTab = 1,
    activeTab,
    fullWidth = false,
    overrideStyles,
  } = props;
  const { isDarkTheme } = useTheme();
  const NativeControl = getSABNativeSegmentedControl();
  const useNative =
    !loading &&
    isNativeIOSSegmentedControlSupported() &&
    NativeControl != null;

  const buttons = useMemo(() => {
    const list: SegmentedButtonEvent[] = [buttonOne, buttonTwo];
    if (count === 3 && buttonThree) {
      list.push(buttonThree);
    }
    return list;
  }, [buttonOne, buttonTwo, buttonThree, count]);

  const selectedIndex = (activeTab ?? defaultActiveTab) - 1;
  const hasIcons = buttons.some((button) => !!button.icon);

  const handleNativeChange = useCallback(
    (event: SABNativeSegmentedControlChangeEvent) => {
      const nextIndex = event.nativeEvent?.selectedIndex;
      if (typeof nextIndex !== "number") {
        return;
      }
      const button = buttons[nextIndex];
      if (!button || button.disabled) {
        return;
      }
      button.onButtonPress();
    },
    [buttons]
  );

  if (!useNative || !NativeControl) {
    return <SegmentedButton {...props} />;
  }

  return (
    <NativeControl
      items={buttons.map((button) => ({
        title: button.buttonText,
        hasIcon: !!button.icon,
        disabled: !!button.disabled,
      }))}
      selectedIndex={selectedIndex}
      colorScheme={isDarkTheme ? "dark" : "light"}
      onChange={handleNativeChange}
      style={[
        styles.nativeControl,
        hasIcons && styles.nativeIconControl,
        hasIcons && { width: buttons.length * ICON_SEGMENT_WIDTH },
        fullWidth && styles.nativeFullWidth,
        overrideStyles,
      ]}
    >
      {hasIcons
        ? buttons.map((button, index) => (
            <View
              key={`${button.buttonText}-${index}`}
              collapsable={false}
              pointerEvents="none"
              style={styles.iconSnapshot}
            >
              {button.icon}
            </View>
          ))
        : null}
    </NativeControl>
  );
};

const styles = StyleSheet.create({
  nativeControl: {
    height: actuatedNormalize(32),
    minWidth: actuatedNormalize(148),
    flexShrink: 0,
  },
  nativeIconControl: {
    minWidth: 0,
  },
  nativeFullWidth: {
    width: "100%",
    minWidth: 0,
    alignSelf: "stretch",
  },
  iconSnapshot: {
    position: "absolute",
    left: -9999,
    width: ICON_SNAPSHOT_SIZE,
    height: ICON_SNAPSHOT_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
});
