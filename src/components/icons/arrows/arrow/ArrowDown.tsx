import * as React from "react"
import Svg, { Mask, Path, G, SvgProps } from 'react-native-svg'
const ArrowDown = (props: SvgProps) => (
  <Svg
    fill="none"
    width={24}
    height={24}
    viewBox='0 0 24 24'
    {...props}
  >
    <Mask
      id="a"
      width={24}
      height={24}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
    >
      <Path fill="#D9D9D9" d="M0 0h24v24H0z" />
    </Mask>
    <G mask="url(#a)">
      <Path
        fill={`${String(props.fill || "#DB0011")}`}
        d="m12.494 19.243 5.439-5.438a.48.48 0 0 1 .708.006c.106.11.16.228.162.353a.485.485 0 0 1-.163.354L12.56 20.6a.786.786 0 0 1-.268.184.82.82 0 0 1-.298.053.82.82 0 0 1-.298-.053.786.786 0 0 1-.267-.184l-6.081-6.08a.5.5 0 0 1-.15-.342.481.481 0 0 1 .15-.366c.11-.11.23-.166.357-.166.127 0 .246.055.356.166l5.433 5.432V3.664c0-.142.048-.26.143-.356a.484.484 0 0 1 .357-.144c.142 0 .261.048.357.144a.484.484 0 0 1 .143.356v15.58Z"
      />
    </G>
  </Svg>
)
export default ArrowDown