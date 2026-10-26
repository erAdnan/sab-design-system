import React, {
  FC,
  ReactElement,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AccessibilityInfo,
  AppState,
  AppStateStatus,
  I18nManager,
  LayoutChangeEvent,
  Platform,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  Easing,
  cancelAnimation,
  runOnJS,
  scrollTo,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { ScrollView as RNGHScrollView } from "react-native-gesture-handler";
import { Tab } from "./Tab";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { spacingXS } from "../../assets/styles/constants/size";
import { AutomationProps } from "../automationProps";

/** Premium banking-style easing (ease-out). */
const BANK_EASING = Easing.bezier(0.33, 0, 0.2, 1);

// Android: reanimated's Animated.ScrollView can fight the core touch responder
// system, making the horizontal list ignore drags. RNGH ScrollView keeps native
// scrolling reliable while still working with reanimated's scrollTo handlers.
const AnimatedScrollView = Animated.createAnimatedComponent(RNGHScrollView);

const INTRO_SCROLL_DELAY_MS = 500;
const INTRO_PEEK_PX = actuatedNormalize(62);
const INTRO_PEEK_DURATION_MS = 320;
const INTRO_RETURN_DURATION_MS = 360;
const SELECTION_SCALE_DURATION_MS = 260;

const IS_RTL = I18nManager.isRTL;

export type ScrollableTabItem = {
  id: number;
  label: string;
  icon?: ReactElement;
};

export interface ScrollableTabBarProps extends AutomationProps {
  items: ScrollableTabItem[];
  activeId: number;
  onTabPress: (id: number) => void;
  /** One-time horizontal peek hint on first layout. Default true. */
  enableIntroPeek?: boolean;
  /** When true, shows tab placeholders instead of real tabs. */
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

type TabLayout = { x: number; width: number };

type AnimatedTabItemProps = {
  id: number;
  label: string;
  icon?: ReactElement;
  isActive: boolean;
  onPress: (id: number) => void;
  onLayout: (id: number, e: LayoutChangeEvent) => void;
  testID?: string;
  accessibilityLabel?: string;
};

const AnimatedTabItem = memo(function AnimatedTabItem({
  id,
  label,
  icon,
  isActive,
  onPress,
  onLayout,
  testID,
  accessibilityLabel,
}: AnimatedTabItemProps) {
  const scale = useSharedValue(1);
  const hasMountedRef = useRef(false);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    if (!isActive) {
      scale.value = withTiming(1, {
        duration: SELECTION_SCALE_DURATION_MS,
        easing: BANK_EASING,
      });
      return;
    }
    scale.value = withSequence(
      withTiming(0.98, {
        duration: Math.round(SELECTION_SCALE_DURATION_MS * 0.3),
        easing: BANK_EASING,
      }),
      withTiming(1.02, {
        duration: Math.round(SELECTION_SCALE_DURATION_MS * 0.4),
        easing: BANK_EASING,
      }),
      withTiming(1, {
        duration: Math.round(SELECTION_SCALE_DURATION_MS * 0.3),
        easing: BANK_EASING,
      })
    );
  }, [isActive, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleLayout = useCallback(
    (e: LayoutChangeEvent) => onLayout(id, e),
    [id, onLayout]
  );

  return (
    <Animated.View style={animatedStyle} onLayout={handleLayout}>
      <Tab
        id={id}
        label={label}
        icon={icon}
        isActive={isActive}
        setActive={onPress}
        testID={testID}
        accessibilityLabel={accessibilityLabel}
      />
    </Animated.View>
  );
});

/**
 * Horizontally scrollable tab bar with first-load peek hint and
 * center-on-select — premium banking-app interaction pattern.
 */
export const ScrollableTabBar: FC<ScrollableTabBarProps> = ({
  items,
  activeId,
  onTabPress,
  enableIntroPeek = true,
  loading = false,
  style,
  contentContainerStyle,
  testID,
  accessibilityLabel,
}) => {
  const activeIdRef = useRef(activeId);
  activeIdRef.current = activeId;

  const scrollRef = useAnimatedRef<RNGHScrollView>();
  const introScrollX = useSharedValue(0);
  const currentScrollX = useSharedValue(0);
  const isScrollReady = useSharedValue(0);

  const viewportWidthRef = useRef(0);
  const contentWidthRef = useRef(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const tabLayoutsRef = useRef<Record<number, TabLayout>>({});
  const introPlayingRef = useRef(false);
  const introStartedRef = useRef(false);
  const introTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const reduceMotionRef = useRef(false);

  const clearIntroTimeouts = useCallback(() => {
    introTimeoutsRef.current.forEach(clearTimeout);
    introTimeoutsRef.current = [];
  }, []);

  useEffect(() => {
    // Reset intro while skeleton is shown so peek can run once real tabs
    // replace placeholders (same ScrollView stays mounted).
    if (loading) {
      clearIntroTimeouts();
      cancelAnimation(introScrollX);
      introScrollX.value = 0;
      introPlayingRef.current = false;
      introStartedRef.current = false;
      contentWidthRef.current = 0;
      tabLayoutsRef.current = {};
    }
  }, [loading, clearIntroTimeouts, introScrollX]);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then((v) => {
      reduceMotionRef.current = v;
    });
    const sub = AccessibilityInfo.addEventListener?.(
      "reduceMotionChanged",
      (e: boolean | { reduceMotionEnabled: boolean }) => {
        reduceMotionRef.current =
          typeof e === "boolean" ? e : e.reduceMotionEnabled;
      }
    );
    return () => sub?.remove?.();
  }, []);

  useAnimatedReaction(
    () => introScrollX.value,
    (x) => {
      // Android crashes if scrollTo runs before the ScrollView is mounted
      // (animatedRef resolves to null → "Value is null, expected a number").
      if (isScrollReady.value === 0) {
        return;
      }
      scrollTo(scrollRef, x, 0, false);
    }
  );

  const clearIntroAnimation = useCallback(() => {
    cancelAnimation(introScrollX);
    clearIntroTimeouts();
  }, [clearIntroTimeouts, introScrollX]);

  useEffect(() => () => clearIntroAnimation(), [clearIntroAnimation]);

  // Cancel in-flight intro if app backgrounds mid-animation.
  useEffect(() => {
    const onAppState = (state: AppStateStatus) => {
      if (state !== "active" && introPlayingRef.current) {
        clearIntroAnimation();
        introPlayingRef.current = false;
        introStartedRef.current = true;
      }
    };
    const sub = AppState.addEventListener("change", onAppState);
    return () => sub.remove();
  }, [clearIntroAnimation]);

  const dismissIntroPeek = useCallback(() => {
    if (!introPlayingRef.current) {
      return;
    }
    clearIntroAnimation();
    introPlayingRef.current = false;
    introStartedRef.current = true;
  }, [clearIntroAnimation]);

  const scrollToX = useCallback(
    (x: number, animated: boolean) => {
      const node = scrollRef.current as unknown as {
        scrollTo: (opts: { x: number; y?: number; animated?: boolean }) => void;
      } | null;
      node?.scrollTo({ x, animated });
      currentScrollX.value = x;
    },
    [currentScrollX, scrollRef]
  );

  const getClampedCenterOffset = useCallback((tabId: number): number | null => {
    const layout = tabLayoutsRef.current[tabId];
    const vw = viewportWidthRef.current;
    const cw = contentWidthRef.current;
    if (!layout || vw <= 0) {
      return null;
    }

    if (cw <= vw) {
      return null;
    }

    const tabLeft = layout.x;
    const tabRight = layout.x + layout.width;
    const scrollX = currentScrollX.value;
    const visibleLeft = scrollX;
    const visibleRight = scrollX + vw;
    const fullyVisible =
      tabLeft >= visibleLeft - 0.5 && tabRight <= visibleRight + 0.5;
    const tabCenter = tabLeft + layout.width / 2;
    const viewportCenter = scrollX + vw / 2;
    const alreadyCentered = Math.abs(tabCenter - viewportCenter) < 1;

    if (fullyVisible || alreadyCentered) {
      return null;
    }

    const target = tabCenter - vw / 2;
    return Math.max(0, Math.min(target, cw - vw));
  }, [currentScrollX]);

  const centerSelectedTab = useCallback(
    (tabId: number) => {
      if (introPlayingRef.current) {
        return;
      }
      const target = getClampedCenterOffset(tabId);
      if (target == null) {
        return;
      }
      scrollToX(target, !reduceMotionRef.current);
    },
    [getClampedCenterOffset, scrollToX]
  );

  const onIntroPeekComplete = useCallback(() => {
    introPlayingRef.current = false;
    centerSelectedTab(activeIdRef.current);
  }, [centerSelectedTab]);

  const maybeStartIntroPeek = useCallback(() => {
    if (loading) {
      return;
    }
    if (!enableIntroPeek) {
      introStartedRef.current = true;
      return;
    }
    if (introStartedRef.current) {
      return;
    }

    const vw = viewportWidthRef.current;
    const cw = contentWidthRef.current;
    if (vw <= 0 || cw <= 0) {
      return;
    }

    // Nothing to hint when content fits the viewport.
    if (cw <= vw) {
      introStartedRef.current = true;
      return;
    }

    introStartedRef.current = true;

    if (reduceMotionRef.current) {
      centerSelectedTab(activeIdRef.current);
      return;
    }

    introPlayingRef.current = true;
    clearIntroAnimation();

    const maxScroll = cw - vw;
    const peek = Math.min(maxScroll, INTRO_PEEK_PX);
    const introStartX = IS_RTL ? maxScroll : 0;
    const introPeekX = IS_RTL ? Math.max(0, maxScroll - peek) : peek;
    const introReturnX = introStartX;

    scrollToX(introStartX, false);

    // Android ScrollView + Reanimated scrollTo can fight; use timed scrollTo.
    if (Platform.OS === "android") {
      introTimeoutsRef.current.push(
        setTimeout(() => {
          if (!introPlayingRef.current) return;
          scrollToX(introPeekX, true);
        }, INTRO_SCROLL_DELAY_MS)
      );
      introTimeoutsRef.current.push(
        setTimeout(() => {
          if (!introPlayingRef.current) return;
          scrollToX(introReturnX, true);
        }, INTRO_SCROLL_DELAY_MS + INTRO_PEEK_DURATION_MS)
      );
      introTimeoutsRef.current.push(
        setTimeout(() => {
          if (!introPlayingRef.current) return;
          onIntroPeekComplete();
          clearIntroTimeouts();
        }, INTRO_SCROLL_DELAY_MS + INTRO_PEEK_DURATION_MS + INTRO_RETURN_DURATION_MS)
      );
      return;
    }

    introScrollX.value = introStartX;
    introScrollX.value = withDelay(
      INTRO_SCROLL_DELAY_MS,
      withSequence(
        withTiming(introPeekX, {
          duration: INTRO_PEEK_DURATION_MS,
          easing: BANK_EASING,
        }),
        withTiming(
          introReturnX,
          {
            duration: INTRO_RETURN_DURATION_MS,
            easing: BANK_EASING,
          },
          (finished) => {
            if (finished) {
              runOnJS(onIntroPeekComplete)();
            }
          }
        )
      )
    );
  }, [
    centerSelectedTab,
    clearIntroAnimation,
    clearIntroTimeouts,
    enableIntroPeek,
    introScrollX,
    loading,
    onIntroPeekComplete,
    scrollToX,
  ]);

  useEffect(() => {
    if (loading) {
      return;
    }
    const frame = requestAnimationFrame(() => {
      centerSelectedTab(activeId);
    });
    return () => cancelAnimationFrame(frame);
  }, [activeId, centerSelectedTab, loading]);

  const onScrollLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const width = e.nativeEvent.layout.width;
      viewportWidthRef.current = width;
      setViewportWidth((current) => (current === width ? current : width));
      isScrollReady.value = 1;
      requestAnimationFrame(() => {
        if (loading) {
          return;
        }
        maybeStartIntroPeek();
        if (!introPlayingRef.current) {
          centerSelectedTab(activeIdRef.current);
        }
      });
    },
    [centerSelectedTab, isScrollReady, loading, maybeStartIntroPeek]
  );

  const onContentSizeChange = useCallback(
    (w: number) => {
      contentWidthRef.current = w;
      requestAnimationFrame(() => {
        if (loading) {
          return;
        }
        maybeStartIntroPeek();
        if (!introPlayingRef.current) {
          centerSelectedTab(activeIdRef.current);
        }
      });
    },
    [centerSelectedTab, loading, maybeStartIntroPeek]
  );

  const handleTabLayout = useCallback(
    (tabId: number, e: LayoutChangeEvent) => {
      const { x, width } = e.nativeEvent.layout;
      tabLayoutsRef.current[tabId] = { x, width };
      if (tabId === activeIdRef.current && !introPlayingRef.current) {
        requestAnimationFrame(() => centerSelectedTab(tabId));
      }
    },
    [centerSelectedTab]
  );

  const handleTabPress = useCallback(
    (id: number) => {
      dismissIntroPeek();
      onTabPress(id);
    },
    [dismissIntroPeek, onTabPress]
  );

  const onScrollBeginDrag = useCallback(() => {
    dismissIntroPeek();
  }, [dismissIntroPeek]);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      currentScrollX.value = event.contentOffset.x;
    },
  });

  return (
    <View style={[styles.wrap, style]}>
      <AnimatedScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        decelerationRate="normal"
        nestedScrollEnabled
        scrollEnabled={!loading}
        scrollEventThrottle={16}
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          contentContainerStyle,
          viewportWidth > 0 ? { minWidth: viewportWidth } : null,
          IS_RTL && Platform.OS === "android" ? styles.androidRtlContent : null,
        ]}
        onLayout={onScrollLayout}
        onContentSizeChange={onContentSizeChange}
        onScrollBeginDrag={onScrollBeginDrag}
        onScroll={onScroll}
        accessible={false}
      >
        {loading
          ? items.map((item) => (
              <SkeletonBox
                key={`skeleton-${item.id}`}
                shape="square"
                size="large"
                overrideStyles={[
                  styles.skeletonTab,
                  { height: actuatedNormalize(30) },
                ]}
              />
            ))
          : items.map((item) => (
              <AnimatedTabItem
                key={item.id}
                id={item.id}
                label={item.label}
                icon={item.icon}
                isActive={activeId === item.id}
                onPress={handleTabPress}
                onLayout={handleTabLayout}
                testID={testID ? `${testID}-${item.id}` : undefined}
                accessibilityLabel={
                  accessibilityLabel ? `${accessibilityLabel}-${item.id}` : item.label
                }
              />
            ))}
      </AnimatedScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexGrow: 0,
    flexShrink: 0,
  },
  scroll: {
    flexGrow: 0,
    flexShrink: 0,
  },
  content: {
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: spacingXS,
  },
  skeletonTab: {
    width: actuatedNormalize(80),
  },
  /** Android horizontal ScrollView does not always honour I18nManager for `row`. */
  androidRtlContent: {
    flexDirection: "row-reverse",
  },
});