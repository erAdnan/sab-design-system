import * as React from "react";
import Svg, { G, Mask, Path, Rect, SvgProps } from "react-native-svg";

const Arrange = (props: SvgProps) => (
  <Svg
    {...props}
    width={props.width || 24}
    height={props.height || 24}
    viewBox="0 0 24 24"
    fill="none"
    preserveAspectRatio="xMidYMid meet"
  >
    <Mask
      id="arrangeOutlineMask"
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
    <G mask="url(#arrangeOutlineMask)">
      <Path
        fill={props.fill || "#767676"}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.5 5.72266C20.5 5.9988 20.2761 6.22266 20 6.22266L4 6.22265C3.72386 6.22265 3.5 5.9988 3.5 5.72265C3.5 5.44651 3.72386 5.22265 4 5.22265L20 5.22266C20.2761 5.22266 20.5 5.44651 20.5 5.72266Z"
      />
      <Path
        fill={props.fill || "#767676"}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.5 11.7227C20.5 11.9988 20.2761 12.2227 20 12.2227L4 12.2227C3.72386 12.2227 3.5 11.9988 3.5 11.7227C3.5 11.4465 3.72386 11.2227 4 11.2227L20 11.2227C20.2761 11.2227 20.5 11.4465 20.5 11.7227Z"
      />
      <Path
        fill={props.fill || "#767676"}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.5 17.7227C20.5 17.9988 20.2761 18.2227 20 18.2227L4 18.2227C3.72386 18.2227 3.5 17.9988 3.5 17.7227C3.5 17.4465 3.72386 17.2227 4 17.2227L20 17.2227C20.2761 17.2227 20.5 17.4465 20.5 17.7227Z"
      />
    </G>
  </Svg>
);

export default Arrange;
