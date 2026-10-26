import React, { useCallback, useEffect, useState } from "react";
import {
  I18nManager,
  LayoutChangeEvent,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { BlurView } from "@react-native-community/blur";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import fonts from "../../assets/styles/constants/fonts";
import { fontMedium } from "../../assets/styles/constants/size";
import { useTheme } from "../../context/theme/themeContext";
import SwipeChevronsTriple from "../icons/arrows/chevron/SwipeChevronsTriple";
import {
  isSABLiquidGlassSupported,
  SABLiquidGlassView,
} from "../../native/liquidGlass";

const iosMajorVersion =
  Platform.OS === "ios" ? parseInt(String(Platform.Version), 10) : 0;
const isIOS26OrAbove = Platform.OS === "ios" && iosMajorVersion >= 26;

const TRACK_PADDING_TOP = actuatedNormalize(4);
const TRACK_PADDING_RIGHT = actuatedNormalize(12);
const TRACK_PADDING_BOTTOM = actuatedNormalize(4);
const TRACK_PADDING_LEFT = actuatedNormalize(4);
const TRACK_GAP = actuatedNormalize(8);
const HANDLE_WIDTH = actuatedNormalize(67);
const HANDLE_HEIGHT = actuatedNormalize(52);
const HANDLE_RADIUS = actuatedNormalize(40);
const TRACK_RADIUS = actuatedNormalize(1000);
const COMPLETE_THRESHOLD = 0.82;

/** Total vertical space the swipe bar occupies (for scroll padding). */
export const SWIPE_VIEW_HEIGHT =
  TRACK_PADDING_TOP + TRACK_PADDING_BOTTOM + HANDLE_HEIGHT;

export type SwipeViewProps = {
  label?: string;
  onSwipeComplete?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function SwipeView({
  label = "Switch to Full View",
  onSwipeComplete,
  disabled = false,
  style,
}: SwipeViewProps) {
  const { theme, isDarkTheme } = useTheme();
  const isRTL = I18nManager.isRTL;
  const [trackWidth, setTrackWidth] = useState(0);
  const [completed, setCompleted] = useState(false);

  const translateX = useSharedValue(0);
  const handleOpacity = useSharedValue(1);
  const dragStartX = useSharedValue(0);
  const maxTranslate = useSharedValue(0);

  const useLiquidGlassWrapper =
    isIOS26OrAbove && isSABLiquidGlassSupported();

  useEffect(() => {
    const nextMax = Math.max(
      0,
      trackWidth -
        TRACK_PADDING_LEFT -
        TRACK_PADDING_RIGHT -
        HANDLE_WIDTH -
        TRACK_GAP
    );
    maxTranslate.value = nextMax;
  }, [maxTranslate, trackWidth]);

  const finishSwipe = useCallback(() => {
    setCompleted(true);
    onSwipeComplete?.();
  }, [onSwipeComplete]);

  const panGesture = Gesture.Pan()
    .enabled(!disabled && !completed)
    .activeOffsetX([-8, 8])
    .failOffsetY([-12, 12])
    .onBegin(() => {
      dragStartX.value = translateX.value;
    })
    .onUpdate((event) => {
      const raw = dragStartX.value + event.translationX;
      if (isRTL) {
        translateX.value = Math.max(-maxTranslate.value, Math.min(raw, 0));
      } else {
        translateX.value = Math.max(0, Math.min(raw, maxTranslate.value));
      }
    })
    .onEnd((event) => {
      const raw = dragStartX.value + event.translationX;
      const releasedX = isRTL
        ? Math.max(-maxTranslate.value, Math.min(raw, 0))
        : Math.max(0, Math.min(raw, maxTranslate.value));
      const progress =
        maxTranslate.value > 0
          ? Math.abs(releasedX) / maxTranslate.value
          : 0;
      const flingComplete = isRTL
        ? event.velocityX < -750
        : event.velocityX > 750;

      if (progress >= COMPLETE_THRESHOLD || flingComplete) {
        const toValue = isRTL ? -maxTranslate.value : maxTranslate.value;
        translateX.value = withTiming(toValue, { duration: 180 });
        handleOpacity.value = withTiming(0, { duration: 180 }, (finished) => {
          if (finished) {
            runOnJS(finishSwipe)();
          }
        });
        return;
      }

      translateX.value = withSpring(0, { damping: 18, stiffness: 220 });
    });

  const handleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: handleOpacity.value,
    transform: [{ translateX: translateX.value }],
  }));

  const handleTrackLayout = useCallback((event: LayoutChangeEvent) => {
    const measuredWidth = event.nativeEvent.layout.width;
    if (measuredWidth > 0) {
      setTrackWidth(measuredWidth);
    }
  }, []);

  const trackHeight = SWIPE_VIEW_HEIGHT;

  const frostedTintColor = isDarkTheme
    ? "rgba(15, 23, 33, 0.55)"
    : "rgba(255, 255, 255, 0.22)";

  return (
    <View
      onLayout={handleTrackLayout}
      style={[
        styles.track,
        useLiquidGlassWrapper ? styles.trackLiquidGlass : styles.trackDefault,
        {
          width: "100%",
          height: trackHeight,
          borderRadius: TRACK_RADIUS,
          paddingTop: TRACK_PADDING_TOP,
          paddingRight: TRACK_PADDING_RIGHT,
          paddingBottom: TRACK_PADDING_BOTTOM,
          paddingLeft: TRACK_PADDING_LEFT,
        },
        style,
      ]}
    >
      {useLiquidGlassWrapper ? (
        <SABLiquidGlassView
          effect="clear"
          colorScheme={isDarkTheme ? "dark" : "light"}
          style={StyleSheet.absoluteFillObject}
        />
      ) : Platform.OS === "ios" ? (
        <BlurView
          style={StyleSheet.absoluteFillObject}
          blurType={isDarkTheme ? "dark" : "light"}
          blurAmount={8}
          reducedTransparencyFallbackColor={frostedTintColor}
        />
      ) : (
        <View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: frostedTintColor },
          ]}
        />
      )}

      <Text
        pointerEvents="none"
        numberOfLines={1}
        style={fonts.withTrueBoldWeight([
          styles.label,
          {
            color: theme.primarycolor4static,
            paddingHorizontal: HANDLE_WIDTH + TRACK_GAP,
          },
        ])}
      >
        {label}
      </Text>

      {!completed && (
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[
              styles.handle,
              isRTL ? styles.handleRTL : styles.handleLTR,
              {
                width: HANDLE_WIDTH,
                height: HANDLE_HEIGHT,
                borderRadius: HANDLE_RADIUS,
                backgroundColor: theme.styleslightgray,
              },
              handleAnimatedStyle,
            ]}
          >
            <SwipeChevronsTriple
              width={actuatedNormalize(24)}
              height={actuatedNormalize(24)}
              style={isRTL ? styles.iconRTL : undefined}
            />
          </Animated.View>
        </GestureDetector>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "transparent",
  },
  trackDefault: {
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.35)",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: actuatedNormalize(36),
    elevation: 4,
  },
  trackLiquidGlass: {
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.25)",
  },
  label: {
    fontFamily: fonts.HSBC_Medium,
    fontSize: fontMedium,
    textAlign: "center",
  },
  handle: {
    position: "absolute",
    top: TRACK_PADDING_TOP,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: actuatedNormalize(8),
  },
  handleLTR: {
    left: TRACK_PADDING_LEFT,
  },
  handleRTL: {
    right: TRACK_PADDING_LEFT,
  },
  iconRTL: {
    transform: [{ scaleX: -1 }],
  },
});
