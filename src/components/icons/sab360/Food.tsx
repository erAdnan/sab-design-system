import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Food = (props: SvgProps) => (
  <Svg
    {...props}
    width={props.width || 24}
    height={props.height || 24}
    fill="none"
    viewBox="0 0 24 24"
    preserveAspectRatio="xMidYMid meet"
  >
    <Path
      fill={props.fill || "#E02D48"}
      d="M6.797 7.225c0 .352.41.649.893.649.492 0 .892-.302.892-.671V2.875h1.892c.298 0 .554.27.568.597v4.82c0 1.324-.995 2.402-2.217 2.402H8.26v9.918c0 .329-.249.596-.552.596-.303 0-.55-.267-.55-.596v-9.918H6.59c-1.222 0-2.216-1.078-2.216-2.401v-4.82c0-.33.247-.598.55-.598h1.872v4.35Zm9.174-4.433c2.015 0 3.654 1.892 3.654 4.219v4.632c0 .326-.23.592-.513.592h-2.628v8.297c0 .327-.23.593-.513.593-.283 0-.513-.266-.513-.593V3.384c0-.326.23-.592.513-.592Z"
    />
  </Svg>
)
export default Food
