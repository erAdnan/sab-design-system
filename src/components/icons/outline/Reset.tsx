import * as React from "react";
import Svg, { G, Mask, Path, Rect, SvgProps } from "react-native-svg";

const Reset = (props: SvgProps) => (
  <Svg
    {...props}
    width={props.width || 24}
    height={props.height || 24}
    viewBox="0 0 24 24"
    fill="none"
    preserveAspectRatio="xMidYMid meet"
  >
    <Mask
      id="resetOutlineMask"
      width={24}
      height={24}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}
    >
      <Rect width={24} height={24} fill="#D9D9D9" />
    </Mask>
    <G mask="url(#resetOutlineMask)">
      <Path
        d="M5.078 7.98928C6.05072 6.31049 7.6004 5.04242 9.43848 4.42117C11.2766 3.79993 13.2778 3.86786 15.0695 4.61231C16.8613 5.35676 18.3214 6.72699 19.178 8.46787C20.0347 10.2088 20.2294 12.2016 19.7261 14.0754C19.2227 15.9492 18.0556 17.5763 16.4419 18.6535C14.8282 19.7308 12.878 20.185 10.9544 19.9314C9.03082 19.6778 7.26494 18.7338 5.98557 17.2751C4.70621 15.8164 4.00055 13.9425 4 12.0023"
        stroke={props.fill || "#000"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 8.00391H5V4.00391"
        stroke={props.fill || "#000"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

export default Reset;
