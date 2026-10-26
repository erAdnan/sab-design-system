import * as React from "react";
import Svg, { Mask, Path, G, SvgProps } from "react-native-svg";
const Send = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Mask id="a" width={24} height={24} x={0} y={0} maskUnits="userSpaceOnUse">
      <Path fill="#D9D9D9" d="M0 0h24v24H0z" />
    </Mask>
    <G mask="url(#a)">
      <Path
        fill={props.fill || "#DB0011"}
        d="m17.646 12.752-12.515 5.27a.803.803 0 0 1-.768-.07.74.74 0 0 1-.363-.664V6.712a.74.74 0 0 1 .363-.665.803.803 0 0 1 .768-.068l12.515 5.27c.327.144.49.395.49.751s-.163.607-.49.752ZM5 17l11.85-5L5 7v3.885L9.846 12 5 13.115V17Z"
      />
    </G>
  </Svg>
);
export default Send;
