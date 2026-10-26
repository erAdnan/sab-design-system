import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const BSF = (props: SvgProps) => (
  <Svg
   {...props}
    width={props.width || 24}
    height={props.height || 24}
    fill="none"
    viewBox="0 0 24 24"
    preserveAspectRatio="xMidYMid meet"
  >
    <Path
      fill="#002A30"
      d="M12.008 3.94 5 7.97v8.06l7 4.03 7-4.03V7.97l-7-4.03h.008ZM6.546 15.148V9.702a8.66 8.66 0 0 1 2.274 2.136c.68.93 1.222 1.959 1.602 3.051.34.947.583 1.918.728 2.913l-4.604-2.654Zm4.693-1.853a8.594 8.594 0 0 0-1.165-2.347 10.19 10.19 0 0 0-2.72-2.55l3.885-2.24v7.137Zm1.538-7.138L16.66 8.4a9.954 9.954 0 0 0-2.719 2.549 8.481 8.481 0 0 0-1.165 2.347V6.157Zm4.694 8.991-4.605 2.654c.146-.995.388-1.966.728-2.913.38-1.092.923-2.112 1.603-3.05a8.66 8.66 0 0 1 2.274-2.137v5.446Z"
    />
  </Svg>
)
export default BSF