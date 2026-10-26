import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Beauty = (props: SvgProps) => (
  <Svg
   {...props}
    width={props.width || 16}
    height={props.height || 17}
    fill="none"
    viewBox="0 0 16 17"
    preserveAspectRatio="xMidYMid meet"
  >
    <Path
      stroke={props.fill || "#DB0011"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.8}
      d="M4.247 10.607h4.561M10.143 8h2.61v6.516h-2.61V8ZM4.247 8h4.561v6.516h-4.56V8Zm.978-4.087V8H7.83V1.484c-2.118 0-2.607 1.836-2.607 2.429Z"
    />
  </Svg>
)
export default Beauty