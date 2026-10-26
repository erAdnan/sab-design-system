import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  I18nManager,
  Platform,
  LayoutRectangle,
} from 'react-native';


import Triangle from './Triangle';
import getTooltipCoordinate from './getTooltipCoordinate';
import { ScreenHeight, ScreenWidth } from './Helpers';
import { actuatedNormalize } from '../../assets/styles/utils/pixelScaling';
import {  spacingS, spacingXS } from '../../assets/styles/constants/size';

export type TooltipActionType = 'press' | 'longPress' | 'none';

type TooltipProps = {
  children: React.ReactNode;
  popover: React.ReactNode;
  width?: number | string;
  height?: number | string;
  withPointer?: boolean;
  backgroundColor?: string;
  pointerColor?: string;
  pointerStyle?: any;
  containerStyle?: any;
  overlayColor?: string;
  withOverlay?: boolean;
  actionType?: TooltipActionType;
  onOpen?: () => void;
  onClose?: () => void;
};

const POINTER_GAP_ANDROID = actuatedNormalize(4);
const POINTER_GAP_IOS = actuatedNormalize(2);

const SabTooltip: React.FC<TooltipProps> = ({
  children,
  popover,
  width = actuatedNormalize(150),
  withPointer = true,
  backgroundColor = '#617080',
  pointerColor,
  pointerStyle = {},
  containerStyle,
  overlayColor = 'rgba(250,250,250,0.7)',
  withOverlay = true,
  actionType = 'press',
  onOpen,
  onClose,
}) => {
  const anchorRef = useRef<View>(null);
  const [visible, setVisible] = useState(false);
  const [layout, setLayout] = useState<LayoutRectangle | null>(null);
const [tooltipLayout, setTooltipLayout] = useState<{
  width: number;
  height: number;
} | null>(null);
  const toggle = useCallback(() => {
    setVisible(v => !v);
  }, []);

  const measure = () => {
    anchorRef.current?.measureInWindow((x, y, width, height) => {
      setLayout({ x, y, width, height });
    });
  };

  useLayoutEffect(() => {
    if (visible) {
      measure();
      onOpen?.();
    } else {
      onClose?.();
    }
  }, [visible]);

  if (!layout) {
    return (
      <View ref={anchorRef} collapsable={false}>
        <TouchableOpacity onPress={toggle}>{children}</TouchableOpacity>
      </View>
    );
  }

  const { x, y } = getTooltipCoordinate(
    layout.x,
    layout.y,
    layout.width,
    layout.height,
    ScreenWidth,
    ScreenHeight,
    width,
    withPointer,
  );

  const isAbove = layout.y > y;
  const pointerGap = Platform.OS === 'android'
    ? POINTER_GAP_ANDROID
    : POINTER_GAP_IOS;
   const tooltipHeight = tooltipLayout?.height ?? 0;

const topPosition = isAbove
  ? Math.max(actuatedNormalize(8), y - tooltipHeight - pointerGap)
  : Math.min(
      ScreenHeight - tooltipHeight - actuatedNormalize(8),
      y
    );

    const pointerTop = isAbove
  // ✅ FIX ONLY FOR ABOVE
  ? topPosition + tooltipHeight - actuatedNormalize(4)
  // ⛔ KEEP BELOW AS-IS (old behavior)
  : layout.y + layout.height + pointerGap;

  return (
    <View ref={anchorRef} collapsable={false}>
      <TouchableOpacity onPress={toggle}>{children}</TouchableOpacity>

      <Modal transparent visible={visible} animationType="fade">
        <TouchableOpacity
          activeOpacity={1}
          onPress={toggle}
          style={{ flex: 1, backgroundColor: withOverlay ? overlayColor : 'transparent' }}
        >
          {withPointer && (
            <View
            style={{
      position: 'absolute',
      top: pointerTop,
      left: I18nManager.isRTL
        ? undefined
        : layout.x + layout.width / 2 - 8,
      right: I18nManager.isRTL
        ? layout.x + layout.width / 2 - 8
        : undefined,
    }}
            >
              <Triangle
                isDown={isAbove}
                color={pointerColor || backgroundColor}
              />
            </View> 
          )}

         <View
  onLayout={(e) => {
    const { width, height } = e.nativeEvent.layout;
    setTooltipLayout({ width, height });
  }}
  style={[
    {
      position: 'absolute',
      top: topPosition,
      left: I18nManager.isRTL ? undefined : x,
      right: I18nManager.isRTL ? x : undefined,
      width,
      backgroundColor,
      borderRadius: 10,
      paddingHorizontal:spacingXS,
      paddingVertical:spacingS,
      overflow: 'hidden',
    },
    containerStyle,
  ]}
>
  {popover}
</View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default SabTooltip;