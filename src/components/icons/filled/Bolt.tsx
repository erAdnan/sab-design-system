import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"
const Bolt = (props: SvgProps) => (
  <Svg
   {...props}
    width={props.width || 32}
    height={props.height || 32}
    fill="none"
    viewBox="0 0 32 32"
    preserveAspectRatio="xMidYMid meet"
  >
    <Path
      fill={props.fill || "#DB0011"}
      d="M16.23 4.413 9.502 17.197a.93.93 0 0 0 .355 1.234c.137.079.291.12.448.12h3.537a.904.904 0 0 1 .646.27.923.923 0 0 1 .267.653v7.68c0 .95 1.249 1.279 1.709.45l7.024-12.66a.93.93 0 0 0-.342-1.25.906.906 0 0 0-.454-.123l-3.834-.005a.908.908 0 0 1-.644-.27.928.928 0 0 1-.267-.652V4.847c.001-.961-1.27-1.281-1.717-.434Z"
    />
  </Svg>
)
export default Bolt
