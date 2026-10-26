import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Mastercard = (props: SvgProps) => (
  <Svg
    {...props}
    width={props.width || 32}
    height={props.height || 21}
    fill="none"
    viewBox="0 0 32 21"
    preserveAspectRatio="xMidYMid meet"
  >
     <Path fill="#FF5F00" d="M20.516 17.676h-8.61V2.847h8.61v14.829Z" />
    <Path
      fill="#EB001B"
      d="M12.602 10.5a9.589 9.589 0 0 1 3.613-7.521A9.354 9.354 0 0 0 10.368.934C5.144.934.908 5.217.908 10.5c0 5.284 4.236 9.567 9.46 9.567a9.354 9.354 0 0 0 5.847-2.046 9.59 9.59 0 0 1-3.613-7.52Z"
    />
    <Path
      fill="#F79E1B"
      d="M32.004 10.5c0 5.284-4.367 9.567-9.755 9.567a9.84 9.84 0 0 1-6.03-2.046c2.27-1.751 3.727-4.47 3.727-7.52 0-3.052-1.457-5.77-3.727-7.522A9.84 9.84 0 0 1 22.25.934c5.388 0 9.755 4.283 9.755 9.566Z"
    />
  </Svg>
)
export default Mastercard