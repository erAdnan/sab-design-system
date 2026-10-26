import * as React from "react";
import Svg, { SvgProps, Circle } from "react-native-svg";
const Ellipse = (props: SvgProps) => (
  <Svg width={4} height={5} fill="none" {...props}>
    <Circle cx={2} cy={2.5} r={2} fill={props.fill || "#000"} />
  </Svg>
);
export default Ellipse;
