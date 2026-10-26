import * as React from "react";
import Svg, { SvgProps, Mask, Path, G } from "react-native-svg";

const ChevronRight = (props: SvgProps) => (
  <Svg
    {...props}
    width={props.width || 24}
    height={props.height || 24}
    viewBox="0 0 24 24"
    fill="none"
    preserveAspectRatio="xMidYMid meet"
  >
    <Mask id="chevronRightMask" width={24} height={24} x={0} y={0} maskUnits="userSpaceOnUse">
      <Path fill="#D9D9D9" d="M0 0h24v24H0z" />
    </Mask>
    <G mask="url(#chevronRightMask)">
      <Path
        fill={props.fill || "#DB0011"}
        d="M13.292 12 9.046 7.754a.504.504 0 0 1-.15-.344.467.467 0 0 1 .15-.364.49.49 0 0 1 .354-.16.49.49 0 0 1 .354.16l4.388 4.389a.786.786 0 0 1 .184.267.82.82 0 0 1 .053.298.82.82 0 0 1-.053.298.786.786 0 0 1-.184.267l-4.388 4.389a.504.504 0 0 1-.344.15.467.467 0 0 1-.364-.15.491.491 0 0 1-.16-.354.49.49 0 0 1 .16-.354L13.292 12Z"
      />
    </G>
  </Svg>
);

export default ChevronRight;
