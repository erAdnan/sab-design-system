import React, { FC, useEffect, useRef } from 'react';
import { StyleSheet, View, ColorValue, Animated, Easing } from 'react-native';
import { actuatedNormalize } from '../../assets/styles/utils/pixelScaling';

interface SpinnerProps {
  color: ColorValue;
  size?: number;
  durationMs?: number;
  transparent?: boolean;
}

/**
* A spinner component that can be used to show a loading state.
* @property color - Color of the spinner
* @property size - Size of the spinner
* @property durationMs - Duration of the spinner animation
*/
export const Spinner: FC<SpinnerProps> = ({
  color,
  size = 24,
  durationMs = 1000,
  transparent = false
}) => {
  const rotationDegree = useRef(new Animated.Value(0)).current;

  const startRotationAnimation = (durationMs: number, rotationDegree: Animated.Value): void => {
    Animated.loop(Animated.parallel([
      Animated.timing(
        rotationDegree,
        {
          toValue: 360,
          duration: durationMs,
          easing: Easing.linear,
          useNativeDriver: true
        }
      )
    ])).start();
  };

  useEffect(() => {
    startRotationAnimation(durationMs, rotationDegree);
  }, [durationMs, rotationDegree]);

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    background: {
      width: '100%',
      height: '100%',
      borderWidth: transparent ? 0 : actuatedNormalize(1),
      opacity: 0.1,
    },
    progress: {
      width: '100%',
      height: '100%',
      borderLeftColor: 'rgba(0, 0, 0, 0.01)',
      borderRightColor: 'transparent',
      borderBottomColor: 'transparent',
      borderWidth: actuatedNormalize(2),
      position: 'absolute',
    }
  });

  return (
    <View style={{ ...styles.container, width: size, height: size }} accessibilityRole='progressbar'>
      <View style={[styles.background, { borderColor: color, borderRadius: size / 2 }]} />
      <Animated.View
        style={[styles.progress, { borderTopColor: color, borderRightColor: color, borderBottomColor: color, borderRadius: size / 2 }, {
          transform: [{
            rotateZ: rotationDegree.interpolate({
              inputRange: [0, 360],
              outputRange: ['0deg', '360deg']
            })
          }]
        }]}
      />
    </View>
  );
};

