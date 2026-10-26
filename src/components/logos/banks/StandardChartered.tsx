import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const StandardChartered = (props: SvgProps) => (
  <Svg
   {...props}
    width={props.width || 32}
    height={props.height || 32}
    fill="none"
    viewBox="0 0 32 32"
    preserveAspectRatio="xMidYMid meet"
  >
    <G clipPath="url(#a)">
      <Path
        fill="#38D200"
        d="M20.71 28.5 9.865 21.44s-1.36-.781-1.671-2.238c-.437-2.045 1.004-3.798 1.004-3.798l14.073 9.165a2.354 2.354 0 0 1 .684 3.247c-.717 1.121-2.19 1.369-3.247.684Z"
      />
      <Path
        fill="#0473EA"
        d="M10.439 13.891S8.778 12.89 8.778 10.57c0-2.312 1.66-3.302 1.66-3.302l5.928-3.88a2.346 2.346 0 0 1 2.557 3.934l-4.996 3.254 8.513 5.544s1.532.878 1.834 2.36c.421 2.067-1.002 3.77-1.002 3.77L10.44 13.891Zm-.032 14.983c.557 0 .953-.177 1.34-.427l2.893-1.885-2.894-1.885c-.39-.25-.8-.427-1.339-.427a2.314 2.314 0 0 0-2.166 3.205 2.313 2.313 0 0 0 2.166 1.419Z"
      />
      <Path
        fill="#38D200"
        d="M21.596 8.263c-.557 0-.953.177-1.34.427l-2.893 1.885 2.894 1.884c.39.252.8.428 1.34.428a2.312 2.312 0 1 0 0-4.624Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M8.021 3H24.33v26H8.021z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default StandardChartered