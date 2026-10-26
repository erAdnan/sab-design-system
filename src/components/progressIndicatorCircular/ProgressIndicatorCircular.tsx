import React, { FC, useEffect, useRef, useState } from "react";
import { useTheme } from "../../context/theme/themeContext";
import { Text } from "../text/Text";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { ProgressIndicatorCircularRing } from "./ProgressIndicatorCircularRing";
import { ThemeContext } from "@react-navigation/native";

export type ProgressIndicatorCircularSize = "xl" | "large" | "medium" | "small";

const SIZE_DIMENSIONS: Record<
  ProgressIndicatorCircularSize,
  { size: number; fontSize: number; strokeWidth: number }
> = {
  xl: { size: 82, fontSize: 20, strokeWidth: 7 },
  large: { size: 72, fontSize: 17, strokeWidth: 6 },
  medium: { size: 48, fontSize: 12, strokeWidth: 5 },
  small: { size: 32, fontSize: 8, strokeWidth: 4 },
};

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export interface ProgressIndicatorCircularProps {
  size?: ProgressIndicatorCircularSize;
  timeInSeconds?: number;
  onTimeStart?: () => void;
  onTimeEnd?: () => void;
  paused?: boolean;
  resetKey?: string | number;
}

/**
 * ProgressIndicatorCircular
 * Circular countdown timer with progress ring. Updates every second until time is up.
 * Uses theme tokens: primary red / primary red tonal (light), primarycolor4static & progressIndicatorCircularTrack (dark).
 *
 * @property size - Size of the circular indicator. One of "xl" | "large" | "medium" | "small". Default "xl".
 * @property timeInSeconds - Total countdown duration in seconds. Default 25.
 * @property onTimeStart - Callback when the timer starts.
 * @property onTimeEnd - Callback when the timer reaches zero.
 * @property paused - When true, the timer does not tick. Default false.
 * @property resetKey - Optional key or identifier; changing it resets the timer to timeInSeconds.
 */
export const ProgressIndicatorCircular: FC<ProgressIndicatorCircularProps> = ({
  size = "xl",
  timeInSeconds = 25,
  onTimeStart,
  onTimeEnd,
  paused = false,
  resetKey,
}) => {
  const { theme, isDarkTheme } = useTheme();
  const [remainingSeconds, setRemainingSeconds] = useState(() =>
    Math.max(0, Math.floor(timeInSeconds))
  );
  const hasStarted = useRef(false);
  const hasEnded = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onTimeStartRef = useRef(onTimeStart);
  const onTimeEndRef = useRef(onTimeEnd);
  onTimeStartRef.current = onTimeStart;
  onTimeEndRef.current = onTimeEnd;

  const { size: dimension, fontSize, strokeWidth } = SIZE_DIMENSIONS[size];
  const normalizedSize = actuatedNormalize(dimension);
  const normalizedStroke = actuatedNormalize(strokeWidth);
  const progress =
    timeInSeconds > 0 ? Math.min(1, Math.max(0, remainingSeconds / timeInSeconds)) : 0;

  // Reset when timeInSeconds or resetKey changes – clear any running interval first
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    const t = Math.max(0, Math.floor(timeInSeconds));
    setRemainingSeconds(t);
    hasStarted.current = false;
    hasEnded.current = false;
  }, [timeInSeconds, resetKey]);

  // Countdown: one interval at a time. Callbacks in refs so effect doesn't re-run when parent re-renders (e.g. Storybook).
  useEffect(() => {
    if (paused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    if (remainingSeconds <= 0) {
      if (!hasEnded.current) {
        hasEnded.current = true;
        onTimeEndRef.current?.();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    if (!hasStarted.current) {
      hasStarted.current = true;
      onTimeStartRef.current?.();
    }

    const id = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          if (!hasEnded.current) {
            hasEnded.current = true;
            onTimeEndRef.current?.();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    intervalRef.current = id;

    return () => {
      clearInterval(id);
      if (intervalRef.current === id) {
        intervalRef.current = null;
      }
    };
  }, [paused, timeInSeconds, resetKey]);

  const trackColor = theme.primaryredtonal;
  const progressColor = theme.primarycolor3;
  const textColorVariant = "primarycolor3";

  const normalizedFontSize = actuatedNormalize(fontSize);
  const lineHeight = actuatedNormalize(Math.ceil(fontSize * 1.25));

  return (
    <ProgressIndicatorCircularRing
      size={normalizedSize}
      strokeWidth={normalizedStroke}
      progress={progress}
      trackColor={trackColor}
      progressColor={progressColor}
    >
      <Text
        variant={textColorVariant}
        size={normalizedFontSize}
        overrideStyles={{
          textAlign: "center",
          lineHeight,
        }}
      >
        {formatTime(remainingSeconds)}
      </Text>
    </ProgressIndicatorCircularRing>
  );
};
