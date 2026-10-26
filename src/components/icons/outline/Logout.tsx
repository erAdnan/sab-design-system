import * as React from "react";
import { I18nManager, StyleSheet } from "react-native";
import Svg, { SvgProps, Path } from "react-native-svg";

const Logout = ({ fill, width, height, style, ...props }: SvgProps) => {
  const color = fill || "#000000";

  return (
    <Svg
      width={width || 24}
      height={height || 24}
      viewBox="0 0 24 24"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      style={StyleSheet.flatten([
        I18nManager.isRTL ? { transform: [{ scaleX: -1 }] } : undefined,
        style,
      ])}
      {...props}
    >
      <Path
        d="M15.8032 12.5549H8.97261C8.79193 12.5549 8.64097 12.4943 8.51974 12.373C8.39851 12.2518 8.33789 12.1009 8.33789 11.9202C8.33789 11.7395 8.39851 11.5885 8.51974 11.4673C8.64097 11.3461 8.79193 11.2855 8.97261 11.2855H15.8032L13.594 9.0687C13.4751 8.95 13.4116 8.8056 13.4036 8.6355C13.3953 8.46539 13.4612 8.31041 13.6013 8.17056C13.7363 8.03537 13.886 7.96777 14.0504 7.96777C14.2148 7.96777 14.3645 8.03537 14.4994 8.17056L17.5315 11.2023C17.7365 11.4075 17.839 11.6468 17.839 11.9202C17.839 12.1935 17.7365 12.4328 17.5315 12.638L14.4994 15.6698C14.3807 15.7887 14.2363 15.8534 14.0662 15.864C13.8961 15.8746 13.7412 15.8098 13.6013 15.6698C13.4661 15.5348 13.3974 15.3864 13.395 15.2245C13.3925 15.0625 13.4588 14.9115 13.594 14.7717L15.8032 12.5549Z"
        fill={color}
      />
      <Path
        d="M15.4086 3.5H7.16211C6.60982 3.5 6.16211 3.94772 6.16211 4.5V19.5C6.16211 20.0523 6.60982 20.5 7.16211 20.5H15.6758"
        stroke={color}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default Logout;
