import { useEffect, useRef, useState } from "react";
import { Animated, Easing } from "react-native";

/**
 * Hook to animate line chart from left to right
 * @param pathLength - The length of the path to animate
 * @param dependencies - Dependencies that should trigger re-animation (e.g., data, timeFrame)
 * @returns Object with strokeDashoffset and showGradient state
 */
export const useLineChartAnimation = (
  pathLength: number,
  dependencies: any[] = []
) => {
  const [strokeDashoffset, setStrokeDashoffset] = useState<number>(0);
  const [showGradient, setShowGradient] = useState<boolean>(false);
  const animationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (pathLength > 0) {
      // Hide gradient initially
      setShowGradient(false);
      // Reset animation
      animationValue.setValue(0);
      setStrokeDashoffset(pathLength);
      
      // Use listener for smoother updates (throttled by React Native's animation system)
      const listenerId = animationValue.addListener(({ value }) => {
        setStrokeDashoffset(pathLength - value);
      });

      // Animate from 0 to pathLength over 1 second with easing for smoother animation
      Animated.timing(animationValue, {
        toValue: pathLength,
        duration: 1000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false, // strokeDashoffset doesn't support native driver
      }).start(({ finished }) => {
        if (finished) {
          setStrokeDashoffset(0);
          // Show gradient after line animation completes
          setShowGradient(true);
        }
        // Clean up listener
        animationValue.removeListener(listenerId);
      });

      return () => {
        animationValue.removeListener(listenerId);
        animationValue.stopAnimation();
      };
    }
  }, [pathLength, ...dependencies]);

  return { strokeDashoffset, showGradient };
};

