import * as React from "react";
import Svg, { SvgProps, Mask, Path, G } from "react-native-svg";
const ChevronDown = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Mask id="a" width={24} height={24} x={0} y={0} maskUnits="userSpaceOnUse">
      <Path fill="#D9D9D9" d="M0 0h24v24H0z" />
    </Mask>
    <G mask="url(#a)">
      <Path
        fill={props.fill || "#DB0011"}
        d="M12 14.373a.817.817 0 0 1-.298-.053.784.784 0 0 1-.267-.183L7.046 9.748a.504.504 0 0 1-.15-.344.467.467 0 0 1 .15-.364.49.49 0 0 1 .354-.16.49.49 0 0 1 .354.16L12 13.287l4.246-4.247a.503.503 0 0 1 .344-.15.467.467 0 0 1 .364.15.49.49 0 0 1 .16.354.49.49 0 0 1-.16.354l-4.389 4.389a.786.786 0 0 1-.267.183.818.818 0 0 1-.298.053Z"
      />
    </G>
  </Svg>
);
export default ChevronDown;
