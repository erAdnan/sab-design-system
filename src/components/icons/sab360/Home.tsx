import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const Home = (props: SvgProps) => (
  <Svg
    {...props}
    width={props.width || 24}
    height={props.height || 24}
    fill="none"
    viewBox="0 0 24 24"
    preserveAspectRatio="xMidYMid meet">
    <Path
      fill={props.fill || "#D38900"}
      fillRule="evenodd"
      d="m18.887 9.951 2.1 2.068a.6.6 0 0 1 0 .858.624.624 0 0 1-.802.06l-.068-.057-1.452-1.43.002 2.38v6.124c0 .3-.222.556-.517.597l-.078.004h-4.417a.599.599 0 0 1-.59-.52l-.006-.077v-4.454a.51.51 0 0 0-.439-.506l-.072-.006h-1.1a.51.51 0 0 0-.502.443l-.005.071v4.448c0 .3-.222.556-.515.597l-.08.004H5.93a.599.599 0 0 1-.591-.52l-.006-.078V11.45l-1.448 1.427a.624.624 0 0 1-.872 0 .603.603 0 0 1-.06-.79l.058-.066 7.747-7.628a1.782 1.782 0 0 1 2.383-.092l.1.09 1.636 1.613a.61.61 0 0 1 .46-.332l.08-.005h2.853c.306 0 .57.225.611.524l.006.08v3.68Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default Home;
