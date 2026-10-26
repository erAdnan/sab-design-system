import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const RiyadBank = (props: SvgProps) => (
  <Svg
    {...props}
    width={props.width || 24}
    height={props.height || 24}
    fill="none"
    viewBox="0 0 24 24"
    preserveAspectRatio="xMidYMid meet"
  >
    <Path
      fill="#230871"
      d="m14.359 9.637 4.708-4.708H9.64v9.425L4.934 19.07h9.425V9.637Z"
    />
    <Path
      fill="#00AF9A"
      d="M14.358 9.637v4.717h4.708V4.929l-4.708 4.708ZM4.934 19.071l4.707-4.717V9.637H4.934v9.434Z"
    />
  </Svg>
)
export default RiyadBank