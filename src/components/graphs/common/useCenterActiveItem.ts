import { useCallback, useEffect, useRef } from "react";
import {
  AccessibilityInfo,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from "react-native";

type ItemLayout = { x: number; width: number };

/**
 * Keeps a horizontally scrolling row of filters centered on the active item
 * whenever selection or layout changes move that item out of view.
 */
export function useCenterActiveItem<TKey extends string | number>(
  activeKey: TKey
) {
  const scrollRef = useRef<ScrollView>(null);
  const itemLayoutsRef = useRef<Record<string, ItemLayout>>({});
  const viewportWidthRef = useRef(0);
  const contentWidthRef = useRef(0);
  const currentScrollXRef = useRef(0);
  const reduceMotionRef = useRef(false);
  const hasCenteredOnceRef = useRef(false);
  const activeKeyRef = useRef(activeKey);
  activeKeyRef.current = activeKey;

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then((value) => {
      reduceMotionRef.current = value;
    });

    const subscription = AccessibilityInfo.addEventListener?.(
      "reduceMotionChanged",
      (event: boolean | { reduceMotionEnabled: boolean }) => {
        reduceMotionRef.current =
          typeof event === "boolean" ? event : event.reduceMotionEnabled;
      }
    );

    return () => subscription?.remove?.();
  }, []);

  const getClampedCenterOffset = useCallback((key: TKey): number | null => {
    const layout = itemLayoutsRef.current[String(key)];
    const viewportWidth = viewportWidthRef.current;
    const contentWidth = contentWidthRef.current;

    if (!layout || viewportWidth <= 0 || contentWidth <= viewportWidth) {
      return null;
    }

    const itemLeft = layout.x;
    const itemRight = layout.x + layout.width;
    const scrollX = currentScrollXRef.current;
    const visibleLeft = scrollX;
    const visibleRight = scrollX + viewportWidth;
    const fullyVisible =
      itemLeft >= visibleLeft - 0.5 && itemRight <= visibleRight + 0.5;
    const itemCenter = itemLeft + layout.width / 2;
    const viewportCenter = scrollX + viewportWidth / 2;
    const alreadyCentered = Math.abs(itemCenter - viewportCenter) < 1;

    if (fullyVisible || alreadyCentered) {
      return null;
    }

    const target = itemCenter - viewportWidth / 2;
    return Math.max(0, Math.min(target, contentWidth - viewportWidth));
  }, []);

  const centerItem = useCallback(
    (key: TKey, animated: boolean) => {
      const target = getClampedCenterOffset(key);
      if (target == null) {
        return;
      }

      scrollRef.current?.scrollTo({
        x: target,
        animated: animated && !reduceMotionRef.current,
      });
      currentScrollXRef.current = target;
      hasCenteredOnceRef.current = true;
    },
    [getClampedCenterOffset]
  );

  const handleItemLayout = useCallback(
    (key: TKey, event: LayoutChangeEvent) => {
      const { x, width } = event.nativeEvent.layout;
      itemLayoutsRef.current[String(key)] = { x, width };

      if (key === activeKeyRef.current) {
        requestAnimationFrame(() =>
          centerItem(key, hasCenteredOnceRef.current)
        );
      }
    },
    [centerItem]
  );

  const handleScrollLayout = useCallback(
    (event: LayoutChangeEvent) => {
      viewportWidthRef.current = event.nativeEvent.layout.width;
      requestAnimationFrame(() =>
        centerItem(activeKeyRef.current, hasCenteredOnceRef.current)
      );
    },
    [centerItem]
  );

  const handleContentSizeChange = useCallback(
    (width: number) => {
      contentWidthRef.current = width;
      requestAnimationFrame(() =>
        centerItem(activeKeyRef.current, hasCenteredOnceRef.current)
      );
    },
    [centerItem]
  );

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      currentScrollXRef.current = event.nativeEvent.contentOffset.x;
    },
    []
  );

  useEffect(() => {
    const frame = requestAnimationFrame(() =>
      centerItem(activeKey, hasCenteredOnceRef.current)
    );
    return () => cancelAnimationFrame(frame);
  }, [activeKey, centerItem]);

  return {
    scrollRef,
    handleItemLayout,
    handleScrollLayout,
    handleContentSizeChange,
    handleScroll,
  };
}
