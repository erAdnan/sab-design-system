import * as React from "react";
import Svg, { SvgProps, Mask, Path, G, Rect } from "react-native-svg";

const Switch = (props: SvgProps) => (
  <Svg
    width={props.width ?? 24}
    height={props.height ?? 24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Mask
      id="switchChevronMask"
      style={{ maskType: "alpha" } as any}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={24}
      height={24}
    >
      <Rect width={24} height={24} fill="#D9D9D9" />
    </Mask>
    <G mask="url(#switchChevronMask)">
      <Path
        d="M9 9.5L12 6.5L15 9.5M9 14.5L12 17.5L15 14.5"
        stroke={props.stroke || props.fill || "black"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

export default Switch;
