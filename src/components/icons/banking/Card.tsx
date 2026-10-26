import * as React from "react";
import Svg, { SvgProps, Mask, Path, G } from "react-native-svg";
const Card = (props: SvgProps) => (
  <Svg
    {...props}
    width={props.width || 24}
    height={props.height || 24}
    fill="none"
    viewBox="0 0 24 24"
    preserveAspectRatio="xMidYMid meet"
  >
    <Mask id="a" width={24} height={24} x={0} y={0} maskUnits="userSpaceOnUse">
      <Path fill="#D9D9D9" d="M0 0h24v24H0z" />
    </Mask>
    <G mask="url(#a)">
      <Path
        fill={props.fill || "#DB0011"}
        d="M21 6.615v10.77c0 .46-.154.844-.462 1.152a1.565 1.565 0 0 1-1.153.463H4.615c-.46 0-.844-.154-1.153-.462A1.565 1.565 0 0 1 3 17.385V6.615c0-.46.154-.844.462-1.152A1.565 1.565 0 0 1 4.615 5h14.77c.46 0 .844.154 1.152.463.309.308.463.692.463 1.152ZM4 8.808h16V6.615a.588.588 0 0 0-.192-.423.588.588 0 0 0-.423-.192H4.615a.588.588 0 0 0-.423.192.588.588 0 0 0-.192.423v2.193Zm0 2.384v6.193c0 .153.064.294.192.423.129.128.27.192.423.192h14.77a.588.588 0 0 0 .423-.192.588.588 0 0 0 .192-.423v-6.193H4Z"
      />
    </G>
  </Svg>
);
export default Card;
