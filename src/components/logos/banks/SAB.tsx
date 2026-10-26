import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SAB = (props: SvgProps) => (
  <Svg
    {...props}
    width={props.width || 24}
    height={props.height || 24}
    fill="none"
    viewBox="0 0 24 24"
    preserveAspectRatio="xMidYMid meet"
  >
    <Path
      fill="#DB0011"
      d="M7.205 16.634 2.25 11.69 7.205 6.75v9.884Zm9.91 0h-9.91l4.955-4.943 4.955 4.943Zm4.955-4.943-4.955 4.943V6.75l4.955 4.941Zm-9.91 0L7.205 6.75h9.91l-4.955 4.941Z"
    />
  </Svg>
)
export default SAB