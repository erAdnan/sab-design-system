import React from 'react';
import { View, StyleSheet } from 'react-native';
import { actuatedNormalize } from '../../assets/styles/utils/pixelScaling';

type Props = {
  isDown?: boolean;
  color: string;
};

const Triangle: React.FC<Props> = ({ isDown, color }) => {
  return (
    <View
      style={[
        styles.triangle,
        { borderBottomColor: color },
        isDown && styles.down,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: actuatedNormalize(8),
    borderRightWidth: actuatedNormalize(8),
    borderBottomWidth: actuatedNormalize(14),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  down: {
    transform: [{ rotate: '180deg' }],
  },
});

export default Triangle;