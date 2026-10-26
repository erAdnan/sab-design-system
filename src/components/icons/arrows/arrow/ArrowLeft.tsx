import * as React from "react";
import Svg, { SvgProps, Mask, Path, G } from "react-native-svg";
const ArrowLeft = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Mask id="a" width={24} height={24} x={0} y={0} maskUnits="userSpaceOnUse">
      <Path fill="#D9D9D9" d="M0 0h24v24H0z" />
    </Mask>
    <G mask="url(#a)">
      <Path
        fill={props.fill || "#DB0011"}
        d="m4.757 12.5 5.438 5.439a.48.48 0 0 1-.006.708.517.517 0 0 1-.353.162.485.485 0 0 1-.354-.163l-6.08-6.08a.785.785 0 0 1-.185-.268.819.819 0 0 1-.052-.298c0-.108.017-.207.052-.298a.785.785 0 0 1 .184-.267l6.08-6.081a.5.5 0 0 1 .342-.15.481.481 0 0 1 .367.15c.11.11.165.229.165.357a.499.499 0 0 1-.165.356L4.757 11.5h15.579c.142 0 .26.048.356.143a.484.484 0 0 1 .144.357.484.484 0 0 1-.144.357.484.484 0 0 1-.356.143H4.756Z"
      />
    </G>
  </Svg>
);
export default ArrowLeft;
