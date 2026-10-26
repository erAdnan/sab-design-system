import * as React from "react"
import Svg, { Mask, Path, G, SvgProps } from "react-native-svg"
const Plus = (props: SvgProps) => (
  <Svg
     {...props}
    width={props.width || 16}
    height={props.height || 16}
    fill="none"
    viewBox="0 0 16 16"
    preserveAspectRatio="xMidYMid meet"
  >
    <Mask
      id="a"
      width={16}
      height={16}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}
    >
      <Path fill="#D9D9D9" d="M0 0h16v16H0z" />
    </Mask>
    <G mask="url(#a)">
      <Path
        fill={props.fill || "#000"}
        d="M7.667 8.333H4.333a.322.322 0 0 1-.237-.096A.323.323 0 0 1 4 8c0-.095.032-.174.096-.238a.323.323 0 0 1 .237-.095h3.334V4.333c0-.094.032-.173.096-.237A.323.323 0 0 1 8 4c.095 0 .174.032.238.096a.323.323 0 0 1 .095.237v3.334h3.334c.094 0 .173.032.237.096A.323.323 0 0 1 12 8a.322.322 0 0 1-.096.238.323.323 0 0 1-.237.095H8.333v3.334a.322.322 0 0 1-.096.237A.323.323 0 0 1 8 12a.322.322 0 0 1-.238-.096.323.323 0 0 1-.095-.237V8.333Z"
      />
    </G>
  </Svg>
)
export default Plus
