import * as React from "react";
import Svg, { SvgProps, Mask, Path, G } from "react-native-svg";
const ArrowRight = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Mask id="a" width={24} height={24} x={0} y={0} maskUnits="userSpaceOnUse">
      <Path fill="#D9D9D9" d="M0 0h24v24H0z" />
    </Mask>
    <G mask="url(#a)">
      <Path
        fill={props.fill || "#DB0011"}
        d="M19.243 12.5H3.664a.484.484 0 0 1-.356-.143.484.484 0 0 1-.144-.357c0-.142.048-.261.144-.357a.484.484 0 0 1 .356-.143h15.58l-5.44-5.438a.48.48 0 0 1 .006-.708.516.516 0 0 1 .354-.163.485.485 0 0 1 .354.163l6.08 6.08a.786.786 0 0 1 .185.268.82.82 0 0 1 .052.298.82.82 0 0 1-.052.298.786.786 0 0 1-.184.267l-6.08 6.081a.5.5 0 0 1-.342.15.48.48 0 0 1-.367-.15.498.498 0 0 1-.165-.357c0-.127.055-.246.165-.356l5.433-5.433Z"
      />
    </G>
  </Svg>
);
export default ArrowRight;
