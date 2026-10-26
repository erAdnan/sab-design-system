import * as React from "react";
import Svg, { SvgProps, G, Mask, Rect, Path } from "react-native-svg";
const BlockPattern = (props: SvgProps) => (
  <Svg width={168} height={110} fill="none" {...props}>
    <G opacity={0.9}>
      <Mask
        id="a"
        width={168}
        height={110}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
      >
        <Rect
          width={167.5}
          height={110}
          fill="#fff"
          rx={8}
          transform="matrix(-1 0 0 1 167.5 0)"
        />
      </Mask>
      <G fill="#fff" fillRule="evenodd" clipRule="evenodd" mask="url(#a)">
        <Path
          fillOpacity={0.95}
          d="m-33.269 211.951 319.518-232.05-39.604 220.12-279.914 11.93Z"
          opacity={0.08}
        />
        <Path
          fillOpacity={0.7}
          d="M-68.215-44.773-115 126.739l231.478 55.622L-68.215-44.774Z"
          opacity={0.08}
        />
        <Path
          fillOpacity={0.7}
          d="M-94.095 103.661 268.54-5.762l198.109 289.945-560.744-180.522Z"
          opacity={0.08}
        />
      </G>
    </G>
  </Svg>
);
export default BlockPattern;
