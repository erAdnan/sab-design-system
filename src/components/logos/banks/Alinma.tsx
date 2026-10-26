import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"
const Alinma = (props: SvgProps) => (
  <Svg
   {...props}
    width={props.width || 24}
    height={props.height || 24}
    fill="none"
    viewBox="0 0 24 24"
    preserveAspectRatio="xMidYMid meet"
  >
    <Path
      fill="#002134"
      fillRule="evenodd"
      d="M8.728 5.137C6.359 5.31 5.51 5.903 5.13 7.65c-.119.546-.132.999-.13 4.452 0 3.318.017 3.92.121 4.397.3 1.37.921 2.032 2.175 2.32 1.499.343 7.797.34 9.323-.003.98-.222 1.688-.795 1.982-1.606.283-.782.343-1.41.384-3.994.088-5.666-.204-7.001-1.673-7.652-.552-.245-1.082-.346-2.261-.432-1.087-.079-5.222-.075-6.324.005Zm4.978 6.363-.019 4.642-1.665.566c-.916.311-1.706.566-1.756.567-.073 0-.088-.952-.073-4.646l.019-4.646 1.665-.557c.916-.307 1.707-.56 1.756-.563.073-.005.088.944.073 4.637Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default Alinma