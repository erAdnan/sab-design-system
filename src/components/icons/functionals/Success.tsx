import * as React from "react";
import Svg, { SvgProps, Path, Circle } from "react-native-svg";
const Success = (props: SvgProps) => (
  <Svg width={props.width || 18}
        height={props.height || 18}
        fill="none"
        viewBox="0 0 18 18"
        preserveAspectRatio="xMidYMid meet"
        {...props}>
    <Path
      fill="#fff"
      d={`M0 0h${props.width || 18}v${props.height || 18}H0z`}
      opacity={0.01}
    />
    <Circle cx={9} cy={9} r={9} fill={props.fill || "#00847F"} />
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="m7.216 13.553-3.63-3.629L4.859 8.65l2.357 2.358 5.925-5.925 1.273 1.273-7.198 7.197Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default Success;
