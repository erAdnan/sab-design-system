import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Deutsche = (props: SvgProps) => (
  <Svg
   {...props}
    width={props.width || 24}
    height={props.height || 24}
    fill="none"
    viewBox="0 0 24 24"
    preserveAspectRatio="xMidYMid meet"
  >
    <Path
      fill="#35398F"
      fillRule="evenodd"
      d="M3.598 20.414h16.8v-16.8h-16.8v16.8ZM5.905 5.92h12.093v12.185H5.905V5.921Z"
      clipRule="evenodd"
    />
    <Path
      fill="#35398F"
      fillRule="evenodd"
      d="M7.29 16.352h3.138l6.185-9.046-3.23.092-6.093 8.954Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default Deutsche