import * as React from "react";
import Svg, { Circle, G, Mask, Path, Rect, SvgProps } from "react-native-svg";

const Growth = (props: SvgProps) => (
  <Svg
    {...props}
    width={props.width || 24}
    height={props.height || 24}
    viewBox="0 0 24 24"
    fill="none"
    preserveAspectRatio="xMidYMid meet"
  >
    <Mask
      id="growthOutlineMask"
      width={24}
      height={24}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}
    >
      <Rect width={24} height={24} fill="#D9D9D9" />
    </Mask>
    <G mask="url(#growthOutlineMask)">
      <Circle
        cx={11.9988}
        cy={8.67749}
        r={3.01831}
        stroke={props.fill || props.stroke || "#00847F"}
      />
      <Path
        d="M11.9995 13.585V20.0152C11.9995 20.0152 11.0955 18.1223 6.95312 16.1044"
        stroke={props.fill || props.stroke || "#00847F"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.9994 20.0151C11.9994 20.0151 12.9034 18.1222 17.0466 16.1043M5.37135 17.4124C6.19215 18.0959 7.48495 18.3451 8.26975 17.067C10.2113 16.1876 9.41535 15.0743 8.31215 14.4912C7.49709 14.1872 6.59997 14.0343 5.6934 14.045C4.78682 14.0556 3.89625 14.2295 3.09375 14.5525C4.41855 15.5354 4.35055 16.5606 5.37135 17.4124Z"
        stroke={props.fill || props.stroke || "#00847F"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.6284 17.4124C17.8084 18.0959 16.5148 18.3451 15.7308 17.0671C13.7892 16.1864 14.5852 15.0737 15.6876 14.4907C16.5028 14.1865 17.4 14.0336 18.3068 14.0442C19.2135 14.0549 20.1042 14.2288 20.9068 14.5519C19.5812 15.5354 19.65 16.5606 18.6284 17.4124Z"
        stroke={props.fill || props.stroke || "#00847F"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.19922 8.78486C7.19922 9.41521 7.32337 10.0394 7.5646 10.6217C7.80582 11.2041 8.15938 11.7333 8.60511 12.179C9.05083 12.6247 9.57998 12.9783 10.1623 13.2195C10.7447 13.4607 11.3689 13.5849 11.9992 13.5849C12.6296 13.5849 13.2537 13.4607 13.8361 13.2195C14.4185 12.9783 14.9476 12.6247 15.3933 12.179C15.8391 11.7333 16.1926 11.2041 16.4338 10.6217C16.6751 10.0394 16.7992 9.41521 16.7992 8.78486C16.7992 7.51182 16.2935 6.29093 15.3933 5.39075C14.4932 4.49058 13.2723 3.98486 11.9992 3.98486C10.7262 3.98486 9.50528 4.49058 8.60511 5.39075C7.70493 6.29093 7.19922 7.51182 7.19922 8.78486Z"
        stroke={props.fill || props.stroke || "#00847F"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

export default Growth;
