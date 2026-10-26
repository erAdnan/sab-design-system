import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const Close = (props: SvgProps) => (
  <Svg
    width={props.width || 24}
    height={props.height || 24}
    viewBox="0 0 24 24"
    fill="none"
    preserveAspectRatio="xMidYMid meet"
    {...props}
  >
    <Path
      fill={props.fill || "#DB0011"}
      d="m12 12.708-5.246 5.246a.504.504 0 0 1-.344.15.467.467 0 0 1-.364-.15.491.491 0 0 1-.16-.354.49.49 0 0 1 .16-.354L11.292 12 6.046 6.754a.504.504 0 0 1-.15-.344.467.467 0 0 1 .15-.364.49.49 0 0 1 .354-.16.49.49 0 0 1 .354.16L12 11.292l5.246-5.246a.503.503 0 0 1 .344-.15.467.467 0 0 1 .364.15.49.49 0 0 1 .16.354.49.49 0 0 1-.16.354L12.708 12l5.246 5.246a.504.504 0 0 1 .15.344.468.468 0 0 1-.15.364.491.491 0 0 1-.354.16.49.49 0 0 1-.354-.16L12 12.708Z"
    />
  </Svg>
);
export default Close;
