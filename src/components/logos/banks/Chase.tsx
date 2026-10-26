import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Chase = (props: SvgProps) => (
  <Svg
    {...props}
    width={props.width || 24}
    height={props.height || 24}
    fill="none"
    viewBox="0 0 24 24"
    preserveAspectRatio="xMidYMid meet"
  >
    <Path
      fill="#0A79BE"
      d="M15.403 3.614H9.825a.634.634 0 0 0-.65.648v4.35h11.433l-5.205-4.998ZM20.422 9.26h-4.369v11.383l4.927-5.182V9.907c.093-.37-.186-.647-.558-.647ZM9.175 21.014h5.577c.372 0 .65-.278.65-.648v-4.258H3.97l5.206 4.906ZM8.524 15.46V4.078L3.598 9.26v5.553c0 .37.278.648.65.648h4.276Z"
    />
  </Svg>
)
export default Chase