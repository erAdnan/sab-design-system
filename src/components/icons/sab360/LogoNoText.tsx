import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const LogoNoText = (props: SvgProps) => (
  <Svg
    {...props}
    width={props.width || 39}
    height={props.height || 18}
    fill="none"
    viewBox="0 0 39 18"
    preserveAspectRatio="xMidYMid meet"
  >
    <Path
      fill={props.fill || "#fff"}
      fillRule="evenodd"
      d="m39.368 9.389-9.842 9.39V0l9.842 9.389ZM0 9.389l9.842 9.39v-.001h19.683l-9.841-9.39L29.525 0H9.842l9.841 9.389-9.841 9.389V0L0 9.39Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default LogoNoText;
