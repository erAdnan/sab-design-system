import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";

import { StyleSheet, useWindowDimensions } from "react-native";

import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { spacingM, spacingXS } from "../../assets/styles/constants/size";
import { useTheme } from "../../context/theme/themeContext";
import { AutomationProps } from "../automationProps";

export interface BottomSheetRef {
  open: () => void;
  close: () => void;
  scrollToEnd: () => void;
}

interface Props extends AutomationProps {
  children: React.ReactNode;
  enablePanDownToClose?: boolean;
  closeOnBackdropPress?: boolean;
  onClose?: () => void;
  dynamicHeight?: boolean;
  maxHeightRatio?: number;
  snapPoints?: (string | number)[];
  contentKey?: string | number;
  scrollable?: boolean;
}

export const SabBottomsheet = forwardRef<BottomSheetRef, Props>(
  (
    {
      children,
      enablePanDownToClose = true,
      closeOnBackdropPress = true,
      onClose,
      dynamicHeight = true,
      maxHeightRatio = 0.85,
      snapPoints: snapPointsProp,
      contentKey,
      scrollable = false,
      testID,
      accessibilityLabel,
    },
    ref
  ) => {
    const sheetRef = useRef<BottomSheetModal>(null);
    const scrollViewRef = useRef<any>(null);
    const sheetIndexRef = useRef(-1);
    const insets = useSafeAreaInsets();
    const { height: windowHeight } = useWindowDimensions();
    const { theme } = useTheme();

    // Scrollable sheets MUST use fixed snap points — dynamic sizing + BottomSheetScrollView
    // does not work reliably on Android (sheet opens but content is not scrollable / clipped).
    // Non-scrollable sheets use dynamic sizing so they hug their content.
    const useDynamicSizing = !scrollable && dynamicHeight;

    const percentageSnapPoint = useMemo(
      () => `${Math.round(maxHeightRatio * 100)}%`,
      [maxHeightRatio]
    );

    const resolvedSnapPoints = useMemo(() => {
      if (useDynamicSizing) {
        // dynamic mode: no snap points needed (library computes from content)
        return snapPointsProp ?? undefined;
      }
      // fixed mode (always for scrollable): use caller-supplied or derived percentage
      return snapPointsProp ?? [percentageSnapPoint];
    }, [useDynamicSizing, snapPointsProp, percentageSnapPoint]);

    const maxDynamicContentSize = useMemo(
      () => windowHeight * maxHeightRatio,
      [windowHeight, maxHeightRatio]
    );

    useImperativeHandle(ref, () => ({
      open: () => sheetRef.current?.present(),
      close: () => sheetRef.current?.dismiss(),
      scrollToEnd: () => scrollViewRef.current?.scrollToEnd({ animated: true }),
    }));

    const handleSheetChange = useCallback(
      (index: number) => {
        sheetIndexRef.current = index;
      },
      []
    );

    /** Fires after dismiss animation + unmount — safe point to navigate away. */
    const handleDismiss = useCallback(() => {
      onClose?.();
    }, [onClose]);

    useEffect(() => {
      if (!useDynamicSizing || contentKey === undefined || sheetIndexRef.current < 0) {
        return;
      }

      let frame2: number | undefined;
      const frame1 = requestAnimationFrame(() => {
        frame2 = requestAnimationFrame(() => {
          sheetRef.current?.snapToIndex(0);
        });
      });

      return () => {
        cancelAnimationFrame(frame1);
        if (frame2 !== undefined) {
          cancelAnimationFrame(frame2);
        }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contentKey]);

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          pressBehavior={closeOnBackdropPress ? "close" : "none"}
          opacity={0.7}
          enableTouchThrough={false}
        />
      ),
      [closeOnBackdropPress]
    );

    // Safe-area padding inside content — keeps sheet flush to bottom with no grey gap.
    const paddingBottom = useMemo(
      () => insets.bottom + spacingXS,
      [insets.bottom]
    );

    const staticViewStyle = useMemo(
      () => [
        styles.content,
        useDynamicSizing && styles.dynamicContent,
        { backgroundColor: theme.whiteinvert, paddingBottom },
      ],
      [useDynamicSizing, paddingBottom, theme.whiteinvert]
    );

    // For scrollable: padding is inside contentContainerStyle so it scrolls with content
    const scrollContentContainerStyle = useMemo(
      () => ({
        paddingHorizontal: actuatedNormalize(16),
        paddingBottom,
        backgroundColor: theme.whiteinvert,
        flexGrow: 1,
      }),
      [paddingBottom, theme.whiteinvert]
    );

    return (
      <BottomSheetModal
        ref={sheetRef}
        index={0}
        {...(resolvedSnapPoints !== undefined ? { snapPoints: resolvedSnapPoints } : {})}
        enablePanDownToClose={enablePanDownToClose}
        backdropComponent={renderBackdrop}
        onChange={handleSheetChange}
        onDismiss={handleDismiss}
        enableDynamicSizing={useDynamicSizing}
        maxDynamicContentSize={useDynamicSizing ? maxDynamicContentSize : undefined}
        detached={false}
        bottomInset={0}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
        backgroundStyle={{ backgroundColor: theme.whiteinvert, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, }}
        handleIndicatorStyle={{ backgroundColor: theme.primarycolor2_20, width:actuatedNormalize(67), height:actuatedNormalize(5) }}
        testID={testID}
        accessibilityLabel={accessibilityLabel}
      >
        {scrollable ? (
          // Fixed snap + BottomSheetScrollView = reliable scroll on both iOS and Android
          <BottomSheetScrollView
            style={styles.scrollView}
            contentContainerStyle={scrollContentContainerStyle}
            showsVerticalScrollIndicator={false}
            bounces={false}
            keyboardShouldPersistTaps="handled"
          >
            {children}
          </BottomSheetScrollView>
        ) : (
          <BottomSheetView style={staticViewStyle}>{children}</BottomSheetView>
        )}
      </BottomSheetModal>
    );
  }
);

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: actuatedNormalize(16),
  },
  dynamicContent: {
    flexGrow: 0,
    minHeight: 1,
  },
  scrollView: {
    flex: 1,
  },
});