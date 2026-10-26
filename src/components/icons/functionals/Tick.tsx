import * as React from "react";
import Svg, { SvgProps, Mask, Path, G } from "react-native-svg";
const Tick = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Mask id="a" width={24} height={24} x={0} y={0} maskUnits="userSpaceOnUse">
      <Path fill="#D9D9D9" d="M0 0h24v24H0z" />
    </Mask>
    <G mask="url(#a)">
      <Path
        fill={props.fill || "#DB0011"}
        d="m9.55 15.88 8.802-8.801a.51.51 0 0 1 .347-.156.474.474 0 0 1 .366.156c.11.11.166.229.166.357a.499.499 0 0 1-.166.356l-8.95 8.95a.774.774 0 0 1-.565.243.775.775 0 0 1-.565-.243l-4.05-4.05a.484.484 0 0 1 .006-.713c.11-.11.229-.166.356-.166.128 0 .247.056.357.166L9.55 15.88Z"
      />
    </G>
  </Svg>
);
export default Tick;
