import * as React from "react";
import Svg, { SvgProps, Mask, Path, G } from "react-native-svg";
const Edit = (props: SvgProps) => (
  <Svg
    {...props}
    width={props.width || 24}
    height={props.height || 24}
    viewBox="0 0 24 24"
    fill="none"
    preserveAspectRatio="xMidYMid meet"
  >
    <Mask id="a" width={24} height={24} x={0} y={0} maskUnits="userSpaceOnUse">
      <Path fill="#D9D9D9" d="M0 0h24v24H0z" />
    </Mask>
    <G fill={props.fill || "#DB0011"} mask="url(#a)">
      <Path d="M5 19h1.098L16.796 8.302l-1.098-1.098L5 17.902V19Zm-.192 1a.782.782 0 0 1-.576-.232.782.782 0 0 1-.232-.576v-1.04c0-.221.044-.432.13-.632.088-.2.204-.373.349-.518L17.18 4.287c.102-.092.215-.162.34-.212.123-.05.252-.075.386-.075.135 0 .265.021.39.063a.87.87 0 0 1 .35.23l1.067 1.072a.84.84 0 0 1 .225.35c.04.128.061.255.061.382 0 .135-.023.265-.069.389a.963.963 0 0 1-.218.339L6.998 19.521a1.66 1.66 0 0 1-1.15.479h-1.04Zm11.43-12.237-.54-.56 1.098 1.099-.558-.54Z" />
      <Path
        fillRule="evenodd"
        d="M8.688 19.472a.5.5 0 0 1 .5-.5h10.374a.5.5 0 1 1 0 1H9.188a.5.5 0 0 1-.5-.5Z"
        clipRule="evenodd"
      />
    </G>
  </Svg>
);
export default Edit;
