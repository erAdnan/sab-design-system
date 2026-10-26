import * as React from "react";
import { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path, Defs, RadialGradient, Stop, SvgProps } from "react-native-svg";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { useTheme } from "../../context/theme/themeContext";

interface PictogramSpecialProps extends SvgProps {
  icon: React.ReactElement;
}

export const PictogramSpecial: React.FC<PictogramSpecialProps> = ({ icon }) => {
  const { theme } = useTheme()
  const dynamicIcon = useMemo(
      () => icon
      ? React.cloneElement(icon, {
        width: actuatedNormalize(32),
        height: actuatedNormalize(32),
        fill: theme.primarycolor3static,
        style: styles.overlayIcon
      })
      : null,
    [icon]);
  return (
    <View style={styles.container}>
      {/* Background SVG */}
      <Svg
        width={65}
        height={64}
        fill="none"
      >
        <Path
          fill="#F9F2F3"
          d="M32.5 0c3.344 0 5.795 5.15 8.811 6.087 3.127.97 8.272-1.786 10.874.024 2.63 1.828 1.466 7.368 3.378 9.88 1.894 2.486 7.778 3.13 8.793 6.118.979 2.883-3.352 6.696-3.352 9.891 0 3.195 4.33 7.008 3.352 9.89-1.015 2.988-6.899 3.633-8.793 6.12-1.914 2.512-.75 8.052-3.379 9.88-2.602 1.81-7.747-.947-10.873.023C38.295 58.849 35.844 64 32.5 64c-3.344 0-5.795-5.15-8.812-6.087-3.127-.97-8.271 1.786-10.874-.024-2.63-1.828-1.466-7.367-3.378-9.88-1.894-2.486-7.777-3.13-8.793-6.118-.979-2.883 3.352-6.696 3.352-9.891 0-3.195-4.33-7.008-3.351-9.89 1.015-2.988 6.898-3.633 8.793-6.12 1.913-2.511.749-8.052 3.378-9.88 2.602-1.81 7.747.947 10.874-.023C26.705 5.151 29.157 0 32.5 0Z"
        />
        <Path
          fill="url(#a)"
          fillOpacity={0.2}
          d="M32.5 0c3.344 0 5.795 5.15 8.811 6.087 3.127.97 8.272-1.786 10.874.024 2.63 1.828 1.466 7.368 3.378 9.88 1.894 2.486 7.778 3.13 8.793 6.118.979 2.883-3.352 6.696-3.352 9.891 0 3.195 4.33 7.008 3.352 9.89-1.015 2.988-6.899 3.633-8.793 6.12-1.914 2.512-.75 8.052-3.379 9.88-2.602 1.81-7.747-.947-10.873.023C38.295 58.849 35.844 64 32.5 64c-3.344 0-5.795-5.15-8.812-6.087-3.127-.97-8.271 1.786-10.874-.024-2.63-1.828-1.466-7.367-3.378-9.88-1.894-2.486-7.777-3.13-8.793-6.118-.979-2.883 3.352-6.696 3.352-9.891 0-3.195-4.33-7.008-3.351-9.89 1.015-2.988 6.898-3.633 8.793-6.12 1.913-2.511.749-8.052 3.378-9.88 2.602-1.81 7.747.947 10.874-.023C26.705 5.151 29.157 0 32.5 0Z"
        />
        <Defs>
          <RadialGradient
            id="a"
            cx={0}
            cy={0}
            r={1}
            gradientTransform="matrix(0 32 -32 0 32.5 32)"
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#DB0011" />
            <Stop offset={1} stopColor="#FFA2AF" />
          </RadialGradient>
        </Defs>
      </Svg>

      {/* Overlay icon centered */}
      {dynamicIcon}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 65,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
  },
  overlayIcon: {
    position: "absolute",
  },
});

