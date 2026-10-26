import * as React from "react";
import Svg, { SvgProps, Mask, Path, G } from "react-native-svg";
const ProgressActivity = (props: SvgProps) => (
  <Svg
    {...props}
    width={props.width || 24}
    height={props.width || 24}
    viewBox="0 0 24 24"
    fill="none"
    preserveAspectRatio="xMidYMid meet"
  >
    <Mask id="a" width={24} height={24} x={0} y={0} maskUnits="userSpaceOnUse">
      <Path fill="#D9D9D9" d="M0 0h24v24H0z" />
    </Mask>
    <G mask="url(#a)">
      <Path
        fill={props.fill || "#DB0011"}
        d="M11.994 21a8.716 8.716 0 0 1-3.491-.707 9.11 9.11 0 0 1-2.864-1.932 9.113 9.113 0 0 1-1.932-2.864A8.718 8.718 0 0 1 3 12.007c0-1.25.237-2.42.71-3.512a9.143 9.143 0 0 1 1.93-2.856 9.113 9.113 0 0 1 2.864-1.928A8.728 8.728 0 0 1 12 3c.142 0 .26.048.356.144a.485.485 0 0 1 .144.357c0 .142-.048.26-.144.356A.484.484 0 0 1 12 4c-2.217 0-4.104.78-5.662 2.338C4.779 7.896 4 9.783 4 12s.78 4.104 2.338 5.663C7.896 19.22 9.783 20 12 20s4.104-.78 5.663-2.337C19.22 16.104 20 14.217 20 12c0-.142.048-.261.144-.357a.486.486 0 0 1 .357-.143c.141 0 .26.048.356.144A.484.484 0 0 1 21 12a8.728 8.728 0 0 1-.71 3.496 9.113 9.113 0 0 1-1.93 2.865 9.143 9.143 0 0 1-2.855 1.928 8.723 8.723 0 0 1-3.511.711Z"
      />
    </G>
  </Svg>
);
export default ProgressActivity;
