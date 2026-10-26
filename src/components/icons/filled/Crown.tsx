import * as React from "react";
import Svg, {
  Defs,
  G,
  LinearGradient,
  Mask,
  Path,
  Rect,
  Stop,
  SvgProps,
} from "react-native-svg";

const Crown = (props: SvgProps) => (
  <Svg
    width={props.width || 24}
    height={props.height || 24}
    viewBox="0 0 24 24"
    fill="none"
    preserveAspectRatio="xMidYMid meet"
    {...props}
  >
    <Mask
      id="crownFilledMask"
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
    <G mask="url(#crownFilledMask)">
      <Path
        d="M12 5.33203L16.4444 11.9987L22 7.55425L19.7778 18.6654H4.22222L2 7.55425L7.55556 11.9987L12 5.33203Z"
        fill="url(#crownFilledFill)"
        stroke="url(#crownFilledStroke)"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <LinearGradient
        id="crownFilledFill"
        x1="2"
        y1="11.9987"
        x2="22"
        y2="11.9987"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#80642D" />
        <Stop offset="1" stopColor="#BF9942" />
      </LinearGradient>
      <LinearGradient
        id="crownFilledStroke"
        x1="2"
        y1="11.9987"
        x2="22"
        y2="11.9987"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#80642D" />
        <Stop offset="1" stopColor="#BF9942" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default Crown;
